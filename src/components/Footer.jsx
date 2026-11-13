import { useLanguage } from '../i18n/useLanguage.js'
import { Link } from '../components/LocalizedLink.jsx'
import { Brand } from './Brand.jsx'
import { Ic, HORCARE_URL, LINE_URL } from './shared.jsx'
import { DEMO_URL } from './landing/links.js'
import { COMPANY } from '../data/company.js'
import { openConsentSettings } from '../lib/analytics.js'
export function Footer() {
  const { t } = useLanguage()
  const legal = [COMPANY.taxId && t('เลขประจำตัวผู้เสียภาษี') + ' ' + COMPANY.taxId, COMPANY.address].filter(Boolean)
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>
              Property, properly managed.
              <br />{' '}{t("พื้นที่ของคุณ ดูแลง่ายกว่าที่เคย")}{' '}</p>
          </div>
          <div>
            <h2>{' '}{t("แพลตฟอร์ม")}{' '}</h2>
            <Link to="/#solution">{' '}{t("ฟีเจอร์ทั้งหมด")}{' '}</Link>
            <Link to="/#getting-started">{t("เริ่มต้นใช้งาน")}</Link>
            <Link to="/#pricing">{' '}{t("แพ็กเกจและราคา")}{' '}</Link>
            <a href={HORCARE_URL}>{' '}{t("เข้าสู่ระบบ")}{' '}</a>
          </div>
          <div>
            <h2>{' '}{t("รู้จักให้มากขึ้น")}{' '}</h2>
            <Link to="/blog">Property Journal</Link>
            <Link to="/calculator">{' '}{t("คำนวณค่าน้ำค่าไฟ")}{' '}</Link>
            <Link to="/#faq">{' '}{t("คำถามที่พบบ่อย")}{' '}</Link>
          </div>
          <div>
            <h2>{' '}{t("คุยกับเรา")}{' '}</h2>
            <a href={LINE_URL} target="_blank" rel="noreferrer">
              LINE @127qwwfi <Ic d="M7 17 17 7M7 7h10v10" size={15} />
            </a>
            {COMPANY.phone && <a href={'tel:' + COMPANY.phone.replace(/[^\d+]/g, '')}>{COMPANY.phone}</a>}
            {COMPANY.email && <a href={'mailto:' + COMPANY.email}>{COMPANY.email}</a>}
            <a href={DEMO_URL} target="_blank" rel="noreferrer" data-track="book_demo">{t('จองเดโมกับทีม HorCare')}</a>
            <Link to="/#trust">{t('ความปลอดภัยของข้อมูล')}</Link>
            <span className="footer-note">{' '}{t("ระบบจัดการหอพักและอพาร์ตเมนต์")}{' '}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © 2026 {COMPANY.legalName || 'HorCare'}. All rights reserved.
            {legal.length > 0 && <small className="footer-legal">{legal.join(' · ')}</small>}
          </span>
          <div>
            <Link to="/privacy">{' '}{t("ความเป็นส่วนตัว")}{' '}</Link>
            <Link to="/privacy#cookies">{t('นโยบายคุกกี้')}</Link>
            <button type="button" className="footer-cookie" onClick={openConsentSettings}>{t('ตั้งค่าคุกกี้')}</button>
            <Link to="/terms">{' '}{t("เงื่อนไขการใช้งาน")}{' '}</Link>
            <span>Made for your next chapter.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
