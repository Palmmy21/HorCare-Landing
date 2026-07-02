import { lineClient } from './client.js';
import { buildServicesFlex } from './flex/services.js';
import { buildContactAdminFlex } from './flex/contactAdmin.js';

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
    messages: [buildContactAdminFlex()],
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
// only offers "text" actions (not postback) per area. B/D are wired to
// send one of these exact strings, so we match on message text instead.
// (A and C are plain links, handled entirely by LINE — never hit here.)
const TEXT_TRIGGERS = {
  บริการของเรา: replyServiceInfo,
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
        text: 'ยินดีต้อนรับสู่ HorCare Support 👋\nแตะเมนูด้านล่างเพื่อดูบริการ เข้าใช้งานระบบ หรือติดต่อแอดมินได้เลยค่ะ',
      },
    ],
  });
}
