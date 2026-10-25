import { useMemo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LanguageContext } from './context.js'
import { languageOf, localePath } from './locale.js'
import { translate } from './translate.js'

export function LanguageProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const language = languageOf(location.pathname)
  const setLanguage = useCallback((next) => {
    if (next !== 'en' && next !== 'th') return
    try { localStorage.setItem('horcare-language', next) } catch { /* URL remains authoritative. */ }
    navigate(localePath(location.pathname, next) + location.search + location.hash, { preventScrollReset: true })
  }, [location, navigate])
  const value = useMemo(() => ({ language, setLanguage, t: (value) => translate(value, language) }), [language, setLanguage])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
