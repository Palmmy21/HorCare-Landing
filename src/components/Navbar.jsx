import { useLanguage } from '../i18n/useLanguage.js'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from '../components/LocalizedLink.jsx'
import { Brand } from './Brand.jsx'
import { Ic, HORCARE_URL } from './shared.jsx'
import { DEMO_URL } from './landing/links.js'
export function Navbar() {
  const { t, language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const toggle = useRef(null)
  const header = useRef(null)
  const openRef = useRef(open)
  useEffect(() => {
    openRef.current = open
  }, [open])
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
    [t("ระบบ"), '/#dormitory'],
    [t("ย้ายข้อมูล"), '/#import'],
    [t("แพ็กเกจ"), '/#pricing'],
    [t("ความปลอดภัย"), '/#trust'],
    [t("บทความ"), '/blog'],
  ]
  // Glass bar: tucks away while reading down, returns the moment you scroll up;
  // tracks reading progress and the section in view.
  useEffect(() => {
    const el = header.current
    if (!el) return
    const ids = ['dormitory', 'import', 'pricing', 'trust']
    let lastY = window.scrollY
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      el.style.setProperty('--scroll', max > 0 ? (y / max).toFixed(4) : '0')
      el.classList.toggle('is-scrolled', y > 12)
      if (Math.abs(y - lastY) > 6) {
        const hide = y > lastY && y > 240 && !openRef.current && !el.contains(document.activeElement)
        el.classList.toggle('is-tucked', hide)
        lastY = y
      }
      let current = ''
      for (const id of ids) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top < window.innerHeight * 0.4) current = id
      }
      setActive(current)
    }
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [location.pathname])
  return (
    <header className="site-header" ref={header}>
      <a className="skip-link" href="#main">{' '}{t("ข้ามไปเนื้อหา")}{' '}</a>
      <div className="container nav-inner">
        <span className="nav-progress" aria-hidden="true" />
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
              className={to === '/#' + active ? 'is-active' : undefined}
              onClick={() => setOpen(false)}
            >
              {' '}{t(label)}{' '}
            </Link>
          ))}
          <a className="mobile-login" href={HORCARE_URL}>{' '}{t("เข้าสู่ระบบ")}{' '}</a>
          <a className="mobile-login" href={HORCARE_URL} data-track="start_free">{t('เริ่มใช้ฟรี')}</a>
          <a className="mobile-login" href={DEMO_URL} target="_blank" rel="noreferrer" data-track="book_demo">{t('จองเดโม')}</a>
        </nav>
        <div className="nav-actions">
          <div className="language-switch" role="group" aria-label="Language / ภาษา">
            <button type="button" lang="th" aria-label="ภาษาไทย" aria-pressed={language === 'th'} onClick={() => setLanguage('th')}>TH</button>
            <button type="button" lang="en" aria-label="English" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
          </div>
          <a className="login-link" href={HORCARE_URL}>{' '}{t("เข้าสู่ระบบ")}{' '}</a>
          <a className="button primary nav-cta" href={DEMO_URL} target="_blank" rel="noreferrer" data-track="book_demo">{' '}{t("จองเดโม")}{' '}<Ic d="M7 17 17 7M7 7h10v10" size={17} />
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
