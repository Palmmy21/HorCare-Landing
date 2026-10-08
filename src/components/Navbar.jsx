import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Brand } from './Brand.jsx'
import { Ic, HORCARE_URL } from './shared.jsx'
export function Navbar() {
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
    ['แพลตฟอร์ม', '/#features'],
    ['เหมาะกับใคร', '/#properties'],
    ['แพ็กเกจ', '/#pricing'],
    ['บทความ', '/blog'],
  ]
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        ข้ามไปเนื้อหา
      </a>
      <div className="container nav-inner">
        <Brand />
        <nav
          className={`nav-links ${open ? 'is-open' : ''}`}
          id="main-navigation"
          aria-label="เมนูหลัก"
        >
          {links.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              aria-current={location.pathname === to ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a className="mobile-login" href={HORCARE_URL}>
            เข้าสู่ระบบ
          </a>
        </nav>
        <div className="nav-actions">
          <a className="login-link" href={HORCARE_URL}>
            เข้าสู่ระบบ
          </a>
          <a className="button primary nav-cta" href={HORCARE_URL}>
            เริ่มใช้ฟรี <Ic d="M7 17 17 7M7 7h10v10" size={17} />
          </a>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'}
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
