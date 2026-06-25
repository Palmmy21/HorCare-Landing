import { useState, useEffect } from 'react'
import { W, Ic, P, Logo, LogoText, HORCARE_URL } from './shared.jsx'

const CALC_ICON = 'M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v3h-7.5V6zM12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z'

const NAV = [
  { label: 'คุณสมบัติ',         href: '/#features' },
  { label: 'วิธีใช้งาน',        href: '/#how-to-use' },
  { label: 'ราคา',              href: '/#pricing' },
  { label: 'FAQ',               href: '/#faq' },
  { label: 'บทความ',           href: '/blog' },
  { label: 'คำนวณค่าน้ำค่าไฟ', href: '/calculator', icon: CALC_ICON },
  { label: 'ติดต่อ',           href: '/#contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{
      position: 'fixed', inset: '0 0 auto 0', zIndex: 50,
      background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.92)',
      borderBottom: scrolled ? '1px solid rgba(0,184,162,0.18)' : '1px solid rgba(0,184,162,0.08)',
      boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.09)' : '0 1px 4px rgba(0,0,0,0.04)',
      backdropFilter: 'blur(12px)',
      transition: 'background 0.25s, box-shadow 0.25s, border-color 0.25s',
    }}>
      <W>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <Logo size={48} />
            <LogoText />
          </a>

          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="hidden-mobile">
            {NAV.map(n => (
              <a key={n.href} href={n.href} style={{
                fontFamily: 'Sarabun, sans-serif', fontSize: 14, fontWeight: 500,
                color: '#546E7A', textDecoration: 'none', transition: 'color 0.15s',
                display: 'flex', alignItems: 'center', gap: 5,
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#00B8A2'}
              onMouseLeave={e => e.currentTarget.style.color = '#546E7A'}>
                {n.icon && <Ic d={n.icon} size={13} color="currentColor" />}
                {n.label}
              </a>
            ))}
          </div>

          <a href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
            className="btn-orange hidden-mobile"
            style={{ gap: 6, padding: '8px 20px', borderRadius: 100, fontSize: 14, fontFamily: 'Kanit, sans-serif', fontWeight: 600, textDecoration: 'none' }}>
            เริ่มใช้งาน <Ic d={P.arrow} size={13} color="white" />
          </a>

          <button onClick={() => setOpen(!open)} className="show-mobile"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <Ic d={open ? P.close : P.menu} size={22} color="#546E7A" />
          </button>
        </div>
      </W>

      {open && (
        <div style={{ background: '#fff', borderTop: '1px solid rgba(0,184,162,0.1)', padding: '16px 20px 20px', flexDirection: 'column' }}
          className="show-mobile">
          {NAV.map(n => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', fontFamily: 'Sarabun, sans-serif', fontSize: 15, color: '#546E7A', textDecoration: 'none', borderBottom: '1px solid #f5f5f5' }}>
              {n.icon && <Ic d={n.icon} size={15} color="#00B8A2" />}
              {n.label}
            </a>
          ))}
          <a href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
            className="btn-orange"
            style={{ display: 'block', textAlign: 'center', marginTop: 14, padding: '12px 0', borderRadius: 100, fontFamily: 'Kanit, sans-serif', fontWeight: 600, fontSize: 15, textDecoration: 'none', justifyContent: 'center' }}>
            เริ่มใช้งาน
          </a>
        </div>
      )}
    </nav>
  )
}
