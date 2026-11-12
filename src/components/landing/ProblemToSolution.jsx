import { useRef } from 'react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { Ic, P } from '../shared.jsx'
import { useScrollProgress } from './motion.js'

const METER = 'M12 3v3m0 12v3M3 12h3m12 0h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'
const CAL = 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5'

// Each fragment of scattered work, and what it becomes inside HorCare.
const fragments = [
  {
    kind: 'notebook',
    pos: [2, 3, -6, 44],
    messy: ['สมุดจดมิเตอร์', 'ห้อง 204 ไฟ 1,482 → ?'],
    tidy: [METER, 'มิเตอร์ห้อง 204 · 60 หน่วย', 'บันทึกแล้ว'],
  },
  {
    kind: 'sheet',
    pos: [52, 0, 4, 46],
    messy: ['ค่าเช่า_พ.ย._final_v3.xlsx', 'แก้ล่าสุดโดย… ไม่แน่ใจ'],
    tidy: [P.doc, 'บิลเดือนนี้ 48 ห้อง · คำนวณครบ', 'พร้อมส่ง'],
  },
  {
    kind: 'chat',
    pos: [27, 27, -2, 50],
    messy: ['พี่คะ แอร์ห้อง 305 ไม่เย็นค่ะ', '3 วันก่อน · ยังไม่ได้ตอบ'],
    tidy: [P.wrench, 'แจ้งซ่อม 305 · แอร์ไม่เย็น', 'มอบหมายแล้ว'],
  },
  {
    kind: 'slip',
    pos: [3, 54, 5, 40],
    messy: ['สลิปโอน ฿5,400', 'ของห้องไหนนะ?'],
    tidy: [P.card, 'สลิป ฿5,400 · ห้อง A-204', 'ตรวจแล้ว'],
  },
  {
    kind: 'sticky',
    pos: [62, 38, -7, 34],
    messy: ['ค่าแผงวันนี้', 'เก็บครบหรือยัง??'],
    tidy: [P.user, 'เก็บค่าแผง 86 / 92 แผง', 'ปิดยอดแล้ว'],
  },
  {
    kind: 'calendar',
    pos: [40, 69, 3, 46],
    messy: ['สัญญาห้อง 112', 'หมดเมื่อไหร่นะ?'],
    tidy: [CAL, 'สัญญาห้อง 112 · หมดใน 30 วัน', 'เห็นล่วงหน้า'],
  },
]

export function ProblemToSolution() {
  const { t } = useLanguage()
  const ref = useRef(null)
  useScrollProgress(ref, { mode: 'through', snap: true })
  return (
    <section className="lp-gather" id="problem" ref={ref} aria-labelledby="problem-title">
      <div className="lp-gather-sticky">
        <div className="container lp-gather-layout">
          <div className="lp-gather-copy">
            <div className="lp-swap lp-swap-a">
              <h2 id="problem-title">
                {t('งานบริหารที่')}
                <br />
                {t('ไม่ควรต้องเหนื่อยขนาดนี้')}
              </h2>
              <p>{t('ข้อมูลอยู่คนละที่ งานอยู่ในหลายแชต ทุกสิ้นเดือนจึงกลายเป็นการไล่ตาม')}</p>
              <ul className="lp-pains">
                <li>{t('จดมิเตอร์ในสมุด แล้วพิมพ์ซ้ำลง Excel')}</li>
                <li>{t('สลิปเข้ามาในแชต ต้องเทียบยอดทีละห้อง')}</li>
                <li>{t('เรื่องแจ้งซ่อมจมอยู่ในข้อความ ไม่รู้ว่าถึงไหนแล้ว')}</li>
                <li>{t('มีหลายที่ หลายคน แต่ไม่เคยเห็นภาพรวมพร้อมกัน')}</li>
              </ul>
            </div>
            <div className="lp-swap lp-swap-b">
              <h2>
                {t('ทุกอย่างรวมอยู่ใน')} <span className="lp-brand-word">HorCare</span>
              </h2>
              <p>{t('งานชิ้นเดิม ข้อมูลชุดเดิม แต่อยู่ในที่เดียว มีสถานะชัด และรู้ว่าใครรับผิดชอบ')}</p>
              <a className="text-link" href="#solution">
                {t('ดูว่าทุกงานเชื่อมกันอย่างไร')}
                <Ic d="M12 5v14m0 0-6-6m6 6 6-6" size={17} />
              </a>
            </div>
          </div>

          <div className="lp-gather-stage" aria-hidden="true">
            <div className="lp-gather-panel">
              <div className="lp-gather-panel-top">
                <img src="/HORCARE%20small.png" width="28" height="28" alt="" />
                <b>{t('งานวันนี้')}</b>
                <span className="sample-label">{t('ข้อมูลตัวอย่าง')}</span>
              </div>
              <p className="lp-gather-panel-foot">{t('6 งาน จาก 3 สินทรัพย์ · ทุกงานมีสถานะและผู้รับผิดชอบ')}</p>
            </div>
            {fragments.map((f, i) => (
              <div
                className={'lp-frag lp-frag-' + f.kind}
                key={f.kind}
                style={{
                  '--i': i,
                  '--x0': f.pos[0] + '%',
                  '--y0': f.pos[1] + '%',
                  '--r0': f.pos[2] + 'deg',
                  '--w0': f.pos[3] + '%',
                }}
              >
                <div className="lp-frag-messy">
                  <b>{t(f.messy[0])}</b>
                  <span>{t(f.messy[1])}</span>
                </div>
                <div className="lp-frag-tidy">
                  <span className="lp-frag-icon">
                    <Ic d={f.tidy[0]} size={17} />
                  </span>
                  <b>{t(f.tidy[1])}</b>
                  <span className="lp-chip">
                    <Ic d={P.check} size={13} />
                    {t(f.tidy[2])}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
