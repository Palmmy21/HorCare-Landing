// One-off script: creates the rich menu, uploads its image, and sets it
// as the default menu for everyone. Re-run whenever the image or layout
// changes (LINE has no "update areas in place" — delete + recreate).
//
// Usage (loads env vars from .env via Node's built-in flag):
//   node --env-file=.env scripts/setup-richmenu.mjs path/to/richmenu-2500x1686.png
import fs from 'node:fs';
import { messagingApi } from '@line/bot-sdk';

const lineClient = new messagingApi.MessagingApiClient({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
});
const lineBlobClient = new messagingApi.MessagingApiBlobClient({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
});

const LANDING_PAGE_URL = process.env.LANDING_PAGE_URL;

// Canvas is the LINE "large" size: 2500x1686.
// Layout matches the mock: A spans the top ~60%, B/C/D split the bottom
// ~40% into three equal columns. Adjust to match your final artwork.
const WIDTH = 2500;
const HEIGHT = 1686;
const TOP_HEIGHT = 1010; // area A
const BOTTOM_HEIGHT = HEIGHT - TOP_HEIGHT;
const COL_WIDTH = Math.floor(WIDTH / 3);

const richMenuPayload = {
  size: { width: WIDTH, height: HEIGHT },
  selected: true,
  name: 'HorCare Support',
  chatBarText: 'เมนู',
  areas: [
    {
      // A - landing page, no webhook round trip needed
      bounds: { x: 0, y: 0, width: WIDTH, height: TOP_HEIGHT },
      action: { type: 'uri', label: 'landing', uri: LANDING_PAGE_URL },
    },
    {
      // B - บริการของเรา
      bounds: { x: 0, y: TOP_HEIGHT, width: COL_WIDTH, height: BOTTOM_HEIGHT },
      action: { type: 'postback', label: 'บริการของเรา', data: 'action=service_info', displayText: 'บริการของเรา' },
    },
    {
      // C - โปรโมชั่น/คูปอง
      bounds: { x: COL_WIDTH, y: TOP_HEIGHT, width: COL_WIDTH, height: BOTTOM_HEIGHT },
      action: { type: 'postback', label: 'โปรโมชั่น', data: 'action=promotion', displayText: 'โปรโมชั่น' },
    },
    {
      // D - ติดต่อแอดมิน
      bounds: { x: COL_WIDTH * 2, y: TOP_HEIGHT, width: WIDTH - COL_WIDTH * 2, height: BOTTOM_HEIGHT },
      action: { type: 'postback', label: 'ติดต่อแอดมิน', data: 'action=contact_admin', displayText: 'ติดต่อแอดมิน' },
    },
  ],
};

async function main() {
  const imagePath = process.argv[2];
  if (!imagePath) {
    console.error('Usage: node --env-file=.env scripts/setup-richmenu.mjs <path-to-image.png>');
    process.exit(1);
  }

  const { richMenuId } = await lineClient.createRichMenu(richMenuPayload);
  console.log('Created rich menu:', richMenuId);

  const imageBuffer = fs.readFileSync(imagePath);
  const blob = new Blob([imageBuffer], {
    type: imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg',
  });
  await lineBlobClient.setRichMenuImage(richMenuId, blob);
  console.log('Uploaded image');

  await lineClient.setDefaultRichMenu(richMenuId);
  console.log('Set as default rich menu for all users');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
