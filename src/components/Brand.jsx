import { useLanguage } from '../i18n/useLanguage.js'
import { Link } from 'react-router-dom'
export function Brand() {
  const { t } = useLanguage()
  return (
    <Link className="brand" to="/" aria-label={t("HorCare หน้าหลัก")}>
      <span className="brand-logo">
        <img src="/HORCARE%20small.png" width="64" height="64" alt="" />
      </span>
      <span>
        <span className="brand-hor">Hor</span>
        <span className="brand-care">Care</span>
        <span className="brand-period">.</span>
      </span>
    </Link>
  )
}
