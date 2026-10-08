import { build } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { ARTICLES } from '../src/data/articles.js'
import { pageMeta, routeSchema, BASE_URL } from '../src/data/site.js'
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = resolve(ROOT, 'dist')
const SSR = resolve(ROOT, '.ssr-tmp')
const routes = [
  '/',
  '/calculator',
  '/blog',
  ...ARTICLES.map((a) => '/blog/' + a.slug),
  '/privacy',
  '/terms',
  '/404',
]
const escape = (s) =>
  s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
await build({
  configFile: false,
  plugins: [react()],
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    ssr: resolve(ROOT, 'src/entry-server.jsx'),
    outDir: SSR,
    rollupOptions: { output: { format: 'es', entryFileNames: 'entry.mjs' } },
  },
  ssr: { noExternal: true },
  logLevel: 'warn',
})
try {
  const template = readFileSync(resolve(DIST, 'index.html'), 'utf8')
  const { render } = await import(pathToFileURL(resolve(SSR, 'entry.mjs')).href)
  for (const path of routes) {
    const meta = pageMeta(path)
    const markup = render(path)
    if (
      !markup.includes('<h1') ||
      markup.includes('Switched to client rendering')
    )
      throw new Error('Incomplete prerender: ' + path)
    let html = template
      .replace('<div id="root"></div>', '<div id="root">' + markup + '</div>')
      .replace(
        /<title>.*?<\/title>/,
        '<title>' + escape(meta.title) + '</title>',
      )
      .replace(
        /<meta\s+name="description"\s+content=".*?"\s*\/>/,
        '<meta name="description" content="' +
          escape(meta.description) +
          '" />',
      )
      .replace(
        /<link\s+rel="canonical"\s+href=".*?"\s*\/>/,
        '<link rel="canonical" href="' + BASE_URL + path + '" />',
      )
      .replace(
        /<meta\s+property="og:url"\s+content=".*?"\s*\/>/,
        '<meta property="og:url" content="' + BASE_URL + path + '" />',
      )
      .replace(
        /<meta\s+property="og:title"\s+content=".*?"\s*\/>/,
        '<meta property="og:title" content="' + escape(meta.title) + '" />',
      )
      .replace(
        /<meta\s+property="og:description"\s+content=".*?"\s*\/>/,
        '<meta property="og:description" content="' +
          escape(meta.description) +
          '" />',
      )
      .replace(
        /<meta\s+name="twitter:title"\s+content=".*?"\s*\/>/,
        '<meta name="twitter:title" content="' + escape(meta.title) + '" />',
      )
      .replace(
        /<meta\s+name="twitter:description"\s+content=".*?"\s*\/>/,
        '<meta name="twitter:description" content="' +
          escape(meta.description) +
          '" />',
      )
      .replace(
        '<!--route-schema-->',
        '<script id="route-schema" type="application/ld+json">' +
          JSON.stringify(routeSchema(path)).replaceAll('<', '\\u003c') +
          '</script>',
      )
    if (path.startsWith('/blog/'))
      html = html.replace(
        'property="og:type" content="website"',
        'property="og:type" content="article"',
      )
    if (meta.notFound)
      html = html.replace(
        'name="robots" content="index, follow"',
        'name="robots" content="noindex, follow"',
      )
    const out = resolve(
      DIST,
      path === '/'
        ? 'index.html'
        : path === '/404'
          ? '404.html'
          : path.slice(1) + '/index.html',
    )
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, html)
    console.log('Prerendered ' + path)
  }
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    routes
      .filter((p) => p !== '/404')
      .map((p) => '  <url><loc>' + BASE_URL + p + '</loc></url>')
      .join('\n') +
    '\n</urlset>\n'
  writeFileSync(resolve(DIST, 'sitemap.xml'), sitemap)
  writeFileSync(resolve(ROOT, 'public/sitemap.xml'), sitemap)
} finally {
  if (SSR !== resolve(ROOT, '.ssr-tmp') || dirname(SSR) !== ROOT)
    throw new Error('Unsafe temporary path')
  rmSync(SSR, { recursive: true, force: true })
}
console.log('Full HTML and route metadata generated successfully.')
