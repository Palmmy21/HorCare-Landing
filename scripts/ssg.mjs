/**
 * Static Site Generation (SSG)
 * รันอัตโนมัติหลัง `vite build` ผ่าน postbuild hook
 *
 * สิ่งที่ทำ:
 *   1. Build SSR bundle จาก entry-server.jsx
 *   2. Render แต่ละ route เป็น HTML string
 *   3. Inject เข้า dist/index.html template พร้อม per-page meta
 *   4. บันทึก dist/index.html, dist/privacy/index.html, dist/terms/index.html, dist/calculator/index.html
 *   5. ลบ SSR bundle ชั่วคราว
 */

import { build } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT       = resolve(__dirname, '..')
const DIST       = resolve(ROOT, 'dist')
const DIST_SSR   = resolve(ROOT, '.ssr-tmp')
const TEMPLATE   = resolve(DIST, 'index.html')
const ENTRY      = resolve(ROOT, 'src', 'entry-server.jsx')
const BASE_URL   = 'https://horcare-landing.vercel.app'

const ROUTES = [
  {
    path: '/',
    out: 'index.html',
  },
  {
    path: '/calculator',
    out: 'calculator/index.html',
    title: 'คำนวณค่าน้ำค่าไฟหอพัก ฟรี — HorCare | เครื่องคำนวณออนไลน์',
    description: 'คำนวณค่าน้ำค่าไฟห้องพักได้ทันทีฟรี ไม่ต้องสมัครสมาชิก รองรับการคำนวณตามมิเตอร์แยกรายห้อง อัตราค่าไฟตาม กกพ. และค่าน้ำตามการประปา',
    ogTitle: 'คำนวณค่าน้ำค่าไฟหอพัก ฟรี — HorCare',
    ogDescription: 'เครื่องคำนวณค่าน้ำค่าไฟห้องพักออนไลน์ฟรี รองรับการคำนวณตามมิเตอร์แยกรายห้อง',
  },
  {
    path: '/privacy',
    out: 'privacy/index.html',
    title: 'นโยบายความเป็นส่วนตัว — HorCare ระบบจัดการหอพัก',
    description: 'นโยบายความเป็นส่วนตัวของ HorCare ระบบจัดการหอพักออนไลน์ ครอบคลุมการเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของผู้ใช้บริการ',
    ogTitle: 'นโยบายความเป็นส่วนตัว — HorCare',
    ogDescription: 'นโยบายความเป็นส่วนตัวของ HorCare ระบบจัดการหอพักออนไลน์',
  },
  {
    path: '/terms',
    out: 'terms/index.html',
    title: 'ข้อกำหนดการใช้งาน — HorCare ระบบจัดการหอพัก',
    description: 'ข้อกำหนดและเงื่อนไขการใช้บริการ HorCare ระบบจัดการหอพักออนไลน์ กรุณาอ่านก่อนใช้งาน',
    ogTitle: 'ข้อกำหนดการใช้งาน — HorCare',
    ogDescription: 'ข้อกำหนดและเงื่อนไขการใช้บริการ HorCare ระบบจัดการหอพักออนไลน์',
  },
]

function injectPageMeta(html, route) {
  if (!route.title) return html

  const canonical = `${BASE_URL}${route.path}`

  return html
    .replace(
      /<title>.*?<\/title>/,
      `<title>${route.title}</title>`
    )
    .replace(
      /<meta name="description" content=".*?"\s*\/>/,
      `<meta name="description" content="${route.description}" />`
    )
    .replace(
      /<link rel="canonical" href=".*?"\s*\/>/,
      `<link rel="canonical" href="${canonical}" />`
    )
    .replace(
      /<link rel="alternate" hreflang="th" href=".*?"\s*\/>/,
      `<link rel="alternate" hreflang="th" href="${canonical}" />`
    )
    .replace(
      /<link rel="alternate" hreflang="x-default" href=".*?"\s*\/>/,
      `<link rel="alternate" hreflang="x-default" href="${canonical}" />`
    )
    .replace(
      /<meta property="og:url" content=".*?"\s*\/>/,
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      /<meta property="og:title" content=".*?"\s*\/>/,
      `<meta property="og:title" content="${route.ogTitle}" />`
    )
    .replace(
      /<meta property="og:description" content=".*?"\s*\/>/,
      `<meta property="og:description" content="${route.ogDescription}" />`
    )
    .replace(
      /<meta name="twitter:title" content=".*?"\s*\/>/,
      `<meta name="twitter:title" content="${route.ogTitle}" />`
    )
    .replace(
      /<meta name="twitter:description" content=".*?"\s*\/>/,
      `<meta name="twitter:description" content="${route.ogDescription}" />`
    )
}

// ── 1. Build SSR bundle ────────────────────────────────────────────────────────
console.log('\n🔧  Building SSR bundle…')
await build({
  configFile: false,
  plugins: [react()],
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    ssr: ENTRY,
    outDir: DIST_SSR,
    rollupOptions: { output: { format: 'es', entryFileNames: 'entry.mjs' } },
  },
  ssr: { noExternal: true },
  logLevel: 'warn',
})

// ── 2. Load template & render function ────────────────────────────────────────
const template = readFileSync(TEMPLATE, 'utf-8')
const { render } = await import(pathToFileURL(resolve(DIST_SSR, 'entry.mjs')).href)

// ── 3. Render each route ──────────────────────────────────────────────────────
console.log('🌐  Pre-rendering routes…')
for (const route of ROUTES) {
  const appHtml = render(route.path)
  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  )
  html = injectPageMeta(html, route)
  const outPath = resolve(DIST, route.out)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, html, 'utf-8')
  console.log(`   ✅  ${route.path.padEnd(12)} → dist/${route.out}`)
}

// ── 4. Cleanup ────────────────────────────────────────────────────────────────
rmSync(DIST_SSR, { recursive: true, force: true })
console.log('\n🎉  SSG complete — Google crawlers now see full HTML!\n')
