import { useLayoutEffect, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { Ic, P } from '../shared.jsx'
import { prefersReducedMotion } from './motion.js'

const people = {
  nok: ['น', 'คุณนก', 'ผู้จัดการอาคาร', 'sky'],
  fon: ['ฝ', 'คุณฝน', 'บัญชี', 'green'],
  wichai: ['ว', 'ช่างวิชัย', 'ซ่อมบำรุง', 'orange'],
}
const sites = {
  green: 'The Green Residence',
  city: 'ตลาดนัดรวยทรัพย์',
  slow: 'Slow Living Resort',
}
const tasks = [
  { id: 't1', text: 'จดมิเตอร์ตึก A ห้อง 101–124', who: 'nok', site: 'green', icon: P.home },
  { id: 't2', text: 'ตรวจสลิป 4 รายการ', who: 'fon', site: 'green', icon: P.card },
  { id: 't3', text: 'ซ่อมไฟส่องสว่างโซน F', who: 'wichai', site: 'city', icon: P.wrench },
  { id: 't4', text: 'เช็คอินแขก Villa 03', who: 'nok', site: 'slow', icon: P.user },
  { id: 't5', text: 'ตรวจรายได้ค่าแผงวันนี้', who: 'fon', site: 'city', icon: P.chart },
  { id: 't6', text: 'ซ่อมเครื่องทำน้ำอุ่น Deluxe 14', who: 'wichai', site: 'slow', icon: P.wrench },
]

const modes = [
  {
    key: 'owner',
    label: 'ดูแลเอง',
    title: 'เจ้าของที่ดูแลทุกอย่างเอง',
    text: 'งานทุกชิ้นอยู่ในรายการเดียว เปิดมือถือก็รู้ว่าวันนี้ต้องทำอะไร',
  },
  {
    key: 'team',
    label: 'ทำงานเป็นทีม',
    title: 'ธุรกิจที่มีพนักงาน',
    text: 'แบ่งหน้าที่และมอบหมายงานให้แต่ละฝ่าย ผู้ดูแลอาคารเห็นเฉพาะอาคารที่ได้รับสิทธิ์ ช่างและแม่บ้านรับงานผ่าน LINE ของทีม เจ้าของเห็นความคืบหน้าทั้งหมด',
  },
  {
    key: 'portfolio',
    label: 'หลายสาขา',
    title: 'องค์กรที่มีหลายทรัพย์สิน',
    text: 'ดูภาพรวมทุกแห่งพร้อมกัน หรือแยกดูทีละสาขา ทีมเดียวดูแลได้หลายแห่ง และเช็กยอดทุกสาขาผ่าน LINE ได้ในแพ็กเกจ Business',
  },
]

function columnsFor(mode) {
  if (mode === 'owner') return [{ key: 'me', title: 'งานของคุณวันนี้', items: tasks }]
  if (mode === 'team')
    return Object.entries(people).map(([key, [, name, role]]) => ({
      key,
      title: name,
      sub: role,
      items: tasks.filter((x) => x.who === key),
    }))
  return Object.entries(sites).map(([key, name]) => ({
    key,
    title: name,
    sub: tasks.filter((x) => x.site === key).length + ' งาน',
    items: tasks.filter((x) => x.site === key),
  }))
}

export function Flexibility() {
  const { t } = useLanguage()
  const [mode, setMode] = useState('owner')
  const board = useRef(null)
  const before = useRef(null)
  const current = modes.find((m) => m.key === mode)

  const change = (next) => {
    if (next === mode) return
    if (board.current && !prefersReducedMotion()) {
      before.current = new Map(
        [...board.current.querySelectorAll('[data-task]')].map((el) => [el.dataset.task, el.getBoundingClientRect()]),
      )
    }
    setMode(next)
  }

  // FLIP: tasks glide from their old column to the new one.
  useLayoutEffect(() => {
    const rects = before.current
    before.current = null
    if (!rects || !board.current) return
    board.current.querySelectorAll('[data-task]').forEach((el) => {
      const old = rects.get(el.dataset.task)
      if (!old) return
      const now = el.getBoundingClientRect()
      const dx = old.left - now.left
      const dy = old.top - now.top
      if (!dx && !dy) return
      el.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
        { duration: 560, easing: 'cubic-bezier(.16,1,.3,1)' },
      )
    })
  }, [mode])

  return (
    <section className="section lp-flex" id="team">
      <div className="container">
        <div className="lp-flex-layout">
          <div className="lp-flex-copy" data-reveal>
            <h2>
              {t('ดูแลเองก็ง่าย')}
              <br />
              <span className="muted-heading">{t('บริหารทั้งทีมก็คล่องตัว')}</span>
            </h2>
            <p>{t('ไม่ว่าคุณจะมีอสังหาริมทรัพย์เพียงแห่งเดียวหรือหลายแห่ง เริ่มจากจุดที่ธุรกิจคุณอยู่ แล้วขยายการใช้งานได้ตามการเติบโต')}</p>

            <div className="lp-switch lp-mode-switch" role="group" aria-label={t('เลือกรูปแบบการทำงาน')}>
              {modes.map((m) => (
                <button key={m.key} type="button" aria-pressed={mode === m.key} onClick={() => change(m.key)}>
                  {t(m.label)}
                </button>
              ))}
            </div>
            <div className="lp-mode-desc" aria-live="polite">
              <h3>{t(current.title)}</h3>
              <p>{t(current.text)}</p>
            </div>
          </div>

          <div className={'lp-board is-' + mode} ref={board} aria-label={t('ตัวอย่างกระดานงาน')}>
            <div className="lp-board-top">
              <b>{t('กระดานงาน · วันนี้')}</b>
              <span className="sample-label">{t('ข้อมูลตัวอย่าง')}</span>
            </div>
            <div className="lp-board-cols">
              {columnsFor(mode).map((col) => (
                <div className="lp-col" key={col.key}>
                  <div className="lp-col-head">
                    {mode === 'team' && (
                      <span className={'lp-avatar is-' + people[col.key][3]}>{t(people[col.key][0])}</span>
                    )}
                    <div>
                      <b>{t(col.title)}</b>
                      {col.sub && <small>{t(col.sub)}</small>}
                    </div>
                  </div>
                  <ul>
                    {col.items.map((task) => {
                      const person = people[task.who]
                      return (
                        <li key={task.id} data-task={task.id} className="lp-task">
                          <span className="lp-task-icon">
                            <Ic d={task.icon} size={16} />
                          </span>
                          <span className="lp-task-text">
                            {t(task.text)}
                            {mode !== 'portfolio' && <small>{t(sites[task.site])}</small>}
                          </span>
                          {mode === 'owner' ? (
                            <span className="lp-avatar is-navy" title={t('คุณ')}>
                              {t('คุณ')}
                            </span>
                          ) : mode === 'portfolio' ? (
                            <span className={'lp-avatar is-' + person[3]} title={t(person[1])}>
                              {t(person[0])}
                            </span>
                          ) : null}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
