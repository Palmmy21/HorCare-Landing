import { Link as RouterLink } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.js'
import { localePath } from '../i18n/locale.js'
export function Link({ to, ...props }) {
  const { language } = useLanguage()
  const localized = typeof to === 'string' ? localePath(to, language) : { ...to, pathname: localePath(to.pathname || '', language) }
  return <RouterLink {...props} to={localized} />
}
