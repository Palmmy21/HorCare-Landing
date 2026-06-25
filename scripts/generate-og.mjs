/**
 * สร้าง og-image.png จาก og-image-template.html
 * รัน: node scripts/generate-og.mjs
 * ต้องติดตั้ง: npm install -D puppeteer
 */

import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const TEMPLATE = resolve(ROOT, 'public', 'og-image-template.html')
const OUTPUT   = resolve(ROOT, 'public', 'og-image.png')

async function generate() {
  let puppeteer
  try {
    puppeteer = await import('puppeteer')
  } catch {
    console.error('❌  ยังไม่ได้ติดตั้ง puppeteer — รัน: npm install -D puppeteer')
    process.exit(1)
  }

  const browser = await puppeteer.default.launch({ headless: 'new' })
  const page    = await browser.newPage()

  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
  await page.goto(`file://${TEMPLATE}`, { waitUntil: 'networkidle0' })

  // รอ font โหลด
  await page.evaluateHandle('document.fonts.ready')

  await page.screenshot({ path: OUTPUT, type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } })
  await browser.close()

  console.log(`✅  บันทึก og-image.png ที่ ${OUTPUT}`)
}

generate().catch(err => { console.error(err); process.exit(1) })
