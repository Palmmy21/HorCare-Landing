import { useState } from 'react'
import './App.css'

const HORCARE_URL = 'https://hor-care.vercel.app/'
const LINE_URL = 'https://lin.ee/9RxwIrM'

// ─────────────────────────────────────────────────────────────────────────────
// Reliable centered wrapper — uses inline styles to avoid Tailwind v4 quirks
// ─────────────────────────────────────────────────────────────────────────────
const W = ({ children, style = {} }) => (
  <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2.5rem', ...style }}>
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

// ── Logo mark ─────────────────────────────────────────────────────────────────
function Logo({ size = 32 }) {
  return (
    <img src="/logo.png" width={size} height={size} alt="HorCare Logo"
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
const NAV = [
  { label: 'คุณสมบัติ', href: '#features' },
  { label: 'วิธีใช้งาน', href: '#how-to-use' },
  { label: 'ราคา',       href: '#pricing' },
  { label: 'FAQ',        href: '#faq' },
  { label: 'บทความ',    href: '#blog' },
  { label: 'ติดต่อ',    href: '#contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav style={{
      position: 'fixed', inset: '0 0 auto 0', zIndex: 50,
      background: 'rgba(255,255,255,0.97)',
      borderBottom: '1px solid rgba(0,184,162,0.13)',
      boxShadow: '0 1px 12px rgba(0,0,0,0.06)',
      backdropFilter: 'blur(8px)',
    }}>
      <W style={{ padding: '0 2.5rem' }}>
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
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#00B8A2'}
              onMouseLeave={e => e.currentTarget.style.color = '#546E7A'}>
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
        <div style={{ background: '#fff', borderTop: '1px solid rgba(0,184,162,0.1)', padding: '16px 40px 20px' }}
          className="show-mobile">
          {NAV.map(n => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '10px 0', fontFamily: 'Sarabun, sans-serif', fontSize: 15, color: '#546E7A', textDecoration: 'none', borderBottom: '1px solid #f5f5f5' }}>
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
    <section style={{ background: 'linear-gradient(150deg,#0B1A27 0%,#122338 50%,#0A1F14 100%)', paddingTop: 120, paddingBottom: 88 }}>
      <W style={{ textAlign:'center' }}>

        {/* Logo mark */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:20 }}>
          <Logo size={120} />
        </div>

        {/* Badge */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:7, marginBottom:22,
          background:'rgba(45,199,109,0.14)', border:'1px solid rgba(45,199,109,0.32)',
          borderRadius:100, padding:'6px 16px',
        }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'#2DC76D', flexShrink:0 }}/>
          <span style={{ fontFamily:'Sarabun,sans-serif', fontSize:11, fontWeight:600, color:'#2DC76D', letterSpacing:'0.1em', textTransform:'uppercase' }}>
            ระบบจัดการหอพักครบวงจร
          </span>
        </div>

        <h1 style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, lineHeight:1.18, marginBottom:18 }}>
          <span style={{ display:'block', fontSize:'clamp(2rem,4.5vw,3.4rem)', color:'white' }}>ระบบจัดการหอพัก</span>
          <span style={{ display:'block', fontSize:'clamp(2rem,4.5vw,3.4rem)', color:'#2DC76D' }}>
            ครบ จบ ในระบบเดียว
          </span>
        </h1>

        <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:16, color:'rgba(255,255,255,0.58)', lineHeight:1.8, maxWidth:500, margin:'0 auto 36px' }}>
          คุ้มค่า ใช้ง่าย ดูแลให้ตลอดการใช้งาน — จากห้องพักถึงใบแจ้งหนี้<br/>
          HorCare รวมทุกอย่างในระบบเดียว ลดภาระงานซ้ำซ้อน
        </p>

        <div style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center', marginBottom:52 }}>
          <a href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
            className="btn-orange"
            style={{ gap:8, padding:'13px 32px', borderRadius:100, fontSize:15, fontFamily:'Kanit,sans-serif', fontWeight:600, textDecoration:'none', boxShadow:'0 4px 20px rgba(255,152,0,0.4)' }}>
            เริ่มใช้งานฟรี <Ic d={P.arrow} size={16} color="white" />
          </a>
          <a href="#features"
            className="btn-ghost-teal"
            style={{ gap:8, padding:'13px 32px', borderRadius:100, fontSize:15, fontFamily:'Kanit,sans-serif', fontWeight:600, textDecoration:'none' }}>
            ดูคุณสมบัติ
          </a>
        </div>

        {/* Trust row */}
        <div style={{ display:'flex', gap:0, justifyContent:'center', flexWrap:'wrap', paddingTop:28, borderTop:'1px solid rgba(255,255,255,0.08)' }}>
          {[
            { v:'500+', l:'หอพักที่ใช้งาน', c:'#2DC76D' },
            { v:'10K+', l:'ผู้เช่าลงทะเบียน', c:'#00B8A2' },
            { v:'99.9%', l:'Uptime', c:'#FF9800' },
          ].map((s, i) => (
            <div key={s.l} style={{ display:'flex', alignItems:'center', gap:0 }}>
              {i > 0 && <span style={{ color:'rgba(255,255,255,0.18)', padding:'0 16px', fontFamily:'Sarabun,sans-serif' }}>·</span>}
              <span style={{ fontFamily:'Sarabun,sans-serif', fontSize:13, color:'rgba(255,255,255,0.55)' }}>
                <span style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, color:s.c }}>{s.v}</span>
                {' '}{s.l}
              </span>
            </div>
          ))}
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
    <section id="features" style={{ background:'#fff', padding:'80px 0' }}>
      <W>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <h2 style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:'clamp(1.6rem,2.5vw,2.2rem)', color:'#1A2433', lineHeight:1.3 }}>
            ฟีเจอร์ครบ จบทุกการจัดการหอพัก
          </h2>
          <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:15, color:'#546E7A', marginTop:10, maxWidth:480, margin:'10px auto 0' }}>
            ออกแบบมาเพื่อเจ้าของหอพักโดยเฉพาะ ใช้งานง่าย ไม่ต้องมีความรู้ด้าน IT
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:12 }}>
          {FEATURES.map(f => (
            <div key={f.title} className="card-hover" style={{ background:'#fff', borderRadius:12, padding:'18px 20px', border:'1px solid rgba(0,184,162,0.1)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                <Ic d={f.icon} size={16} color={f.c} />
                <h3 style={{ fontFamily:'Kanit,sans-serif', fontWeight:600, fontSize:14, color:'#1A2433', margin:0 }}>{f.title}</h3>
              </div>
              <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:13, color:'#546E7A', lineHeight:1.65, paddingLeft:24 }}>{f.desc}</p>
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
    <section id="how-to-use" style={{ background:'linear-gradient(150deg,#E0FBF0,#C6EDE5 60%,#DDE8FB)', padding:'80px 0' }}>
      <W>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <h2 style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:'clamp(1.6rem,2.5vw,2.2rem)', color:'#1A2433', lineHeight:1.3 }}>
            เริ่มใช้งานง่าย ไม่ต้องติดตั้งโปรแกรม
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:24, marginBottom:40 }}>
          {STEPS.map(s => (
            <div key={s.n} style={{ textAlign:'center' }}>
              <div style={{ width:44, height:44, borderRadius:'50%', background:`linear-gradient(135deg,${s.c},${s.c}99)`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', boxShadow:`0 6px 16px ${s.c}40` }}>
                <span style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:14, color:'white' }}>{s.n}</span>
              </div>
              <h3 style={{ fontFamily:'Kanit,sans-serif', fontWeight:600, fontSize:15, color:'#1A2433', marginBottom:8 }}>{s.title}</h3>
              <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:13, color:'#546E7A', lineHeight:1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center' }}>
          <a href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
            className="btn-orange"
            style={{ gap:8, padding:'13px 32px', borderRadius:100, fontSize:15, fontFamily:'Kanit,sans-serif', fontWeight:600, textDecoration:'none', boxShadow:'0 4px 16px rgba(255,152,0,0.3)' }}>
            เริ่มต้นได้เลย <Ic d={P.arrow} size={16} color="white" />
          </a>
        </div>
      </W>
    </section>
  )
}

// ── Pricing ───────────────────────────────────────────────────────────────────
const PLANS = [
  { name:'หอเล็ก',  size:'ไม่เกิน 40 ห้อง', price:'79',  unit:'บาท / ห้อง / เดือน',
    features:['ระบบจัดการหอพักครบวงจร','ผู้ใช้งานไม่เกิน 1 คน','ฟีเจอร์พื้นฐานครบครัน','ซัพพอร์ตผ่านระบบ','ไม่รองรับส่งบิลผ่าน LINE'],
    cta:'เริ่มใช้งาน', hi:false, c:'#2DC76D' },
  { name:'หอกลาง', size:'40–100 ห้อง', price:'259', unit:'บาท / ห้อง / เดือน',
    badge:'ยอดนิยม',
    features:['ระบบจัดการหอพักครบวงจร','ผู้ใช้งานไม่เกิน 5 คน','ฟีเจอร์ครบ + รายงานเชิงลึก','ไม่รองรับส่งบิลผ่าน LINE','ซัพพอร์ตแบบพรีเมียม'],
    cta:'ทดลอง 30 วันฟรี', hi:true, c:'#00B8A2' },
  { name:'หอใหญ่', size:'100+ ห้อง',   price:'399', unit:'บาท / ห้อง / เดือน',
    badge:'Premium',
    features:['ระบบจัดการหอพักครบวงจร','ผู้ใช้งานไม่จำกัด','ฟีเจอร์ทุกฟังก์ชัน + API','ส่งบิลผ่าน LINE ปุ่มเดียว','รายงานเชิงลึก + Export ข้อมูล','Dedicated Support ตลอด 24 ชม.'],
    cta:'ติดต่อทีมงาน', hi:false, c:'#F57C00' },
]

function Pricing() {
  return (
    <section id="pricing" style={{ background:'#fff', padding:'80px 0' }}>
      <W>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <h2 style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:'clamp(1.6rem,2.5vw,2.2rem)', color:'#1A2433' }}>
            เลือกแพ็กเกจให้เหมาะกับหอพักคุณ
          </h2>
          <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:14, color:'#90A4AE', marginTop:6 }}>
            ราคายังไม่รวมภาษีมูลค่าเพิ่ม • ไม่มีสัญญาผูกมัด
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16, alignItems:'center', maxWidth:920, margin:'0 auto' }}>
          {PLANS.map(p => (
            <div key={p.name} style={{
              background:'#fff', borderRadius:16, padding:28, position:'relative',
              border: p.hi ? `2px solid ${p.c}` : '1px solid rgba(0,184,162,0.15)',
              boxShadow: p.hi ? `0 20px 48px ${p.c}22` : 'none',
              transform: p.hi ? 'translateY(-8px)' : 'none',
            }}>
              {p.badge && (
                <span style={{
                  position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)',
                  background: p.badge === 'Premium'
                    ? 'linear-gradient(135deg,#F57C00,#FFB300)'
                    : 'linear-gradient(135deg,#2DC76D,#00B8A2)',
                  color:'white',
                  fontSize:11, fontFamily:'Kanit,sans-serif', fontWeight:700,
                  padding:'4px 14px', borderRadius:100, whiteSpace:'nowrap',
                  boxShadow: p.badge === 'Premium' ? '0 2px 8px rgba(245,124,0,0.4)' : 'none',
                }}>{p.badge === 'Premium' ? '★ Premium' : p.badge}</span>
              )}

              {/* Plan name */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:18, color:'#1A2433' }}>{p.name}</div>
                <div style={{ fontFamily:'Sarabun,sans-serif', fontSize:12, color:'#90A4AE', marginTop:2 }}>{p.size}</div>
              </div>

              {/* Price */}
              <div style={{ textAlign:'center', marginBottom:20, padding:'16px 0', borderTop:'1px solid #f5f5f5', borderBottom:'1px solid #f5f5f5' }}>
                <div style={{ display:'flex', alignItems:'baseline', justifyContent:'center', gap:2 }}>
                  <span style={{ fontFamily:'Sarabun,sans-serif', fontSize:14, color:'#90A4AE' }}>฿</span>
                  <span style={{ fontFamily:'Kanit,sans-serif', fontWeight:800, fontSize:38, color:p.c }}>{p.price}</span>
                </div>
                <div style={{ fontFamily:'Sarabun,sans-serif', fontSize:12, color:'#90A4AE' }}>{p.unit}</div>
              </div>

              {/* Features */}
              <ul style={{ listStyle:'none', marginBottom:20, display:'flex', flexDirection:'column', gap:10 }}>
                {p.features.map(f => {
                  const isNo = f.startsWith('ไม่รองรับ')
                  return (
                  <li key={f} style={{ display:'flex', alignItems:'flex-start', gap:8, fontFamily:'Sarabun,sans-serif', fontSize:13, color: isNo ? '#90A4AE' : '#1A2433' }}>
                    <div style={{ width:18, height:18, borderRadius:'50%', background: isNo ? 'rgba(229,57,53,0.1)' : `${p.c}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                      <Ic d={isNo ? P.close : P.check} size={10} color={isNo ? '#E53935' : p.c} />
                    </div>
                    {f}
                  </li>
                  )
                })}
              </ul>

              <a href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
                style={{
                  display:'block', textAlign:'center', padding:'11px 0', borderRadius:100,
                  fontFamily:'Kanit,sans-serif', fontWeight:600, fontSize:14, textDecoration:'none',
                  background: p.hi ? `linear-gradient(135deg,#2DC76D,#00B8A2)` : 'transparent',
                  color: p.hi ? 'white' : p.c,
                  border: p.hi ? 'none' : `1.5px solid ${p.c}`,
                  transition:'all 0.15s',
                }}
                onMouseEnter={e => { if (!p.hi) { e.currentTarget.style.background = p.c; e.currentTarget.style.color = 'white' }}}
                onMouseLeave={e => { if (!p.hi) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = p.c }}}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Trust footnote */}
        <div style={{ marginTop:40, display:'flex', gap:24, justifyContent:'center', flexWrap:'wrap' }}>
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
  { q:'HorCare เหมาะกับหอพักขนาดไหน?',       a:'รองรับทุกขนาด ตั้งแต่ 10 ห้องขึ้นไป มีแพ็กเกจแยกตามขนาด หอเล็ก / หอกลาง / หอใหญ่ เลือกได้ตามความต้องการ' },
  { q:'คิดราคาอย่างไร?',                       a:'คิดตามจำนวนห้องพัก เริ่มต้น ฿79/ห้อง/เดือน (หอเล็ก) ฿259/ห้อง/เดือน (หอกลาง) และ ฿399/ห้อง/เดือน (หอใหญ่) ราคายังไม่รวม VAT' },
  { q:'ข้อมูลของฉันปลอดภัยแค่ไหน?',           a:'ข้อมูลทุกอย่างเข้ารหัส SSL/TLS มีระบบสำรองข้อมูลอัตโนมัติทุกวัน ข้อมูลของคุณจะไม่ถูกแชร์หรือขายให้บุคคลที่สาม' },
  { q:'ผู้เช่าต้องดาวน์โหลดแอปไหม?',         a:'ไม่จำเป็น ผู้เช่าเข้าถึงระบบผ่านเบราว์เซอร์บนมือถือหรือคอมพิวเตอร์ได้เลย ไม่ต้องติดตั้งอะไรเพิ่ม' },
  { q:'นำเข้าข้อมูลจากระบบเก่าได้ไหม?',      a:'ได้เลย รองรับการนำเข้าจาก Excel/CSV และทีมงานพร้อมช่วย Migration ให้ฟรีสำหรับแพ็กเกจหอกลางขึ้นไป' },
  { q:'ติดต่อซัพพอร์ตได้ทางไหน?',            a:'ติดต่อผ่าน LINE @horcare หรือ Facebook: HorCare ระบบจัดการหอพัก ทีมงานพร้อมดูแลตลอดการใช้งาน' },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" style={{ background:'linear-gradient(150deg,#E0FBF0,#C6EDE5 60%,#DDE8FB)', padding:'80px 0' }}>
      <W>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <h2 style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:'clamp(1.6rem,2.5vw,2.2rem)', color:'#1A2433' }}>
            คำถามที่พบบ่อย
          </h2>
        </div>

        <div style={{ maxWidth:680, margin:'0 auto', display:'flex', flexDirection:'column', gap:10 }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{
              background:'#fff', borderRadius:12, overflow:'hidden',
              border: open === i ? '1.5px solid #00B8A2' : '1px solid rgba(0,184,162,0.15)',
              transition:'border-color 0.2s',
            }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 18px', gap:16, background:'none', border:'none', cursor:'pointer', textAlign:'left' }}>
                <span style={{ fontFamily:'Kanit,sans-serif', fontWeight:500, fontSize:14.5, color:'#1A2433' }}>{f.q}</span>
                <span style={{
                  width:28, height:28, borderRadius:'50%', flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background: open === i ? 'rgba(0,184,162,0.15)' : 'rgba(0,184,162,0.07)',
                  color:'#00B8A2', transition:'transform 0.2s',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                }}>
                  <svg width="11" height="11" viewBox="0 0 10 10" fill="currentColor">
                    <rect x="4.5" y="0" width="1" height="10"/>
                    <rect x="0" y="4.5" width="10" height="1"/>
                  </svg>
                </span>
              </button>
              {open === i && (
                <p style={{ padding:'0 18px 14px', fontFamily:'Sarabun,sans-serif', fontSize:13.5, color:'#546E7A', lineHeight:1.65 }}>{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </W>
    </section>
  )
}

// ── Blog ──────────────────────────────────────────────────────────────────────
const ARTICLES = [
  { cat:'เคล็ดลับ', cc:'#2DC76D', cb:'rgba(45,199,109,0.1)', grad:'linear-gradient(135deg,#E8FDF5,#B2EBF2)', title:'5 วิธีเพิ่มรายได้หอพักโดยไม่ต้องขยายห้อง',  desc:'กลยุทธ์บริหารหอพักให้มีประสิทธิภาพ เพิ่ม Occupancy Rate และลดค่าใช้จ่ายที่ไม่จำเป็น', date:'มิถุนายน 2026', min:'5' },
  { cat:'กฎหมาย',  cc:'#1565C0', cb:'rgba(21,101,192,0.1)', grad:'linear-gradient(135deg,#E3F2FD,#BBDEFB)',  title:'สิ่งที่เจ้าของหอพักต้องรู้เรื่องสัญญาเช่า',  desc:'สรุปข้อกฎหมายสำคัญ สิทธิ์ของเจ้าของและผู้เช่า รูปแบบสัญญาเช่าที่ถูกต้องตามกฎหมาย', date:'พฤษภาคม 2026', min:'8' },
  { cat:'เทคโนโลยี', cc:'#F57C00', cb:'rgba(245,124,0,0.1)', grad:'linear-gradient(135deg,#FFF8E1,#FFE0B2)', title:'ทำไมหอพักยุคใหม่ถึงต้องใช้ระบบดิจิทัล',        desc:'สถิติชี้ว่าหอพักที่ใช้ระบบออนไลน์มีรายได้เพิ่มขึ้นและลดเวลาการดูแลได้อย่างมีนัย',      date:'เมษายน 2026', min:'4' },
]

function Blog() {
  return (
    <section id="blog" style={{ background:'#fff', padding:'80px 0' }}>
      <W>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:40, flexWrap:'wrap', gap:12 }}>
          <div>
            <h2 style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:'clamp(1.5rem,2.5vw,2.1rem)', color:'#1A2433' }}>
              ความรู้สำหรับเจ้าของหอพัก
            </h2>
          </div>
          <a href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:'Sarabun,sans-serif', fontSize:13, fontWeight:600, color:'#00B8A2', textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
            ดูทั้งหมด <Ic d={P.arrow} size={13} color="#00B8A2" />
          </a>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
          {ARTICLES.map(a => (
            <article key={a.title} className="card-hover" style={{ background:'#fff', borderRadius:14, overflow:'hidden', border:'1px solid rgba(0,184,162,0.12)', cursor:'pointer' }}>
              <div style={{ height:140, background:a.grad, padding:14, display:'flex', alignItems:'flex-end' }}>
                <span style={{ fontFamily:'Kanit,sans-serif', fontSize:11, fontWeight:600, color:a.cc, background:a.cb, border:`1px solid ${a.cc}25`, padding:'3px 10px', borderRadius:100 }}>
                  {a.cat}
                </span>
              </div>
              <div style={{ padding:18 }}>
                <h3 style={{ fontFamily:'Kanit,sans-serif', fontWeight:600, fontSize:14, color:'#1A2433', marginBottom:7, lineHeight:1.45 }}>{a.title}</h3>
                <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:12.5, color:'#546E7A', lineHeight:1.6, marginBottom:14, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{a.desc}</p>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <span style={{ fontFamily:'Sarabun,sans-serif', fontSize:11, color:'#90A4AE' }}>{a.date}</span>
                  <span style={{ fontFamily:'Sarabun,sans-serif', fontSize:11, color:'#90A4AE' }}>อ่าน {a.min} นาที</span>
                </div>
              </div>
            </article>
          ))}
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
    <section id="contact" style={{ background: '#F8FAFB', padding: '80px 0' }}>
      <W>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem,2.5vw,2.2rem)', color: '#1A2433', lineHeight: 1.3 }}>
            พร้อมช่วยเหลือคุณเสมอ
          </h2>
          <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 15, color: '#546E7A', marginTop: 10, maxWidth: 440, margin: '10px auto 0' }}>
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
function Footer() {
  const COLS = [
    { title:'ผลิตภัณฑ์', items:['คุณสมบัติ','ราคา','ความปลอดภัย','อัพเดต'] },
    { title:'บริษัท',    items:['เกี่ยวกับเรา','บล็อก','ร่วมงานกับเรา','ติดต่อ'] },
    { title:'ช่วยเหลือ', items:['คู่มือการใช้งาน','คำถามที่พบบ่อย','ซัพพอร์ต','สถานะระบบ'] },
  ]
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
            {[{ l:'LINE', v:'@horcare' },{ l:'Web', v:'www.horcare.com' }].map(c => (
              <p key={c.l} style={{ fontFamily:'Sarabun,sans-serif', fontSize:12, color:'#90A4AE', marginBottom:3 }}>
                <span style={{ fontWeight:600, color:'#00B8A2' }}>{c.l}:</span> {c.v}
              </p>
            ))}
          </div>
          {COLS.map(c => (
            <div key={c.title}>
              <h4 style={{ fontFamily:'Kanit,sans-serif', fontWeight:600, fontSize:13, color:'white', marginBottom:14 }}>{c.title}</h4>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:9 }}>
                {c.items.map(item => (
                  <li key={item}>
                    <a href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily:'Sarabun,sans-serif', fontSize:13, color:'#90A4AE', textDecoration:'none', transition:'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#00B8A2'}
                      onMouseLeave={e => e.currentTarget.style.color = '#90A4AE'}>
                      {item}
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
            {['นโยบายความเป็นส่วนตัว','เงื่อนไขการใช้งาน'].map(l => (
              <a key={l} href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:'Sarabun,sans-serif', fontSize:12, color:'#546E7A', textDecoration:'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#00B8A2'}
                onMouseLeave={e => e.currentTarget.style.color = '#546E7A'}>{l}</a>
            ))}
          </div>
        </div>
      </W>
    </footer>
  )
}

// ── Shared: section label pill ────────────────────────────────────────────────
function Pill({ children }) {
  return (
    <span style={{
      display:'inline-block', fontFamily:'Sarabun,sans-serif', fontWeight:600,
      fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase',
      color:'#00B8A2', background:'rgba(0,184,162,0.1)',
      border:'1px solid rgba(0,184,162,0.22)', borderRadius:100, padding:'4px 12px',
    }}>
      {children}
    </span>
  )
}

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

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{mobileCSS}</style>
      <Navbar />
      <main>
        <Hero />
        <Features />
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
