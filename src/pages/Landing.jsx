import { useLanguage } from '../i18n/useLanguage.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { Ic, P, HORCARE_URL, LINE_URL } from '../components/shared.jsx'
import { ARTICLES } from '../data/articles.js'
import { FAQS } from '../data/site.js'

const properties = [
  {
    name: 'อพาร์ตเมนต์ / หอพัก',
    short: 'อพาร์ตเมนต์',
    title: 'The Green Residence',
    sub: 'อพาร์ตเมนต์ · 48 ห้อง',
    units: 48,
    occupied: 44,
    revenue: '224,800',
    paid: 40,
    pending: 4,
    room: 'A-101',
    amount: '5,620',
    desc: 'ตั้งแต่มิเตอร์หน้าห้อง ถึงบิลปลายเดือน',
    detail:
      'รวมข้อมูลห้อง ผู้เช่า และค่าน้ำค่าไฟ จัดการงานที่เกิดซ้ำทุกเดือนให้เป็นระบบ',
  },
  {
    name: 'คอนโดปล่อยเช่า',
    short: 'คอนโด',
    title: 'City Living Portfolio',
    sub: 'คอนโดปล่อยเช่า · 12 ยูนิต',
    units: 12,
    occupied: 10,
    revenue: '185,000',
    paid: 9,
    pending: 1,
    room: 'C-1208',
    amount: '18,500',
    desc: 'คนละตึก ก็เห็นภาพเดียวกันได้',
    detail:
      'ดูข้อมูลผู้เช่า สัญญา และยอดค่าเช่าของแต่ละยูนิต โดยไม่ต้องค้นคนละไฟล์',
  },
  {
    name: 'บ้านเช่า',
    short: 'บ้านเช่า',
    title: 'Slow Living Homes',
    sub: 'บ้านเช่า · 8 หลัง',
    units: 8,
    occupied: 7,
    revenue: '126,000',
    paid: 6,
    pending: 1,
    room: 'H-03',
    amount: '18,000',
    desc: 'ดูแลบ้านทุกหลัง ไม่ให้เรื่องเล็กตกหล่น',
    detail:
      'เก็บรายละเอียดสัญญา ติดตามการชำระเงิน และรวมงานแจ้งซ่อมไว้ในขั้นตอนเดียวกัน',
  },
]

function Dashboard({ property }) {
  const { t } = useLanguage()
  return (
    <div className="dashboard" aria-label={t("ตัวอย่างหน้าภาพรวมอสังหาริมทรัพย์")}>
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <img
            className="dash-logo"
            src="/HORCARE%20small.png"
            width="48"
            height="48"
            alt="HorCare"
          />
        </div>
        <span className="dash-nav active">
          <Ic d={P.chart} size={19} />
          <span>{' '}{t("ภาพรวม")}{' '}</span>
        </span>
        <span className="dash-nav">
          <Ic d={P.home} size={19} />
          <span>{' '}{t("ทรัพย์สิน")}{' '}</span>
        </span>
        <span className="dash-nav">
          <Ic d={P.user} size={19} />
          <span>{' '}{t("ผู้เช่า")}{' '}</span>
        </span>
        <span className="dash-nav">
          <Ic d={P.doc} size={19} />
          <span>{' '}{t("การเงิน")}{' '}</span>
        </span>
        <span className="dash-nav">
          <Ic d={P.wrench} size={19} />
          <span>{' '}{t("แจ้งซ่อม")}{' '}</span>
        </span>
        <div className="dash-avatar">HC</div>
      </aside>
      <div className="dash-main">
        <div className="dash-top">
          <span>{' '}{t("พื้นที่ทำงานของคุณ")}{' '}<span className="dash-slash">/</span>{' '}
            <strong>{' '}{t("ภาพรวม")}{' '}</strong>
          </span>
          <span className="sample-label">{' '}{t("ข้อมูลตัวอย่าง")}{' '}</span>
        </div>
        <div className="dash-heading">
          <div>
            <h2>{property.title}</h2>
            <p>{' '}{t(property.sub)}{' '}</p>
          </div>
          <span className="dash-date">{' '}{t("ตุลาคม 2026")}{' '}</span>
        </div>
        <div className="dash-stats" aria-live="polite">
          <div>
            <span>{' '}{t("รายรับเดือนนี้")}{' '}</span>
            <strong>{' '}{t("฿")}{' '}{property.revenue}</strong>
            <small>{' '}{t("ยอดรับชำระในตัวอย่าง")}{' '}</small>
          </div>
          <div>
            <span>{' '}{t("ยูนิตที่มีผู้เช่า")}{' '}</span>
            <strong>
              {property.occupied}
              <em> / {property.units}</em>
            </strong>
            <small>
              {property.units - property.occupied}{' '}{t("ยูนิตพร้อมปล่อยเช่า")}{' '}</small>
          </div>
          <div>
            <span>{' '}{t("รอตรวจสอบยอด")}{' '}</span>
            <strong>
              {property.pending}
              <em>{' '}{t("รายการ")}{' '}</em>
            </strong>
            <small>{' '}{t("ติดตามต่อได้ในที่เดียว")}{' '}</small>
          </div>
        </div>
        <div className="dash-bottom">
          <div className="revenue-chart">
            <div className="chart-heading">
              <strong>{' '}{t("ภาพรวมรายรับ")}{' '}</strong>
              <span>
                <i />{' '}{t("รับชำระแล้ว")}{' '}</span>
            </div>
            <div className="chart-content">
              <div className="chart-scale">
                <span>250k</span>
                <span>150k</span>
                <span>50k</span>
              </div>
              <div
                className="bars"
                role="img"
                aria-label={t("กราฟตัวอย่างรายรับ 6 เดือน มีแนวโน้มเพิ่มขึ้น")}
              >
                {[46, 61, 55, 74, 69, 89].map((height, i) => (
                  <div className="bar-col" key={i}>
                    <div
                      className={i === 5 ? 'bar current' : 'bar'}
                      style={{ height: height + '%' }}
                    />
                    <span>
                      {[t("พ.ค."), t("มิ.ย."), t("ก.ค."), t("ส.ค."), t("ก.ย."), t("ต.ค.")][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="payment-list">
            <strong>{' '}{t("รายการล่าสุด")}{' '}</strong>
            {[
              [property.room, property.amount, t("รับชำระแล้ว")],
              ['A-204', '5,400', t("รับชำระแล้ว")],
              ['B-302', '6,200', t("รอตรวจสอบ")],
            ].map(([room, amount, status], i) => (
              <div className="payment-row" key={room}>
                <span className="room-mark">
                  <Ic d={P.home} size={17} />
                </span>
                <div>
                  <b>{room}</b>
                  <small className={i === 2 ? 'pending' : ''}>{' '}{t(status)}{' '}</small>
                </div>
                <b>{' '}{t("฿")}{' '}{amount}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Pricing() {
  const { t } = useLanguage()
  const [annual, setAnnual] = useState(false)
  const proLink =
    'https://line.me/R/oaMessage/@127qwwfi/?' +
    encodeURIComponent(
      t("สนใจแพ็กเกจ HorCare ") +
        (annual ? t("รายปี 2,990 บาท") : t("รายเดือน 399 บาท")),
    )
  return (
    <section id="pricing" className="section pricing-section">
      <div className="container">
        <div className="section-heading centered">
          <h2>{' '}{t("เริ่มเล็กได้")}{' '}<br />
            <span className="muted-heading">{' '}{t("โตแค่ไหน ก็ค่อยขยับ")}{' '}</span>
          </h2>
          <p>{' '}{t("เลือกแพ็กเกจที่พอดีกับวันนี้ แล้วให้ HorCare โตไปกับคุณ")}{' '}</p>
        </div>
        <div
          className="billing-toggle"
          role="group"
          aria-label={t("รอบการชำระเงิน")}
        >
          <button aria-pressed={!annual} onClick={() => setAnnual(false)}>{' '}{t("รายเดือน")}{' '}</button>
          <button aria-pressed={annual} onClick={() => setAnnual(true)}>{' '}{t("รายปี")}{' '}<span>{' '}{t("ประหยัด 38%")}{' '}</span>
          </button>
        </div>
        <div className="plans">
          <article className="plan">
            <h3>Free</h3>
            <p>{' '}{t("เริ่มจัดระเบียบงานเช่า แบบไม่มีค่าใช้จ่าย")}{' '}</p>
            <div className="price">{' '}{t("฿0")}{' '}<span>{' '}{t("/ ตลอดชีพ")}{' '}</span>
            </div>
            <p className="plan-capacity">{' '}{t("สูงสุด 250 ห้อง")}{' '}</p>
            <a className="button outline" href={HORCARE_URL}>{' '}{t("เริ่มใช้งานฟรี")}{' '}<Ic d={P.arrow} size={18} />
            </a>
            <ul>
              {[
                t("จัดการห้องและข้อมูลผู้เช่า"),
                t("ออกบิลและใบแจ้งหนี้"),
                t("บันทึกมิเตอร์น้ำและไฟ"),
                t("สร้างสัญญาเช่าออนไลน์"),
                t("พิมพ์ใบเสร็จรับเงิน"),
              ].map((x) => (
                <li key={t(x)}>
                  <Ic d={P.check} size={17} />
                  {' '}{t(x)}{' '}
                </li>
              ))}
            </ul>
          </article>
          <article className="plan plan-pro">
            <div className="plan-title">
              <h3>HorCare</h3>
              <span>{' '}{t("สำหรับการเติบโต")}{' '}</span>
            </div>
            <p>{' '}{t("ลดงานซ้ำ พร้อมดูแลหลายโครงการ")}{' '}</p>
            <div className="price" aria-live="polite">{' '}{t("฿")}{' '}{annual ? '2,990' : '399'}{' '}
              <span>/ {annual ? t("ปี") : t("เดือน")}</span>
            </div>
            <p className="plan-capacity">
              {annual
                ? t("เฉลี่ย ฿249.17/เดือน · ชำระครั้งเดียวรายปี")
                : t("ไม่จำกัดห้อง · สูงสุด 10 โครงการ")}
            </p>
            <a
              className="button accent"
              href={proLink}
              target="_blank"
              rel="noreferrer"
            >{' '}{t("เลือกแพ็กเกจ HorCare")}{' '}<Ic d={P.arrow} size={18} />
            </a>
            <p className="includes">{' '}{t("ทุกอย่างใน Free พร้อมฟีเจอร์เพิ่มเติม")}{' '}</p>
            <ul>
              {[
                t("ไม่จำกัดห้อง สูงสุด 10 โครงการ"),
                t("ส่งบิลและแจ้งเตือนผ่าน LINE อัตโนมัติ"),
                t("QR PromptPay ในบิลและรับสลิป"),
                t("อ่านมิเตอร์จากรูปถ่ายด้วย AI"),
                t("งานแจ้งซ่อม สต็อก ทรัพย์สิน และค่าใช้จ่าย"),
                t("Dashboard รายได้และห้องว่าง"),
                t("ส่งออกรายงาน PDF / Excel"),
              ].map((x) => (
                <li key={t(x)}>
                  <Ic d={P.check} size={17} />
                  {' '}{t(x)}{' '}
                </li>
              ))}
            </ul>
          </article>
        </div>
        <p className="pricing-note">{' '}{t("ราคายังไม่รวม VAT · รายปี ฿2,990 เทียบกับรายเดือน 12 เดือน ฿4,788")}{' '}<br />{' '}{t("มีรูปแบบการจัดการเฉพาะ?")}{' '}{' '}
          <a href={LINE_URL} target="_blank" rel="noreferrer">{' '}{t("คุยกับทีมก่อนเลือกแพ็กเกจ")}{' '}</a>
        </p>
      </div>
    </section>
  )
}

export default function Landing() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState(0)
  const property = properties[selected]
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="hero">
          <div className="container">
            <div className="hero-intro">
              <h1>{' '}{t("อสังหาฯ เติบโตได้")}{' '}<br />{' '}{t("ชีวิตคุณ")}{' '}<span className="highlight-word">{' '}{t("ก็ง่ายขึ้นได้")}{' '}</span>
              </h1>
              <div className="hero-description">
                <p>
                  <strong>HorCare — Property Management Platform</strong>
                  <br />{' '}{t("รวมทรัพย์สิน ผู้เช่า สัญญา และงานเก็บเงิน")}{' '}<br className="desktop-break" />{' '}{t("ไว้ในที่เดียว มีเวลาให้ชีวิตมากกว่าเดิม")}{' '}</p>
                <div className="hero-actions">
                  <a className="button primary" href={HORCARE_URL}>{' '}{t("เริ่มใช้งานฟรี")}{' '}<Ic d={P.arrow} size={18} />
                  </a>
                  <a className="text-link" href="#contact">{' '}{t("ขอเดโมกับทีม")}{' '}<Ic d="M7 17 17 7M7 7h10v10" size={17} />
                  </a>
                </div>
                <p className="hero-fine">
                  <Ic d={P.check} size={15} />{' '}{t("ฟรีสูงสุด 250 ห้อง")}{' '}{' '}
                  <span>{' '}{t("ไม่ต้องผูกบัตรเครดิต")}{' '}</span>
                </p>
              </div>
            </div>
            <div className="portfolio-preview" id="properties">
              <div className="preview-caption">
                <span>{' '}{t("ทุกพื้นที่ของคุณ ในมุมมองเดียว")}{' '}</span>
                <div
                  className="property-tabs"
                  role="group"
                  aria-label={t("เลือกประเภทอสังหาฯ ตัวอย่าง")}
                >
                  {properties.map((p, i) => (
                    <button
                      key={p.name}
                      aria-pressed={selected === i}
                      onClick={() => setSelected(i)}
                    >
                      {' '}{t(p.short)}{' '}
                    </button>
                  ))}
                </div>
              </div>
              <Dashboard property={property} />
              <div className="preview-foot">
                <span>
                  <span className="status-dot" /> Less busywork. More living.
                </span>
                <span>{' '}{t("ตัวอย่างการแสดงผล · ไม่ใช่ข้อมูลลูกค้าจริง")}{' '}</span>
              </div>
            </div>
            <div className="property-description" aria-live="polite">
              <h2>{' '}{t(property.desc)}{' '}</h2>
              <p>{' '}{t(property.detail)}{' '}</p>
            </div>
          </div>
        </section>
        <div className="capability-strip">
          <div className="container">
            {[
              [P.home, t("ทรัพย์สิน")],
              [P.user, t("ผู้เช่าและสัญญา")],
              [P.doc, t("บิลและการชำระเงิน")],
              [P.chat, t("เชื่อมต่อ LINE")],
              [P.chart, t("รายงานภาพรวม")],
            ].map(([icon, text]) => (
              <span key={t(text)}>
                <Ic d={icon} size={20} />
                {' '}{t(text)}{' '}
              </span>
            ))}
          </div>
        </div>
        <section className="section features-section" id="features">
          <div className="container">
            <div className="section-heading feature-heading">
              <h2>{' '}{t("งานจัดการน้อยลง")}{' '}<br />
                <span className="muted-heading">{' '}{t("พื้นที่ให้ชีวิตมากขึ้น")}{' '}</span>
              </h2>
              <p>{' '}{t("เลิกสลับสมุด Excel และแชตไปมา")}{' '}<br />{' '}{t("ให้ทุกงานของการปล่อยเช่าเชื่อมถึงกัน")}{' '}</p>
            </div>
            <div className="feature-bento">
              <article className="feature-billing">
                <div className="feature-copy">
                  <h3>{' '}{t("บิลพร้อมส่ง")}{' '}<br />{' '}{t("ก่อนกาแฟแก้วแรกจะหมด")}{' '}</h3>
                  <p>{' '}{t("บันทึกมิเตอร์ คำนวณยอด ออกใบแจ้งหนี้")}{' '}<br />{' '}{t("แล้วส่งต่อให้ผู้เช่าผ่าน LINE")}{' '}</p>
                  <a className="text-link" href="#pricing">{' '}{t("ดูแพ็กเกจที่มี LINE อัตโนมัติ")}{' '}{' '}
                    <Ic d="M7 17 17 7M7 7h10v10" size={17} />
                  </a>
                </div>
                <div className="invoice-demo">
                  <div className="invoice-top">
                    <span>horcare.</span>
                    <span>{' '}{t("ใบแจ้งหนี้")}{' '}</span>
                  </div>
                  <h4>{' '}{t("ห้อง A-101")}{' '}</h4>
                  <span className="invoice-month">{' '}{t("ตุลาคม 2026 · ตัวอย่าง")}{' '}</span>
                  <div>
                    <span>{' '}{t("ค่าเช่า")}{' '}</span>
                    <b>{' '}{t("฿5,000")}{' '}</b>
                  </div>
                  <div>
                    <span>{' '}{t("ค่าไฟ 60 หน่วย × ฿8")}{' '}</span>
                    <b>{' '}{t("฿480")}{' '}</b>
                  </div>
                  <div>
                    <span>{' '}{t("ค่าน้ำ 7 หน่วย × ฿20")}{' '}</span>
                    <b>{' '}{t("฿140")}{' '}</b>
                  </div>
                  <div className="invoice-total">
                    <span>{' '}{t("ยอดรวม")}{' '}</span>
                    <b>{' '}{t("฿5,620")}{' '}</b>
                  </div>
                  <span className="invoice-sent">
                    <Ic d={P.check} size={16} />{' '}{t("ตัวอย่างสถานะส่งบิลผ่าน LINE")}{' '}</span>
                </div>
              </article>
              <article className="feature-tenants">
                <h3>{' '}{t("จำผู้เช่าได้ทุกคน")}{' '}<br />{' '}{t("โดยไม่ต้องจำทุกอย่าง")}{' '}</h3>
                <p>{' '}{t("ข้อมูลติดต่อ สัญญา และประวัติการเช่า")}{' '}<br />{' '}{t("หาเจอเมื่อต้องใช้ ดูแลง่ายเมื่อเติบโต")}{' '}</p>
                <div className="tenant-demo">
                  <div className="tenant-avatar">{' '}{t("พ")}{' '}</div>
                  <div>
                    <strong>{' '}{t("พิมพ์ชนก · A-101")}{' '}</strong>
                    <span>{' '}{t("ตัวอย่างข้อมูลผู้เช่า")}{' '}</span>
                  </div>
                  <Ic d={P.check} size={18} />
                </div>
                <div className="contract-line">
                  <Ic d={P.doc} size={18} />
                  <span>{' '}{t("สัญญาเช่า และข้อมูลห้อง")}{' '}</span>
                  <Ic d="M7 17 17 7M7 7h10v10" size={17} />
                </div>
              </article>
              <article className="feature-maintenance">
                <div>
                  <Ic d={P.wrench} size={28} />
                  <h3>{' '}{t("เรื่องซ่อม ไม่หล่นหาย")}{' '}</h3>
                  <p>{' '}{t("รวมรายการแจ้งซ่อมให้ติดตามต่อได้")}{' '}<br />{' '}{t("ไม่ต้องย้อนหาในแชตหลายห้อง")}{' '}</p>
                </div>
                <span className="maintenance-ticket">
                  <span className="status-dot" />{' '}{t("A-204 · แจ้งซ่อมเครื่องปรับอากาศ")}{' '}<small>{' '}{t("ตัวอย่าง")}{' '}</small>
                </span>
              </article>
              <article className="feature-overview">
                <div>
                  <h3>{' '}{t("เห็นภาพธุรกิจ")}{' '}<br />{' '}{t("ก่อนตัดสินใจครั้งต่อไป")}{' '}</h3>
                  <p>{' '}{t("ดูรายได้ ห้องว่าง และค่าใช้จ่าย")}{' '}<br />{' '}{t("พร้อมส่งออกรายงาน PDF / Excel")}{' '}</p>
                </div>
                <div className="overview-symbol" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="workflow-section" id="how-to-use">
          <div className="container workflow-layout">
            <div>
              <h2>{' '}{t("เริ่มบทใหม่")}{' '}<br />{' '}{t("ไม่ต้องเริ่มจากศูนย์")}{' '}</h2>
              <p>{' '}{t("มีทีม HorCare ช่วยแนะนำ")}{' '}<br />{' '}{t("ค่อย ๆ เปลี่ยนวิธีทำงาน ในจังหวะของคุณ")}{' '}</p>
              <a
                className="text-link"
                href={LINE_URL}
                target="_blank"
                rel="noreferrer"
              >{' '}{t("ปรึกษาการเริ่มใช้งาน")}{' '}<Ic d="M7 17 17 7M7 7h10v10" size={17} />
              </a>
            </div>
            <ol className="steps">
              <li>
                <span>01</span>
                <div>
                  <h3>{' '}{t("สร้างพื้นที่ของคุณ")}{' '}</h3>
                  <p>{' '}{t("สมัครบัญชี แล้วเพิ่มโครงการและห้องที่ต้องการจัดการ")}{' '}</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>{' '}{t("รวมข้อมูลให้พร้อม")}{' '}</h3>
                  <p>{' '}{t("เพิ่มผู้เช่า สัญญา และตั้งค่ารายการค่าใช้จ่ายประจำเดือน")}{' '}</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>{' '}{t("ให้ทุกเดือนง่ายกว่าเดิม")}{' '}</h3>
                  <p>{' '}{t("บันทึกมิเตอร์ ออกบิล และติดตามภาพรวมจากที่เดียว")}{' '}</p>
                </div>
              </li>
            </ol>
          </div>
        </section>
        <Pricing />
        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div>
              <h2>{' '}{t("ก่อนเริ่ม")}{' '}<br />{' '}{t("มีอะไรอยากรู้ไหม?")}{' '}</h2>
              <p>{' '}{t("รวมคำตอบที่ช่วยให้ตัดสินใจได้ง่ายขึ้น")}{' '}</p>
              <a
                className="text-link"
                href={LINE_URL}
                target="_blank"
                rel="noreferrer"
              >{' '}{t("คุยกับทีม HorCare")}{' '}<Ic d="M7 17 17 7M7 7h10v10" size={17} />
              </a>
            </div>
            <div className="faq-list">
              {FAQS.map(([q, a]) => (
                <details key={t(q)}>
                  <summary>
                    {' '}{t(q)}{' '}
                    <span className="faq-plus">
                      <Ic d="M12 5v14M5 12h14" size={20} />
                    </span>
                  </summary>
                  <p>{' '}{t(a)}{' '}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="section journal-section">
          <div className="container">
            <div className="journal-heading">
              <div>
                <h2>
                  Property Journal<span className="brand-period">.</span>
                </h2>
                <p>{' '}{t("ไอเดียเล็ก ๆ สำหรับธุรกิจอสังหาฯ ที่ไปได้ไกลกว่า")}{' '}</p>
              </div>
              <Link className="text-link" to="/blog">{' '}{t("อ่านทั้งหมด")}{' '}<Ic d="M7 17 17 7M7 7h10v10" size={17} />
              </Link>
            </div>
            <div className="journal-grid">
              {ARTICLES.slice(0, 3).map((a, i) => (
                <Link
                  className="journal-card"
                  to={'/blog/' + a.slug}
                  key={a.slug}
                >
                  <div className={'journal-art art-' + i}>
                    <span>
                      {
                        [
                          'PROPERTY\nPLAYBOOK',
                          'LESS ADMIN.\nMORE LIFE.',
                          'ROOM TO\nGROW.',
                        ][i]
                      }
                    </span>
                    <Ic d={[P.home, P.doc, P.chart][i]} size={68} />
                  </div>
                  <div className="journal-meta">
                    <span>{' '}{t(a.cat)}{' '}</span>
                    <span>{' '}{t("อ่าน")}{' '}{a.min}{' '}{t("นาที")}{' '}</span>
                  </div>
                  <h3>{' '}{t(a.title)}{' '}</h3>
                  <span className="journal-read">{' '}{t("อ่านบทความ")}{' '}<Ic d="M7 17 17 7M7 7h10v10" size={17} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="container contact-inner">
            <div>
              <h2>{' '}{t("ให้พื้นที่ของคุณเติบโต")}{' '}<br />
                <span>{' '}{t("ให้ชีวิตคุณมีเวลามากขึ้น")}{' '}</span>
              </h2>
              <p>{' '}{t("เริ่มจัดการอสังหาฯ กับ HorCare ได้ตั้งแต่วันนี้")}{' '}</p>
              <div className="hero-actions">
                <a className="button accent" href={HORCARE_URL}>{' '}{t("เริ่มใช้งานฟรี")}{' '}<Ic d={P.arrow} size={18} />
                </a>
                <a
                  className="button light-outline"
                  href={LINE_URL}
                  target="_blank"
                  rel="noreferrer"
                >{' '}{t("คุยกับทีม / ขอเดโม")}{' '}<Ic d="M7 17 17 7M7 7h10v10" size={17} />
                </a>
              </div>
              <small>{' '}{t("ฟรีสูงสุด 250 ห้อง · ไม่ต้องผูกบัตรเครดิต")}{' '}</small>
            </div>
            <div className="contact-word" aria-hidden="true">
              less
              <br />
              <em>is more.</em>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
