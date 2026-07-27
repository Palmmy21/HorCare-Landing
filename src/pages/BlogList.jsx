import { useEffect } from 'react'
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
      style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(0,184,162,0.12)', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ height: 140, background: a.grad, padding: 14, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Kanit,sans-serif', fontSize: 11, fontWeight: 600, color: a.cc, background: a.cb, border: `1px solid ${a.cc}25`, padding: '3px 10px', borderRadius: 100 }}>
          {a.cat}
        </span>
        <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 11, color: 'rgba(0,0,0,0.5)', background: 'rgba(255,255,255,0.7)', padding: '2px 8px', borderRadius: 6 }}>
          {a.date}
        </span>
      </div>
      <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 14.5, color: '#1A2433', marginBottom: 7, lineHeight: 1.45 }}>{a.title}</h2>
        <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 12.5, color: '#546E7A', lineHeight: 1.6, marginBottom: 14, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid #F0F4F8' }}>
          <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 11, color: '#90A4AE' }}>บทความโดย HorCare</span>
          <span style={{ fontFamily: 'Kanit,sans-serif', fontSize: 12, color: a.cc, fontWeight: 600 }}>อ่าน {a.min} นาที →</span>
        </div>
      </div>
    </Link>
  )
}

export default function BlogList() {
  useReveal()

  useEffect(() => {
    document.title = "บทความความรู้สำหรับเจ้าของหอพัก — HorCare เทคนิคบริหาร & ประหยัดเวลา"
    let descMeta = document.querySelector('meta[name="description"]')
    if (descMeta) {
      descMeta.setAttribute('content', 'รวมบทความความรู้ กฎหมายหอพัก เทคนิคคำนวณค่าน้ำค่าไฟ และวิธีบริหารหอพักยุคใหม่อย่างมืออาชีพสำหรับเจ้าของหอพัก')
    }

    // Add JSON-LD Structured Data
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "HorCare Blog — บทความความรู้สำหรับเจ้าของหอพัก",
      "description": "รวมบทความความรู้ เทคนิคบริหารหอพัก กฎหมายหอพัก คำนวณค่าน้ำค่าไฟ และการประหยัดเวลาทำบิล",
      "url": "https://horcare-landing.vercel.app/blog",
      "blogPost": ARTICLES.map(a => ({
        "@type": "BlogPosting",
        "headline": a.title,
        "description": a.desc,
        "url": `https://horcare-landing.vercel.app/blog/${a.slug}`,
        "datePublished": a.dateISO
      }))
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'blog-list-schema'
    script.innerHTML = JSON.stringify(schemaData)
    document.head.appendChild(script)

    return () => {
      const el = document.getElementById('blog-list-schema')
      if (el) el.remove()
    }
  }, [])

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
            <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.75)', maxWidth: 540, lineHeight: 1.75 }}>
              รวมเคล็ดลับประหยัดเวลา กฎหมายหอพัก เทคนิคคำนวณค่าน้ำค่าไฟ และการบริหารหอพักยุคใหม่
            </p>
            <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 8 }}>
              {ARTICLES.length} บทความที่พร้อมให้ความรู้
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

