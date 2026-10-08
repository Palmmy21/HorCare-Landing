import { Link, useParams } from 'react-router-dom'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { ARTICLES } from '../data/articles.js'
import { Ic, HORCARE_URL } from '../components/shared.jsx'
export default function BlogPost() {
  const { slug } = useParams()
  const article = ARTICLES.find((a) => a.slug === slug)
  if (!article)
    return (
      <>
        <Navbar />
        <main id="main" className="container empty-page">
          <h1>ไม่พบบทความนี้</h1>
          <p>เลือกอ่านเรื่องอื่นสำหรับเจ้าของอสังหาฯ ได้ที่ Property Journal</p>
          <Link className="button primary" to="/blog">
            ดูบทความทั้งหมด
          </Link>
        </main>
        <Footer />
      </>
    )
  return (
    <>
      <Navbar />
      <main id="main" className="article-layout">
        <nav className="breadcrumb" aria-label="เส้นทางนำทาง">
          <Link to="/">หน้าแรก</Link>
          <span>/</span>
          <Link to="/blog">Property Journal</Link>
          <span>/</span>
          <span>{article.cat}</span>
        </nav>
        <article>
          <header>
            <h1>{article.title}</h1>
            <p className="article-description">{article.desc}</p>
            <div className="article-meta">
              <span>โดยทีม HorCare</span>
              <time dateTime={article.dateISO}>{article.date}</time>
              <span>อ่าน {article.min} นาที</span>
            </div>
          </header>
          <nav className="article-toc" aria-label="สารบัญ">
            <h2>ในบทความนี้</h2>
            <ol>
              {article.body.map((s, i) => (
                <li key={i}>
                  <a href={'#section-' + i}>{s.h}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="article-content">
            {article.body.map((s, i) => (
              <section id={'section-' + i} key={i}>
                <h2>{s.h}</h2>
                <p>{s.p}</p>
              </section>
            ))}
          </div>
        </article>
        <aside className="article-cta">
          <h2>เริ่มจัดการอสังหาฯ ให้เป็นระบบ</h2>
          <p>
            รวมงานห้อง ผู้เช่า สัญญา และบิลใน HorCare เริ่มใช้ฟรีสูงสุด 250 ห้อง
          </p>
          <a className="button accent" href={HORCARE_URL}>
            เริ่มใช้งานฟรี <Ic d="M7 17 17 7M7 7h10v10" size={17} />
          </a>
        </aside>
        <Link className="text-link" style={{ marginTop: 25 }} to="/blog">
          กลับไป Property Journal
        </Link>
      </main>
      <Footer />
    </>
  )
}
