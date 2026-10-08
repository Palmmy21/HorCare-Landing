import { mkdirSync, writeFileSync } from 'node:fs'
const url =
  'https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600&family=Sarabun:wght@400;500;600&display=swap'
const response = await fetch(url, {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
})
if (!response.ok) throw new Error('Font CSS ' + response.status)
const css = await response.text()
mkdirSync('public/fonts', { recursive: true })
let i = 0
const blocks = [
  ...css.matchAll(/\/\* (thai|latin) \*\/\s*(@font-face\s*\{[^}]+\})/g),
]
if (!blocks.length) throw new Error('Font CSS has no Thai/Latin subsets')
const assets = new Map()
let output =
  '/* Kanit and Sarabun from Google Fonts; SIL Open Font License. */\n'
for (const match of blocks) {
  let block = match[2]
  const remote = block.match(/url\(([^)]+)\)/)[1]
  let filename = assets.get(remote)
  if (!filename) {
    filename = 'font-' + ++i + '.woff2'
    const file = await fetch(remote)
    if (!file.ok) throw new Error('Font download ' + file.status)
    writeFileSync(
      'public/fonts/' + filename,
      Buffer.from(await file.arrayBuffer()),
    )
    assets.set(remote, filename)
  }
  output += block.replace(remote, './' + filename) + '\n'
}
writeFileSync('public/fonts/fonts.css', output)
for (const family of ['kanit', 'sarabun']) {
  const license = await fetch(
    'https://raw.githubusercontent.com/google/fonts/main/ofl/' +
      family +
      '/OFL.txt',
  )
  if (!license.ok) throw new Error('Font license download failed')
  writeFileSync('public/fonts/' + family + '-OFL.txt', await license.text())
}
console.log('Self-hosted ' + assets.size + ' font subsets with licenses')
