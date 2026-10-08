import {readFileSync} from 'node:fs'
import {ARTICLES} from '../src/data/articles.js'
import {pageMeta,BASE_URL} from '../src/data/site.js'
import assert from 'node:assert/strict'
const escape = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;')
for(const p of ['/', '/calculator','/blog',...ARTICLES.map(a=>'/blog/'+a.slug),'/privacy','/terms']) {
 const h=readFileSync('dist/'+(p==='/'?'index.html':p.slice(1)+'/index.html'),'utf8')
 const m=pageMeta(p)
 assert.ok(h.includes('<meta name="description" content="'+escape(m.description)),p+' static description')
 assert.ok(h.includes('<title>'+escape(m.title)),p+' static title')
 assert.ok(h.includes('<meta property="og:title" content="'+escape(m.title)),p+' og title')
 assert.ok(h.includes('<link rel="canonical" href="'+BASE_URL+p+'"'),p+' canonical')
 assert.equal((h.match(/id="route-schema"/g)||[]).length,1)
 assert.equal((h.match(/<h1[ >]/g)||[]).length,1)
 const schema=JSON.parse(h.match(/<script id="route-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
 assert.ok(schema['@context'])
 assert.ok(!h.includes('Switched to client rendering'))
}
console.log('All prerendered route titles, descriptions, canonicals, H1s and schemas are valid')
