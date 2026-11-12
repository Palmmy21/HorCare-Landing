import { useEffect, useRef } from 'react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { prefersReducedMotion } from './motion.js'

const items = ['หอพัก', 'ตลาด', 'อพาร์ตเมนต์', 'คอนโด', 'รีสอร์ท', 'บ้านเช่า', 'อาคารพาณิชย์', 'บูธ', 'พื้นที่เช่า', 'โรงแรม']

/** A slow ribbon of asset types that drifts with the reader: scrolling down pushes it left, up pulls it right. */
export function AssetMarquee() {
  const { t } = useLanguage()
  const wrap = useRef(null)
  const track = useRef(null)
  useEffect(() => {
    const el = wrap.current
    const tr = track.current
    if (!el || !tr || prefersReducedMotion()) return
    let x = 0
    let dir = -1
    let boost = 0
    let lastY = window.scrollY
    let frame = 0
    let running = false
    const onScroll = () => {
      const y = window.scrollY
      const dy = y - lastY
      lastY = y
      if (dy) dir = dy > 0 ? -1 : 1
      boost = Math.min(boost + Math.abs(dy) * 0.08, 14)
    }
    const loop = () => {
      const half = tr.scrollWidth / 2
      x += dir * (0.45 + boost)
      boost *= 0.92
      if (x <= -half) x += half
      if (x > 0) x -= half
      tr.style.transform = `translate3d(${x}px,0,0)`
      frame = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        frame = requestAnimationFrame(loop)
      } else if (!entry.isIntersecting && running) {
        running = false
        cancelAnimationFrame(frame)
      }
    })
    io.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  const row = (copy) =>
    items.map((x, i) => (
      <span className={'lp-marquee-item' + (i % 2 ? ' is-outline' : '')} key={copy + x}>
        {t(x)}
        <i aria-hidden="true" />
      </span>
    ))
  return (
    <div className="lp-marquee" ref={wrap}>
      <p className="lp-marquee-claim">
        <strong>One System. Every Asset.</strong> {t('ทุกสินทรัพย์ ทุกการจัดการ ในระบบเดียว')}
      </p>
      <div className="lp-marquee-viewport" aria-hidden="true">
        <div className="lp-marquee-track" ref={track}>
          {row(0)}
          {row(1)}
        </div>
      </div>
    </div>
  )
}
