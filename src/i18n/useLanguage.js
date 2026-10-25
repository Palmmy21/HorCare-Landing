import { useContext } from 'react'
import { LanguageContext } from './context.js'
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('LanguageProvider is required')
  return context
}
