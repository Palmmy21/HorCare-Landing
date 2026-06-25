import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import Calculator from './pages/Calculator.jsx'
import BlogList from './pages/BlogList.jsx'
import BlogPost from './pages/BlogPost.jsx'
import { ARTICLES } from './data/articles.js'

const HORCARE_URL = 'https://hor-care.vercel.app/'
const LINE_URL = 'https://lin.ee/9RxwIrM'

// ─────────────────────────────────────────────────────────────────────────────
// Reliable centered wrapper — uses inline styles to avoid Tailwind v4 quirks
// ─────────────────────────────────────────────────────────────────────────────
const W = ({ children, style = {} }) => (
  <div className="w-inner" style={{ maxWidth: 1100, margin: '0 auto', ...style }}>
    {children}
  </div>
)

// ── Icon primitive ────────────────────────────────────────────────────────────
const Ic = ({ d, size = 20, color = 'currentColor', style: s = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0, ...s }} aria-hidden="true">
    <path d={d} />
  </svg>
)

const P = {
  home:    'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75',
  user:    'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
  doc:     'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z',
  card:    'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z',
  bolt:    'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  chart:   'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
  check:   'M4.5 12.75l6 6 9-13.5',
  arrow:   'M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3',
  menu:    'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5',
  close:   'M6 18L18 6M6 6l12 12',
  bell:    'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0',
  shield:  'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  star:    'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
  headset: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V20.25a.75.75 0 001.28.53l3.58-3.58A48.22 48.22 0 0011.75 17c2.463 0 4.882-.157 7.245-.46.992-.126 1.82-.696 2.255-1.479',
  wrench:  'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75',
  chat:    'M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z',
  exclaim: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
  mail:    'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ── Section pill label ────────────────────────────────────────────────────────
function SectionPill({ icon, label, color = '#2DC76D' }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 14,
      background: `${color}18`, border: `1px solid ${color}38`,
      borderRadius: 100, padding: '5px 14px',
    }}>
      {icon && <Ic d={icon} size={11} color={color} />}
      <span style={{ fontFamily: 'Kanit,sans-serif', fontSize: 11, fontWeight: 600, color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  )
}

// ── Dashboard preview (Hero) ──────────────────────────────────────────────────
function DashboardPreview() {
  const rooms = [
    { id:'101', s:'occupied' }, { id:'102', s:'vacant'   }, { id:'103', s:'occupied' }, { id:'104', s:'repair'   },
    { id:'201', s:'occupied' }, { id:'202', s:'occupied' }, { id:'203', s:'vacant'   }, { id:'204', s:'occupied' },
  ]
  const roomColor = s => s === 'occupied' ? '#2DC76D' : s === 'repair' ? '#FF9800' : '#546E7A'
  const roomBg   = s => s === 'occupied' ? 'rgba(45,199,109,0.15)' : s === 'repair' ? 'rgba(255,152,0,0.15)' : 'rgba(84,110,122,0.1)'
  const roomBdr  = s => s === 'occupied' ? 'rgba(45,199,109,0.28)' : s === 'repair' ? 'rgba(255,152,0,0.28)' : 'rgba(84,110,122,0.15)'

  return (
    <div className="float-anim" style={{
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 20, padding: '20px',
      marginTop: 44, maxWidth: 440, margin: '44px auto 0',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
    }}>
      {/* Mini top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontFamily: 'Kanit,sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>ภาพรวมหอพัก</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#2DC76D' }} />
          <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 11, color: '#2DC76D', fontWeight: 600 }}>Real-time</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 16 }}>
        {[
          { label: 'ทั้งหมด', val: '12', c: 'rgba(255,255,255,0.9)' },
          { label: 'มีผู้เช่า', val: '9',  c: '#2DC76D' },
          { label: 'ว่าง',     val: '2',  c: '#00B8A2' },
          { label: 'ซ่อม',     val: '1',  c: '#FF9800' },
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '10px 6px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 20, color: s.c }}>{s.val}</div>
            <div style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Room grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 7 }}>
        {rooms.map(r => (
          <div key={r.id} style={{
            borderRadius: 8, padding: '8px 6px', textAlign: 'center',
            background: roomBg(r.s), border: `1px solid ${roomBdr(r.s)}`,
          }}>
            <div style={{ fontFamily: 'Kanit,sans-serif', fontSize: 10, fontWeight: 600, color: roomColor(r.s) }}>{r.id}</div>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: roomColor(r.s), margin: '3px auto 0' }} />
          </div>
        ))}
      </div>

      {/* Bottom legend */}
      <div style={{ display: 'flex', gap: 14, marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)', justifyContent: 'center' }}>
        {[['#2DC76D','มีผู้เช่า'],['#00B8A2','ว่าง'],['#FF9800','ซ่อมบำรุง']].map(([c,l]) => (
          <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'Sarabun,sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: c, flexShrink: 0 }} />{l}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Logo mark ─────────────────────────────────────────────────────────────────
function Logo({ size = 32 }) {
  return (
    <img src="/2.png" width={size} height={size} alt="HorCare Logo"
      style={{ objectFit: 'contain', display: 'block' }} />
  )
}

function LogoText({ dark = true }) {
  return (
    <span style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 700, fontSize: 20, letterSpacing: '-0.3px' }}>
      <span style={{ color: '#2DC76D' }}>Hor</span><span style={{ color: dark ? '#1565C0' : '#fff' }}>Care</span>
    </span>
  )
}

// ── Navbar ────────────────────────────────────────────────────────────────────
const CALC_ICON = 'M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v3h-7.5V6zM12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z'

const NAV = [
  { label: 'คุณสมบัติ',      href: '#features' },
  { label: 'วิธีใช้งาน',     href: '#how-to-use' },
  { label: 'ราคา',           href: '#pricing' },
  { label: 'FAQ',            href: '#faq' },
  { label: 'บทความ',        href: '#blog' },
  { label: 'คำนวณค่าน้ำค่าไฟ', href: '/calculator', icon: CALC_ICON },
  { label: 'ติดต่อ',        href: '#contact' },
]

function Navbar() {
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
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <Logo size={48} />
            <LogoText />
          </a>

          {/* Desktop nav */}
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}
            className="hidden-mobile">
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

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="show-mobile"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <Ic d={open ? P.close : P.menu} size={22} color="#546E7A" />
          </button>
        </div>
      </W>

      {/* Mobile menu */}
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

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero-section" style={{ background: 'linear-gradient(150deg,#0B1A27 0%,#122338 55%,#0A1F14 100%)', paddingTop: 120, paddingBottom: 72 }}>
      <W style={{ textAlign:'center' }}>

        {/* Logo mark */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:20 }}>
          <Logo size={108} />
        </div>

        {/* Badge */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:7, marginBottom:24,
          background:'rgba(45,199,109,0.13)', border:'1px solid rgba(45,199,109,0.32)',
          borderRadius:100, padding:'7px 18px',
        }}>
          <span className="pulse-dot" style={{ width:7, height:7, borderRadius:'50%', background:'#2DC76D', flexShrink:0 }}/>
          <span style={{ fontFamily:'Sarabun,sans-serif', fontSize:11.5, fontWeight:600, color:'#2DC76D', letterSpacing:'0.1em', textTransform:'uppercase' }}>
            ระบบจัดการหอพักครบวงจร
          </span>
        </div>

        <h1 style={{ fontFamily:'Kanit,sans-serif', fontWeight:800, lineHeight:1.15, marginBottom:18 }}>
          <span style={{ display:'block', fontSize:'clamp(2.1rem,4.8vw,3.6rem)', color:'white' }}>ระบบจัดการหอพัก</span>
          <span style={{ display:'block', fontSize:'clamp(2.1rem,4.8vw,3.6rem)' }} className="gradient-text">
            ครบ จบ ในระบบเดียว
          </span>
        </h1>

        <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:16, color:'rgba(255,255,255,0.6)', lineHeight:1.85, maxWidth:510, margin:'0 auto 36px' }}>
          คุ้มค่า ใช้ง่าย ดูแลให้ตลอดการใช้งาน จากห้องพักถึงใบแจ้งหนี้ HorCare รวมทุกอย่างในระบบเดียว ลดภาระงานซ้ำซ้อน
        </p>

        <div className="hero-btns" style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center', marginBottom:44 }}>
          <a href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
            className="btn-orange"
            style={{ gap:8, padding:'14px 34px', borderRadius:100, fontSize:15, fontFamily:'Kanit,sans-serif', fontWeight:700, textDecoration:'none', boxShadow:'0 6px 24px rgba(255,152,0,0.45)' }}>
            เริ่มใช้งานฟรี <Ic d={P.arrow} size={16} color="white" />
          </a>
          <a href="#features"
            className="btn-ghost-teal"
            style={{ gap:8, padding:'14px 34px', borderRadius:100, fontSize:15, fontFamily:'Kanit,sans-serif', fontWeight:600, textDecoration:'none' }}>
            ดูคุณสมบัติ
          </a>
        </div>

        {/* Trust row */}
        <div className="hero-stats" style={{ display:'flex', gap:0, justifyContent:'center', flexWrap:'wrap', paddingTop:24, borderTop:'1px solid rgba(255,255,255,0.08)', marginBottom:0 }}>
          {[
            { v:'500+', l:'หอพักที่ใช้งาน', c:'#2DC76D' },
            { v:'10K+', l:'ผู้เช่าลงทะเบียน', c:'#00B8A2' },
            { v:'99.9%', l:'Uptime', c:'#FF9800' },
          ].map((s, i) => (
            <div key={s.l} style={{ display:'flex', alignItems:'center', gap:0 }}>
              {i > 0 && <span className="stat-sep" style={{ color:'rgba(255,255,255,0.15)', padding:'0 20px', fontFamily:'Sarabun,sans-serif' }}>|</span>}
              <span style={{ fontFamily:'Sarabun,sans-serif', fontSize:13, color:'rgba(255,255,255,0.55)' }}>
                <span style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:15, color:s.c }}>{s.v}</span>
                {' '}{s.l}
              </span>
            </div>
          ))}
        </div>

        {/* Dashboard preview — hidden on small mobile via CSS */}
        <div className="dashboard-wrap">
          <DashboardPreview />
        </div>
      </W>
    </section>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon:P.home,    c:'#2DC76D', bg:'rgba(45,199,109,0.1)',  title:'จัดการห้องพัก',      desc:'ดูสถานะห้องพักแบบ Real-time ว่าง เช่าแล้ว ซ่อม จัดการทุกห้องในหน้าเดียว' },
  { icon:P.user,    c:'#1E88E5', bg:'rgba(30,136,229,0.1)',  title:'บริหารผู้เช่า',       desc:'เก็บข้อมูลครบ สัญญาเช่า เอกสาร ประวัติการชำระเงินของผู้เช่าแต่ละราย' },
  { icon:P.doc,     c:'#1565C0', bg:'rgba(21,101,192,0.08)', title:'สัญญาเช่าออนไลน์',   desc:'สร้างและจัดเก็บสัญญาในระบบ ค้นหาง่าย ไม่ต้องใช้กระดาษ' },
  { icon:P.card,    c:'#00B8A2', bg:'rgba(0,184,162,0.1)',   title:'ระบบการเงิน',         desc:'สร้างใบแจ้งหนี้อัตโนมัติ ติดตามรายรับ-รายจ่าย แจ้งเตือนเมื่อถึงกำหนดชำระ' },
  { icon:P.bolt,    c:'#FF9800', bg:'rgba(255,152,0,0.1)',   title:'คำนวณค่าน้ำค่าไฟ',   desc:'บันทึกมิเตอร์แล้วคำนวณอัตโนมัติ แยกรายการชัดเจนทุกเดือน' },
  { icon:P.chart,   c:'#9C27B0', bg:'rgba(156,39,176,0.08)', title:'รายงานและสถิติ',      desc:'ภาพรวมรายได้ อัตราการเช่า และค่าใช้จ่ายในกราฟที่เข้าใจง่าย ดูได้ทุกที่' },
  { icon:P.bell,    c:'#E53935', bg:'rgba(229,57,53,0.08)',  title:'แจ้งเตือนอัตโนมัติ', desc:'ส่งแจ้งเตือนค่าเช่าผ่าน LINE และ SMS ให้ผู้เช่าโดยอัตโนมัติ' },
  { icon:P.shield,  c:'#2DC76D', bg:'rgba(45,199,109,0.08)', title:'ระบบเสถียร ปลอดภัย', desc:'เข้ารหัส SSL ทุกชั้น สำรองข้อมูลอัตโนมัติทุกวัน รับประกัน Uptime 99.9%' },
]

function Features() {
  return (
    <section id="features" style={{ background:'#fff', padding:'88px 0' }}>
      <W>
        <div className="reveal" style={{ textAlign:'center', marginBottom:52 }}>
          <SectionPill icon={P.bolt} label="คุณสมบัติ" color="#2DC76D" />
          <h2 style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:'clamp(1.7rem,2.6vw,2.3rem)', color:'#1A2433', lineHeight:1.25 }}>
            ฟีเจอร์ครบ จบทุกการจัดการหอพัก
          </h2>
          <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:15.5, color:'#546E7A', marginTop:12, maxWidth:480, margin:'12px auto 0', lineHeight:1.75 }}>
            ออกแบบมาเพื่อเจ้าของหอพักโดยเฉพาะ ใช้งานง่าย ไม่ต้องมีความรู้ด้าน IT
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(248px,1fr))', gap:14 }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`card-hover reveal reveal-d${Math.min(i % 4 + 1, 4)}`}
              style={{ background:'#fff', borderRadius:14, padding:'22px 22px', border:'1px solid rgba(0,184,162,0.1)', boxShadow:'0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ width:38, height:38, borderRadius:10, background:f.bg, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                <Ic d={f.icon} size={18} color={f.c} />
              </div>
              <h3 style={{ fontFamily:'Kanit,sans-serif', fontWeight:600, fontSize:14.5, color:'#1A2433', marginBottom:7 }}>{f.title}</h3>
              <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:13, color:'#546E7A', lineHeight:1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </W>
    </section>
  )
}

// ── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'คุณสมชาย วงศ์ทอง',
    role: 'เจ้าของหอพัก 45 ห้อง • จ.เชียงใหม่',
    text: 'ก่อนใช้ HorCare ต้องนั่งคีย์ Excel ทุกสิ้นเดือน ใช้เวลาเกือบวัน ตอนนี้ระบบทำให้ทุกอย่างอัตโนมัติ เหลือแค่คลิกยืนยัน ประหยัดเวลาไปได้มากจริงๆ',
    avatar: 'ส', color: '#2DC76D',
  },
  {
    name: 'คุณนภาพร รักษ์ถิ่น',
    role: 'เจ้าของหอพัก 120 ห้อง • กรุงเทพฯ',
    text: 'ฟีเจอร์แจ้งเตือนผ่าน LINE ทำให้ผู้เช่าจ่ายตรงเวลามากขึ้นมาก เมื่อก่อนต้องโทรทวงทีละคน ตอนนี้หมดปัญหานั้นไปเลย ทีมซัพพอร์ตตอบไวมากด้วย',
    avatar: 'น', color: '#00B8A2',
  },
  {
    name: 'คุณวีระ ชัยชนะ',
    role: 'เจ้าของหอพักนักศึกษา 80 ห้อง • จ.ขอนแก่น',
    text: 'ย้ายจาก Excel มาได้ภายในชั่วโมงเดียว ข้อมูลครบหมด ไม่มีตกหล่น ชอบที่สุดคือดูรายงานรายได้แบบ Real-time ได้เลย ไม่ต้องรอสิ้นเดือน',
    avatar: 'ว', color: '#1E88E5',
  },
]

function Testimonials() {
  return (
    <section style={{ background: '#F8FAFB', padding: '88px 0' }}>
      <W>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
          <SectionPill icon={P.star} label="รีวิวจากผู้ใช้จริง" color="#FF9800" />
          <h2 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 'clamp(1.7rem,2.6vw,2.3rem)', color: '#1A2433', lineHeight: 1.25 }}>
            เจ้าของหอพักทั่วไทยไว้วางใจ
          </h2>
          <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 15.5, color: '#546E7A', marginTop: 12, lineHeight: 1.75 }}>
            ความเชื่อมั่นจากผู้ใช้งานจริงคือสิ่งที่เราภูมิใจที่สุด
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(290px,100%),1fr))', gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={`card-hover reveal reveal-d${i + 1}`}
              style={{ background: '#fff', borderRadius: 18, padding: '28px 26px', border: '1px solid rgba(0,184,162,0.1)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#FFB300" stroke="none" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 14.5, color: '#374151', lineHeight: 1.8, flex: 1, marginBottom: 22 }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${t.color}1A`, border: `2px solid ${t.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 17, color: t.color }}>{t.avatar}</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 14, color: '#1A2433' }}>{t.name}</div>
                  <div style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 12, color: '#90A4AE', marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </W>
    </section>
  )
}

// ── How To Use ────────────────────────────────────────────────────────────────
const STEPS = [
  { n:'01', title:'สมัครและตั้งค่า',    desc:'สร้างบัญชีฟรี กรอกข้อมูลหอพัก เพิ่มชั้นและห้องได้ภายในไม่กี่นาที', c:'#2DC76D' },
  { n:'02', title:'เพิ่มข้อมูลผู้เช่า', desc:'บันทึกข้อมูลผู้เช่า อัปโหลดเอกสาร สร้างสัญญาเช่าออนไลน์ได้ทันที',   c:'#00B8A2' },
  { n:'03', title:'จัดการค่าใช้จ่าย',  desc:'บันทึกมิเตอร์น้ำ-ไฟ ระบบคำนวณและสร้างใบแจ้งหนี้อัตโนมัติทุกเดือน', c:'#1E88E5' },
  { n:'04', title:'ติดตามผลลัพธ์',      desc:'ดูรายงานรายได้ สถิติ และภาพรวมหอพักผ่าน Dashboard แบบ Real-time',   c:'#1565C0' },
]

function HowToUse() {
  return (
    <section id="how-to-use" style={{ background:'linear-gradient(150deg,#E0FBF0,#C8EEE7 60%,#DDE8FB)', padding:'88px 0' }}>
      <W>
        <div className="reveal" style={{ textAlign:'center', marginBottom:56 }}>
          <SectionPill icon={P.chart} label="วิธีใช้งาน" color="#00B8A2" />
          <h2 style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:'clamp(1.7rem,2.6vw,2.3rem)', color:'#1A2433', lineHeight:1.25 }}>
            เริ่มใช้งานง่าย ไม่ต้องติดตั้งโปรแกรม
          </h2>
          <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:15.5, color:'#546E7A', marginTop:12, lineHeight:1.75 }}>
            ตั้งค่าเสร็จพร้อมใช้งานได้ภายในไม่กี่นาที
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:32, marginBottom:48, position:'relative' }}>
          {STEPS.map((s, i) => (
            <div key={s.n} className={`reveal reveal-d${i + 1}`} style={{ textAlign:'center', position:'relative' }}>
              {/* Step circle */}
              <div style={{ width:56, height:56, borderRadius:'50%', background:`linear-gradient(135deg,${s.c},${s.c}BB)`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 18px', boxShadow:`0 8px 24px ${s.c}40` }}>
                <span style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:16, color:'white' }}>{s.n}</span>
              </div>
              <h3 style={{ fontFamily:'Kanit,sans-serif', fontWeight:600, fontSize:15.5, color:'#1A2433', marginBottom:10 }}>{s.title}</h3>
              <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:13.5, color:'#546E7A', lineHeight:1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign:'center' }}>
          <a href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
            className="btn-orange"
            style={{ gap:8, padding:'14px 36px', borderRadius:100, fontSize:15, fontFamily:'Kanit,sans-serif', fontWeight:700, textDecoration:'none', boxShadow:'0 6px 20px rgba(255,152,0,0.35)' }}>
            เริ่มต้นได้เลย <Ic d={P.arrow} size={16} color="white" />
          </a>
        </div>
      </W>
    </section>
  )
}

// ── Pricing ───────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name:'ฟรีเสมอ', size:'สูงสุด 250 ห้อง', price:'0', unit:'ไม่มีค่าใช้จ่าย',
    badge:'ออกจาก Excel',
    features:[
      'จัดการห้องพักสูงสุด 250 ห้อง',
      'บริหารผู้เช่าพร้อมสัญญาเช่า',
      'คำนวณค่าน้ำค่าไฟอัตโนมัติ',
      'ใบแจ้งหนี้ดิจิทัล',
      'นำเข้า / ส่งออก Excel/CSV',
      'ผู้ใช้งาน 1 คน',
      'ไม่รองรับแจ้งเตือนผ่าน LINE',
    ],
    cta:'สมัครฟรี ไม่ต้องใช้บัตร', hi:false, c:'#546E7A', href:HORCARE_URL, ext:true,
  },
  {
    name:'Start', size:'ไม่เกิน 50 ห้อง', price:'79', unit:'บาท / ห้อง / เดือน',
    features:[
      'ระบบจัดการหอพักครบวงจร',
      'ผู้ใช้งานไม่เกิน 2 คน',
      'ส่งบิลและแจ้งเตือนผ่าน LINE',
      'ฟีเจอร์พื้นฐานครบครัน',
      'ซัพพอร์ตผ่านระบบ',
    ],
    cta:'เริ่มใช้งาน', hi:false, c:'#2DC76D', href:HORCARE_URL, ext:true,
  },
  {
    name:'Plus', size:'ไม่เกิน 200 ห้อง', price:'259', unit:'บาท / ห้อง / เดือน',
    badge:'ยอดนิยม',
    features:[
      'ระบบจัดการหอพักครบวงจร',
      'ผู้ใช้งานไม่เกิน 5 คน',
      'ส่งบิลและแจ้งเตือนผ่าน LINE',
      'รายงานเชิงลึก',
      'ซัพพอร์ตแบบพรีเมียม',
    ],
    cta:'เริ่มใช้งาน', hi:true, c:'#00B8A2', href:HORCARE_URL, ext:true,
  },
  {
    name:'Pro', size:'200+ ห้อง', price:'399', unit:'บาท / ห้อง / เดือน',
    badge:'Premium',
    features:[
      'ระบบจัดการหอพักครบวงจร',
      'ผู้ใช้งานไม่จำกัด',
      'ส่งบิลผ่าน LINE ปุ่มเดียว',
      'ฟีเจอร์ทุกฟังก์ชัน + API',
      'รายงานเชิงลึก + Export ข้อมูล',
      'Dedicated Support ตลอด 24 ชม.',
    ],
    cta:'ติดต่อทีมงาน', hi:false, c:'#F57C00', href:'#contact', ext:false,
  },
]

function Pricing() {
  return (
    <section id="pricing" style={{ background:'#fff', padding:'88px 0' }}>
      <W>
        <div className="reveal" style={{ textAlign:'center', marginBottom:16 }}>
          <SectionPill icon={P.card} label="ราคา" color="#1565C0" />
          <h2 style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:'clamp(1.7rem,2.6vw,2.3rem)', color:'#1A2433' }}>
            เลือกแพ็กเกจให้เหมาะกับหอพักคุณ
          </h2>
          <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:14, color:'#90A4AE', marginTop:8 }}>
            ราคายังไม่รวมภาษีมูลค่าเพิ่ม • ไม่มีสัญญาผูกมัด • ยกเลิกได้ทุกเมื่อ
          </p>
        </div>

        {/* Excel conversion banner */}
        <div style={{
          display:'flex', alignItems:'center', gap:12, justifyContent:'center', flexWrap:'wrap',
          background:'linear-gradient(135deg,rgba(45,199,109,0.07),rgba(0,184,162,0.07))',
          border:'1px solid rgba(45,199,109,0.2)', borderRadius:12,
          padding:'14px 24px', marginBottom:48,
        }}>
          <Ic d={P.doc} size={16} color='#2DC76D' />
          <span style={{ fontFamily:'Sarabun,sans-serif', fontSize:14, color:'#1A2433' }}>
            <strong style={{ fontFamily:'Kanit,sans-serif', color:'#2DC76D' }}>ใช้ Excel จัดการหอพักอยู่?</strong>
            {' '}เปลี่ยนมาใช้ HorCare ได้เลย ฟรี — นำเข้าข้อมูลจาก Excel/CSV ได้ภายใน 15 นาที
          </span>
          <a href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:'Kanit,sans-serif', fontWeight:600, fontSize:13, color:'#00B8A2', textDecoration:'none', whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:4 }}>
            เริ่มเลย <Ic d={P.arrow} size={12} color='#00B8A2' />
          </a>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))', gap:16, alignItems:'center' }}>
          {PLANS.map(p => (
            <div key={p.name} className={p.hi ? 'pricing-featured' : ''}
              style={{
                background:'#fff', borderRadius:16, padding:24, position:'relative',
                border: p.hi ? `2px solid ${p.c}` : '1px solid rgba(0,0,0,0.08)',
                boxShadow: p.hi ? `0 20px 48px ${p.c}22` : '0 2px 12px rgba(0,0,0,0.04)',
                transform: p.hi ? 'translateY(-8px)' : 'none',
              }}>
              {p.badge && (
                <span style={{
                  position:'absolute', top:-13, left:'50%', transform:'translateX(-50%)',
                  background: p.badge === 'Premium'
                    ? 'linear-gradient(135deg,#F57C00,#FFB300)'
                    : p.badge === 'ออกจาก Excel'
                    ? 'linear-gradient(135deg,#546E7A,#78909C)'
                    : 'linear-gradient(135deg,#2DC76D,#00B8A2)',
                  color:'white', fontSize:10, fontFamily:'Kanit,sans-serif', fontWeight:700,
                  padding:'3px 12px', borderRadius:100, whiteSpace:'nowrap',
                }}>{p.badge === 'Premium' ? '★ Premium' : p.badge}</span>
              )}

              <div style={{ marginBottom:14 }}>
                <div style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:17, color:'#1A2433' }}>{p.name}</div>
                <div style={{ fontFamily:'Sarabun,sans-serif', fontSize:12, color:'#90A4AE', marginTop:2 }}>{p.size}</div>
              </div>

              <div style={{ textAlign:'center', marginBottom:18, padding:'14px 0', borderTop:'1px solid #f5f5f5', borderBottom:'1px solid #f5f5f5' }}>
                <div style={{ display:'flex', alignItems:'baseline', justifyContent:'center', gap:2 }}>
                  {p.price !== '0' && <span style={{ fontFamily:'Sarabun,sans-serif', fontSize:13, color:'#90A4AE' }}>฿</span>}
                  <span style={{ fontFamily:'Kanit,sans-serif', fontWeight:800, fontSize:36, color: p.price === '0' ? '#2DC76D' : p.c }}>
                    {p.price === '0' ? 'ฟรี' : p.price}
                  </span>
                </div>
                <div style={{ fontFamily:'Sarabun,sans-serif', fontSize:12, color:'#90A4AE' }}>{p.unit}</div>
              </div>

              <ul style={{ listStyle:'none', marginBottom:18, display:'flex', flexDirection:'column', gap:9 }}>
                {p.features.map(f => {
                  const isNo = f.startsWith('ไม่รองรับ')
                  return (
                    <li key={f} style={{ display:'flex', alignItems:'flex-start', gap:8, fontFamily:'Sarabun,sans-serif', fontSize:12.5, color: isNo ? '#B0BEC5' : '#374151' }}>
                      <div style={{ width:16, height:16, borderRadius:'50%', background: isNo ? 'rgba(0,0,0,0.04)' : `${p.price === '0' ? '#2DC76D' : p.c}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>
                        <Ic d={isNo ? P.close : P.check} size={9} color={isNo ? '#B0BEC5' : (p.price === '0' ? '#2DC76D' : p.c)} />
                      </div>
                      {f}
                    </li>
                  )
                })}
              </ul>

              <a
                href={p.href}
                {...(p.ext ? { target:'_blank', rel:'noopener noreferrer' } : {})}
                style={{
                  display:'block', textAlign:'center', padding:'11px 0', borderRadius:100,
                  fontFamily:'Kanit,sans-serif', fontWeight:600, fontSize:13.5, textDecoration:'none',
                  background: p.hi ? `linear-gradient(135deg,#2DC76D,#00B8A2)` : 'transparent',
                  color: p.hi ? 'white' : (p.price === '0' ? '#546E7A' : p.c),
                  border: p.hi ? 'none' : `1.5px solid ${p.price === '0' ? '#90A4AE' : p.c}`,
                  transition:'all 0.15s',
                }}
                onMouseEnter={e => { if (!p.hi) { e.currentTarget.style.background = p.price === '0' ? '#546E7A' : p.c; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'transparent' }}}
                onMouseLeave={e => { if (!p.hi) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = p.price === '0' ? '#546E7A' : p.c; e.currentTarget.style.borderColor = p.price === '0' ? '#90A4AE' : p.c }}}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <div style={{ marginTop:36, display:'flex', gap:24, justifyContent:'center', flexWrap:'wrap' }}>
          {['ราคาโปร่งใส ไม่มีซ่อน','ไม่มีสัญญาผูกมัด','ซัพพอร์ตตลอดการใช้งาน','ระบบเสถียร Uptime 99.9%'].map(t => (
            <span key={t} style={{ display:'flex', alignItems:'center', gap:6, fontFamily:'Sarabun,sans-serif', fontSize:13, color:'#90A4AE' }}>
              <Ic d={P.check} size={13} color='#2DC76D' />{t}
            </span>
          ))}
        </div>
      </W>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  { q:'มีแพ็กเกจฟรีจริงไหม? มีเงื่อนไขอะไรบ้าง?', a:'มีจริง ไม่มีวันหมดอายุ รองรับห้องพักได้ถึง 250 ห้อง ใช้งานได้ 1 บัญชี ครบทุกฟีเจอร์ที่ Excel ทำได้ ทั้งจัดการห้อง ผู้เช่า ค่าน้ำค่าไฟ ใบแจ้งหนี้ และสัญญาเช่า ข้อเดียวที่ไม่มีคือการแจ้งเตือนผ่าน LINE ไม่ต้องใช้บัตรเครดิต' },
  { q:'ย้ายจาก Excel มาใช้ HorCare ได้เลยไหม?', a:'ได้เลย รองรับนำเข้าข้อมูลจาก Excel/CSV ทั้งข้อมูลผู้เช่า ห้องพัก และประวัติการชำระเงิน ทีมงานพร้อมช่วย Migration ฟรีสำหรับแพ็กเกจหอกลางขึ้นไป' },
  { q:'คิดราคาอย่างไร? อัปเกรดหรือยกเลิกได้ไหม?', a:'เริ่มฟรีสำหรับ ≤250 ห้อง (ไม่มี LINE) แพ็กเกจที่มี LINE: Start ฿79/ห้อง/เดือน (≤50 ห้อง), Plus ฿259/ห้อง/เดือน (≤200 ห้อง), Pro ฿399/ห้อง/เดือน (200+ ห้อง) อัปเกรด ดาวน์เกรด หรือยกเลิกได้ทุกเมื่อ ราคายังไม่รวม VAT' },
  { q:'ข้อมูลของฉันปลอดภัยแค่ไหน?', a:'ข้อมูลทุกอย่างเข้ารหัส SSL/TLS มีระบบสำรองข้อมูลอัตโนมัติทุกวัน ข้อมูลของคุณจะไม่ถูกแชร์หรือขายให้บุคคลที่สาม' },
  { q:'ผู้เช่าต้องดาวน์โหลดแอปไหม?', a:'ไม่จำเป็น ผู้เช่าเข้าถึงระบบผ่านเบราว์เซอร์บนมือถือหรือคอมพิวเตอร์ได้เลย ไม่ต้องติดตั้งอะไรเพิ่ม' },
  { q:'ติดต่อซัพพอร์ตได้ทางไหน?', a:'ติดต่อผ่าน LINE @horcare ทีมงานพร้อมตอบในวันจันทร์–ศุกร์ 09:00–18:00 น. และวันเสาร์ 09:00–13:00 น. ตอบกลับภายใน 2 ชั่วโมง' },
  { q:'โปรแกรมจัดการหอพักต่างจากใช้ Excel อย่างไร?', a:'Excel ต้องคีย์ข้อมูลเองทุกขั้นตอน เสี่ยงผิดพลาด และไม่มีการแจ้งเตือนอัตโนมัติ ส่วน HorCare สร้างบิล คำนวณค่าน้ำค่าไฟ และส่งแจ้งเตือนผ่าน LINE ได้อัตโนมัติ ประหยัดเวลาได้ 15–20 ชั่วโมงต่อเดือน และลดข้อผิดพลาดในการคำนวณได้ 95%' },
  { q:'จัดการหอพักหลายสาขาในบัญชีเดียวได้ไหม?', a:'ได้ครับ แพ็กเกจ Pro รองรับการจัดการหอพักหลายสาขาจาก Dashboard เดียว ดูภาพรวมรายได้ อัตราการเช่า และสถานะห้องพักทุกสาขาในหน้าเดียว โดยไม่ต้องสลับบัญชี' },
  { q:'ผู้เช่าสามารถดูใบแจ้งหนี้และยอดค้างชำระออนไลน์ได้ไหม?', a:'ได้ครับ ผู้เช่าสามารถดูใบแจ้งหนี้ ยอดค้างชำระ และประวัติการชำระเงินผ่านเบราว์เซอร์บนมือถือได้เลย ไม่ต้องดาวน์โหลดแอป และยังได้รับแจ้งเตือนผ่าน LINE โดยอัตโนมัติ' },
  { q:'HorCare ใช้งานบนมือถือได้ไหม?', a:'ได้ HorCare เป็น Web Application ที่ออกแบบมาให้ใช้งานได้ดีทั้งบน smartphone แท็บเล็ต และคอมพิวเตอร์ ไม่ต้องติดตั้งแอปเพิ่มเติม เปิดเบราว์เซอร์ก็ใช้งานได้ทันที' },
  { q:'มีช่วงทดลองใช้ฟรีหรือไม่? ต้องผูกบัตรเครดิตไหม?', a:'แพ็กเกจฟรีไม่มีวันหมดอายุ ไม่ต้องใส่บัตรเครดิต ทดลองใช้ได้เลยทันทีโดยไม่มีเงื่อนไข รองรับสูงสุด 250 ห้อง ครบทุกฟีเจอร์ยกเว้นการแจ้งเตือน LINE เมื่อพร้อมจึงค่อยอัปเกรด' },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" style={{ background:'linear-gradient(150deg,#E0FBF0,#C8EEE7 60%,#DDE8FB)', padding:'88px 0' }}>
      <W>
        <div className="reveal" style={{ textAlign:'center', marginBottom:48 }}>
          <SectionPill icon={P.chat} label="คำถามที่พบบ่อย" color="#00B8A2" />
          <h2 style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:'clamp(1.7rem,2.6vw,2.3rem)', color:'#1A2433' }}>
            มีคำถาม? เราตอบได้
          </h2>
          <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:15.5, color:'#546E7A', marginTop:12, lineHeight:1.75 }}>
            คำถามที่ผู้ใช้งานถามบ่อยที่สุด
          </p>
        </div>

        <div style={{ maxWidth:700, margin:'0 auto', display:'flex', flexDirection:'column', gap:10 }}>
          {FAQS.map((f, i) => (
            <div key={i} className="reveal" style={{
              background:'#fff', borderRadius:14, overflow:'hidden',
              border: open === i ? '1.5px solid #00B8A2' : '1px solid rgba(0,184,162,0.14)',
              boxShadow: open === i ? '0 4px 20px rgba(0,184,162,0.1)' : '0 1px 4px rgba(0,0,0,0.03)',
              transition:'border-color 0.22s, box-shadow 0.22s',
            }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 20px', gap:16, background:'none', border:'none', cursor:'pointer', textAlign:'left' }}>
                <span style={{ fontFamily:'Kanit,sans-serif', fontWeight:500, fontSize:15, color: open === i ? '#00B8A2' : '#1A2433', transition:'color 0.2s' }}>{f.q}</span>
                <span style={{
                  width:30, height:30, borderRadius:'50%', flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background: open === i ? 'rgba(0,184,162,0.15)' : 'rgba(0,184,162,0.07)',
                  color:'#00B8A2', transition:'transform 0.25s ease, background 0.2s',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                }}>
                  <svg width="11" height="11" viewBox="0 0 10 10" fill="currentColor">
                    <rect x="4.5" y="0" width="1" height="10"/>
                    <rect x="0" y="4.5" width="10" height="1"/>
                  </svg>
                </span>
              </button>
              <div className={`faq-body${open === i ? ' open' : ''}`}>
                <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:14, color:'#546E7A', lineHeight:1.75 }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </W>
    </section>
  )
}

// ── Blog ──────────────────────────────────────────────────────────────────────

function ArticleCard({ a }) {
  return (
    <Link
      to={`/blog/${a.slug}`}
      className="card-hover"
      style={{ background:'#fff', borderRadius:14, overflow:'hidden', border:'1px solid rgba(0,184,162,0.12)', textDecoration:'none', display:'block' }}
    >
      <div style={{ height:140, background:a.grad, padding:14, display:'flex', alignItems:'flex-end' }}>
        <span style={{ fontFamily:'Kanit,sans-serif', fontSize:11, fontWeight:600, color:a.cc, background:a.cb, border:`1px solid ${a.cc}25`, padding:'3px 10px', borderRadius:100 }}>
          {a.cat}
        </span>
      </div>
      <div style={{ padding:18 }}>
        <h3 style={{ fontFamily:'Kanit,sans-serif', fontWeight:600, fontSize:14, color:'#1A2433', marginBottom:7, lineHeight:1.45 }}>{a.title}</h3>
        <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:12.5, color:'#546E7A', lineHeight:1.6, marginBottom:14, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{a.desc}</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontFamily:'Sarabun,sans-serif', fontSize:11, color:'#90A4AE' }}>{a.date}</span>
          <span style={{ fontFamily:'Sarabun,sans-serif', fontSize:11, color:a.cc, fontWeight:600 }}>อ่าน {a.min} นาที →</span>
        </div>
      </div>
    </Link>
  )
}

function Blog() {
  return (
    <section id="blog" style={{ background:'#fff', padding:'88px 0' }}>
      <W>
        <div className="reveal" style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:48, flexWrap:'wrap', gap:12 }}>
          <div>
            <SectionPill icon={P.doc} label="บทความ" color="#1565C0" />
            <h2 style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:'clamp(1.7rem,2.6vw,2.3rem)', color:'#1A2433' }}>
              ความรู้สำหรับเจ้าของหอพัก
            </h2>
          </div>
          <Link to="/blog"
            style={{ fontFamily:'Sarabun,sans-serif', fontSize:13, fontWeight:600, color:'#00B8A2', textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
            ดูทั้งหมด ({ARTICLES.length}) <Ic d={P.arrow} size={13} color="#00B8A2" />
          </Link>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(280px,100%),1fr))', gap:16 }}>
          {ARTICLES.slice(0, 3).map(a => <ArticleCard key={a.slug} a={a} />)}
        </div>
      </W>
    </section>
  )
}

// ── Contact ───────────────────────────────────────────────────────────────────
function LineImg({ size = 32 }) {
  return <img src="/line-logo.svg" width={size} height={size} alt="LINE" style={{ display: 'block' }} />
}

function Contact() {
  return (
    <section id="contact" style={{ background: '#F8FAFB', padding: '88px 0' }}>
      <W>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
          <SectionPill icon={P.headset} label="ติดต่อเรา" color="#1E88E5" />
          <h2 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 'clamp(1.7rem,2.6vw,2.3rem)', color: '#1A2433', lineHeight: 1.25 }}>
            พร้อมช่วยเหลือคุณเสมอ
          </h2>
          <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 15.5, color: '#546E7A', marginTop: 12, maxWidth: 440, margin: '12px auto 0', lineHeight: 1.75 }}>
            มีคำถาม ต้องการสาธิต หรืออยากแจ้งปัญหา ทีมงานเราพร้อมดูแลทุกเรื่อง
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20, maxWidth: 880, margin: '0 auto' }}>

          {/* LINE card */}
          <div style={{
            borderRadius: 16, padding: '32px 24px', textAlign: 'center',
            background: '#fff',
            border: '1px solid rgba(6,199,85,0.2)',
            boxShadow: '0 4px 24px rgba(6,199,85,0.08)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: '#06C755', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: '0 4px 16px rgba(6,199,85,0.3)' }}>
              <LineImg size={36} />
            </div>
            <h3 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 17, color: '#1A2433', marginBottom: 8 }}>ติดต่อผ่าน LINE</h3>
            <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13.5, color: '#546E7A', lineHeight: 1.7, marginBottom: 20, flex: 1 }}>
              สอบถามข้อมูล ขอราคา ทดสอบระบบ<br />หรือนัดสาธิตการใช้งานกับทีมงาน
            </p>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: '#06C755', color: 'white', textDecoration: 'none',
                fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 14,
                padding: '10px 28px', borderRadius: 100, width: '100%', boxSizing: 'border-box',
                boxShadow: '0 3px 12px rgba(6,199,85,0.3)',
                transition: 'filter 0.15s, transform 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.08)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none' }}>
              <LineImg size={16} />
              เพิ่มเพื่อนใน LINE
            </a>
          </div>

          {/* Complaint card */}
          <div style={{
            borderRadius: 16, padding: '32px 24px', textAlign: 'center',
            background: '#fff',
            border: '1px solid rgba(245,124,0,0.18)',
            boxShadow: '0 4px 24px rgba(245,124,0,0.07)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg,#FF9800,#F57C00)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: '0 4px 16px rgba(255,152,0,0.3)' }}>
              <Ic d={P.exclaim} size={28} color="white" />
            </div>
            <h3 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 17, color: '#1A2433', marginBottom: 8 }}>แจ้งปัญหา / ร้องเรียน</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, textAlign: 'left', marginBottom: 20, width: '100%', flex: 1 }}>
              {['แจ้งบั๊กหรือข้อผิดพลาดของระบบ','ร้องเรียนการบริการ','ขอความช่วยเหลือเร่งด่วน','ให้ข้อเสนอแนะเพื่อพัฒนาระบบ'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,152,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Ic d={P.check} size={10} color="#F57C00" />
                  </div>
                  <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: '#546E7A' }}>{item}</span>
                </div>
              ))}
            </div>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: '#F57C00', color: 'white', textDecoration: 'none',
                fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 14,
                padding: '10px 28px', borderRadius: 100, width: '100%', boxSizing: 'border-box',
                boxShadow: '0 3px 12px rgba(245,124,0,0.3)',
                transition: 'filter 0.15s, transform 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.08)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none' }}>
              <Ic d={P.chat} size={15} color="white" />
              แจ้งปัญหาผ่าน LINE
            </a>
          </div>

          {/* Response time card */}
          <div style={{
            borderRadius: 16, padding: '32px 24px', textAlign: 'center',
            background: '#fff',
            border: '1px solid rgba(21,101,192,0.15)',
            boxShadow: '0 4px 24px rgba(21,101,192,0.07)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg,#1E88E5,#1565C0)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: '0 4px 16px rgba(30,136,229,0.3)' }}>
              <Ic d={P.headset} size={28} color="white" />
            </div>
            <h3 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 17, color: '#1A2433', marginBottom: 8 }}>เวลาตอบกลับ</h3>
            <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13.5, color: '#546E7A', lineHeight: 1.7, marginBottom: 20 }}>
              ทีมงานพร้อมให้ความช่วยเหลือ<br />ในวันและเวลาทำการ
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', flex: 1 }}>
              {[
                { label: 'จันทร์ – ศุกร์', val: '09:00 – 18:00 น.', c: '#1E88E5' },
                { label: 'วันเสาร์',       val: '09:00 – 13:00 น.', c: '#00B8A2' },
                { label: 'ตอบกลับภายใน',   val: '≤ 2 ชั่วโมง',     c: '#2DC76D' },
              ].map(r => (
                <div key={r.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: '#F8FAFB', borderRadius: 10, padding: '10px 14px',
                }}>
                  <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: '#546E7A' }}>{r.label}</span>
                  <span style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 13, color: r.c }}>{r.val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </W>
    </section>
  )
}

// ── CTA Banner ────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section style={{ background:'linear-gradient(135deg,#2DC76D 0%,#00B8A2 50%,#1565C0 100%)', padding:'72px 0' }}>
      <W style={{ textAlign:'center' }}>
        <h2 style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, color:'white', fontSize:'clamp(1.7rem,3vw,2.5rem)', lineHeight:1.2, marginBottom:14 }}>
          พร้อมเริ่มใช้งานแล้วหรือยัง?
        </h2>
        <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:16, color:'rgba(255,255,255,0.8)', marginBottom:28 }}>
          สมัครใน 2 นาที ไม่ต้องใช้บัตรเครดิต เริ่มจัดการหอพักได้ทันที
        </p>
        <a href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
          style={{ display:'inline-flex', alignItems:'center', gap:10, background:'white', padding:'14px 36px', borderRadius:100, fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:16, color:'#00B8A2', textDecoration:'none', boxShadow:'0 8px 32px rgba(0,0,0,0.15)', transition:'transform 0.15s, box-shadow 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.15)' }}>
          เริ่มใช้งาน HorCare ฟรี
          <Ic d={P.arrow} size={18} color="#00B8A2" />
        </a>
        <div style={{ display:'flex', justifyContent:'center', gap:24, marginTop:20, flexWrap:'wrap' }}>
          {['คุ้มค่า','ใช้ง่าย','จบในระบบเดียว'].map(t => (
            <span key={t} style={{ display:'flex', alignItems:'center', gap:6, fontFamily:'Sarabun,sans-serif', fontSize:13, color:'rgba(255,255,255,0.7)' }}>
              <Ic d={P.check} size={13} color="rgba(255,255,255,0.8)" />{t}
            </span>
          ))}
        </div>
      </W>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
const FOOTER_COLS = [
  { title:'ผลิตภัณฑ์', items:[
    { label:'คุณสมบัติ',    href:'#features' },
    { label:'ราคา',         href:'#pricing' },
    { label:'วิธีใช้งาน',  href:'#how-to-use' },
    { label:'เข้าสู่ระบบ', href:HORCARE_URL, ext:true },
  ]},
  { title:'บริษัท', items:[
    { label:'บทความ',         href:'#blog' },
    { label:'ติดต่อเรา',      href:'#contact' },
    { label:'ซัพพอร์ต',      href:'#contact' },
    { label:'ร่วมงานกับเรา', href:LINE_URL, ext:true },
  ]},
  { title:'ช่วยเหลือ', items:[
    { label:'คำถามที่พบบ่อย', href:'#faq' },
    { label:'คู่มือการใช้งาน', href:HORCARE_URL, ext:true },
    { label:'แจ้งปัญหา',      href:LINE_URL, ext:true },
    { label:'สถานะระบบ',      href:HORCARE_URL, ext:true },
  ]},
]

function Footer() {
  return (
    <footer style={{ background:'#1A2433', paddingTop:52, paddingBottom:28 }}>
      <W>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:32, marginBottom:40 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
              <Logo size={40} /><LogoText dark={false} />
            </div>
            <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:13, color:'#90A4AE', lineHeight:1.7, marginBottom:14 }}>
              ระบบจัดการหอพักครบวงจร<br />สำหรับเจ้าของหอพักยุคใหม่
            </p>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:'Sarabun,sans-serif', fontSize:12, color:'#90A4AE', textDecoration:'none', display:'block', marginBottom:3 }}
              onMouseEnter={e => e.currentTarget.style.color='#00B8A2'}
              onMouseLeave={e => e.currentTarget.style.color='#90A4AE'}>
              <span style={{ fontWeight:600, color:'#00B8A2' }}>LINE:</span> @horcare
            </a>
            <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:12, color:'#90A4AE', marginBottom:3 }}>
              <span style={{ fontWeight:600, color:'#00B8A2' }}>Web:</span> horcare-landing.vercel.app
            </p>
          </div>
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily:'Kanit,sans-serif', fontWeight:600, fontSize:13, color:'white', marginBottom:14 }}>{col.title}</h4>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:9 }}>
                {col.items.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      {...(item.ext ? { target:'_blank', rel:'noopener noreferrer' } : {})}
                      style={{ fontFamily:'Sarabun,sans-serif', fontSize:13, color:'#90A4AE', textDecoration:'none', transition:'color 0.15s' }}
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

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:20, borderTop:'1px solid rgba(255,255,255,0.07)', flexWrap:'wrap', gap:10 }}>
          <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:12, color:'#546E7A' }}>© 2026 HorCare. สงวนลิขสิทธิ์</p>
          <div style={{ display:'flex', gap:20 }}>
            {[
              { label:'นโยบายความเป็นส่วนตัว', href:'/privacy', ext:false },
              { label:'เงื่อนไขการใช้งาน',      href:'/terms',   ext:false },
            ].map(l => (
              <a key={l.label} href={l.href} {...(l.ext ? { target:'_blank', rel:'noopener noreferrer' } : {})}
                style={{ fontFamily:'Sarabun,sans-serif', fontSize:12, color:'#546E7A', textDecoration:'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#00B8A2'}
                onMouseLeave={e => e.currentTarget.style.color = '#546E7A'}>{l.label}</a>
            ))}
          </div>
        </div>
      </W>
    </footer>
  )
}

// ── Shared: section label pill ────────────────────────────────────────────────

// ── Responsive helpers (CSS-in-JS alternative) ───────────────────────────────
const mobileCSS = `
  @media (max-width: 768px) {
    .hidden-mobile { display: none !important; }
    .show-mobile { display: flex !important; }
  }
  @media (min-width: 769px) {
    .show-mobile { display: none !important; }
  }
`

// ── Landing page (all sections) ───────────────────────────────────────────────
function LandingPage() {
  useReveal()
  return (
    <>
      <style>{mobileCSS}</style>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <HowToUse />
        <Pricing />
        <FAQ />
        <Blog />
        <Contact />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}

// ── App (router) ──────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  )
}
