import { lineClient, lineBlobClient } from './client.js';
import { buildServicesFlex } from './flex/services.js';
import { buildContactAdminFlex } from './flex/contactAdmin.js';
import { buildPackagesFlex } from './flex/packages.js';
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
const PROMPTPAY_NUMBER = '0909419589';
const PROMPTPAY_NAME = 'HorCare Mr.Sakdidech Prommarin';

// ── Plan config ──────────────────────────────────────────────────────────────
const PLAN_PRICES = {
    small:  { monthly: 79,  yearly: 790  },
    medium: { monthly: 199, yearly: 1190 },
    large:  { monthly: 299, yearly: 1990 },
};

const PLAN_DISPLAY = {
    small:  'Start',
    medium: 'Plus',
    large:  'Pro',
};

// Reverse lookup: 'Start' → 'small'
const PLAN_KEY = Object.fromEntries(
    Object.entries(PLAN_DISPLAY).map(([k, v]) => [v, k])
);

function parseLicense(license) {
    if (!license) return null;
    const match = license.match(/^(monthly|yearly)_(small|medium|large)$/);
    if (!match) return null;
    return { cycle: match[1], plan: match[2] };
}

// ── Rich Menu postback handlers ──────────────────────────────────────────────
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

// ── Text triggers ────────────────────────────────────────────────────────────
const TEXT_TRIGGERS = {
  'เกี่ยวกับ HorCare': replyServiceInfo,
  'บริการของเรา': replyServiceInfo,
  'ติดต่อแอดมิน': replyContactAdmin,

  // Consolidated package command
  'ตรวจสอบแพ็กเกจ': replyCheckPackage,
  'ตรวจสอบอายุแพ็กเกจ': replyCheckPackage,  // backward compat
  'สมัคร': replyCheckPackage,                // redirect

  // Package selection triggers (monthly)
  'สมัคร Start รายเดือน': (e) => replyPackageQR(e, 'small', 'monthly'),
  'สมัคร Plus รายเดือน':  (e) => replyPackageQR(e, 'medium', 'monthly'),
  'สมัคร Pro รายเดือน':   (e) => replyPackageQR(e, 'large', 'monthly'),

  // Package selection triggers (yearly)
  'สมัคร Start รายปี': (e) => replyPackageQR(e, 'small', 'yearly'),
  'สมัคร Plus รายปี':  (e) => replyPackageQR(e, 'medium', 'yearly'),
  'สมัคร Pro รายปี':   (e) => replyPackageQR(e, 'large', 'yearly'),

  // Renew current package
  'ต่ออายุแพ็กเกจ': replyRenewPackage,
  'เปลี่ยนแพ็กเกจ': replyChangePackage,
};

// ── Smart "ตรวจสอบแพ็กเกจ" ──────────────────────────────────────────────────
async function replyCheckPackage(event) {
  const userId = event.source.userId;
  const snapshot = await db.collection('users')
    .where('line_support_user_id', '==', userId).limit(1).get();

  // Case 1: No Owner ID linked → ask for it + show prices
  if (snapshot.empty) {
    return lineClient.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: 'text',
          text: '📌 คุณยังไม่ได้ผูกบัญชีครับ\n\nกรุณาส่ง Owner ID ของคุณมาในแชทนี้ก่อนนะครับ\n\n🔍 Owner ID อยู่ตรงไหน?\n1. เปิดแอป HorCare\n2. ไปที่ "ตั้งค่า" (ไอคอนเกียร์)\n3. เลือกแท็บ "บัญชีผู้ใช้"\n4. กดคัดลอก Owner ID แล้วส่งมาที่นี่\n\nระหว่างรอ ดูแพ็กเกจของเราได้เลยครับ 👇'
        },
        buildPackagesFlex(),
      ],
    });
  }

  const userData = snapshot.docs[0].data();
  const license = userData.license;

  // Case 2: Free or no license → show packages to upgrade
  if (license === 'free' || !license) {
    return lineClient.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: 'text',
          text: '📦 คุณกำลังใช้งานแพ็กเกจ Free อยู่ครับ\n\nอัปเกรดเพื่อใช้ฟีเจอร์เต็มรูปแบบ เช่น แจ้งเตือนผ่าน LINE, ออกบิลอัตโนมัติ, รับสลิปจ่ายเงิน และอื่นๆ\n\nเลือกแพ็กเกจที่เหมาะกับคุณได้เลยครับ 👇'
        },
        buildPackagesFlex(),
      ],
    });
  }

  // Case 3: Paid license → show status
  const parsed = parseLicense(license);
  const accessUntil = userData.access_until;

  if (!parsed) {
    // Special license (e.g., life-time)
    const daysText = accessUntil
      ? `\nเหลืออายุการใช้งาน: ${Math.max(0, Math.ceil((accessUntil - Date.now()) / (1000 * 60 * 60 * 24)))} วัน`
      : '';
    return lineClient.replyMessage({
      replyToken: event.replyToken,
      messages: [{
        type: 'text',
        text: `📦 แพ็กเกจของคุณ: ${license}${daysText}\n\nแพ็กเกจนี้เป็นแบบพิเศษ หากต้องการความช่วยเหลือ กรุณาติดต่อแอดมินครับ`,
      }],
    });
  }

  const planName = PLAN_DISPLAY[parsed.plan] || parsed.plan;
  const cycleName = parsed.cycle === 'monthly' ? 'รายเดือน' : 'รายปี';
  const price = PLAN_PRICES[parsed.plan]?.[parsed.cycle] || '—';
  const daysRemaining = accessUntil
    ? Math.ceil((accessUntil - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  const expiryDate = accessUntil
    ? new Date(accessUntil).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—';

  let statusEmoji = '✅';
  let statusText = '';
  if (daysRemaining !== null) {
    if (daysRemaining <= 0) {
      statusEmoji = '❌';
      statusText = 'หมดอายุแล้ว';
    } else if (daysRemaining <= 7) {
      statusEmoji = '⚠️';
      statusText = `เหลืออีก ${daysRemaining} วัน (ใกล้หมดอายุ!)`;
    } else {
      statusText = `เหลืออีก ${daysRemaining} วัน`;
    }
  }

  return lineClient.replyMessage({
    replyToken: event.replyToken,
    messages: [{
      type: 'text',
      text: `${statusEmoji} สถานะแพ็กเกจของคุณ\n\n`
          + `📦 แพ็กเกจ: ${planName} (${cycleName})\n`
          + `💰 ราคา: ฿${price}\n`
          + `📅 หมดอายุ: ${expiryDate}\n`
          + `⏳ ${statusText}`,
      quickReply: {
        items: [
          {
            type: 'action',
            action: { type: 'message', label: '🔄 ต่ออายุแพ็กเกจ', text: 'ต่ออายุแพ็กเกจ' },
          },
          {
            type: 'action',
            action: { type: 'message', label: '📦 เปลี่ยนแพ็กเกจ', text: 'เปลี่ยนแพ็กเกจ' },
          },
        ],
      },
    }],
  });
}

// ── "เปลี่ยนแพ็กเกจ" → show all packages ─────────────────────────────────────
async function replyChangePackage(event) {
  return lineClient.replyMessage({
    replyToken: event.replyToken,
    messages: [
      { type: 'text', text: '📦 เลือกแพ็กเกจใหม่ที่เหมาะกับคุณได้เลยครับ 👇' },
      buildPackagesFlex(),
    ],
  });
}

// ── "ต่ออายุแพ็กเกจ" → renew current package ─────────────────────────────────
async function replyRenewPackage(event) {
  const userId = event.source.userId;
  const snapshot = await db.collection('users')
    .where('line_support_user_id', '==', userId).limit(1).get();

  if (snapshot.empty) {
    return lineClient.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: '📌 คุณยังไม่ได้ผูกบัญชีครับ กรุณาส่ง Owner ID มาก่อนนะครับ' }],
    });
  }

  const userData = snapshot.docs[0].data();
  const license = userData.license;

  if (license === 'free' || !license) {
    return lineClient.replyMessage({
      replyToken: event.replyToken,
      messages: [
        { type: 'text', text: '📦 คุณยังไม่มีแพ็กเกจ Paid เลือกแพ็กเกจที่ต้องการได้เลยครับ 👇' },
        buildPackagesFlex(),
      ],
    });
  }

  const parsed = parseLicense(license);
  if (!parsed) {
    return lineClient.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: '📦 แพ็กเกจของคุณเป็นแบบพิเศษ กรุณาติดต่อแอดมินครับ' }],
    });
  }

  return replyPackageQR(event, parsed.plan, parsed.cycle);
}

// ── Generate QR for a specific package ───────────────────────────────────────
async function replyPackageQR(event, planKey, cycle) {
  const userId = event.source.userId;
  const snapshot = await db.collection('users')
    .where('line_support_user_id', '==', userId).limit(1).get();

  // Must have Owner ID linked
  if (snapshot.empty) {
    return lineClient.replyMessage({
      replyToken: event.replyToken,
      messages: [{
        type: 'text',
        text: '📌 กรุณาส่ง Owner ID ของคุณมาก่อนเพื่อผูกบัญชีครับ\n\nOwner ID อยู่ที่: แอป HorCare → ตั้งค่า → บัญชีผู้ใช้',
      }],
    });
  }

  const price = PLAN_PRICES[planKey]?.[cycle];
  const planName = PLAN_DISPLAY[planKey] || planKey;
  const cycleName = cycle === 'monthly' ? 'รายเดือน' : 'รายปี';

  if (!price) {
    return lineClient.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: 'ไม่พบราคาสำหรับแพ็กเกจนี้ กรุณาติดต่อแอดมินครับ' }],
    });
  }

  // Store the selected package in a temporary field so slip handler knows what they're paying for
  const ownerId = snapshot.docs[0].id;
  await db.collection('users').doc(ownerId).update({
    _pending_package: `${cycle}_${planKey}`,
  });

  const qrUrl = `https://promptpay.io/${PROMPTPAY_NUMBER}/${price}.png`;

  return lineClient.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text: `💰 สมัครแพ็กเกจ ${planName} ${cycleName}\n\n`
            + `ยอดชำระ: ฿${price.toLocaleString()}\n\n`
            + `สแกน QR Code ด้านล่างเพื่อชำระเงิน\nหรือโอนเงินเข้าบัญชี:\n`
            + `พร้อมเพย์: ${PROMPTPAY_NUMBER}\n`
            + `ชื่อบัญชี: ${PROMPTPAY_NAME}\n\n`
            + `✅ เมื่อโอนเสร็จ ส่งสลิปมาในแชทนี้ได้เลยครับ`,
      },
      {
        type: 'image',
        originalContentUrl: qrUrl,
        previewImageUrl: qrUrl,
      },
    ],
  });
}

// ── Follow event (welcome message) ──────────────────────────────────────────
export async function handleFollow(event) {
  return lineClient.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text: '🏠 ยินดีต้อนรับสู่ HorCare Support! 👋\n\n'
            + 'เพื่อเริ่มต้นใช้งาน กรุณาส่ง Owner ID ของคุณมาในแชทนี้ครับ\n\n'
            + '📌 Owner ID อยู่ตรงไหน?\n'
            + '1. เปิดแอป HorCare\n'
            + '2. ไปที่ "ตั้งค่า" (ไอคอนเกียร์)\n'
            + '3. เลือกแท็บ "บัญชีผู้ใช้"\n'
            + '4. กดคัดลอก Owner ID แล้วส่งมาที่นี่ได้เลยครับ',
      },
    ],
  });
}

// ── Message handler ─────────────────────────────────────────────────────────
export async function handleMessage(event) {
  // ── Image handler (slip) ────────────────────────────────────────────────
  if (event.message.type === 'image') {
    const userId = event.source.userId;
    const snapshot = await db.collection('users')
      .where('line_support_user_id', '==', userId).limit(1).get();

    if (snapshot.empty) {
      return lineClient.replyMessage({
        replyToken: event.replyToken,
        messages: [{ type: 'text', text: '📌 กรุณาส่ง Owner ID มาก่อนเพื่อผูกบัญชี จากนั้นจึงส่งสลิปได้ครับ' }],
      });
    }

    const userData = snapshot.docs[0].data();
    const ownerId = snapshot.docs[0].id;
    const email = userData.email || 'ไม่ทราบอีเมล';
    const license = userData.license || 'free';
    const pendingPackage = userData._pending_package || null;

    try {
      // 1. Get image from LINE
      const stream = await lineBlobClient.getMessageContent(event.message.id);
      const chunks = [];
      for await (const chunk of stream) chunks.push(chunk);
      const buffer = Buffer.concat(chunks);

      // 2. Build caption with selected package info
      let caption = `🧾 แจ้งเตือนการชำระเงิน\nOwner ID: ${ownerId}\nEmail: ${email}\nแพ็กเกจปัจจุบัน: ${license}`;

      if (pendingPackage) {
        const parsed = parseLicense(pendingPackage);
        if (parsed) {
          const pName = PLAN_DISPLAY[parsed.plan] || parsed.plan;
          const cName = parsed.cycle === 'monthly' ? 'รายเดือน' : 'รายปี';
          const price = PLAN_PRICES[parsed.plan]?.[parsed.cycle] || '—';
          caption += `\nแพ็กเกจที่สมัคร: ${pName} ${cName} (฿${price})`;
          caption += `\nLicense key: ${pendingPackage}`;
        }
      }

      // 3. Send to Telegram
      const token = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (token && chatId) {
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
          headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
          body: body,
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error('Telegram error:', errorText);
          return lineClient.replyMessage({
            replyToken: event.replyToken,
            messages: [{ type: 'text', text: `⚠️ ไม่สามารถส่งสลิปไป Telegram ได้:\n${errorText}` }],
          });
        }
      } else {
        return lineClient.replyMessage({
          replyToken: event.replyToken,
          messages: [{ type: 'text', text: `⚠️ ตั้งค่า TELEGRAM_BOT_TOKEN หรือ TELEGRAM_CHAT_ID ใน Vercel ไม่ถูกต้องครับ` }],
        });
      }

      // 4. Reply to user
      return lineClient.replyMessage({
        replyToken: event.replyToken,
        messages: [{
          type: 'text',
          text: '✅ ได้รับสลิปเรียบร้อยแล้วครับ!\n\nแอดมินจะตรวจสอบและดำเนินการให้เร็วที่สุด โดยปกติไม่เกิน 30 นาทีครับ 🙏',
        }],
      });
    } catch (err) {
      console.error('Image handling failed', err);
      return lineClient.replyMessage({
        replyToken: event.replyToken,
        messages: [{ type: 'text', text: `ขออภัยครับ เกิดข้อผิดพลาดในการรับสลิป: ${err.toString()}` }],
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

        const userData = userSnap.data();
        const license = userData.license || 'free';
        const isPaid = license !== 'free' && license !== 'active';

        let welcomeBack = '✅ ผูกบัญชีสำเร็จ!\n\nบัญชีของคุณเชื่อมต่อกับ LINE Support แล้วครับ';

        if (isPaid) {
          welcomeBack += '\n\nพิมพ์ "ตรวจสอบแพ็กเกจ" เพื่อดูสถานะแพ็กเกจของคุณได้เลยครับ';
        } else {
          welcomeBack += '\n\nดูแพ็กเกจและสมัครได้เลยครับ 👇';
        }

        const messages = [{ type: 'text', text: welcomeBack }];
        if (!isPaid) messages.push(buildPackagesFlex());

        return lineClient.replyMessage({
            replyToken: event.replyToken,
            messages,
        });
    }
  }

  const handler = TEXT_TRIGGERS[text];
  if (!handler) return null; // let admins handle free-form chat manually

  return handler(event);
}
