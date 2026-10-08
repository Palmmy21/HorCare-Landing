import puppeteer from 'puppeteer'
import { mkdirSync, writeFileSync } from 'node:fs'
import assert from 'node:assert/strict'
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4174'
const out = '.impeccable/review'
const capture = process.env.CAPTURE === '1'
mkdirSync(out, { recursive: true })
const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.emulateMediaFeatures([
  { name: 'prefers-reduced-motion', value: 'reduce' },
])
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
const results = []
try {
  await page.setViewport({ width: 1440, height: 1000 })
  await page.goto(base, { waitUntil: 'networkidle0' })
  await page.evaluate(() => document.fonts.ready)
  if (capture)
    await page.screenshot({ path: out + '/desktop.png', fullPage: true })
  if (capture) await page.screenshot({ path: out + '/desktop-fold.png' })
  assert.equal(
    await page
      .locator('h1')
      .map((e) => e.textContent)
      .wait(),
    'อสังหาฯ เติบโตได้ชีวิตคุณ ก็ง่ายขึ้นได้',
  )
  assert.equal(
    await page.$eval('html', (e) => e.scrollWidth <= innerWidth),
    true,
  )
  await page.locator('.property-tabs button:nth-child(2)').click()
  assert.match(
    await page.$eval('.dash-heading', (e) => e.textContent),
    /City Living/,
  )
  await page.locator('.billing-toggle button:nth-child(2)').click()
  assert.match(
    await page.$eval('.plan-pro .price', (e) => e.textContent),
    /2,990/,
  )
  assert.match(
    await page.$eval('.plan-pro a', (e) => decodeURIComponent(e.href)),
    /รายปี/,
  )
  await page.locator('details:first-child summary').click()
  assert.equal(await page.$eval('details', (e) => e.open), true)
  results.push('Desktop: portfolio switch, annual pricing/CTA, FAQ pass')
  await page.setViewport({ width: 390, height: 844 })
  await page.goto(base, { waitUntil: 'networkidle0' })
  if (capture)
    await page.screenshot({ path: out + '/mobile.png', fullPage: true })
  if (capture) await page.screenshot({ path: out + '/mobile-fold.png' })
  assert.equal(
    await page.$eval('html', (e) => e.scrollWidth <= innerWidth),
    true,
  )
  await page.locator('.menu-toggle').click()
  assert.equal(
    await page.$eval('.menu-toggle', (e) => e.getAttribute('aria-expanded')),
    'true',
  )
  await page.keyboard.press('Escape')
  assert.equal(
    await page.$eval('.menu-toggle', (e) => e.getAttribute('aria-expanded')),
    'false',
  )
  results.push('Mobile: no horizontal overflow, menu and Escape pass')
  await page.goto(base + '/calculator/', { waitUntil: 'networkidle0' })
  await page.locator('.calc-panel:first-child input').fill('10')
  await page
    .locator('.calc-panel:nth-of-type(2) .field:nth-child(2) input')
    .fill('10')
  assert.match(
    await page.$eval('.room-total', (e) => e.textContent),
    /3,100.00/,
  )
  assert.match(
    await page.$eval('.grand-total', (e) => e.textContent),
    /3,100.00/,
  )
  await page.locator('.calculator-layout > div > button').click()
  assert.match(
    await page.$eval('.grand-total', (e) => e.textContent),
    /6,100.00/,
  )
  await page.$eval('.calc-panel:last-of-type .remove-room', (e) =>
    e.scrollIntoView({ block: 'center', behavior: 'instant' }),
  )
  await page.locator('.calc-panel:last-of-type .remove-room').click()
  assert.match(
    await page.$eval('.grand-total', (e) => e.textContent),
    /3,100.00/,
  )
  await page.evaluate(() => {
    document.activeElement?.blur()
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  if (capture)
    await page.screenshot({
      path: out + '/calculator-mobile.png',
      fullPage: true,
    })
  results.push(
    'Calculator: custom rate, room total, aggregate, add/remove pass',
  )
  for (const route of [
    '/blog',
    '/blog/property-management-platform-guide',
    '/privacy',
    '/terms',
  ]) {
    await page.goto(base + route + '/', { waitUntil: 'networkidle0' })
    assert.equal(await page.$$eval('h1', (els) => els.length), 1)
    assert.equal(
      await page.$eval('html', (e) => e.scrollWidth <= innerWidth),
      true,
      route + ' overflow',
    )
    if (capture)
      await page.screenshot({
        path: out + '/' + route.slice(1).replaceAll('/', '-') + '-mobile.png',
        fullPage: true,
      })
    const schema = await page.$eval('script[type="application/ld+json"]', (e) =>
      JSON.parse(e.textContent),
    )
    assert.ok(schema['@context'])
    results.push(route + ': mobile, metadata, schema pass')
  }
  await page.goto(base + '/blog/', { waitUntil: 'networkidle0' })
  await page.locator('.blog-filter button:nth-child(2)').click()
  assert.equal((await page.$$('.journal-card')).length, 1)
  await page.locator('header .brand').click()
  await page.waitForFunction(() =>
    document.title.includes('Property Management Platform'),
  )
  assert.match(await page.title(), /Property Management Platform/)
  assert.equal(
    await page.$eval('link[rel=canonical]', (e) => e.href),
    'https://horcare-landing.vercel.app/',
  )
  results.push('Blog filter, home navigation, metadata reset pass')
  for (const width of [320, 768, 1024, 1280]) {
    await page.setViewport({ width, height: 900 })
    await page.goto(base, { waitUntil: 'networkidle0' })
    assert.equal(
      await page.$eval('html', (e) => e.scrollWidth <= innerWidth),
      true,
      'overflow ' + width,
    )
  }
  results.push('320/768/1024/1280px overflow checks pass')
  const nojs = await browser.newPage()
  await nojs.setJavaScriptEnabled(false)
  await nojs.goto(base + '/blog/property-management-platform-guide/', {
    waitUntil: 'domcontentloaded',
  })
  assert.equal((await nojs.$$('h1')).length, 1)
  assert.ok(
    (await nojs.$eval('.article-content', (e) => e.textContent)).length > 1000,
  )
  results.push('Article readable with JavaScript disabled')
  assert.equal(errors.length, 0, errors.join('\n'))
  results.push('No browser runtime/hydration errors')
  console.log(results.join('\n'))
  writeFileSync(
    out + '/qa-results.json',
    JSON.stringify({ results, errors }, null, 2),
  )
} finally {
  await browser.close()
}
