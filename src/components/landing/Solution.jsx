import { useState } from 'react'
import { useLanguage } from '../../i18n/useLanguage.js'
import { Ic, P } from '../shared.jsx'

const METER = 'M12 3v3m0 12v3M3 12h3m12 0h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'
const CAL = 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5'
const BOOK = 'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25'
const GRID = 'M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6Zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6Zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z'

const styles = [
  {
    key: 'monthly',
    label: 'รายเดือน',
    who: 'หอพัก · อพาร์ตเมนต์ · คอนโด · บ้านเช่า · อาคารพาณิชย์',
    chain: [
      [P.home, 'ห้องและผู้เช่า', 'A-101 · สัญญา 12 เดือน'],
      [METER, 'จดมิเตอร์', 'ไฟ 60 หน่วย · น้ำ 7 หน่วย'],
      [P.doc, 'ระบบคำนวณบิล', 'ยอดรวม ฿5,620'],
      [P.chat, 'ส่งบิลทาง LINE', 'พร้อม QR โอนเงิน'],
      [P.card, 'AI ตรวจสลิป', 'ยอดตรง · ผู้รับถูกบัญชี'],
      [BOOK, 'ลงสมุดบัญชีเอง', 'รายรับ +฿5,620'],
    ],
  },
  {
    key: 'nightly',
    label: 'รายคืน',
    who: 'รีสอร์ท · โรงแรม',
    chain: [
      [CAL, 'จองห้อง', 'Deluxe 11 · 2 คืน'],
      [P.user, 'เช็คอิน', 'ปฏิทินห้องอัปเดตทันที'],
      [P.doc, 'คิดเงินตามคืน', '2 คืน × ฿1,300'],
      [P.card, 'QR และตรวจสลิป', 'ชำระ ฿2,600'],
      [P.sparkles, 'งานแม่บ้าน', 'ทำความสะอาดหลังเช็คเอาต์'],
      [BOOK, 'ลงสมุดบัญชีเอง', 'รายรับ +฿2,600'],
    ],
  },
  {
    key: 'stall',
    label: 'รายวัน / สัปดาห์',
    who: 'ตลาด · แผงค้า · บูธ · พื้นที่เช่า',
    chain: [
      [GRID, 'ผังแผง', 'ว่าง · จอง · เช่าแล้ว'],
      [P.user, 'รอบเดินเก็บเงิน', 'พนักงานเก็บผ่าน LINE'],
      [P.card, 'เงินสดหรือ QR', 'แผง F-12 · ฿120'],
      [P.check, 'ปิดยอดรายวัน', '86 จาก 92 แผง'],
      [P.chart, 'ตรวจรายได้', 'ยอดที่ควรได้ เทียบยอดเก็บจริง'],
      [BOOK, 'ลงสมุดบัญชีเอง', 'รายรับ +฿10,320'],
    ],
  },
]

const around = [
  'สมุดบัญชี กำไรขาดทุน งบดุล VAT',
  'กล่องข้อความ LINE ของผู้เช่า',
  'ใบสั่งงานช่างและแม่บ้าน',
  'สัญญาเช่าและลายเซ็นออนไลน์',
  'ผังห้อง 2D / 3D',
  'พัสดุ อ่านป้ายด้วย AI',
  'หน้าประกาศห้องว่าง',
  'ที่จอดรถ',
  'กระทบยอดธนาคาร',
  'ประกาศถึงผู้เช่า',
  'ค่าใช้จ่าย สต็อก ทรัพย์สิน',
  'ผู้ช่วย AI น้องแคร์',
]

export function Solution() {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const style = styles[active]
  return (
    <section className="section lp-solution" id="solution">
      <div className="container">
        <div className="lp-solution-head" data-reveal>
          <h2>
            {t('บันทึกครั้งเดียว')}
            <br />
            <span className="muted-heading">{t('ข้อมูลส่งต่อถึงทุกงาน')}</span>
          </h2>
          <div>
            <p>{t('HorCare ปรับตามวิธีเก็บเงินของแต่ละสินทรัพย์ ข้อมูลที่บันทึกตรงต้นทาง จะกลายเป็นบิล ยอดรับ และบัญชี โดยไม่ต้องพิมพ์ซ้ำ')}</p>
            <div className="lp-switch" role="group" aria-label={t('เลือกวิธีเก็บเงิน')}>
              {styles.map((s, i) => (
                <button key={s.key} type="button" aria-pressed={active === i} onClick={() => setActive(i)}>
                  {t(s.label)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lp-chain-wrap" data-reveal>
        <p className="lp-chain-who" aria-live="polite">
          {t('เหมาะกับ')} <b>{t(style.who)}</b>
        </p>
        <ol className="lp-chain" key={style.key} aria-label={t('ตัวอย่างการไหลของข้อมูลในระบบ')}>
          {style.chain.map(([icon, title, value], i) => (
            <li key={title + i} style={{ '--i': i }}>
              <span className="lp-chain-node">
                <Ic d={icon} size={22} />
              </span>
              <b>{t(title)}</b>
              <small>{t(value)}</small>
            </li>
          ))}
        </ol>
        <p className="lp-chain-note">
          <span className="sample-label">{t('ตัวอย่าง')}</span>
          {t('ตัวเลขในหน้านี้เป็นข้อมูลตัวอย่าง · ฟีเจอร์ LINE อัตโนมัติและ AI อยู่ในแพ็กเกจ HorCare Pro ขึ้นไป')}
        </p>
        </div>

        <div className="lp-around" data-reveal>
          <p>{t('และงานรอบด้าน ที่ใช้ข้อมูลชุดเดียวกัน')}</p>
          <ul>
            {around.map((x) => (
              <li key={x}>{t(x)}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
