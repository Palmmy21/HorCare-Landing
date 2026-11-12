import { useLanguage } from '../../i18n/useLanguage.js'
import { Ic, P, LINE_URL } from '../shared.jsx'

const steps = [
  {
    title: 'เลือกแพ็กเกจที่เหมาะสม',
    you: 'เริ่มแพ็กเกจฟรีได้ทันที หรือทดลอง HorCare Pro ฟรี 30 วัน ใช้ได้ทุกฟีเจอร์',
    us: 'แนะนำแพ็กเกจตามประเภทสินทรัพย์ จำนวนห้อง และจำนวนสาขาของคุณ',
  },
  {
    title: 'ตั้งค่าทรัพย์สินและข้อมูล',
    you: 'สมัครแบบทีละขั้น เลือกประเภทสินทรัพย์และวิธีเก็บเงิน แล้วนำเข้าห้องจาก Excel ได้',
    us: 'แพ็กเกจ HorCare Pro มีทีมช่วยเซ็ตอัพ และ Business มีทีมย้ายข้อมูลทุกสาขาให้',
  },
  {
    title: 'จัดการข้อมูลผู้เช่าและทีมงาน',
    you: 'ผู้เช่าสแกน QR ประจำห้องเพื่อลงทะเบียนผ่าน LINE และเพิ่มทีมงานด้วยเบอร์โทร',
    us: 'ช่วยเชื่อม LINE Official Account ของคุณให้พร้อมใช้งาน',
  },
  {
    title: 'เริ่มบริหารงานผ่าน HorCare',
    you: 'จดมิเตอร์ ออกบิล เก็บเงิน และติดตามงานจากที่เดียว พร้อมคู่มือในแอป',
    us: 'ตอบคำถามผ่าน LINE ทุกครั้งที่มีจุดติดขัด',
  },
]

const promises = [
  [P.doc, 'ราคาชัดเจน', 'ทุกแพ็กเกจแสดงราคาบนหน้านี้ ไม่มีค่าใช้จ่ายแอบแฝง'],
  [P.chat, 'คุยกับทีมงานได้โดยตรง', 'ทัก LINE @127qwwfi เพื่อคุยกับทีม HorCare'],
  [P.shield, 'ดูแลตั้งแต่วันแรก', 'ช่วยวางแผนการย้ายข้อมูลและการเริ่มใช้ก่อนคุณลงมือ'],
  [P.sparkles, 'พัฒนาต่อเนื่อง', 'รับฟังความเห็นของผู้ใช้ และเพิ่มความสามารถใหม่อยู่เสมอ'],
]

export function GettingStarted() {
  const { t } = useLanguage()
  return (
    <section className="section lp-start" id="getting-started">
      <div className="container lp-start-layout">
        <div className="lp-start-copy">
          <h2>
            {t('เริ่มต้นได้ทีละขั้น')}
            <br />
            <span className="muted-heading">{t('มีคนดูแลตลอดทาง')}</span>
          </h2>
          <p>{t('ไม่จำเป็นต้องเปลี่ยนวิธีทำงานทุกอย่างในวันเดียว เริ่มจากงานที่ทำบ่อยที่สุดก่อน แล้วค่อยเพิ่มทีละส่วน')}</p>
          <a className="text-link" href={LINE_URL} target="_blank" rel="noreferrer">
            {t('ปรึกษาการเริ่มใช้งานกับทีม')}
            <Ic d="M7 17 17 7M7 7h10v10" size={17} />
          </a>
        </div>

        <ol className="lp-start-steps">
          {steps.map((s, i) => (
            <li key={s.title} data-reveal style={{ '--i': i }}>
              <span className="lp-start-num">{i + 1}</span>
              <div>
                <h3>{t(s.title)}</h3>
                <dl>
                  <div>
                    <dt>{t('คุณทำ')}</dt>
                    <dd>{t(s.you)}</dd>
                  </div>
                  <div className="is-us">
                    <dt>{t('ทีม HorCare ช่วย')}</dt>
                    <dd>{t(s.us)}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="container">
        <div className="lp-promise" data-reveal>
          <h3>{t('มากกว่าซอฟต์แวร์ คือความรับผิดชอบที่เรามีต่อธุรกิจของคุณ')}</h3>
          <ul>
            {promises.map(([icon, title, text]) => (
              <li key={title}>
                <Ic d={icon} size={22} />
                <b>{t(title)}</b>
                <span>{t(text)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
