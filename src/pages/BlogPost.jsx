import { useLanguage } from '../i18n/useLanguage.js'
import { useParams } from 'react-router-dom'
import { Link } from '../components/LocalizedLink.jsx'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { ARTICLES } from '../data/articles.js'
import { Ic, HORCARE_URL } from '../components/shared.jsx'
export default function BlogPost() {
  const { t, language } = useLanguage()
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
              {article.modifiedISO && <span>{t('อัปเดตเนื้อหา')} <time dateTime={article.modifiedISO}>{new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'th-TH', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(article.modifiedISO))}</time></span>}
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
                {t(s.p).split(/\n\n/).map((paragraph, index) => /^1\. /.test(paragraph)
                  ? <ol key={index}>{paragraph.split(/\n/).map((line, i) => <li key={i}>{line.replace(/^\d+\.\s*/, '')}</li>)}</ol>
                  : <p key={index}>{paragraph}</p>)}
              </section>
            ))}
          </div>
          {article.sources?.length > 0 && <section className="article-sources">
            <h2>{t('แหล่งข้อมูล')}</h2>
            <ul>{article.sources.map(source => <li key={source.url}><a href={source.url}>{source.name}</a></li>)}</ul>
          </section>}
        </article>
        <nav className="article-related" aria-label={t('อ่านต่อและเครื่องมือที่เกี่ยวข้อง')}>
          <h2>{t('อ่านต่อและเครื่องมือที่เกี่ยวข้อง')}</h2>
          <ul>
            <li><Link to="/calculator">{t('คำนวณค่าน้ำค่าไฟจากเลขมิเตอร์')}</Link></li>
            {(article.related || ARTICLES.filter(a => a.slug !== article.slug && a.cat === article.cat).slice(0, 2).map(a => a.slug)).map(slug => {
              const related = ARTICLES.find(a => a.slug === slug)
              return related && <li key={slug}><Link to={'/blog/' + slug}>{t(related.title)}</Link></li>
            })}
            <li><Link to="/#pricing">{t('ดูแพ็กเกจระบบจัดการหอพัก')}</Link></li>
          </ul>
        </nav>
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
