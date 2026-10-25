import { useLanguage } from './i18n/useLanguage.js'
import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import Calculator from './pages/Calculator.jsx'
import BlogList from './pages/BlogList.jsx'
import BlogPost from './pages/BlogPost.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Footer } from './components/Footer.jsx'
import { pageMeta, routeSchema, BASE_URL } from './data/site.js'
import './App.css'

function RouteEffects() {
  const { language, t } = useLanguage()
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const canonicalPath = pathname.replace(/\/+$/, '') || '/'
    const meta = t(pageMeta(canonicalPath))
    document.documentElement.lang = language
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', language === 'en' ? 'en_US' : 'th_TH')
    document.title = meta.title
    let schema = document.getElementById('route-schema')
    if (!schema) {
      schema = document.createElement('script')
      schema.id = 'route-schema'
      schema.type = 'application/ld+json'
      document.head.appendChild(schema)
    }
    schema.textContent = JSON.stringify({ ...t(routeSchema(canonicalPath)), inLanguage: language })
    document
      .querySelector('meta[property="og:type"]')
      ?.setAttribute(
        'content',
        canonicalPath.startsWith('/blog/') ? 'article' : 'website',
      )
    const values = {
      'meta[name="description"]': meta.description,
      'meta[property="og:title"]': meta.title,
      'meta[property="og:description"]': meta.description,
      'meta[property="og:url"]': BASE_URL + canonicalPath,
      'meta[name="twitter:title"]': meta.title,
      'meta[name="twitter:description"]': meta.description,
    }
    Object.entries(values).forEach(([selector, content]) =>
      document.querySelector(selector)?.setAttribute('content', content),
    )
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', BASE_URL + canonicalPath)
    document
      .querySelector('meta[name="robots"]')
      ?.setAttribute(
        'content',
        meta.notFound ? 'noindex, follow' : 'index, follow',
      )
  }, [pathname, language, t])
  useEffect(() => {
    if (hash)
      requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      )
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}
function NotFound() {
  const { t } = useLanguage()
  return (
    <>
      <Navbar />
      <main id="main" className="container empty-page">
        <h1>{' '}{t("หน้านี้อาจย้ายบ้านแล้ว")}{' '}</h1>
        <p>{' '}{t("กลับไปดูเครื่องมือที่ช่วยให้การบริหารอสังหาฯ ง่ายขึ้นได้เลย")}{' '}</p>
        <a className="button primary" href="/">{' '}{t("กลับหน้าหลัก")}{' '}</a>
      </main>
      <Footer />
    </>
  )
}
export default function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
