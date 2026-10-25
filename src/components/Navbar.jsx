import { useLanguage } from '../i18n/useLanguage.js'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Brand } from './Brand.jsx'
import { Ic, HORCARE_URL } from './shared.jsx'
export function Navbar() {
  const { t, language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)
  const location = useLocation()
  useEffect(() => {
    function close(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])
  const links = [
    [t("แพลตฟอร์ม"), '/#features'],
    [t("เหมาะกับใคร"), '/#properties'],
    [t("แพ็กเกจ"), '/#pricing'],
    [t("บทความ"), '/blog'],
  ]
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">{' '}{t("ข้ามไปเนื้อหา")}{' '}</a>
      <div className="container nav-inner">
        <Brand />
        <nav
          className={`nav-links ${open ? 'is-open' : ''}`}
          id="main-navigation"
          aria-label={t("เมนูหลัก")}
        >
          {links.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              aria-current={location.pathname === to ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {' '}{t(label)}{' '}
            </Link>
          ))}
          <a className="mobile-login" href={HORCARE_URL}>{' '}{t("เข้าสู่ระบบ")}{' '}</a>
          <a className="mobile-login" href={HORCARE_URL}>{t('เริ่มใช้ฟรี')}</a>
        </nav>
        <div className="nav-actions">
          <div className="language-switch" role="group" aria-label="Language / ภาษา">
            <button type="button" lang="th" aria-label="ภาษาไทย" aria-pressed={language === 'th'} onClick={() => setLanguage('th')}>TH</button>
            <button type="button" lang="en" aria-label="English" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
          </div>
          <a className="login-link" href={HORCARE_URL}>{' '}{t("เข้าสู่ระบบ")}{' '}</a>
          <a className="button primary nav-cta" href={HORCARE_URL}>{' '}{t("เริ่มใช้ฟรี")}{' '}<Ic d="M7 17 17 7M7 7h10v10" size={17} />
          </a>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-label={open ? t("ปิดเมนู") : t("เปิดเมนู")}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            <svg
              viewBox="0 0 24 24"
              width="23"
              height="23"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path
                d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'}
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
