/**
 * Static Site Generation (SSG)
 * รันอัตโนมัติหลัง `vite build` ผ่าน postbuild hook
 *
 * สิ่งที่ทำ:
 *   1. Build SSR bundle จาก entry-server.jsx
 *   2. Render แต่ละ route เป็น HTML string
 *   3. Inject เข้า dist/index.html template
 *   4. บันทึก dist/index.html, dist/privacy/index.html, dist/terms/index.html
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

const ROUTES = [
  { path: '/',            out: 'index.html'              },
  { path: '/privacy',     out: 'privacy/index.html'      },
  { path: '/terms',       out: 'terms/index.html'        },
  { path: '/calculator',  out: 'calculator/index.html'   },
]

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
for (const { path, out } of ROUTES) {
  const appHtml = render(path)
  const html    = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  )
  const outPath = resolve(DIST, out)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, html, 'utf-8')
  console.log(`   ✅  ${path.padEnd(12)} → dist/${out}`)
}

// ── 4. Cleanup ────────────────────────────────────────────────────────────────
rmSync(DIST_SSR, { recursive: true, force: true })
console.log('\n🎉  SSG complete — Google crawlers now see full HTML!\n')
