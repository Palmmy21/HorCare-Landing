import { useLanguage } from '../i18n/useLanguage.js'
import { Link } from '../components/LocalizedLink.jsx'
import { Brand } from './Brand.jsx'
import { Ic, HORCARE_URL, LINE_URL } from './shared.jsx'
export function Footer() {
  const { t } = useLanguage()
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
            <Link to="/#features">{' '}{t("ฟีเจอร์ทั้งหมด")}{' '}</Link>
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
            <Link to="/#contact">{' '}{t("ขอเดโมกับทีม HorCare")}{' '}</Link>
            <span className="footer-note">{' '}{t("สำหรับเจ้าของอสังหาฯ ยุคใหม่")}{' '}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 HorCare. All rights reserved.</span>
          <div>
            <Link to="/privacy">{' '}{t("ความเป็นส่วนตัว")}{' '}</Link>
            <Link to="/terms">{' '}{t("เงื่อนไขการใช้งาน")}{' '}</Link>
            <span>Made for your next chapter.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
