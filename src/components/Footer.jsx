import { W, Ic, P, Logo, LogoText, HORCARE_URL, LINE_URL } from './shared.jsx'

const FOOTER_COLS = [
  { title: 'ผลิตภัณฑ์', items: [
    { label: 'คุณสมบัติ',    href: '/#features' },
    { label: 'ราคา',         href: '/#pricing' },
    { label: 'วิธีใช้งาน',  href: '/#how-to-use' },
    { label: 'เข้าสู่ระบบ', href: HORCARE_URL, ext: true },
  ]},
  { title: 'บริษัท', items: [
    { label: 'บทความ',         href: '/blog' },
    { label: 'ติดต่อเรา',      href: '/#contact' },
    { label: 'ซัพพอร์ต',      href: '/#contact' },
    { label: 'ร่วมงานกับเรา', href: LINE_URL, ext: true },
  ]},
  { title: 'ช่วยเหลือ', items: [
    { label: 'คำถามที่พบบ่อย', href: '/#faq' },
    { label: 'คู่มือการใช้งาน', href: HORCARE_URL, ext: true },
    { label: 'แจ้งปัญหา',      href: LINE_URL, ext: true },
    { label: 'สถานะระบบ',      href: HORCARE_URL, ext: true },
  ]},
]

export function Footer() {
  return (
    <footer style={{ background: '#1A2433', paddingTop: 52, paddingBottom: 28 }}>
      <W>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 32, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Logo size={40} /><LogoText dark={false} />
            </div>
            <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: '#90A4AE', lineHeight: 1.7, marginBottom: 14 }}>
              ระบบจัดการหอพักครบวงจร<br />สำหรับเจ้าของหอพักยุคใหม่
            </p>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 12, color: '#90A4AE', textDecoration: 'none', display: 'block', marginBottom: 3 }}
              onMouseEnter={e => e.currentTarget.style.color = '#00B8A2'}
              onMouseLeave={e => e.currentTarget.style.color = '#90A4AE'}>
              <span style={{ fontWeight: 600, color: '#00B8A2' }}>LINE:</span> @horcare
            </a>
            <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 12, color: '#90A4AE', marginBottom: 3 }}>
              <span style={{ fontWeight: 600, color: '#00B8A2' }}>Web:</span> horcare-landing.vercel.app
            </p>
          </div>
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 13, color: 'white', marginBottom: 14 }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {col.items.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      {...(item.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: '#90A4AE', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#00B8A2'}
                      onMouseLeave={e => e.currentTarget.style.color = '#90A4AE'}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 12, color: '#546E7A' }}>© 2026 HorCare. สงวนลิขสิทธิ์</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'นโยบายความเป็นส่วนตัว', href: '/privacy' },
              { label: 'เงื่อนไขการใช้งาน',      href: '/terms' },
            ].map(l => (
              <a key={l.label} href={l.href}
                style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 12, color: '#546E7A', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#00B8A2'}
                onMouseLeave={e => e.currentTarget.style.color = '#546E7A'}>{l.label}</a>
            ))}
          </div>
        </div>
      </W>
    </footer>
  )
}
