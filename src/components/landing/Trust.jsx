import { useLanguage } from '../../i18n/useLanguage.js'
import { Link } from '../LocalizedLink.jsx'
import { Ic, P, LINE_URL } from '../shared.jsx'
import { COMPANY } from '../../data/company.js'

const LOCK = 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
const CLOUD = 'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z'
const KEY = 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z'

const pillars = [
  [LOCK, 'เข้ารหัสทุกการเชื่อมต่อ', 'ข้อมูลรับส่งผ่าน HTTPS (TLS) ทั้งหมด และเก็บบนโครงสร้าง Google Cloud (Firebase)'],
  [CLOUD, 'สำรองข้อมูลอัตโนมัติทุกวัน', 'มีสำเนาสำรองแยกจากระบบหลัก หากเกิดเหตุผิดพลาดก็กู้คืนได้'],
  [KEY, 'คุมสิทธิ์ได้ทีละคน', 'ผู้ดูแลแต่ละคนเห็นเฉพาะอาคารที่ได้รับสิทธิ์ และมีประวัติการแก้ไขข้อมูลย้อนหลัง'],
  [P.doc, 'ข้อมูลเป็นของคุณ', 'ส่งออกข้อมูลได้ทุกเมื่อ และขอให้ลบได้ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)'],
]

/** Trust infrastructure: security, backup, who runs HorCare and how to reach them. */
export function Trust() {
  const { t } = useLanguage()
  const facts = [
    COMPANY.legalName && ['ผู้ให้บริการ', COMPANY.legalName],
    COMPANY.taxId && ['เลขประจำตัวผู้เสียภาษี', COMPANY.taxId],
    COMPANY.address && ['ที่อยู่', COMPANY.address],
  ].filter(Boolean)
  const contacts = [
    [P.chat, 'LINE Official', COMPANY.lineId, LINE_URL, 'line'],
    COMPANY.phone && [P.headset, 'โทร', COMPANY.phone, 'tel:' + COMPANY.phone.replace(/[^\d+]/g, ''), 'phone'],
    COMPANY.email && [P.mail, 'อีเมล', COMPANY.email, 'mailto:' + COMPANY.email, 'email'],
  ].filter(Boolean)
  return (
    <section className="section lp-trust" id="trust">
      <div className="container">
        <div className="section-heading centered" data-reveal>
          <h2>
            {t('ฝากข้อมูลหอไว้กับเรา')}
            <br />
            <span className="muted-heading">{t('อย่างสบายใจ')}</span>
          </h2>
          <p>{t('ข้อมูลผู้เช่าและเงินเข้าออกคือหัวใจของธุรกิจคุณ นี่คือวิธีที่เราดูแลมัน')}</p>
        </div>
        <ul className="lp-trust-grid">
          {pillars.map(([icon, title, text], i) => (
            <li key={title} data-reveal style={{ '--i': i }}>
              <Ic d={icon} size={24} />
              <b>{t(title)}</b>
              <span>{t(text)}</span>
            </li>
          ))}
        </ul>
        <div className="lp-company" data-reveal>
          <div>
            <h3>{t('ใครอยู่เบื้องหลัง HorCare')}</h3>
            <p>{t('ทีมที่พัฒนาและดูแลระบบเอง คุยกับคนที่สร้างระบบได้โดยตรงทาง LINE ไม่ผ่านคอลเซ็นเตอร์')}</p>
            {facts.length > 0 && (
              <dl className="lp-company-facts">
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{t(k)}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            <div className="lp-company-links">
              <Link to="/privacy">{t('นโยบายความเป็นส่วนตัว')}</Link>
              <Link to="/privacy#cookies">{t('นโยบายคุกกี้')}</Link>
              <Link to="/terms">{t('เงื่อนไขการใช้งาน')}</Link>
            </div>
          </div>
          <ul className="lp-contact-list">
            {contacts.map(([icon, label, value, href, key]) => (
              <li key={label}>
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" data-track={'contact_' + key}>
                  <Ic d={icon} size={20} />
                  <span>
                    <small>{t(label)}</small>
                    <b>{value}</b>
                  </span>
                </a>
              </li>
            ))}
            {COMPANY.hours && (
              <li className="lp-contact-hours">
                <small>{t('เวลาตอบกลับ')}</small> {t(COMPANY.hours)}
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
