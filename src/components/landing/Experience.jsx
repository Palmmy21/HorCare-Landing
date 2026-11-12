import { useState } from 'react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { Ic, P } from '../shared.jsx'

const OK = P.check

function Row({ children, className = '' }) {
  return <div className={'lp-m-row ' + className}>{children}</div>
}

function Status({ tone = 'green', children }) {
  return <span className={'lp-status is-' + tone}>{children}</span>
}

/* ---------- Billing ---------- */
function BillScreens({ step, t }) {
  if (step === 0)
    return (
      <>
        <h4>{t('จดมิเตอร์ · พฤศจิกายน 2026')}</h4>
        <div className="lp-m-table">
          <Row className="is-head">
            <span>{t('ห้อง')}</span>
            <span>{t('ไฟ (ก่อน → ล่าสุด)')}</span>
            <span>{t('น้ำ (ก่อน → ล่าสุด)')}</span>
          </Row>
          <Row className="is-focus">
            <b>A-101</b>
            <span>
              1,482 → <em className="lp-m-input">1,542</em>
            </span>
            <span>
              312 → <em className="lp-m-input">319</em>
            </span>
          </Row>
          <Row>
            <b>A-102</b>
            <span>2,108 → 2,171</span>
            <Status>{t('บันทึกแล้ว')}</Status>
          </Row>
          <Row>
            <b>A-103</b>
            <span>977 → 1,031</span>
            <Status>{t('บันทึกแล้ว')}</Status>
          </Row>
        </div>
      </>
    )
  if (step === 1)
    return (
      <>
        <h4>{t('ใบแจ้งหนี้ห้อง A-101')}</h4>
        <div className="lp-m-invoice">
          <Row>
            <span>{t('ค่าเช่า')}</span>
            <b>฿5,000</b>
          </Row>
          <Row>
            <span>{t('ค่าไฟ 60 หน่วย × ฿8')}</span>
            <b>฿480</b>
          </Row>
          <Row>
            <span>{t('ค่าน้ำ 7 หน่วย × ฿20')}</span>
            <b>฿140</b>
          </Row>
          <Row className="is-total">
            <span>{t('ยอดรวม')}</span>
            <b>฿5,620</b>
          </Row>
          <div className="lp-m-qr">
            <span className="lp-qr" aria-hidden="true" />
            <span>{t('QR PromptPay แนบในบิลอัตโนมัติ')}</span>
          </div>
        </div>
      </>
    )
  return (
    <>
      <h4>{t('ผู้เช่าได้รับบิลใน LINE')}</h4>
      <div className="lp-m-chat">
        <div className="lp-bubble is-in">
          <b>HorCare</b>
          {t('บิลห้อง A-101 เดือนพฤศจิกายน ยอด ฿5,620 ชำระผ่าน QR PromptPay ได้เลย')}
        </div>
        <div className="lp-bubble is-out">
          <span className="lp-slip">{t('สลิป ฿5,620')}</span>
          {t('โอนแล้วค่ะ')}
        </div>
      </div>
      <Row className="lp-m-result">
        <b>A-101</b>
        <span>{t('สลิปตรงยอด')}</span>
        <Status>{t('ชำระแล้ว')}</Status>
      </Row>
    </>
  )
}

/* ---------- Repair ---------- */
function RepairScreens({ step, t }) {
  if (step === 0)
    return (
      <>
        <h4>{t('งานแจ้งซ่อม')}</h4>
        <div className="lp-m-ticket is-new">
          <div>
            <b>{t('#1024 · ห้อง B-204')}</b>
            <span>{t('แอร์มีน้ำหยด · แนบรูป 2 รูป')}</span>
            <small>{t('แจ้งเมื่อ 09:12')}</small>
          </div>
          <Status tone="orange">{t('ใหม่')}</Status>
        </div>
        <div className="lp-m-ticket">
          <div>
            <b>{t('#1021 · ห้อง A-118')}</b>
            <span>{t('ก๊อกน้ำรั่ว')}</span>
          </div>
          <Status tone="sky">{t('กำลังดำเนินการ')}</Status>
        </div>
      </>
    )
  if (step === 1)
    return (
      <>
        <h4>{t('มอบหมายงาน #1024')}</h4>
        <p className="lp-m-label">{t('ผู้รับผิดชอบ')}</p>
        <div className="lp-m-options">
          <span className="is-picked">
            <span className="lp-avatar">ว</span>
            {t('ช่างวิชัย · ซ่อมบำรุง')}
            <Ic d={OK} size={16} />
          </span>
          <span>
            <span className="lp-avatar is-sky">น</span>
            {t('คุณนก · ผู้จัดการอาคาร')}
          </span>
        </div>
        <div className="lp-m-fields">
          <Row>
            <span>{t('กำหนดเสร็จ')}</span>
            <b>{t('วันนี้ 15:00')}</b>
          </Row>
          <Row>
            <span>{t('ความสำคัญ')}</span>
            <Status tone="orange">{t('ด่วน')}</Status>
          </Row>
        </div>
      </>
    )
  return (
    <>
      <h4>{t('ติดตามงาน #1024')}</h4>
      <ol className="lp-m-timeline">
        <li>
          <b>{t('รับเรื่อง')}</b>
          <small>09:12</small>
        </li>
        <li>
          <b>{t('มอบหมายช่างวิชัย')}</b>
          <small>09:20</small>
        </li>
        <li>
          <b>{t('กำลังซ่อม')}</b>
          <small>13:40</small>
        </li>
        <li className="is-done">
          <b>{t('เสร็จแล้ว')}</b>
          <small>14:25</small>
        </li>
      </ol>
      <Row className="lp-m-result">
        <span>{t('ค่าอะไหล่ ฿350')}</span>
        <Status>{t('บันทึกเป็นค่าใช้จ่ายแล้ว')}</Status>
      </Row>
    </>
  )
}

/* ---------- Overview ---------- */
function OverviewScreens({ step, t }) {
  const rooms = [
    ['A-208', 'ค้าง 5 วัน', '5,400'],
    ['B-112', 'ค้าง 3 วัน', '6,260'],
    ['C-305', 'ค้าง 1 วัน', '5,200'],
  ]
  if (step === 0)
    return (
      <>
        <h4>{t('สรุปเช้านี้ · 08:30')}</h4>
        <div className="lp-m-today">
          <Row className="is-focus">
            <span>{t('ค้างชำระ')}</span>
            <b>{t('3 ห้อง · ฿16,860')}</b>
          </Row>
          <Row>
            <span>{t('งานซ่อมที่เปิดอยู่')}</span>
            <b>{t('2 งาน')}</b>
          </Row>
          <Row>
            <span>{t('สัญญาจะหมดใน 30 วัน')}</span>
            <b>{t('1 ห้อง')}</b>
          </Row>
          <Row>
            <span>{t('ห้องว่างพร้อมปล่อยเช่า')}</span>
            <b>{t('4 ห้อง')}</b>
          </Row>
        </div>
      </>
    )
  return (
    <>
      <h4>{step === 1 ? t('ห้องที่ค้างชำระ') : t('ส่งแจ้งเตือนแล้ว 3 ห้อง')}</h4>
      <div className="lp-m-table">
        {rooms.map(([room, late, amount], i) => (
          <Row key={room}>
            <b>{room}</b>
            <span>
              {t(late)} · ฿{amount}
            </span>
            {step === 1 ? (
              <span className="lp-check" aria-hidden="true">
                <Ic d={OK} size={13} />
              </span>
            ) : i === 1 ? (
              <Status>{t('ชำระแล้ว 09:05')}</Status>
            ) : (
              <Status tone="sky">{t('ส่งเตือนแล้ว')}</Status>
            )}
          </Row>
        ))}
      </div>
    </>
  )
}

const scenarios = [
  {
    key: 'bill',
    tab: 'ออกบิลประจำเดือน',
    Screens: BillScreens,
    steps: [
      ['จดเลขมิเตอร์', 'กรอกเลขล่าสุดของแต่ละห้อง ระบบจำเลขเดือนก่อนไว้ให้', 'บันทึกมิเตอร์'],
      ['ระบบคำนวณบิลให้', 'ค่าเช่า ค่าน้ำ ค่าไฟ ตามอัตราที่ตั้งไว้ พร้อม QR ชำระเงิน', 'ส่งบิลให้ผู้เช่า'],
      ['ผู้เช่าจ่าย คุณเห็นทันที', 'ผู้เช่ารับบิลใน LINE ส่งสลิปกลับมา ระบบตรวจยอดให้', 'ดูอีกครั้ง'],
    ],
    proof: 'จากเลขมิเตอร์ ถึงบิลในมือผู้เช่า ใน 3 ขั้นตอน',
  },
  {
    key: 'repair',
    tab: 'รับแจ้งซ่อม · มอบหมายงาน',
    Screens: RepairScreens,
    steps: [
      ['รับเรื่องแจ้งซ่อม', 'ทุกเรื่องเข้ามาเป็นรายการเดียวกัน มีห้อง รูป และเวลาแจ้ง', 'มอบหมายงาน'],
      ['มอบหมายให้คนที่ดูแล', 'เลือกผู้รับผิดชอบและกำหนดเวลา ทุกคนเห็นงานตรงกัน', 'ยืนยันมอบหมาย'],
      ['ติดตามจนงานเสร็จ', 'เห็นสถานะทุกช่วง และบันทึกค่าใช้จ่ายของงานซ่อมไว้ในระบบ', 'ดูอีกครั้ง'],
    ],
    proof: 'ไม่ต้องย้อนหาในแชต รู้ทุกครั้งว่างานอยู่ตรงไหน',
  },
  {
    key: 'overview',
    tab: 'ติดตามภาพรวม',
    Screens: OverviewScreens,
    steps: [
      ['เปิดดูสรุปของวันนี้', 'ห้องค้างชำระ งานซ่อม สัญญาใกล้หมด และห้องว่าง รวมไว้หน้าเดียว', 'ดูห้องค้างชำระ'],
      ['เลือกห้องที่ต้องตาม', 'เห็นยอดและจำนวนวันที่ค้าง เลือกทั้งหมดได้ในคลิกเดียว', 'ส่งแจ้งเตือนทาง LINE'],
      ['สถานะอัปเดตให้เอง', 'เมื่อผู้เช่าชำระ สถานะเปลี่ยนในรายการทันที', 'ดูอีกครั้ง'],
    ],
    proof: 'เริ่มวันด้วยภาพรวม ไม่ต้องเปิดไฟล์ทีละไฟล์',
  },
]

export function Experience() {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const [step, setStep] = useState(0)
  const scenario = scenarios[active]
  const { Screens } = scenario
  const last = scenario.steps.length - 1
  const choose = (i) => {
    setActive(i)
    setStep(0)
  }
  return (
    <section className="section lp-experience" id="experience">
      <div className="container">
        <div className="section-heading lp-experience-head" data-reveal>
          <h2>
            {t('ลองกดดู')}
            <br />
            <span className="muted-heading">{t('ว่างานประจำใช้กี่ขั้นตอน')}</span>
          </h2>
          <p>{t('เลือกงานที่คุณทำทุกเดือน แล้วกดปุ่มในหน้าจอเหมือนใช้งานจริง')}</p>
        </div>

        <div className="lp-switch lp-demo-tabs" role="group" aria-label={t('เลือกงานตัวอย่าง')}>
          {scenarios.map((s, i) => (
            <button key={s.key} type="button" aria-pressed={active === i} onClick={() => choose(i)}>
              {t(s.tab)}
            </button>
          ))}
        </div>

        <div className="lp-demo">
          <ol className="lp-demo-steps">
            {scenario.steps.map(([title, text], i) => (
              <li key={title} className={i === step ? 'is-active' : i < step ? 'is-done' : ''}>
                <button type="button" onClick={() => setStep(i)} aria-current={i === step ? 'step' : undefined}>
                  <span className="lp-step-num">{i < step ? <Ic d={OK} size={15} /> : i + 1}</span>
                  <span>
                    <b>{t(title)}</b>
                    <small>{t(text)}</small>
                  </span>
                </button>
              </li>
            ))}
            <li className="lp-demo-proof">
              <Ic d={P.check} size={16} />
              {t(scenario.proof)}
            </li>
          </ol>

          <div className="lp-device">
            <div className="lp-device-top">
              <span className="lp-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>HorCare · {t(scenario.tab)}</span>
              <span className="sample-label">{t('ข้อมูลตัวอย่าง')}</span>
            </div>
            <div className="lp-device-body" aria-live="polite">
              <div className="lp-screen" key={scenario.key + step}>
                <Screens step={step} t={t} />
              </div>
            </div>
            <div className="lp-device-foot">
              <span className="lp-progress" aria-hidden="true">
                {scenario.steps.map((_, i) => (
                  <i key={i} className={i <= step ? 'is-on' : ''} />
                ))}
              </span>
              <button
                type="button"
                className="button primary lp-device-action"
                onClick={() => setStep(step === last ? 0 : step + 1)}
              >
                {t(scenario.steps[step][2])}
                <Ic d={step === last ? 'M4 4v6h6M20 20v-6h-6M5 15a7 7 0 0 0 12 3M19 9A7 7 0 0 0 7 6' : P.arrow} size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
