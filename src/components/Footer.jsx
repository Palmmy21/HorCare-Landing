import { Link } from 'react-router-dom'
import { Brand } from './Brand.jsx'
import { Ic, HORCARE_URL, LINE_URL } from './shared.jsx'
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>
              Property, properly managed.
              <br />
              พื้นที่ของคุณ ดูแลง่ายกว่าที่เคย
            </p>
          </div>
          <div>
            <h2>แพลตฟอร์ม</h2>
            <a href="/#features">ฟีเจอร์ทั้งหมด</a>
            <a href="/#pricing">แพ็กเกจและราคา</a>
            <a href={HORCARE_URL}>เข้าสู่ระบบ</a>
          </div>
          <div>
            <h2>รู้จักให้มากขึ้น</h2>
            <Link to="/blog">Property Journal</Link>
            <Link to="/calculator">คำนวณค่าน้ำค่าไฟ</Link>
            <a href="/#faq">คำถามที่พบบ่อย</a>
          </div>
          <div>
            <h2>คุยกับเรา</h2>
            <a href={LINE_URL} target="_blank" rel="noreferrer">
              LINE @127qwwfi <Ic d="M7 17 17 7M7 7h10v10" size={15} />
            </a>
            <a href="/#contact">ขอเดโมกับทีม HorCare</a>
            <span className="footer-note">สำหรับเจ้าของอสังหาฯ ยุคใหม่</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 HorCare. All rights reserved.</span>
          <div>
            <Link to="/privacy">ความเป็นส่วนตัว</Link>
            <Link to="/terms">เงื่อนไขการใช้งาน</Link>
            <span>Made for your next chapter.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
