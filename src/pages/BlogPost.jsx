import { useLanguage } from '../i18n/useLanguage.js'
import { Link, useParams } from 'react-router-dom'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { ARTICLES } from '../data/articles.js'
import { Ic, HORCARE_URL } from '../components/shared.jsx'
export default function BlogPost() {
  const { t } = useLanguage()
  const { slug } = useParams()
  const article = ARTICLES.find((a) => a.slug === slug)
  if (!article)
    return (
      <>
        <Navbar />
        <main id="main" className="container empty-page">
          <h1>{' '}{t("ไม่พบบทความนี้")}{' '}</h1>
          <p>{' '}{t("เลือกอ่านเรื่องอื่นสำหรับเจ้าของอสังหาฯ ได้ที่ Property Journal")}{' '}</p>
          <Link className="button primary" to="/blog">{' '}{t("ดูบทความทั้งหมด")}{' '}</Link>
        </main>
        <Footer />
      </>
    )
  return (
    <>
      <Navbar />
      <main id="main" className="article-layout">
        <nav className="breadcrumb" aria-label={t("เส้นทางนำทาง")}>
          <Link to="/">{' '}{t("หน้าแรก")}{' '}</Link>
          <span>/</span>
          <Link to="/blog">Property Journal</Link>
          <span>/</span>
          <span>{' '}{t(article.cat)}{' '}</span>
        </nav>
        <article>
          <header>
            <h1>{' '}{t(article.title)}{' '}</h1>
            <p className="article-description">{' '}{t(article.desc)}{' '}</p>
            <div className="article-meta">
              <span>{' '}{t("โดยทีม HorCare")}{' '}</span>
              <time dateTime={article.dateISO}>{' '}{t(article.date)}{' '}</time>
              <span>{' '}{t("อ่าน")}{' '}{article.min}{' '}{t("นาที")}{' '}</span>
            </div>
          </header>
          <nav className="article-toc" aria-label={t("สารบัญ")}>
            <h2>{' '}{t("ในบทความนี้")}{' '}</h2>
            <ol>
              {article.body.map((s, i) => (
                <li key={i}>
                  <a href={'#section-' + i}>{' '}{t(s.h)}{' '}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="article-content">
            {article.body.map((s, i) => (
              <section id={'section-' + i} key={i}>
                <h2>{' '}{t(s.h)}{' '}</h2>
                <p>{' '}{t(s.p)}{' '}</p>
              </section>
            ))}
          </div>
        </article>
        <aside className="article-cta">
          <h2>{' '}{t("เริ่มจัดการอสังหาฯ ให้เป็นระบบ")}{' '}</h2>
          <p>{' '}{t("รวมงานห้อง ผู้เช่า สัญญา และบิลใน HorCare เริ่มใช้ฟรีสูงสุด 250 ห้อง")}{' '}</p>
          <a className="button accent" href={HORCARE_URL}>{' '}{t("เริ่มใช้งานฟรี")}{' '}<Ic d="M7 17 17 7M7 7h10v10" size={17} />
          </a>
        </aside>
        <Link className="text-link" style={{ marginTop: 25 }} to="/blog">{' '}{t("กลับไป Property Journal")}{' '}</Link>
      </main>
      <Footer />
    </>
  )
}
