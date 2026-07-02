import { validateSignature } from '@line/bot-sdk';
import { handlePostback, handleMessage, handleFollow } from '../lib/line/postback.js';

// Vercel's Node.js runtime only auto-parses req.body if you touch it;
// reading the raw stream ourselves keeps the exact bytes LINE signed.
export const config = {
  api: {
    bodyParser: false,
  },
};

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const rawBody = await readRawBody(req);
  const signature = req.headers['x-line-signature'];

  if (!signature || !validateSignature(rawBody, process.env.LINE_CHANNEL_SECRET, signature)) {
    res.status(401).send('invalid signature');
    return;
  }

  const body = JSON.parse(rawBody.toString('utf-8'));

  // Ack LINE right away; keep processing in the same invocation so Vercel
  // doesn't freeze it before the flex replies / admin push go out.
  res.status(200).end();

  await Promise.all((body.events || []).map(handleEvent));
}

async function handleEvent(event) {
  try {
    switch (event.type) {
      case 'postback':
        return await handlePostback(event);
      case 'message':
        return await handleMessage(event);
      case 'follow':
        return await handleFollow(event);
      default:
        return null;
    }
  } catch (err) {
    console.error('Failed to handle LINE event', err?.message, JSON.stringify(err?.originalError?.response?.data));
    return null;
  }
}
