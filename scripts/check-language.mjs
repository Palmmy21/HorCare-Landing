import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, stat, mkdir } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
import puppeteer from 'puppeteer'
import { ARTICLES } from '../src/data/articles.js'

const root = resolve('dist')
const server = createServer(async (req, res) => {
  try {
    let file = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname))
    if (!file.startsWith(root + '/') && !file.startsWith(root + '\\') && file !== root) throw Error('Invalid path')
    try { if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html') } catch { file = resolve(root, '404.html') }
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.woff2': 'font/woff2' }
    res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream')
    res.end(await readFile(file))
  } catch { res.writeHead(404).end() }
})
await new Promise(done => server.listen(0, '127.0.0.1', done))
const base = `http://127.0.0.1:${server.address().port}`
const browser = await puppeteer.launch({ headless: true })
try {
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.setViewport({width:1440,height:1000})
  await page.goto(base)
  await page.waitForSelector('[aria-label="English"]')
  assert.equal(await page.$eval('html', e=>e.lang),'th')
  await page.click('[aria-label="English"]')
  await page.waitForFunction(()=>document.documentElement.lang==='en')
  await mkdir('artifacts/language',{recursive:true})
  await page.screenshot({path:'artifacts/language/desktop-en.png',fullPage:true})
  const routes=['/','/calculator','/blog',...ARTICLES.map(a=>'/blog/'+a.slug),'/privacy','/terms','/missing-page']
  for (const route of routes) {
    await page.goto(base+route)
    await page.waitForFunction(()=>document.documentElement.lang==='en')
    const remaining=await page.$eval('main',e=>e.innerText.split('\n').filter(s=>/[\u0e01-\u0e3a\u0e40-\u0e5b]/.test(s)))
    assert.deepEqual(remaining,[],`Untranslated copy on ${route}`)
    assert.ok(!/[\u0e01-\u0e3a\u0e40-\u0e5b]/.test(await page.title()), `Untranslated title on ${route}`)
  }
  await page.goto(base+'/calculator')
  await page.waitForFunction(()=>document.documentElement.lang==='en')
  const inputs=await page.$$('input')
  await inputs[3].click({clickCount:3}); await inputs[3].type('50')
  const total=await page.$eval('.grand-total strong',e=>e.textContent)
  assert.equal(total,'฿3,400.00')
  await page.click('[aria-label="ภาษาไทย"]')
  await page.waitForFunction(()=>document.documentElement.lang==='th')
  assert.equal(await page.$eval('.grand-total strong',e=>e.textContent),total)
  await page.click('[aria-label="English"]')
  for (const width of [1440,1024,820,390,320]) {
    await page.setViewport({width,height:900})
    for (const route of ['/','/calculator','/blog','/privacy','/terms']) {
      await page.goto(base+route)
      await page.waitForFunction(()=>document.documentElement.lang==='en')
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),`Overflow at ${width}: ${route}`)
    }
  }
  await page.setViewport({width:390,height:844})
  await page.goto(base)
  await page.waitForFunction(()=>document.documentElement.lang==='en')
  await page.screenshot({path:'artifacts/language/mobile-en.png',fullPage:true})
  await page.click('.menu-toggle')
  await page.click('#main-navigation a[href="/blog"]')
  await page.waitForSelector('.blog-filter')
  assert.equal(await page.$eval('.menu-toggle',e=>e.getAttribute('aria-expanded')),'false')
  await page.click('[aria-label="ภาษาไทย"]')
  await page.reload()
  await page.waitForFunction(()=>document.documentElement.lang==='th')
  assert.equal(await page.$eval('.language-switch button[aria-pressed="true"]',e=>e.textContent),'TH')
  assert.deepEqual(errors,[])
  console.log('Language checks passed: all routes, metadata, persistence, calculator state, mobile menu, and five viewport widths.')
} finally { await browser.close(); server.close() }
