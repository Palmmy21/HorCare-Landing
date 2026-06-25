import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { W, P, Ic, mobileCSS, useReveal } from '../components/shared.jsx'
import { ARTICLES } from '../data/articles.js'

function ArticleCard({ a }) {
  return (
    <Link
      to={`/blog/${a.slug}`}
      className="card-hover"
      style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(0,184,162,0.12)', textDecoration: 'none', display: 'block' }}
    >
      <div style={{ height: 140, background: a.grad, padding: 14, display: 'flex', alignItems: 'flex-end' }}>
        <span style={{ fontFamily: 'Kanit,sans-serif', fontSize: 11, fontWeight: 600, color: a.cc, background: a.cb, border: `1px solid ${a.cc}25`, padding: '3px 10px', borderRadius: 100 }}>
          {a.cat}
        </span>
      </div>
      <div style={{ padding: 18 }}>
        <h2 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 14, color: '#1A2433', marginBottom: 7, lineHeight: 1.45 }}>{a.title}</h2>
        <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 12.5, color: '#546E7A', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 11, color: '#90A4AE' }}>{a.date}</span>
          <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 11, color: a.cc, fontWeight: 600 }}>อ่าน {a.min} นาที →</span>
        </div>
      </div>
    </Link>
  )
}

export default function BlogList() {
  useReveal()
  return (
    <>
      <style>{mobileCSS}</style>
      <Navbar />
      <main style={{ paddingTop: 64 }}>
        <section style={{ background: 'linear-gradient(135deg,#0A1628,#1565C0)', padding: '72px 0 56px' }}>
          <W>
            <nav aria-label="breadcrumb" style={{ marginBottom: 20, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="/" style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>หน้าแรก</a>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>/</span>
              <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: 'white' }}>บทความ</span>
            </nav>
            <h1 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: 'white', marginBottom: 12, lineHeight: 1.2 }}>
              บทความสำหรับเจ้าของหอพัก
            </h1>
            <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.75)', maxWidth: 520, lineHeight: 1.75 }}>
              ความรู้ กฎหมาย และเทคนิคบริหารหอพักยุคดิจิทัล อัปเดตทุกเดือน
            </p>
            <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 8 }}>
              {ARTICLES.length} บทความ
            </p>
          </W>
        </section>

        <section style={{ background: '#F8FAFB', padding: '56px 0 80px' }}>
          <W>
            <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(280px,100%),1fr))', gap: 20 }}>
              {ARTICLES.map(a => <ArticleCard key={a.slug} a={a} />)}
            </div>
          </W>
        </section>
      </main>
      <Footer />
    </>
  )
}
