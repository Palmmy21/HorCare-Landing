// Pulls the real platform totals that the landing page shows as social proof, and writes src/data/proof.json.
// Read-only: it runs Firestore aggregation queries (count / sum) and never touches a document.
//
//   FIREBASE_SERVICE_ACCOUNT='{"type":"service_account",...}' node scripts/fetch-proof-stats.mjs
//   (or GOOGLE_APPLICATION_CREDENTIALS=path/to/key.json node scripts/fetch-proof-stats.mjs)
//
// Run it before each deploy, check the numbers, then commit proof.json.
import admin from 'firebase-admin'
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/proof.json')

const raw = process.env.FIREBASE_SERVICE_ACCOUNT
admin.initializeApp(raw ? { credential: admin.credential.cert(JSON.parse(raw)) } : undefined)
const db = admin.firestore()
const { count, sum } = admin.firestore.AggregateField

// Bills live at users/{uid}/buildings/{bid}/bills; only saved (issued) bills count.
const issued = db.collectionGroup('bills').where('is_saved', '==', true)
const [bills, rooms, buildings] = await Promise.all([
  issued.aggregate({ n: count(), billed: sum('total_bill'), collected: sum('paid_amount') }).get(),
  db.collectionGroup('rooms').count().get(),
  db.collectionGroup('buildings').count().get(),
])

const b = bills.data()
const stats = {
  asOf: new Date().toISOString().slice(0, 10),
  bills: b.n,
  billedBaht: Math.round(b.billed ?? 0),
  collectedBaht: Math.round(b.collected ?? 0),
  rooms: rooms.data().count,
  buildings: buildings.data().count,
}
writeFileSync(OUT, JSON.stringify(stats, null, 2) + '\n')
console.table(stats)
console.log('Wrote', OUT, '— review the numbers before committing.')
