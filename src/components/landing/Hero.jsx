import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { Ic, P, HORCARE_URL } from '../shared.jsx'
import { prefersReducedMotion, useReducedMotion, useScrollProgress } from './motion.js'
import { DEMO_URL } from './links.js'

// One entry per word in the headline; the dashboard follows the same index.
const assets = [
  {
    word: 'หอพัก',
    tone: '#23895b',
    glow: '#9fe0bd',
    title: 'หอพักบ้านสุขใจ',
    sub: 'หอพัก · 64 ห้อง · เก็บรายเดือน',
    units: 64,
    occupied: 61,
    unitLabel: 'ห้องที่มีผู้เช่า',
    freeLabel: 'ห้องพร้อมปล่อยเช่า',
    revenue: 189100,
    pending: 5,
    bars: [52, 58, 61, 66, 70, 82],
    rows: [['ห้อง 201', '3,180', 'รับชำระแล้ว'], ['ห้อง 305', '2,940', 'รับชำระแล้ว'], ['ห้อง 412', '3,260', 'รอตรวจสอบ']],
  },
  {
    word: 'ตลาด',
    tone: '#bd5b00',
    glow: '#ffd29a',
    title: 'ตลาดนัดรวยทรัพย์',
    sub: 'ตลาด · 92 แผง · เก็บรายวัน',
    units: 92,
    occupied: 86,
    unitLabel: 'แผงที่มีผู้เช่า',
    freeLabel: 'แผงว่างให้จอง',
    revenue: 257600,
    pending: 6,
    bars: [64, 72, 58, 77, 81, 90],
    rows: [['แผง F-12', '120', 'เก็บแล้ว'], ['แผง F-13', '120', 'เก็บแล้ว'], ['แผง K-04', '150', 'รอตรวจสอบ']],
  },
  {
    word: 'อพาร์ตเมนต์',
    tone: '#1a6fae',
    glow: '#a9d6fa',
    title: 'The Green Residence',
    sub: 'อพาร์ตเมนต์ · 48 ห้อง · เก็บรายเดือน',
    units: 48,
    occupied: 44,
    unitLabel: 'ห้องที่มีผู้เช่า',
    freeLabel: 'ห้องพร้อมปล่อยเช่า',
    revenue: 224800,
    pending: 4,
    bars: [46, 61, 55, 74, 69, 89],
    rows: [['A-101', '5,620', 'รับชำระแล้ว'], ['A-204', '5,400', 'รับชำระแล้ว'], ['B-302', '6,200', 'รอตรวจสอบ']],
  },
  {
    word: 'คอนโด',
    tone: '#173c63',
    glow: '#b7cbe6',
    title: 'City Living Portfolio',
    sub: 'คอนโดและบ้านเช่า · 12 ยูนิต',
    units: 12,
    occupied: 10,
    unitLabel: 'ยูนิตที่มีผู้เช่า',
    freeLabel: 'ยูนิตพร้อมปล่อยเช่า',
    revenue: 185000,
    pending: 1,
    bars: [70, 70, 62, 70, 78, 78],
    rows: [['C-1208', '18,500', 'รับชำระแล้ว'], ['H-03', '18,000', 'รับชำระแล้ว'], ['C-0905', '15,000', 'รอตรวจสอบ']],
  },
  {
    word: 'รีสอร์ท',
    tone: '#0f7a68',
    glow: '#a6e6d8',
    title: 'Slow Living Resort',
    sub: 'รีสอร์ท · 24 ห้อง · คิดรายคืน',
    units: 24,
    occupied: 19,
    unitLabel: 'ห้องที่มีแขกคืนนี้',
    freeLabel: 'ห้องว่างคืนนี้',
    revenue: 312400,
    pending: 2,
    bars: [40, 48, 66, 58, 74, 94],
    rows: [['Villa 03', '4,800', 'รับชำระแล้ว'], ['Deluxe 11', '2,600', 'รับชำระแล้ว'], ['Deluxe 14', '5,200', 'รอตรวจสอบ']],
  },
  {
    word: 'พื้นที่เช่า',
    tone: '#a2501a',
    glow: '#ffc9a8',
    title: 'The Hub Community Mall',
    sub: 'พื้นที่เช่าและบูธ · 36 ยูนิต',
    units: 36,
    occupied: 33,
    unitLabel: 'ยูนิตที่มีผู้เช่า',
    freeLabel: 'ยูนิตว่างให้เช่า',
    revenue: 486000,
    pending: 3,
    bars: [58, 63, 69, 72, 80, 86],
    rows: [['ยูนิต G-05', '18,000', 'รับชำระแล้ว'], ['บูธ B-12', '6,500', 'รับชำระแล้ว'], ['ยูนิต 2-07', '14,000', 'รอตรวจสอบ']],
  },
]

const ROTATE_MS = 3200
const MORPH_MS = 1150

/**
 * "Liquid" word morph: the outgoing and incoming words are blurred into each
 * other and an SVG alpha-threshold filter sharpens the blend back into crisp
 * edges, so one word appears to melt and re-form as the next. The filter is
 * only applied while morphing, so text at rest stays perfectly crisp.
 */
function MorphWord({ words, index }) {
  const box = useRef(null)
  const a = useRef(null)
  const b = useRef(null)
  const shown = useRef(null)
  // The two morph layers are owned by this effect, never by React's text diffing.
  useLayoutEffect(() => {
    const from = shown.current
    shown.current = index
    const el = box.current
    const out = a.current
    const inn = b.current
    if (!el || !out || !inn) return
    const paint = (word, node, f) => {
      node.textContent = word.text
      node.style.color = word.tone
      node.style.filter = f >= 1 ? 'none' : `blur(${Math.min(8 / Math.max(f, 0.001) - 8, 100)}px)`
      node.style.opacity = `${Math.pow(f, 0.4) * 100}%`
    }
    el.classList.add('is-live')
    if (from === null || from === index || prefersReducedMotion()) {
      paint(words[index], out, 1)
      inn.style.opacity = '0'
      return
    }
    paint(words[from], out, 1)
    inn.style.opacity = '0'
    el.classList.add('is-morphing')
    let frame = 0
    const t0 = performance.now()
    const tick = () => {
      const raw = Math.min(1, (performance.now() - t0) / MORPH_MS)
      const f = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2
      paint(words[from], out, 1 - f)
      paint(words[index], inn, f)
      if (raw < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        // settle: the incoming word becomes the resting one
        paint(words[index], out, 1)
        inn.style.opacity = '0'
        el.classList.remove('is-morphing')
      }
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      el.classList.remove('is-morphing')
      paint(words[index], out, 1)
      inn.style.opacity = '0'
    }
  }, [index, words])
  return (
    <span className="lp-rotator" aria-hidden="true">
      <svg className="lp-morph-defs" width="0" height="0" focusable="false">
        <defs>
          <filter id="lp-threshold">
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
          </filter>
        </defs>
      </svg>
      {words.map((w) => (
        <span className="lp-word-size" key={w.text}>
          {w.text}
        </span>
      ))}
      <span className="lp-morph" ref={box}>
        <span className="lp-morph-static" style={{ color: words[index].tone }}>
          {words[index].text}
        </span>
        <span className="lp-morph-text" ref={a} />
        <span className="lp-morph-text" ref={b} />
      </span>
    </span>
  )
}

/** Counts smoothly from the previous value to the new one. */
function CountUp({ value }) {
  const [shown, setShown] = useState(value)
  const from = useRef(value)
  useEffect(() => {
    const start = from.current
    from.current = value
    if (start === value || prefersReducedMotion()) {
      setShown(value)
      return
    }
    let frame = 0
    const t0 = performance.now()
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / 900)
      const eased = 1 - Math.pow(1 - k, 4)
      setShown(Math.round(start + (value - start) * eased))
      if (k < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])
  return shown.toLocaleString('en-US')
}

function Dashboard({ asset }) {
  const { t } = useLanguage()
  return (
    <div className="dashboard" aria-label={t('ตัวอย่างหน้าภาพรวมอสังหาริมทรัพย์')}>
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <img className="dash-logo" src="/HORCARE%20small.png" width="48" height="48" alt="HorCare" />
        </div>
        {[
          [P.chart, 'ภาพรวม', true],
          [P.home, 'ทรัพย์สิน'],
          [P.user, 'ผู้เช่า'],
          [P.doc, 'การเงิน'],
          [P.wrench, 'แจ้งซ่อม'],
        ].map(([icon, label, active]) => (
          <span className={active ? 'dash-nav active' : 'dash-nav'} key={label}>
            <Ic d={icon} size={19} />
            <span>{t(label)}</span>
          </span>
        ))}
        <div className="dash-avatar">HC</div>
      </aside>
      <div className="dash-main">
        <div className="dash-top">
          <span>
            {t('พื้นที่ทำงานของคุณ')} <span className="dash-slash">/</span> <strong>{t('ภาพรวม')}</strong>
          </span>
          <span className="sample-label">{t('ข้อมูลตัวอย่าง')}</span>
        </div>
        <div className="dash-heading" key={asset.title}>
          <div>
            <h2>{t(asset.title)}</h2>
            <p>{t(asset.sub)}</p>
          </div>
          <span className="dash-date">{t('พฤศจิกายน 2026')}</span>
        </div>
        <div className="dash-stats" aria-live="polite">
          <div>
            <span>{t('รายรับเดือนนี้')}</span>
            <strong>
              ฿<CountUp value={asset.revenue} />
            </strong>
            <small>{t('ยอดรับชำระในตัวอย่าง')}</small>
          </div>
          <div>
            <span>{t(asset.unitLabel)}</span>
            <strong>
              <CountUp value={asset.occupied} />
              <em> / {asset.units}</em>
            </strong>
            <small>
              {asset.units - asset.occupied} {t(asset.freeLabel)}
            </small>
          </div>
          <div>
            <span>{t('รอตรวจสอบยอด')}</span>
            <strong>
              {asset.pending}
              <em> {t('รายการ')}</em>
            </strong>
            <small>{t('ติดตามต่อได้ในที่เดียว')}</small>
          </div>
        </div>
        <div className="dash-bottom">
          <div className="revenue-chart">
            <div className="chart-heading">
              <strong>{t('ภาพรวมรายรับ')}</strong>
              <span>
                <i /> {t('รับชำระแล้ว')}
              </span>
            </div>
            <div className="chart-content">
              <div className="chart-scale">
                <span>250k</span>
                <span>150k</span>
                <span>50k</span>
              </div>
              <div className="bars" role="img" aria-label={t('กราฟตัวอย่างรายรับ 6 เดือน มีแนวโน้มเพิ่มขึ้น')}>
                {asset.bars.map((height, i) => (
                  <div className="bar-col" key={i}>
                    <div className={i === 5 ? 'bar current' : 'bar'} style={{ height: height + '%', '--i': i }} />
                    <span>{[t('มิ.ย.'), t('ก.ค.'), t('ส.ค.'), t('ก.ย.'), t('ต.ค.'), t('พ.ย.')][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="payment-list" key={asset.word}>
            <strong>{t('รายการล่าสุด')}</strong>
            {asset.rows.map(([room, amount, status], i) => (
              <div className="payment-row" key={room} style={{ '--i': i }}>
                <span className="room-mark">
                  <Ic d={P.home} size={17} />
                </span>
                <div>
                  <b>{t(room)}</b>
                  <small className={i === 2 ? 'pending' : ''}>{t(status)}</small>
                </div>
                <b>฿{amount}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(true)
  const section = useRef(null)
  const stage = useRef(null)
  useScrollProgress(stage, { mode: 'enter', end: 0.1 })
  useScrollProgress(section, { mode: 'through' })
  const asset = assets[selected]
  const morphWords = useMemo(() => assets.map((a) => ({ text: t(a.word), tone: a.tone })), [t])

  // Autoplay stops for reduced motion, off-screen, hidden tabs, hover, or once the visitor takes over.
  const reduced = useReducedMotion()
  const autoplay = playing && !reduced
  useEffect(() => {
    const el = section.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (!autoplay || hovering || !visible) return
    const id = setInterval(() => {
      if (!document.hidden) setSelected((i) => (i + 1) % assets.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [autoplay, hovering, visible])

  const choose = (i) => {
    setSelected(i)
    setPlaying(false)
  }

  return (
    <section className="hero lp-hero" ref={section} style={{ '--tone': asset.tone, '--glow': asset.glow }}>
      <div className="lp-aura" aria-hidden="true">
        <i className="lp-aura-a" />
        <i className="lp-aura-b" />
        <i className="lp-aura-c" />
      </div>
      <div className="container">
        <div className="lp-hero-intro">
          <h1 className="lp-h1">
            <span className="lp-h1-lead">{t('ไม่ว่าคุณจะเป็นเจ้าของ')}</span>
            <MorphWord words={morphWords} index={selected} />
            <span className="sr-only">{t('หอพัก ตลาด อพาร์ตเมนต์ คอนโด รีสอร์ท หรือพื้นที่เช่า')}</span>
            <span className="lp-h1-tail">
              {t('ให้')} <span className="lp-h1-brand">HorCare</span> {t('ดูแลให้คุณ')}
            </span>
          </h1>
          <p className="lp-hero-lede">
            <strong>{t('บริหารอสังหาริมทรัพย์ได้ง่ายขึ้น ในระบบเดียว')}</strong>{' '}
            {t('ตั้งแต่จัดการผู้เช่า ออกบิล ดูแลทรัพย์สิน ไปจนถึงบริหารทีมงาน ทุกอย่างเชื่อมต่อกันบน HorCare')}
          </p>
          <div className="hero-actions lp-hero-actions">
            <a className="button primary lp-cta-glow" href={DEMO_URL} target="_blank" rel="noreferrer">
              {t('ขอ Demo ระบบจริง')}
              <Ic d={P.arrow} size={18} />
            </a>
            <a className="button lp-glass-button" href={HORCARE_URL}>
              {t('เริ่มใช้งานฟรี')}
              <Ic d="M7 17 17 7M7 7h10v10" size={17} />
            </a>
          </div>
          <ul className="lp-hero-fine">
            {['ฟรีสูงสุด 250 ห้อง', 'ไม่ต้องผูกบัตรเครดิต', 'ทดลอง Pro ฟรี 30 วัน'].map((x) => (
              <li key={x}>
                <Ic d={P.check} size={15} />
                {t(x)}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="lp-hero-stage"
          ref={stage}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
        >
          <div className="portfolio-preview" id="properties">
            <div className="preview-caption">
              <span>{t('ทุกสินทรัพย์ของคุณ ในมุมมองเดียว')}</span>
              <div className="lp-tabs-wrap">
                <div className="property-tabs" role="group" aria-label={t('เลือกประเภทอสังหาฯ ตัวอย่าง')}>
                  {assets.map((a, i) => (
                    <button key={a.word} type="button" aria-pressed={selected === i} onClick={() => choose(i)}>
                      {t(a.word)}
                      {selected === i && autoplay && !hovering && (
                        <i className="lp-tab-timer" key={selected} style={{ animationDuration: ROTATE_MS + 'ms' }} />
                      )}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="lp-play"
                  aria-label={autoplay ? t('หยุดการสลับอัตโนมัติ') : t('เล่นการสลับอัตโนมัติ')}
                  onClick={() => setPlaying(!autoplay)}
                  hidden={reduced}
                >
                  <Ic d={autoplay ? 'M9 6v12M15 6v12' : 'M8 5.5v13l11-6.5z'} size={15} />
                </button>
              </div>
            </div>
            <Dashboard asset={asset} />
            <div className="preview-foot">
              <span>
                <span className="status-dot" /> One System. Every Asset.
              </span>
              <span>{t('ตัวอย่างการแสดงผล · ไม่ใช่ข้อมูลลูกค้าจริง')}</span>
            </div>
          </div>

          <div className="lp-float lp-float-bill" aria-hidden="true">
            <span className="lp-float-icon is-green">
              <Ic d={P.chat} size={18} />
            </span>
            <div key={asset.word}>
              <b>{t('ส่งบิลและรับสลิปทาง LINE')}</b>
              <small>
                {t(asset.rows[0][0])} · ฿{asset.rows[0][1]}
              </small>
            </div>
            <Ic d={P.check} size={18} />
          </div>
          <div className="lp-float lp-float-repair" aria-hidden="true">
            <span className="lp-float-icon is-orange">
              <Ic d={P.wrench} size={18} />
            </span>
            <div>
              <b>{t('แจ้งซ่อม B-204 · แอร์มีน้ำหยด')}</b>
              <small>{t('มอบหมายให้ช่างวิชัย · กำลังดำเนินการ')}</small>
            </div>
          </div>
          <div className="lp-float lp-float-slip" aria-hidden="true">
            <span className="lp-float-icon is-sky">
              <Ic d={P.card} size={18} />
            </span>
            <div>
              <b>{t('AI ตรวจสลิปแล้ว')}</b>
              <small>{t('ยอดตรง · ผู้รับถูกบัญชี')}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
