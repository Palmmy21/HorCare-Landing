import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { W, Ic, P, mobileCSS, HORCARE_URL, useReveal } from '../components/shared.jsx'
import { ARTICLES } from '../data/articles.js'

export default function BlogPost() {
  useReveal()
  const { slug } = useParams()
  const article = ARTICLES.find(a => a.slug === slug)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (article) {
      document.title = `${article.title} — HorCare`
      let descMeta = document.querySelector('meta[name="description"]')
      if (descMeta) {
        descMeta.setAttribute('content', article.desc)
      }

      // Add JSON-LD BlogPosting Schema
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.desc,
        "datePublished": article.dateISO,
        "author": {
          "@type": "Organization",
          "name": "HorCare",
          "url": "https://horcare-landing.vercel.app/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "HorCare",
          "logo": {
            "@type": "ImageObject",
            "url": "https://horcare-landing.vercel.app/2.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://horcare-landing.vercel.app/blog/${article.slug}`
        }
      }

      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'article-schema'
      script.innerHTML = JSON.stringify(schemaData)
      document.head.appendChild(script)

      return () => {
        const el = document.getElementById('article-schema')
        if (el) el.remove()
      }
    }
  }, [article])

  if (!article) {
    return (
      <>
        <style>{mobileCSS}</style>
        <Navbar />
        <main style={{ paddingTop: 64, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'Kanit,sans-serif', fontSize: 20, color: '#1A2433', marginBottom: 16 }}>ไม่พบบทความนี้</p>
            <Link to="/blog" style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 14, color: '#00B8A2', textDecoration: 'none' }}>← กลับไปหน้าบทความทั้งหมด</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const related = ARTICLES.filter(a => a.slug !== slug).slice(0, 3)

  return (
    <>
      <style>{mobileCSS}</style>
      <Navbar />
      <main style={{ paddingTop: 64 }}>
        
        {/* Article Header */}
        <section style={{ background: 'linear-gradient(150deg, #0F1E2E 0%, #172A3D 100%)', color: 'white', padding: '56px 0 48px', position: 'relative' }}>
          <W>
            <nav aria-label="breadcrumb" style={{ marginBottom: 20, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/" style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>หน้าแรก</Link>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>/</span>
              <Link to="/blog" style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>บทความ</Link>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>/</span>
              <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.95)' }}>{article.cat}</span>
            </nav>

            <div style={{ maxWidth: 820 }}>
              <span style={{ fontFamily: 'Kanit,sans-serif', fontSize: 12, fontWeight: 700, color: '#2DC76D', background: 'rgba(45,199,109,0.15)', border: '1px solid rgba(45,199,109,0.3)', padding: '5px 14px', borderRadius: 100, display: 'inline-block', marginBottom: 18 }}>
                {article.cat}
              </span>
              
              <h1 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', color: 'white', lineHeight: 1.3, marginBottom: 20 }}>
                {article.title}
              </h1>

              <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'rgba(255,255,255,0.78)', marginBottom: 24, lineHeight: 1.75 }}>
                {article.desc}
              </p>

              <div style={{ display: 'flex', gap: 16, fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.55)', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Ic d={P.user} size={14} color="#2DC76D" /> HorCare Team
                </span>
                <span>·</span>
                <span>{article.date}</span>
                <span>·</span>
                <span>ใช้เวลาอ่านประมาณ {article.min} นาที</span>
              </div>
            </div>
          </W>
        </section>

        {/* Main Article Body Container */}
        <section style={{ background: '#F8FAFB', padding: '52px 0 80px' }}>
          <W>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>

              {/* Table of Contents Box */}
              <div style={{
                background: '#ffffff',
                border: '1px solid rgba(0,184,162,0.18)',
                borderRadius: 16,
                padding: '24px 28px',
                marginBottom: 40,
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}>
                <h3 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 16, color: '#1A2433', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Ic d={P.doc} size={18} color="#00B8A2" /> หัวข้อสำคัญในบทความนี้
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {article.body.map((sec, idx) => (
                    <li key={idx}>
                      <a href={`#section-${idx}`} style={{
                        fontFamily: 'Sarabun,sans-serif', fontSize: 14.5, color: '#1E88E5', textDecoration: 'none',
                        display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'color 0.15s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#00B8A2'}
                      onMouseLeave={e => e.currentTarget.style.color = '#1E88E5'}>
                        <span style={{ fontWeight: 700, fontSize: 12, background: 'rgba(30,136,229,0.1)', color: '#1E88E5', padding: '2px 8px', borderRadius: 100 }}>{idx + 1}</span>
                        {sec.h}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Content Blocks */}
              <div style={{ background: '#ffffff', borderRadius: 20, padding: '40px 36px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
                {article.body.map((sec, idx) => (
                  <div key={idx} id={`section-${idx}`} style={{ marginBottom: idx === article.body.length - 1 ? 0 : 38, scrollMarginTop: 100 }}>
                    <h2 style={{
                      fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 'clamp(1.2rem, 2.2vw, 1.45rem)',
                      color: '#1A2433', marginBottom: 14, lineHeight: 1.4,
                      paddingBottom: 10, borderBottom: '2px solid #F0F4F8',
                      display: 'flex', alignItems: 'center', gap: 10
                    }}>
                      <span style={{ color: '#2DC76D', fontSize: 18 }}>#</span> {sec.h}
                    </h2>
                    
                    <div style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 16, color: '#334155', lineHeight: 1.9, whiteSpace: 'pre-line' }}>
                      {sec.p}
                    </div>
                  </div>
                ))}
              </div>

              {/* High Conversion Banner Callout */}
              <div style={{
                marginTop: 48,
                background: 'linear-gradient(135deg,#0F1E2E,#1565C0)',
                borderRadius: 20, padding: '36px 32px', textAlign: 'center', color: 'white',
                boxShadow: '0 12px 36px rgba(21,101,192,0.25)'
              }}>
                <h3 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 22, color: 'white', marginBottom: 10 }}>
                  พร้อมเปลี่ยนการบริหารหอพักให้เป็นเรื่องง่ายแล้วหรือยัง?
                </h3>
                <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.85)', marginBottom: 24, maxWidth: 520, margin: '0 auto 24px' }}>
                  ทดลองใช้งาน HorCare ฟรีสูงสุด 250 ห้อง ไม่ต้องผูกบัตรเครดิต ตั้งค่าเสร็จพร้อมใช้งานใน 5 นาที
                </p>
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
                    className="btn-orange"
                    style={{ gap: 8, padding: '14px 34px', borderRadius: 100, fontSize: 15, fontFamily: 'Kanit,sans-serif', fontWeight: 700, textDecoration: 'none' }}>
                    เริ่มใช้งานฟรี <Ic d={P.arrow} size={16} color="white" />
                  </a>
                </div>
              </div>

              {/* Bottom Back Button */}
              <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/blog" style={{ fontFamily: 'Kanit,sans-serif', fontSize: 14, fontWeight: 600, color: '#00B8A2', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  ← ดูบทความทั้งหมด
                </Link>
              </div>

            </div>
          </W>
        </section>

        {/* Related Articles Section */}
        {related.length > 0 && (
          <section style={{ background: '#ffffff', padding: '64px 0 80px', borderTop: '1px solid #E2E8F0' }}>
            <W>
              <div style={{ maxWidth: 960, margin: '0 auto' }}>
                <h2 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 'clamp(1.4rem,2.5vw,1.8rem)', color: '#1A2433', marginBottom: 28, textAlign: 'center' }}>
                  บทความแนะนำอื่นๆ สำหรับเจ้าของหอพัก
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(280px,100%),1fr))', gap: 20 }}>
                  {related.map(a => (
                    <Link
                      key={a.slug}
                      to={`/blog/${a.slug}`}
                      className="card-hover"
                      style={{ background: '#F8FAFB', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', textDecoration: 'none', display: 'flex', flexDirection: 'column', padding: 22 }}
                    >
                      <span style={{ fontFamily: 'Kanit,sans-serif', fontSize: 11, fontWeight: 700, color: a.cc, background: a.cb, padding: '4px 10px', borderRadius: 100, alignSelf: 'flex-start', marginBottom: 12 }}>
                        {a.cat}
                      </span>
                      <h3 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 15, color: '#1A2433', marginBottom: 10, lineHeight: 1.45, flex: 1 }}>{a.title}</h3>
                      <span style={{ fontFamily: 'Kanit,sans-serif', fontSize: 12.5, color: '#00B8A2', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 12 }}>
                        อ่านบทความ <Ic d={P.arrow} size={12} color="#00B8A2" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </W>
          </section>
        )}

      </main>
      <Footer />
    </>
  )
}
