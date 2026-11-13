import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { Link } from './LocalizedLink.jsx'
import { readConsent, setConsent, onConsentChange } from '../lib/analytics.js'

/** PDPA cookie banner: analytics stays off until the visitor chooses "ยอมรับทั้งหมด". */
export function CookieConsent() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    // Decided after hydration (the prerendered HTML never contains the banner), a beat after first paint.
    const id = setTimeout(() => setOpen(readConsent() === null), 600)
    const off = onConsentChange((v) => setOpen(v === 'ask'))
    return () => {
      clearTimeout(id)
      off()
    }
  }, [])
  if (!open) return null
  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label={t('การตั้งค่าคุกกี้')}>
      <p>
        <b>{t('เว็บไซต์นี้ใช้คุกกี้')}</b>{' '}
        {t('คุกกี้ที่จำเป็นช่วยให้เว็บทำงานได้ และหากคุณยินยอม คุกกี้วิเคราะห์จะช่วยให้เราเห็นว่าส่วนไหนของหน้าเว็บมีประโยชน์ที่สุด เพื่อนำไปปรับปรุง เราไม่ใช้คุกกี้โฆษณา')}{' '}
        <Link to="/privacy#cookies">{t('อ่านนโยบายคุกกี้')}</Link>
      </p>
      <div className="cookie-actions">
        <button type="button" className="button outline" onClick={() => setConsent('denied')}>
          {t('ใช้เฉพาะที่จำเป็น')}
        </button>
        <button type="button" className="button primary" onClick={() => setConsent('granted')}>
          {t('ยอมรับทั้งหมด')}
        </button>
      </div>
    </div>
  )
}
