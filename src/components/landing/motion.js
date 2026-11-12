import { useEffect, useSyncExternalStore } from 'react'

const REDUCE = '(prefers-reduced-motion: reduce)'
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.(REDUCE).matches

const subscribeReduce = (notify) => {
  const query = window.matchMedia?.(REDUCE)
  query?.addEventListener('change', notify)
  return () => query?.removeEventListener('change', notify)
}
/** Live reduced-motion preference; false during prerender. */
export const useReducedMotion = () => useSyncExternalStore(subscribeReduce, prefersReducedMotion, () => false)

/**
 * Writes scroll progress (0 → 1) of `ref` through the viewport into CSS
 * custom properties, without React re-renders.
 *  - mode 'through': 0 when the element's top hits the viewport top,
 *    1 when its bottom reaches the viewport bottom (for sticky stages).
 *  - mode 'enter': 0 when the top enters the viewport bottom,
 *    1 when the element's top reaches `end` of the viewport height.
 */
export function useScrollProgress(ref, { mode = 'through', end = 0.35, snap = false, onChange } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = prefersReducedMotion()
    let frame = 0
    let last = -1
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      let p
      if (mode === 'through') {
        const span = Math.max(rect.height - vh, 1)
        p = -rect.top / span
      } else {
        p = (vh - rect.top) / (vh * (1 - end))
      }
      p = Math.min(1, Math.max(0, p))
      if (reduce && snap) p = p > 0.45 ? 1 : 0
      if (Math.abs(p - last) < 0.001) return
      last = p
      el.style.setProperty('--p', p.toFixed(4))
      onChange?.(p)
    }
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [ref, mode, end, snap, onChange])
}

/**
 * Two-way scroll reveal for `[data-reveal]` elements: they rise in while
 * scrolling down, settle down from above while scrolling up, and step back
 * out the way they left. Content is fully visible without JavaScript; the
 * hidden state only applies once `html.motion-ready` is set here.
 */
export function useReveal() {
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return
    const root = document.documentElement
    const items = [...document.querySelectorAll('[data-reveal]')]
    const vh = window.innerHeight
    // Anything already on screen stays put — no flash on first paint.
    items.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('is-in')
      else el.dataset.from = r.bottom <= 0 ? 'above' : 'below'
    })
    root.classList.add('motion-ready')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target
          if (entry.isIntersecting) {
            el.classList.add('is-in')
          } else {
            el.dataset.from = entry.boundingClientRect.top < 0 ? 'above' : 'below'
            el.classList.remove('is-in')
          }
        })
      },
      { rootMargin: '-6% 0px -10% 0px' },
    )
    items.forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      root.classList.remove('motion-ready')
    }
  }, [])
}
