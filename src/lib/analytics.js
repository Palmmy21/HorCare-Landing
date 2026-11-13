// Consent-gated visitor analytics (PDPA): nothing loads and no cookie is set until the visitor accepts.
// Uses Google Analytics 4 when VITE_GA_ID is set (e.g. G-XXXXXXX); without it, events are dropped.
//
// What gets measured, so the team can see which parts of the page people care about:
//   section_view   {section}                 a section was at least half on screen
//   section_dwell  {section, seconds}        how long it stayed on screen (>= 2 s)
//   cta_click      {cta, section}            any element with data-track="..."
//   faq_open       {question}
//   scroll_depth   {percent: 25|50|75|100}
// Add data-track="name" to any link or button to measure it; no other code needed.

const GA_ID = import.meta.env.VITE_GA_ID
const CONSENT_COOKIE = 'hc_consent'
const CONSENT_DAYS = 180
const listeners = new Set()

const browser = typeof window !== 'undefined'

export function readConsent() {
  if (!browser) return null
  const m = document.cookie.match(/(?:^|;\s*)hc_consent=(granted|denied)/)
  return m ? m[1] : null
}

export function setConsent(value) {
  if (!browser) return
  document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${CONSENT_DAYS * 86400}; path=/; SameSite=Lax`
  if (value === 'granted') {
    const first = !started
    start()
    if (first) trackPageView()
  } else stop()
  listeners.forEach((fn) => fn(value))
}

export function onConsentChange(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

// Lets the footer link reopen the banner.
export function openConsentSettings() {
  listeners.forEach((fn) => fn('ask'))
}

let started = false
function gtag() {
  window.dataLayer.push(arguments)
}

function start() {
  if (!GA_ID) return
  if (started) return window.gtag('consent', 'update', { analytics_storage: 'granted' })
  started = true
  window.dataLayer = window.dataLayer || []
  window.gtag = gtag
  gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
  gtag('js', new Date())
  // Page views are sent by trackPageView() on every route change, so GA's automatic one is off.
  gtag('config', GA_ID, { anonymize_ip: true, send_page_view: false, cookie_expires: 14 * 30 * 86400 })
  const s = document.createElement('script')
  s.async = true
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID)
  document.head.appendChild(s)
}

function stop() {
  if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' })
  // Remove GA cookies already set on this domain.
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim()
    if (name.startsWith('_ga')) {
      document.cookie = `${name}=; max-age=0; path=/`
      document.cookie = `${name}=; max-age=0; path=/; domain=.${location.hostname}`
    }
  })
}

export function track(event, params = {}) {
  if (!browser || readConsent() !== 'granted' || !window.gtag) return
  window.gtag('event', event, { ...params, page_path: location.pathname })
}

export function trackPageView() {
  track('page_view', { page_location: location.href, page_title: document.title })
}

/** Watches the landing page: section views and dwell time, CTA clicks, FAQ opens and scroll depth. */
export function watchPage(root = document) {
  if (!browser) return () => {}
  if (readConsent() === 'granted') start()

  const sectionOf = (el) => el.closest('section[id], [data-section]')
  const nameOf = (sec) => sec?.dataset.section || sec?.id || 'other'

  const onClick = (e) => {
    const el = e.target.closest('[data-track]')
    if (el) track('cta_click', { cta: el.dataset.track, section: nameOf(sectionOf(el)) })
  }
  const onToggle = (e) => {
    const d = e.target
    if (d.tagName === 'DETAILS' && d.open) track('faq_open', { question: d.querySelector('summary')?.textContent.trim().slice(0, 100) })
  }
  root.addEventListener('click', onClick)
  root.addEventListener('toggle', onToggle, true)

  const seen = new Set()
  const since = new Map()
  const flush = (name) => {
    const t0 = since.get(name)
    if (t0 == null) return
    since.delete(name)
    const seconds = Math.round((performance.now() - t0) / 1000)
    if (seconds >= 2) track('section_dwell', { section: name, seconds })
  }
  let io
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        const name = nameOf(en.target)
        if (en.isIntersecting) {
          if (!seen.has(name)) { seen.add(name); track('section_view', { section: name }) }
          since.set(name, performance.now())
        } else flush(name)
      }),
      { threshold: 0.5 },
    )
    root.querySelectorAll('main section[id], main [data-section]').forEach((s) => io.observe(s))
  }

  const marks = [25, 50, 75, 100]
  const hit = new Set()
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight
    const pct = max > 0 ? (scrollY / max) * 100 : 100
    marks.forEach((m) => { if (pct >= m - 1 && !hit.has(m)) { hit.add(m); track('scroll_depth', { percent: m }) } })
  }
  addEventListener('scroll', onScroll, { passive: true })
  const onHide = () => { if (document.visibilityState === 'hidden') [...since.keys()].forEach(flush) }
  document.addEventListener('visibilitychange', onHide)

  return () => {
    root.removeEventListener('click', onClick)
    root.removeEventListener('toggle', onToggle, true)
    removeEventListener('scroll', onScroll)
    document.removeEventListener('visibilitychange', onHide)
    ;[...since.keys()].forEach(flush)
    io?.disconnect()
  }
}
