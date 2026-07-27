import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { lineClient } from '../lib/line/client.js';

if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        })
    });
}
const db = getFirestore();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).send('Webhook is active and listening!');
  }
  
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const update = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    
    // Check if it's a message
    if (update.message) {
      const text = update.message.text?.trim()?.toLowerCase();
      const token = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = update.message.chat.id;
      
      // Allow 'อนุมัติ' or 'approve'
      if (text === 'อนุมัติ' || text === 'approve') {
        if (!update.message.reply_to_message) {
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: `⚠️ กรุณากด Reply (ตอบกลับ) ที่รูปสลิปก่อนพิมพ์อนุมัติครับ` })
          });
          return res.status(200).send('OK');
        }

        const replyTo = update.message.reply_to_message;
        const caption = replyTo.caption || '';
        
        // Extract Owner ID and License
        const ownerIdMatch = caption.match(/Owner ID:\s*([a-zA-Z0-9_-]+)/);
        const licenseMatch = caption.match(/แพ็กเกจปัจจุบัน:\s*([a-zA-Z0-9_-]+)/);
        
        if (ownerIdMatch) {
          const ownerId = ownerIdMatch[1];
          const license = licenseMatch ? licenseMatch[1] : 'free';
          
          let addDays = 0;
          if (license.includes('yearly')) addDays = 365;
          else if (license.includes('monthly')) addDays = 30;
          
          if (addDays > 0) {
            const userRef = db.collection('users').doc(ownerId);
            const userSnap = await userRef.get();
            
            if (userSnap.exists) {
              const userData = userSnap.data();
              const now = Date.now();
              const currentAccessUntil = userData.access_until || 0;
              
              // If expired, start from now. If still active, add to current.
              const baseDate = currentAccessUntil > now ? currentAccessUntil : now;
              const newAccessUntil = baseDate + (addDays * 24 * 60 * 60 * 1000);
              
              await userRef.update({
                access_until: newAccessUntil
              });
              
              // Reply in Telegram
              const token = process.env.TELEGRAM_BOT_TOKEN;
              const chatId = update.message.chat.id;
              
              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `✅ ต่ออายุให้ Owner ID: ${ownerId} เรียบร้อยแล้ว (เพิ่ม ${addDays} วัน)`,
                  reply_to_message_id: update.message.message_id
                })
              });
              
              // Send LINE Notification
              const lineUserId = userData.line_support_user_id;
              if (lineUserId) {
                const planName = license.includes('small') ? 'Start' : license.includes('medium') ? 'Plus' : 'Pro';
                const cycleName = license.includes('monthly') ? 'รายเดือน' : 'รายปี';
                
                await lineClient.pushMessage({
                  to: lineUserId,
                  messages: [{
                    type: 'text',
                    text: `✅ ดำเนินการต่ออายุสำเร็จ!\n\nแอดมินได้ตรวจสอบสลิปและทำการต่ออายุแพ็กเกจ ${planName} ${cycleName} ให้กับหอพักของคุณเรียบร้อยแล้วครับ\n\nคุณสามารถเช็ควันหมดอายุรอบถัดไปได้ง่ายๆ เพียงพิมพ์คำว่า "ตรวจสอบอายุแพ็กเกจ" ในแชทนี้ได้เลยครับ\n\nขอบคุณที่ให้ HorCare ดูแลหอพักของคุณครับ 🙏💙`
                  }]
                });
              }
            }
          } else {
             // Not a valid paid license (e.g., free)
              await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `⚠️ ไม่สามารถต่ออายุอัตโนมัติได้ เนื่องจากแพ็กเกจปัจจุบันคือ ${license}`,
                  reply_to_message_id: update.message.message_id
                })
              });
          }
        } else {
           // Regex failed to find Owner ID
           await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({
               chat_id: chatId,
               text: `⚠️ ไม่พบ Owner ID ในข้อความที่ Reply ครับ\nข้อมูลที่อ่านได้: ${caption}`,
               reply_to_message_id: update.message.message_id
             })
           });
        }
      } else if (text === 'ping') {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: `Pong! ระบบทำงานปกติครับ` })
        });
      }
    }
    
    // Always return 200 so Telegram doesn't retry
    res.status(200).send('OK');
  } catch (err) {
    console.error('Telegram Webhook Error:', err);
    res.status(500).send('Error');
  }
}
