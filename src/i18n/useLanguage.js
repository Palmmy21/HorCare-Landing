import { useMemo, useSyncExternalStore } from 'react'
import english from './en.js'

const storageKey = 'horcare-language'
const listeners = new Set()
let selectedLanguage = null

function snapshot() {
  if (selectedLanguage) return selectedLanguage
  try {
    const saved = window.localStorage.getItem(storageKey)
    return saved === 'en' || saved === 'th' ? saved : 'th'
  } catch {
    return 'th'
  }
}
function subscribe(listener) {
  listeners.add(listener)
  const onStorage = (event) => {
    if (event.key === storageKey || event.key === null) {
      selectedLanguage = null
      listener()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}
function setLanguage(language) {
  if (language !== 'th' && language !== 'en') return
  selectedLanguage = language
  try {
    window.localStorage.setItem(storageKey, language)
  } catch { /* Language selection still works when storage is unavailable. */ }
  listeners.forEach((listener) => listener())
}
export function translate(value, language) {
  if (language !== 'en') return value
  if (typeof value === 'string') {
    if (english[value] !== undefined) return english[value]
    // Article titles are also used with the site-name suffix in metadata.
    if (value.endsWith(' | HorCare')) return translate(value.slice(0, -10), language) + ' | HorCare'
    return value
  }
  if (Array.isArray(value)) return value.map((item) => translate(item, language))
  if (value && typeof value === 'object') return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, key === 'inLanguage' ? language : translate(item, language)]),
  )
  return value
}
export function useLanguage() {
  const language = useSyncExternalStore(subscribe, snapshot, () => 'th')
  const t = useMemo(() => (value) => translate(value, language), [language])
  return { language, setLanguage, t }
}
