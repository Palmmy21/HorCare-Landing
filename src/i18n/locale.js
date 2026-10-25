export const languageOf = (path) => /^\/en(?:\/|$)/.test(path) ? 'en' : 'th'
export const contentPath = (path) => (path.replace(/^\/en(?=\/|$)/, '').replace(/\/+$/, '') || '/')
export function localePath(path, language) {
  if (!path.startsWith('/') || path.startsWith('//')) return path
  const suffixAt = path.search(/[?#]/)
  const pathname = suffixAt < 0 ? path : path.slice(0, suffixAt)
  const suffix = suffixAt < 0 ? '' : path.slice(suffixAt)
  const clean = contentPath(pathname)
  return (language === 'en' ? '/en' + (clean === '/' ? '' : clean) : clean) + suffix
}
