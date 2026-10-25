import { useLanguage } from '../i18n/useLanguage.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { Ic, P } from '../components/shared.jsx'
import { ARTICLES } from '../data/articles.js'
export default function BlogList() {
  const { t } = useLanguage()
  const [category, setCategory] = useState('ทั้งหมด')
  const categories = ['ทั้งหมด', ...new Set(ARTICLES.map((a) => a.cat))]
  const articles =
    category === 'ทั้งหมด'
      ? ARTICLES
      : ARTICLES.filter((a) => a.cat === category)
  return (
    <>
      <Navbar />
      <main id="main">
        <div className="container page-intro">
          <nav className="breadcrumb" aria-label={t("เส้นทางนำทาง")}>
            <Link to="/">{' '}{t("หน้าแรก")}{' '}</Link>
            <span>/</span>
            <span>{' '}{t("บทความ")}{' '}</span>
          </nav>
          <h1>
            Property Journal<span className="brand-period">.</span>
          </h1>
          <p>{' '}{t("ความรู้สำหรับเจ้าของอสังหาฯ ที่อยากเติบโตอย่างมีระบบ")}{' '}<br />{' '}{t("ตั้งแต่บิลใบแรก ไปจนถึงพอร์ตถัดไป")}{' '}</p>
        </div>
        <section className="container blog-index" aria-label={t("บทความทั้งหมด")}>
          <div className="blog-filter" role="group" aria-label={t("หมวดหมู่บทความ")}>
            {categories.map((cat) => (
              <button
                key={t(cat)}
                aria-pressed={category === cat}
                onClick={() => setCategory(cat)}
              >
                {' '}{t(cat)}{' '}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {articles.length}{' '}{t("บทความ")}{' '}</p>
          <div className="journal-grid">
            {articles.map((a, i) => (
              <Link
                className="journal-card"
                to={'/blog/' + a.slug}
                key={a.slug}
              >
                <div className={'journal-art art-' + (i % 3)}>
                  <span>
                    {
                      [
                        'PROPERTY\nPLAYBOOK',
                        'LESS ADMIN.\nMORE LIFE.',
                        'ROOM TO\nGROW.',
                      ][i % 3]
                    }
                  </span>
                  <Ic d={[P.home, P.doc, P.chart][i % 3]} size={64} />
                </div>
                <div className="journal-meta">
                  <span>{' '}{t(a.cat)}{' '}</span>
                  <span>{' '}{t("อ่าน")}{' '}{a.min}{' '}{t("นาที")}{' '}</span>
                </div>
                <h2 style={{ fontSize: 21, lineHeight: 1.65 }}>{' '}{t(a.title)}{' '}</h2>
                <span className="journal-read">{' '}{t("อ่านบทความ")}{' '}<Ic d="M7 17 17 7M7 7h10v10" size={17} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
