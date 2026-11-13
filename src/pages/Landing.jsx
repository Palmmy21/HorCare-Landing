import { useRef, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.js'
import { Link } from '../components/LocalizedLink.jsx'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { Ic, P, HORCARE_URL, LINE_URL } from '../components/shared.jsx'
import { ARTICLES } from '../data/articles.js'
import { FAQS } from '../data/site.js'
import { Hero } from '../components/landing/Hero.jsx'
import { ProofBand, Specialist } from '../components/landing/Proof.jsx'
import { ImportService } from '../components/landing/ImportService.jsx'
import { Trust } from '../components/landing/Trust.jsx'
import { ProblemToSolution } from '../components/landing/ProblemToSolution.jsx'
import { Solution } from '../components/landing/Solution.jsx'
import { Experience } from '../components/landing/Experience.jsx'
import { Flexibility } from '../components/landing/Flexibility.jsx'
import { GettingStarted } from '../components/landing/GettingStarted.jsx'
import { DEMO_URL } from '../components/landing/links.js'
import { useReveal, useScrollProgress } from '../components/landing/motion.js'

const OUT = 'M7 17 17 7M7 7h10v10'

const lineAsk = (text) => 'https://line.me/R/oaMessage/@127qwwfi/?' + encodeURIComponent(text)

const paidPlans = [
  {
    key: 'pro',
    name: 'HorCare Pro',
    tag: 'เหมาะกับคนส่วนใหญ่',
    lead: 'ลดงานซ้ำด้วย LINE และ AI ดูแลได้สูงสุด 10 อาคาร',
    monthly: '399',
    yearly: '2,990',
    perDay: ['เฉลี่ยวันละประมาณ ฿13', 'เฉลี่ยวันละไม่ถึง ฿9'],
    capacity: 'ไม่จำกัดห้อง · สูงสุด 10 อาคาร',
    includes: 'ทุกอย่างใน Free พร้อม',
    features: [
      'ส่งบิลและแจ้งเตือนผ่าน LINE อัตโนมัติ',
      'QR โอนเงินในบิล และ AI ตรวจสลิป',
      'อ่านมิเตอร์จากรูปถ่ายด้วย AI',
      'งานแจ้งซ่อม สต็อก ทรัพย์สิน และค่าใช้จ่าย',
      'ผู้ช่วย AI "น้องแคร์"',
      'ทีม HorCare ช่วยนำเข้าข้อมูลและเซ็ตอัพให้',
      'Priority Support ผ่าน LINE ตลอด 24 ชม.',
    ],
  },
  {
    key: 'business',
    name: 'Business',
    tag: 'หลายสาขา',
    lead: 'สำหรับเจ้าของธุรกิจหลายแห่ง ไม่จำกัดสาขาและห้อง',
    monthly: '679',
    yearly: '5,000',
    perDay: ['เฉลี่ยวันละประมาณ ฿23', 'เฉลี่ยวันละไม่ถึง ฿14'],
    capacity: 'ไม่จำกัดห้อง · ไม่จำกัดสาขา',
    includes: 'ทุกอย่างใน HorCare Pro พร้อม',
    features: [
      'สลับดูแต่ละสาขา หรือแยกตึกในที่เดียวกัน',
      'ทีมงาน ช่าง และแม่บ้าน ดูแลหลายสาขาในบัญชีเดียว',
      'ดูยอดทุกสาขาผ่าน LINE (#ยอด)',
      'หน้าประกาศห้องว่างทุกสาขา',
      'ทีม HorCare ช่วยย้ายข้อมูลทุกสาขาให้',
    ],
  },
]

function Pricing() {
  const { t } = useLanguage()
  const [annual, setAnnual] = useState(false)
  return (
    <section id="pricing" className="section pricing-section">
      <div className="container">
        <div className="section-heading centered" data-reveal>
          <h2>
            {t('ลงทุนเท่าไร')}
            <br />
            <span className="muted-heading">{t('เห็นชัดตั้งแต่วันแรก')}</span>
          </h2>
          <p>{t('ทุกราคาอยู่บนหน้านี้ ไม่มีค่าใช้จ่ายแอบแฝง เริ่มฟรีก่อน แล้วค่อยขยับเมื่อธุรกิจพร้อม')}</p>
        </div>
        <div className="billing-toggle" role="group" aria-label={t('รอบการชำระเงิน')}>
          <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)} data-track="pricing_monthly">
            {t('รายเดือน')}
          </button>
          <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)} data-track="pricing_yearly">
            {t('รายปี')} <span>{t('ประหยัด 38%')}</span>
          </button>
        </div>
        <div className="plans lp-plans">
          <article className="plan" data-reveal style={{ '--i': 0 }}>
            <h3>Free</h3>
            <p>{t('เริ่มจัดระเบียบงานเช่า แบบไม่มีค่าใช้จ่าย')}</p>
            <div className="price">
              {t('฿0')} <span>{t('/ ตลอดชีพ')}</span>
            </div>
            <p className="plan-capacity">{t('สูงสุด 250 ห้อง')}</p>
            <a className="button outline" href={HORCARE_URL} data-track="plan_free">
              {t('เริ่มใช้งานฟรี')}
              <Ic d={P.arrow} size={18} />
            </a>
            <ul>
              {['จัดการห้องและข้อมูลผู้เช่า', 'นำเข้าห้องจากเทมเพลต Excel', 'ออกบิลและใบแจ้งหนี้', 'บันทึกมิเตอร์น้ำและไฟ', 'สร้างสัญญาเช่าออนไลน์', 'พิมพ์ใบเสร็จรับเงิน'].map((x) => (
                <li key={x}>
                  <Ic d={P.check} size={17} /> {t(x)}
                </li>
              ))}
            </ul>
          </article>
          {paidPlans.map((plan) => (
            <article
              className={plan.key === 'pro' ? 'plan plan-pro' : 'plan lp-plan-business'}
              key={plan.key}
              data-reveal
              style={{ '--i': plan.key === 'pro' ? 1 : 2 }}
            >
              <div className="plan-title">
                <h3>{plan.name}</h3>
                <span>{t(plan.tag)}</span>
              </div>
              <p>{t(plan.lead)}</p>
              <div className="price" aria-live="polite">
                ฿{annual ? plan.yearly : plan.monthly} <span>/ {annual ? t('ปี') : t('เดือน')}</span>
              </div>
              <p className="plan-capacity">
                {t(plan.perDay[annual ? 1 : 0])} · {t(plan.capacity)}
              </p>
              <a
                className={plan.key === 'pro' ? 'button accent' : 'button outline'}
                href={lineAsk(t('สนใจแพ็กเกจ ') + plan.name + ' ' + (annual ? t('รายปี ') + plan.yearly + t(' บาท') : t('รายเดือน ') + plan.monthly + t(' บาท')))}
                target="_blank"
                rel="noreferrer"
                data-track={'plan_' + plan.key}
              >
                {t('เลือก') + ' ' + plan.name}
                <Ic d={P.arrow} size={18} />
              </a>
              <p className="includes">{t(plan.includes)}</p>
              <ul>
                {plan.features.map((x) => (
                  <li key={x}>
                    <Ic d={P.check} size={17} /> {t(x)}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="lp-trial" data-reveal>
          <div>
            <b>{t('ยังไม่แน่ใจ? ทดลอง HorCare Pro ฟรี 30 วัน')}</b>
            <span>{t('ใช้ได้ทุกฟีเจอร์ ครบ 30 วันแล้วบัญชีกลับเป็นแพ็กเกจฟรีเอง ไม่มีการตัดเงินอัตโนมัติ')}</span>
          </div>
          <a className="button primary" href={HORCARE_URL} data-track="start_trial">
            {t('เริ่มทดลองใช้')}
            <Ic d={P.arrow} size={18} />
          </a>
        </div>
        <p className="pricing-note">
          {t('ราคายังไม่รวม VAT · รายปีประหยัดกว่าจ่ายรายเดือน 12 เดือนประมาณ 38%')}
          <br />
          {t('มีรูปแบบการจัดการเฉพาะ?')}{' '}
          <a href={LINE_URL} target="_blank" rel="noreferrer">
            {t('คุยกับทีมก่อนเลือกแพ็กเกจ')}
          </a>
        </p>
      </div>
    </section>
  )
}

export default function Landing() {
  const { t } = useLanguage()
  const finale = useRef(null)
  useReveal()
  useScrollProgress(finale, { mode: 'enter', end: 0.45 })
  return (
    <>
      <Navbar />
      <main id="main" className="lp">
        <Hero />
        <ProofBand />
        <Specialist />
        <ProblemToSolution />
        <Solution />
        <ImportService />
        <Experience />
        <Flexibility />
        <GettingStarted />
        <Pricing />
        <Trust />

        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div>
              <h2>
                {t('สงสัยตรงไหน')}
                <br />
                {t('คำตอบอยู่ที่นี่')}
              </h2>
              <p>{t('รวมคำถามที่เจ้าของอสังหาฯ ถามบ่อยก่อนเริ่มใช้ ถ้ายังไม่เจอคำตอบ ทักทีมได้เลย')}</p>
              <a className="text-link" href={LINE_URL} target="_blank" rel="noreferrer">
                {t('คุยกับทีม HorCare')}
                <Ic d={OUT} size={17} />
              </a>
            </div>
            <div className="faq-list" data-reveal>
              {FAQS.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {t(q)}
                    <span className="faq-plus">
                      <Ic d="M12 5v14M5 12h14" size={20} />
                    </span>
                  </summary>
                  <p>{t(a)}</p>
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
                <p>{t('ความรู้สำหรับเจ้าของอสังหาฯ ให้เช่า กลับมาอ่านได้ทุกเมื่อที่สงสัย')}</p>
              </div>
              <Link className="text-link" to="/blog">
                {t('อ่านทั้งหมด')}
                <Ic d={OUT} size={17} />
              </Link>
            </div>
            <div className="journal-grid">
              {ARTICLES.slice(0, 3).map((a, i) => (
                <Link className="journal-card" to={'/blog/' + a.slug} key={a.slug} data-reveal style={{ '--i': i }}>
                  <div className={'journal-art art-' + i}>
                    <span>{['PROPERTY\nPLAYBOOK', 'LESS ADMIN.\nMORE LIFE.', 'ROOM TO\nGROW.'][i]}</span>
                    <Ic d={[P.home, P.doc, P.chart][i]} size={68} />
                  </div>
                  <div className="journal-meta">
                    <span>{t(a.cat)}</span>
                    <span>
                      {t('อ่าน')} {a.min} {t('นาที')}
                    </span>
                  </div>
                  <h3>{t(a.title)}</h3>
                  <span className="journal-read">
                    {t('อ่านบทความ')}
                    <Ic d={OUT} size={17} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section lp-final" ref={finale}>
          <div className="container contact-inner lp-final-inner">
            <div>
              <h2>
                {t('เริ่มได้ใน 2 ขั้น')}
                <br />
                <span>{t('ไม่ต้องเสียเงินสักบาท')}</span>
              </h2>
              <ol className="lp-funnel">
                <li>
                  <span className="lp-funnel-num">1</span>
                  <div>
                    <b>{t('จองเดโมกับทีม')}</b>
                    <p>{t('บอกจำนวนห้องและวันที่สะดวกทาง LINE ทีมพาดูระบบจริงกับข้อมูลแบบหอของคุณ และวางแผนย้ายข้อมูลให้')}</p>
                    <a className="button accent" href={DEMO_URL} target="_blank" rel="noreferrer" data-track="book_demo">
                      {t('จองเดโมผ่าน LINE')}
                      <Ic d={P.arrow} size={18} />
                    </a>
                  </div>
                </li>
                <li>
                  <span className="lp-funnel-num">2</span>
                  <div>
                    <b>{t('เริ่มใช้งานจริง')}</b>
                    <p>{t('สมัครฟรี นำเข้าห้องจาก Excel หรือให้ทีมช่วยลงข้อมูล แล้วออกบิลเดือนแรกได้ทันที')}</p>
                    <a className="button light-outline" href={HORCARE_URL} data-track="start_free">
                      {t('เริ่มใช้งานฟรี')}
                      <Ic d={OUT} size={17} />
                    </a>
                  </div>
                </li>
              </ol>
              <small>{t('ฟรีสูงสุด 250 ห้อง · ไม่ต้องผูกบัตรเครดิต · LINE @127qwwfi')}</small>
            </div>
            <p className="contact-word lp-final-word" aria-hidden="true">
              <span className="lp-final-a">One System.</span>
              <em className="lp-final-b">Every Asset.</em>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
