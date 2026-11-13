import { useLanguage } from '../../i18n/useLanguage.js'
import { Ic, P } from '../shared.jsx'
import proof from '../../data/proof.json'

// Big numbers read best rounded: 1,284,500 → "1.3 ล้าน" / "1.3M".
function compact(n, language) {
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1) + (language === 'en' ? 'M' : ' ล้าน')
  return n.toLocaleString('en-US')
}

const MONTHS_TH = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function asOfLabel(iso, language) {
  const [y, m, d] = iso.split('-').map(Number)
  return language === 'en' ? `${MONTHS_EN[m - 1]} ${d}, ${y}` : `${d} ${MONTHS_TH[m - 1]} ${y + 543}`
}

/** Real platform totals from src/data/proof.json (filled by scripts/fetch-proof-stats.mjs). Tiles with no number are hidden. */
export function ProofBand() {
  const { t, language } = useLanguage()
  const tiles = [
    proof.collectedBaht && ['฿' + compact(proof.collectedBaht, language), 'ยอดเงินที่เจ้าของรับชำระผ่าน HorCare'],
    proof.bills && [compact(proof.bills, language), 'บิลค่าเช่าที่ออกจากระบบแล้ว'],
    proof.rooms && [compact(proof.rooms, language), 'ห้องที่บริหารอยู่บน HorCare'],
    proof.buildings && [compact(proof.buildings, language), 'อาคารที่ใช้งานจริง'],
  ].filter(Boolean)
  if (!tiles.length) return null
  return (
    <section className="lp-proof" id="proof" aria-label={t('ตัวเลขการใช้งานจริง')}>
      <div className="container">
        <dl className="lp-proof-grid">
          {tiles.map(([value, label], i) => (
            <div key={label} data-reveal style={{ '--i': i }}>
              <dt>{t(label)}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        {proof.asOf && (
          <p className="lp-proof-note">
            {t('ตัวเลขรวมจากระบบจริง ข้อมูล ณ')} {asOfLabel(proof.asOf, language)}
          </p>
        )}
      </div>
    </section>
  )
}

const cycle = [
  [P.bolt, 'จดมิเตอร์', 'ถ่ายรูปมิเตอร์ แล้ว AI อ่านเลขให้ หรือกรอกเองเป็นตารางทั้งชั้น', 'AI ใน Pro'],
  [P.doc, 'ออกบิลทั้งตึก', 'ค่าเช่า ค่าน้ำ ค่าไฟ ค่าส่วนกลาง คำนวณครบทุกห้องในคลิกเดียว', null],
  [P.chat, 'ส่งบิลทาง LINE', 'ผู้เช่าได้บิลพร้อม QR โอนเงิน ไม่ต้องติดตั้งแอปเพิ่ม', 'Pro'],
  [P.card, 'ตรวจสลิปให้', 'AI เช็กยอดและบัญชีผู้รับ ห้องไหนจ่ายแล้วขึ้นสถานะทันที', 'Pro'],
  [P.bell, 'ตามคนที่ยังไม่จ่าย', 'แจ้งเตือนอัตโนมัติ คิดค่าปรับล่าช้า และเห็นยอดค้างทุกห้อง', null],
]

/** Positioning: what HorCare is best at — the monthly cycle of a dormitory or apartment. */
export function Specialist() {
  const { t } = useLanguage()
  return (
    <section className="section lp-specialist" id="dormitory">
      <div className="container">
        <div className="section-heading lp-specialist-head" data-reveal>
          <span className="lp-eyebrow">{t('ทำมาเพื่อหอพักและอพาร์ตเมนต์')}</span>
          <h2>
            {t('รอบเก็บเงินทุกเดือน')}
            <br />
            <span className="muted-heading">{t('จบในระบบเดียว')}</span>
          </h2>
          <p>
            {t('งานที่กินเวลาเจ้าของหอที่สุดคือช่วงต้นเดือน จดมิเตอร์ ทำบิล ไล่ดูสลิป และตามคนที่ยังไม่จ่าย HorCare ออกแบบมารอบงานนี้โดยเฉพาะ')}
          </p>
        </div>
        <ol className="lp-cycle">
          {cycle.map(([icon, title, text, tag], i) => (
            <li key={title} data-reveal style={{ '--i': i }}>
              <span className="lp-cycle-icon">
                <Ic d={icon} size={22} />
              </span>
              <b>
                <span className="lp-cycle-num">{i + 1}</span> {t(title)}
              </b>
              <p>{t(text)}</p>
              {tag && <small className="lp-cycle-tag">{t(tag)}</small>}
            </li>
          ))}
        </ol>
        <p className="lp-specialist-also">
          <Ic d={P.home} size={17} />
          {t('มีคอนโด บ้านเช่า ตลาด หรือรีสอร์ทด้วย? ดูแลรวมในบัญชีเดียวกันได้')}
        </p>
      </div>
    </section>
  )
}
