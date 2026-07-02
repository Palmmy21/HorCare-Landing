import { lineClient } from './client.js';
import { buildServicesFlex } from './flex/services.js';
import { buildPromotionFlex } from './flex/promotion.js';

const LANDING_PAGE_URL = process.env.LANDING_PAGE_URL;
const ADMIN_GROUP_ID = process.env.ADMIN_GROUP_ID;
const ADMIN_PHONE = process.env.ADMIN_PHONE;
const ADMIN_LINE_ID = process.env.ADMIN_LINE_ID;

// event.postback.data on rich menu areas is set to one of these when the
// rich menu is created (see scripts/setup-richmenu.js):
//   action=service_info   -> area B
//   action=promotion      -> area C
//   action=contact_admin  -> area D
// (area A is a plain "uri" action straight to the landing page, so LINE
// never sends it to the webhook at all.)
export async function handlePostback(event) {
  const params = new URLSearchParams(event.postback.data);
  const action = params.get('action');

  switch (action) {
    case 'service_info':
      return replyServiceInfo(event);
    case 'promotion':
      return replyPromotion(event);
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

function replyPromotion(event) {
  return lineClient.replyMessage({
    replyToken: event.replyToken,
    messages: [buildPromotionFlex(LANDING_PAGE_URL)],
  });
}

async function replyContactAdmin(event) {
  const userId = event.source.userId;
  let displayName = userId;
  try {
    const profile = await lineClient.getProfile(userId);
    displayName = profile.displayName;
  } catch {
    // profile lookup can fail if the user hasn't added the OA as a friend
  }

  await lineClient.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text:
          `ทีมงาน HorCare ได้รับข้อความของคุณแล้ว แอดมินจะติดต่อกลับโดยเร็วที่สุดค่ะ 🙏\n\n` +
          `ติดต่อด่วน โทร ${ADMIN_PHONE}\nหรือแอด LINE ${ADMIN_LINE_ID}`,
      },
    ],
  });

  if (ADMIN_GROUP_ID) {
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
}

// The rich menu was built with LINE OA Manager's built-in editor, which
// only offers "text" actions (not postback) per area. B/C/D are wired to
// send one of these exact strings, so we match on message text instead.
const TEXT_TRIGGERS = {
  บริการของเรา: replyServiceInfo,
  โปรโมชั่น: replyPromotion,
  ติดต่อแอดมิน: replyContactAdmin,
};

export async function handleMessage(event) {
  if (event.message.type !== 'text') return null;

  const handler = TEXT_TRIGGERS[event.message.text.trim()];
  if (!handler) return null; // let admins handle free-form chat manually

  return handler(event);
}

export async function handleFollow(event) {
  return lineClient.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text: 'ยินดีต้อนรับสู่ HorCare Support 👋\nแตะเมนูด้านล่างเพื่อดูบริการ โปรโมชั่น หรือติดต่อแอดมินได้เลยค่ะ',
      },
    ],
  });
}
