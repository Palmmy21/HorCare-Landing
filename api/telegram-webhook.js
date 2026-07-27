import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
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

const PLAN_DISPLAY = { small: 'Start', medium: 'Plus', large: 'Pro' };

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).send('Webhook is active and listening!');
  }
  
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const update = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    
    if (update.message) {
      const text = update.message.text?.trim()?.toLowerCase();
      const token = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = update.message.chat.id;
      
      // ── "อนุมัติ" / "approve" — Reply to a slip photo ──────────────────
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
        
        // Extract Owner ID
        const ownerIdMatch = caption.match(/Owner ID:\s*([a-zA-Z0-9_-]+)/);
        
        if (!ownerIdMatch) {
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: `⚠️ ไม่พบ Owner ID ในข้อความที่ Reply ครับ\nข้อมูลที่อ่านได้: ${caption}`,
              reply_to_message_id: update.message.message_id
            })
          });
          return res.status(200).send('OK');
        }

        const ownerId = ownerIdMatch[1];

        // Determine license: prefer "License key:" (new signup/change) over "แพ็กเกจปัจจุบัน:" (renewal)
        const licenseKeyMatch = caption.match(/License key:\s*([a-zA-Z0-9_-]+)/);
        const currentLicenseMatch = caption.match(/แพ็กเกจปัจจุบัน:\s*([a-zA-Z0-9_-]+)/);
        const license = licenseKeyMatch ? licenseKeyMatch[1]
                      : currentLicenseMatch ? currentLicenseMatch[1]
                      : null;

        if (!license) {
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: `⚠️ ไม่พบข้อมูลแพ็กเกจในข้อความ\nกรุณาตรวจสอบ caption:\n${caption}`,
              reply_to_message_id: update.message.message_id
            })
          });
          return res.status(200).send('OK');
        }

        let addDays = 0;
        if (license.includes('yearly')) addDays = 365;
        else if (license.includes('monthly')) addDays = 30;

        if (addDays === 0) {
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: `⚠️ ไม่สามารถต่ออายุอัตโนมัติได้ เนื่องจากแพ็กเกจคือ "${license}"`,
              reply_to_message_id: update.message.message_id
            })
          });
          return res.status(200).send('OK');
        }

        const userRef = db.collection('users').doc(ownerId);
        const userSnap = await userRef.get();

        if (!userSnap.exists) {
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: `⚠️ ไม่พบผู้ใช้ Owner ID: ${ownerId}`,
              reply_to_message_id: update.message.message_id
            })
          });
          return res.status(200).send('OK');
        }

        const userData = userSnap.data();
        const now = Date.now();
        const currentAccessUntil = userData.access_until || 0;

        // If expired, start from now. If still active, add to current.
        const baseDate = currentAccessUntil > now ? currentAccessUntil : now;
        const newAccessUntil = baseDate + (addDays * 24 * 60 * 60 * 1000);

        // Build update payload
        const updatePayload = {
          access_until: newAccessUntil,
          license: license,  // Always set license to the approved package
        };

        // Clean up pending package flag
        if (userData._pending_package) {
          updatePayload._pending_package = FieldValue.delete();
        }

        await userRef.update(updatePayload);

        // Parse display names
        const planMatch = license.match(/^(monthly|yearly)_(small|medium|large)$/);
        const planName = planMatch ? (PLAN_DISPLAY[planMatch[2]] || planMatch[2]) : license;
        const cycleName = planMatch
          ? (planMatch[1] === 'monthly' ? 'รายเดือน' : 'รายปี')
          : '';
        const isNewSignup = !!licenseKeyMatch;

        // Reply in Telegram
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `✅ ${isNewSignup ? 'เปิดใช้งาน' : 'ต่ออายุ'}ให้ Owner ID: ${ownerId} เรียบร้อยแล้ว\nแพ็กเกจ: ${planName} ${cycleName} (+${addDays} วัน)\nหมดอายุ: ${new Date(newAccessUntil).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}`,
            reply_to_message_id: update.message.message_id
          })
        });

        // Send LINE notification to customer
        const lineUserId = userData.line_support_user_id;
        if (lineUserId) {
          const actionText = isNewSignup ? 'เปิดใช้งานแพ็กเกจ' : 'ต่ออายุแพ็กเกจ';
          await lineClient.pushMessage({
            to: lineUserId,
            messages: [{
              type: 'text',
              text: `✅ ${actionText}สำเร็จ!\n\n`
                  + `แอดมินได้ตรวจสอบสลิปและดำเนินการ${actionText} ${planName} ${cycleName} ให้เรียบร้อยแล้วครับ\n\n`
                  + `📅 หมดอายุ: ${new Date(newAccessUntil).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}\n\n`
                  + `พิมพ์ "ตรวจสอบแพ็กเกจ" เพื่อดูรายละเอียดได้ทุกเมื่อครับ\n\n`
                  + `ขอบคุณที่ใช้บริการ HorCare 🙏💙`,
            }],
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
