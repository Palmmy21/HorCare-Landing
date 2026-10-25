import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { INDEXABLE_ROUTES, BASE_URL, pageMeta, languageAlternates } from '../src/data/site.js'
import { languageOf } from '../src/i18n/locale.js'

const sitemap = await readFile('dist/sitemap.xml', 'utf8')
const titles = new Set()
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;')
for (const route of [...INDEXABLE_ROUTES, '/404', '/en/404']) {
  const file = route === '/' ? 'index.html' : route === '/404' ? '404.html' : route.slice(1) + '/index.html'
  const html = await readFile('dist/' + file, 'utf8')
  const meta=pageMeta(route)
  assert.ok(html.includes(`<html lang="${languageOf(route)}">`), 'HTML language: '+route)
  assert.ok(html.includes(`<title>${escape(meta.title)}</title>`), 'Title: '+route)
  assert.ok(html.includes(`<link rel="canonical" href="${BASE_URL+route}"`), 'Canonical: '+route)
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,'One H1: '+route)
  const schema = JSON.parse(html.match(/<script id="route-schema" type="application\/ld\+json">(.*?)<\/script>/s)[1])
  assert.equal(schema['@context'],'https://schema.org')
  if(meta.notFound){
    assert.ok(html.includes('name="robots" content="noindex, follow"'))
    assert.ok(!sitemap.includes('<loc>'+BASE_URL+route+'</loc>'))
    continue
  }
  assert.ok(!titles.has(meta.title),'Unique title: '+route);titles.add(meta.title)
  assert.ok(sitemap.includes('<loc>'+BASE_URL+route+'</loc>'),'Sitemap: '+route)
  for(const {language,href} of languageAlternates(route)) assert.ok(html.includes(`hreflang="${language}" href="${href}"`),'Alternate: '+route)
  const main=html.match(/<main\b[^>]*>(.*?)<\/main>/s)[1]
  if(languageOf(route)==='en') assert.ok(!/[\u0e01-\u0e3a\u0e40-\u0e5b]/.test(main),'English prerender: '+route)
  if(route.includes('/blog/')){
    const post=schema['@graph'].find(x=>x['@type']==='BlogPosting')
    assert.equal(post.mainEntityOfPage,BASE_URL+route)
    assert.ok(post.dateModified >= post.datePublished)
    assert.ok(schema['@graph'].some(x=>x['@type']==='BreadcrumbList'))
  }
}
assert.equal((sitemap.match(/<loc>/g)||[]).length,INDEXABLE_ROUTES.length)
console.log(`SEO checks passed: ${INDEXABLE_ROUTES.length} prerendered pages, metadata, canonical, hreflang, structured data, sitemap, and 404 exclusions.`)
