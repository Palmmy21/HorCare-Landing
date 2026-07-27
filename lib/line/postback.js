import { lineClient } from './client.js';
import { buildServicesFlex } from './flex/services.js';
import { buildContactAdminFlex } from './flex/contactAdmin.js';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

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

const LANDING_PAGE_URL = process.env.LANDING_PAGE_URL;
const ADMIN_GROUP_ID = process.env.ADMIN_GROUP_ID;

// event.postback.data on rich menu areas is set to one of these when the
// rich menu is created (see scripts/setup-richmenu.js):
//   action=service_info   -> area B
//   action=contact_admin  -> area D
// (areas A and C are plain "uri" actions straight to the landing page /
// app login, so LINE never sends them to the webhook at all.)
export async function handlePostback(event) {
  const params = new URLSearchParams(event.postback.data);
  const action = params.get('action');

  switch (action) {
    case 'service_info':
      return replyServiceInfo(event);
    case 'contact_admin':
      return replyContactAdmin(event);
    default:
      return lineClient.replyMessage({
        replyToken: event.replyToken,
        messages: [{ type: 'text', text: 'ขออภัยค่ะ ไม่พบคำสั่งนี้ กรุณาลองใหม่อีกครั้ง' }],
      });
  }
}

function replyServiceInfo(event) {
  return lineClient.replyMessage({
    replyToken: event.replyToken,
    messages: [buildServicesFlex(LANDING_PAGE_URL)],
  });
}

async function replyContactAdmin(event) {
  // Reply first — it's on a short-lived replyToken. The profile lookup and
  // admin notification don't have that constraint, so they run after.
  await lineClient.replyMessage({
    replyToken: event.replyToken,
    messages: [buildContactAdminFlex()],
  });

  if (!ADMIN_GROUP_ID) return;

  const userId = event.source.userId;
  let displayName = userId;
  try {
    const profile = await lineClient.getProfile(userId);
    displayName = profile.displayName;
  } catch {
    // profile lookup can fail if the user hasn't added the OA as a friend
  }

  await lineClient.pushMessage({
    to: ADMIN_GROUP_ID,
    messages: [
      {
        type: 'text',
        text: `🔔 ลูกค้าต้องการติดต่อแอดมิน\nชื่อ: ${displayName}\nuserId: ${userId}`,
      },
    ],
  });
}

// The rich menu was built with LINE OA Manager's built-in editor, which
// only offers "text" actions (not postback) per area. B/D are wired to
// send one of these exact strings, so we match on message text instead.
// (A and C are plain links, handled entirely by LINE — never hit here.)
const TEXT_TRIGGERS = {
  'เกี่ยวกับ HorCare': replyServiceInfo,
  'บริการของเรา': replyServiceInfo, // keep old one just in case
  'ติดต่อแอดมิน': replyContactAdmin,
  'ตรวจสอบอายุแพ็กเกจ': replyPackageExpiry,
  'ต่ออายุแพ็กเกจ': replyRenewPackage,
  'สมัคร': replyRegister,
};

const PLAN_PRICES = {
    small:  { monthly: 79,  yearly: 790  },
    medium: { monthly: 199, yearly: 1990 },
    large:  { monthly: 399, yearly: 2590 },
};

function parseLicense(license) {
    if (!license) return null;
    const match = license.match(/^(monthly|yearly)_(small|medium|large)$/);
    if (!match) return null;
    return { cycle: match[1], plan: match[2] };
}

async function replyRenewPackage(event) {
  const userId = event.source.userId;
  const snapshot = await db.collection('users').where('line_support_user_id', '==', userId).limit(1).get();
  
  if (snapshot.empty) {
    return lineClient.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: 'คุณยังไม่ได้ผูกบัญชีครับ กรุณาคัดลอก Owner ID จากหน้าตั้งค่ามาส่งในแชทนี้ก่อนครับ' }],
    });
  }

  const userData = snapshot.docs[0].data();
  const license = userData.license;

  if (license === 'free' || !license) {
    return lineClient.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: 'คุณกำลังใช้งานแพ็กเกจ Free หรือไม่พบข้อมูลแพ็กเกจครับ หากต้องการสมัครแพ็กเกจ พิมพ์ "สมัคร" หรือ "ติดต่อแอดมิน" ได้เลยครับ' }],
    });
  }

  const parsed = parseLicense(license);
  if (!parsed) {
    return lineClient.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: 'แพ็กเกจของคุณเป็นแบบพิเศษ (เช่น Life-time) กรุณาติดต่อแอดมินหากต้องการความช่วยเหลือครับ' }],
    });
  }

  const price = PLAN_PRICES[parsed.plan]?.[parsed.cycle];
  const planName = parsed.plan === 'small' ? 'Start' : parsed.plan === 'medium' ? 'Plus' : 'Pro';
  const cycleName = parsed.cycle === 'monthly' ? 'รายเดือน' : 'รายปี';

  if (!price) {
    return lineClient.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: 'ไม่พบราคาสําหรับแพ็กเกจของคุณ กรุณาติดต่อแอดมินครับ' }],
    });
  }

  const promptPayNumber = '0909419589';
  const qrUrl = `https://promptpay.io/${promptPayNumber}/${price}.png`;

  return lineClient.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text: `คุณต้องการต่ออายุแพ็กเกจ ${planName} ${cycleName}\nยอดชำระ: ${price} บาท\n\nสามารถสแกน QR Code ด้านล่าง หรือโอนเงินเข้าบัญชี:\nพร้อมเพย์: ${promptPayNumber}\nชื่อบัญชี: HorCare Mr.Sakdidech Prommarin\n\nเมื่อโอนเงินเรียบร้อยแล้ว กรุณาส่งสแนปหน้าจอ (สลิป) มาที่แชทนี้ได้เลยครับ`,
      },
      {
        type: 'image',
        originalContentUrl: qrUrl,
        previewImageUrl: qrUrl
      }
    ]
  });
}

function replyRegister(event) {
  return lineClient.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: 'text', text: 'หากสนใจสมัครแพ็กเกจ กรุณาติดต่อแอดมินผ่านเมนู "ติดต่อแอดมิน" เพื่อรับคำแนะนำแพ็กเกจที่เหมาะสมกับคุณครับ' }]
  });
}

async function replyPackageExpiry(event) {
  const userId = event.source.userId;
  
  // Find the user by their line_support_user_id
  const snapshot = await db.collection('users').where('line_support_user_id', '==', userId).limit(1).get();
  
  if (snapshot.empty) {
    return lineClient.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: 'คุณยังไม่ได้ผูกบัญชีครับ กรุณาคัดลอก Owner ID จากหน้าตั้งค่าของระบบมาส่งในแชทนี้เพื่อผูกบัญชีก่อนครับ' }],
    });
  }

  const userData = snapshot.docs[0].data();
  const accessUntil = userData.access_until;

  if (!accessUntil) {
    return lineClient.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: 'ไม่พบข้อมูลแพ็กเกจของคุณครับ กรุณาติดต่อแอดมิน' }],
    });
  }

  const daysRemaining = Math.ceil((accessUntil - Date.now()) / (1000 * 60 * 60 * 24));
  let text = '';
  
  if (daysRemaining > 0) {
    text = `✅ แพ็กเกจของคุณยังใช้งานได้ตามปกติ\nเหลืออายุการใช้งานอีก ${daysRemaining} วันครับ`;
  } else {
    text = `❌ แพ็กเกจของคุณหมดอายุแล้วครับ\nกรุณาต่ออายุเพื่อใช้งานระบบได้อย่างต่อเนื่องครับ`;
  }

  return lineClient.replyMessage({
    replyToken: event.replyToken,
    messages: [{
      type: 'text',
      text,
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: 'ต่ออายุแพ็กเกจ',
              text: 'ต่ออายุแพ็กเกจ'
            }
          }
        ]
      }
    }],
  });
}

export async function handleMessage(event) {
  if (event.message.type === 'image') {
    const userId = event.source.userId;
    const snapshot = await db.collection('users').where('line_support_user_id', '==', userId).limit(1).get();
    if (snapshot.empty) return null; // Only accept images from linked users

    const userData = snapshot.docs[0].data();
    const ownerId = snapshot.docs[0].id;
    const email = userData.email || 'ไม่ทราบอีเมล';
    const license = userData.license || 'free';

    try {
      // 1. Get image from LINE
      const stream = await lineClient.getMessageContent(event.message.id);
      const chunks = [];
      for await (const chunk of stream) chunks.push(chunk);
      const buffer = Buffer.concat(chunks);

      // 2. Send to Telegram
      const token = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      
      if (token && chatId) {
        const caption = `🧾 แจ้งเตือนการโอนเงินต่ออายุ\nOwner ID: ${ownerId}\nEmail: ${email}\nแพ็กเกจปัจจุบัน: ${license}`;
        
        const boundary = '----TelegramFormBoundary';
        const header = Buffer.from(
          `--${boundary}\r\n` +
          `Content-Disposition: form-data; name="chat_id"\r\n\r\n${chatId}\r\n` +
          `--${boundary}\r\n` +
          `Content-Disposition: form-data; name="caption"\r\n\r\n${caption}\r\n` +
          `--${boundary}\r\n` +
          `Content-Disposition: form-data; name="photo"; filename="slip.jpg"\r\n` +
          `Content-Type: image/jpeg\r\n\r\n`
        );
        const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
        const body = Buffer.concat([header, buffer, footer]);

        const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
          method: 'POST',
          headers: {
            'Content-Type': `multipart/form-data; boundary=${boundary}`
          },
          body: body
        });
        
        if (!res.ok) console.error('Telegram error:', await res.text());
      } else {
        console.warn('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set');
      }

      // 3. Reply to user
      return lineClient.replyMessage({
        replyToken: event.replyToken,
        messages: [{ type: 'text', text: '✅ แอดมินได้รับสลิปแล้ว จะรีบดำเนินการตรวจสอบและต่ออายุให้เร็วที่สุดครับ' }]
      });
    } catch (err) {
      console.error('Image handling failed', err);
      return lineClient.replyMessage({
        replyToken: event.replyToken,
        messages: [{ type: 'text', text: 'ขออภัยครับ เกิดข้อผิดพลาดในการรับสลิป กรุณาลองใหม่อีกครั้ง หรือติดต่อแอดมินโดยตรงครับ' }]
      });
    }
  }

  if (event.message.type !== 'text') return null;

  const text = event.message.text.trim();

  // Handle Owner ID binding (Firebase UID is usually 28 characters)
  if (text.length === 28) {
    const userRef = db.collection('users').doc(text);
    const userSnap = await userRef.get();
    
    if (userSnap.exists) {
        await userRef.update({
            line_support_user_id: event.source.userId
        });
        
        return lineClient.replyMessage({
            replyToken: event.replyToken,
            messages: [{
                type: 'text',
                text: '✅ ยืนยันตัวตนสำเร็จ!\nบัญชีของคุณถูกเชื่อมต่อกับ LINE Support แล้ว หลังจากนี้คุณจะได้รับการแจ้งเตือนสำคัญผ่านแชทนี้ครับ'
            }],
        });
    }
  }

  const handler = TEXT_TRIGGERS[text];
  if (!handler) return null; // let admins handle free-form chat manually

  return handler(event);
}

export async function handleFollow(event) {
  return lineClient.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text: 'ยินดีต้อนรับสู่ HorCare Support 👋\nแตะเมนูด้านล่างเพื่อดูบริการ เข้าใช้งานระบบ หรือติดต่อแอดมินได้เลยค่ะ',
      },
    ],
  });
}
