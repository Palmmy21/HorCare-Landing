import english from './en.js'
export function translate(value, language) {
  if (language !== 'en') return value
  if (typeof value === 'string') {
    if (english[value] !== undefined) return english[value]
    if (value.endsWith(' | HorCare')) return translate(value.slice(0, -10), language) + ' | HorCare'
    return value
  }
  if (Array.isArray(value)) return value.map((item) => translate(item, language))
  if (value && typeof value === 'object') return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, key === 'inLanguage' ? language : translate(item, language)]),
  )
  return value
}
