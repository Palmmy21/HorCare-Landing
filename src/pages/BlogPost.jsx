import { useParams, Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { W, Ic, P, mobileCSS, HORCARE_URL, useReveal } from '../components/shared.jsx'
import { ARTICLES } from '../data/articles.js'

export default function BlogPost() {
  useReveal()
  const { slug } = useParams()
  const article = ARTICLES.find(a => a.slug === slug)

  if (!article) {
    return (
      <>
        <style>{mobileCSS}</style>
        <Navbar />
        <main style={{ paddingTop: 64, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'Kanit,sans-serif', fontSize: 20, color: '#1A2433', marginBottom: 16 }}>ไม่พบบทความนี้</p>
            <Link to="/blog" style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 14, color: '#00B8A2' }}>← กลับไปหน้าบทความ</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const related = ARTICLES.filter(a => a.slug !== slug && a.cat === article.cat).slice(0, 3)

  return (
    <>
      <style>{mobileCSS}</style>
      <Navbar />
      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <section style={{ background: article.grad, padding: '52px 0 40px' }}>
          <W>
            <nav aria-label="breadcrumb" style={{ marginBottom: 20, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="/" style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: '#546E7A', textDecoration: 'none' }}>หน้าแรก</a>
              <span style={{ color: '#90A4AE', fontSize: 13 }}>/</span>
              <Link to="/blog" style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: '#546E7A', textDecoration: 'none' }}>บทความ</Link>
              <span style={{ color: '#90A4AE', fontSize: 13 }}>/</span>
              <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: '#1A2433' }}>{article.title}</span>
            </nav>

            <span style={{ fontFamily: 'Kanit,sans-serif', fontSize: 11, fontWeight: 600, color: article.cc, background: article.cb, border: `1px solid ${article.cc}25`, padding: '4px 12px', borderRadius: 100, display: 'inline-block', marginBottom: 16 }}>
              {article.cat}
            </span>
            <h1 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 'clamp(1.4rem,2.8vw,2.1rem)', color: '#1A2433', lineHeight: 1.35, marginBottom: 16, maxWidth: 760 }}>
              {article.title}
            </h1>
            <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 15, color: '#546E7A', marginBottom: 12, maxWidth: 640, lineHeight: 1.7 }}>
              {article.desc}
            </p>
            <div style={{ display: 'flex', gap: 16, fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: '#90A4AE', alignItems: 'center' }}>
              <span>{article.date}</span>
              <span>·</span>
              <span>อ่าน {article.min} นาที</span>
              <span>·</span>
              <span>โดย HorCare</span>
            </div>
          </W>
        </section>

        {/* Article body */}
        <section style={{ background: '#fff', padding: '52px 0 64px' }}>
          <W>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              {article.body.map((sec, i) => (
                <div key={i} className="reveal" style={{ marginBottom: 32 }}>
                  <h2 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 18, color: article.cc, marginBottom: 10 }}>{sec.h}</h2>
                  <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 15.5, color: '#374151', lineHeight: 1.85 }}>{sec.p}</p>
                </div>
              ))}

              {/* CTA */}
              <div className="reveal" style={{ marginTop: 48, background: 'linear-gradient(135deg,#E8FDF5,#B2EBF2)', borderRadius: 16, padding: '32px 28px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 18, color: '#1A2433', marginBottom: 8 }}>
                  พร้อมเริ่มใช้ HorCare ฟรีแล้วหรือยัง?
                </p>
                <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 14, color: '#546E7A', marginBottom: 20 }}>
                  สมัครใน 2 นาที ไม่ต้องใช้บัตรเครดิต จัดการหอพักได้ทันที
                </p>
                <a href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#00B8A2', color: 'white', textDecoration: 'none', fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 15, padding: '12px 32px', borderRadius: 100 }}>
                  เริ่มใช้งานฟรี <Ic d={P.arrow} size={16} color="white" />
                </a>
              </div>

              <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: '#90A4AE' }}>บทความโดย HorCare</span>
                <Link to="/blog" style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13, color: '#00B8A2', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                  ← ดูบทความทั้งหมด
                </Link>
              </div>
            </div>
          </W>
        </section>

        {/* Related articles */}
        {related.length > 0 && (
          <section style={{ background: '#F8FAFB', padding: '52px 0 72px' }}>
            <W>
              <h2 className="reveal" style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 'clamp(1.3rem,2vw,1.6rem)', color: '#1A2433', marginBottom: 28 }}>
                บทความที่เกี่ยวข้อง
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(260px,100%),1fr))', gap: 16 }}>
                {related.map(a => (
                  <Link
                    key={a.slug}
                    to={`/blog/${a.slug}`}
                    className="card-hover reveal"
                    style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(0,184,162,0.12)', textDecoration: 'none', display: 'block' }}
                  >
                    <div style={{ height: 100, background: a.grad, padding: 14, display: 'flex', alignItems: 'flex-end' }}>
                      <span style={{ fontFamily: 'Kanit,sans-serif', fontSize: 11, fontWeight: 600, color: a.cc, background: a.cb, border: `1px solid ${a.cc}25`, padding: '3px 10px', borderRadius: 100 }}>
                        {a.cat}
                      </span>
                    </div>
                    <div style={{ padding: 16 }}>
                      <h3 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 13.5, color: '#1A2433', marginBottom: 8, lineHeight: 1.45 }}>{a.title}</h3>
                      <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 11, color: a.cc, fontWeight: 600 }}>อ่าน {a.min} นาที →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </W>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
