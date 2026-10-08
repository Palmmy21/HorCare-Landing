import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { Ic, HORCARE_URL } from '../components/shared.jsx'
const initialRoom = (id) => ({
  id,
  elecPrev: 0,
  elecCurr: 0,
  waterPrev: 0,
  waterCurr: 0,
  rent: 3000,
  extra: 0,
})
const money = (value) =>
  value.toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
function Field({ label, value, onChange }) {
  const id = useId()
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        step="0.01"
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value === '' ? '' : Math.max(0, Number(e.target.value)),
          )
        }
      />
    </div>
  )
}
export default function Calculator() {
  const [elecRate, setElecRate] = useState(8)
  const [waterRate, setWaterRate] = useState(18)
  const [rooms, setRooms] = useState([initialRoom(1)])
  const summaries = rooms.map((r) => {
    const electricity =
      Math.max(0, Number(r.elecCurr) - Number(r.elecPrev)) * Number(elecRate)
    const water =
      Math.max(0, Number(r.waterCurr) - Number(r.waterPrev)) * Number(waterRate)
    return {
      electricity,
      water,
      rent: Number(r.rent),
      extra: Number(r.extra),
      total: electricity + water + Number(r.rent) + Number(r.extra),
      invalid:
        Number(r.elecCurr) < Number(r.elecPrev) ||
        Number(r.waterCurr) < Number(r.waterPrev),
    }
  })
  const total = summaries.reduce(
    (a, r) => ({
      electricity: a.electricity + r.electricity,
      water: a.water + r.water,
      rent: a.rent + r.rent,
      extra: a.extra + r.extra,
      total: a.total + r.total,
    }),
    { electricity: 0, water: 0, rent: 0, extra: 0, total: 0 },
  )
  const invalid = summaries.some((r) => r.invalid)
  function update(id, key, value) {
    setRooms(rooms.map((r) => (r.id === id ? { ...r, [key]: value } : r)))
  }
  return (
    <>
      <Navbar />
      <main id="main">
        <div className="container page-intro">
          <nav className="breadcrumb" aria-label="เส้นทางนำทาง">
            <Link to="/">หน้าแรก</Link>
            <span>/</span>
            <span>เครื่องคำนวณ</span>
          </nav>
          <h1>บิลนี้ เท่าไหร่ดี?</h1>
          <p>
            คำนวณค่าน้ำ ค่าไฟ และค่าเช่าของแต่ละห้อง
            <br />
            ปรับอัตราเองได้ ใช้ฟรี ไม่ต้องสมัคร
          </p>
        </div>
        <div className="container calculator-layout">
          <div>
            <section className="calc-panel">
              <h2>ตั้งค่าอัตราต่อหน่วย</h2>
              <div className="calc-input-grid">
                <Field
                  label="ค่าไฟ (บาท / หน่วย)"
                  value={elecRate}
                  onChange={setElecRate}
                />
                <Field
                  label="ค่าน้ำ (บาท / หน่วย)"
                  value={waterRate}
                  onChange={setWaterRate}
                />
              </div>
              <p className="calc-note">
                อัตราเริ่มต้นเป็นเพียงตัวอย่าง
                โปรดใส่อัตราที่ใช้จริงและตรวจสอบข้อกำหนดที่เกี่ยวข้องกับทรัพย์สินของคุณ
              </p>
            </section>
            {rooms.map((r, i) => (
              <section className="calc-panel" key={r.id}>
                <div className="room-header">
                  <h2>ห้องที่ {i + 1}</h2>
                  {rooms.length > 1 && (
                    <button
                      className="remove-room"
                      aria-label={'ลบห้องที่ ' + (i + 1)}
                      onClick={() =>
                        setRooms(rooms.filter((x) => x.id !== r.id))
                      }
                    >
                      ลบห้อง
                    </button>
                  )}
                </div>
                <div className="calc-input-grid">
                  {[
                    ['elecPrev', 'เลขมิเตอร์ไฟก่อนหน้า'],
                    ['elecCurr', 'เลขมิเตอร์ไฟล่าสุด'],
                    ['waterPrev', 'เลขมิเตอร์น้ำก่อนหน้า'],
                    ['waterCurr', 'เลขมิเตอร์น้ำล่าสุด'],
                    ['rent', 'ค่าเช่า (บาท)'],
                    ['extra', 'ค่าใช้จ่ายอื่น (บาท)'],
                  ].map(([key, label]) => (
                    <Field
                      key={key}
                      label={label}
                      value={r[key]}
                      onChange={(v) => update(r.id, key, v)}
                    />
                  ))}
                </div>
                {summaries[i].invalid && (
                  <p className="field-error" role="alert">
                    เลขมิเตอร์ล่าสุดต้องไม่น้อยกว่าเลขก่อนหน้า
                    กรุณาตรวจสอบอีกครั้ง
                  </p>
                )}
                <div className="room-total">
                  <span>รวมของห้องนี้</span>
                  <strong>
                    {summaries[i].invalid
                      ? 'ตรวจสอบเลขมิเตอร์'
                      : '฿' + money(summaries[i].total)}
                  </strong>
                </div>
              </section>
            ))}
            <button
              className="button outline"
              onClick={() =>
                setRooms([
                  ...rooms,
                  initialRoom(Math.max(...rooms.map((r) => r.id)) + 1),
                ])
              }
            >
              เพิ่มห้อง
            </button>
            <p className="calc-note">
              เครื่องมือนี้ใช้ประมาณยอดเท่านั้น
              ข้อมูลที่กรอกไม่ได้ถูกส่งไปยังเซิร์ฟเวอร์
            </p>
          </div>
          <aside className="calc-summary" aria-live="polite">
            <h2>สรุป {rooms.length} ห้อง</h2>
            <dl>
              {[
                ['ค่าเช่า', total.rent],
                ['ค่าไฟ', total.electricity],
                ['ค่าน้ำ', total.water],
                ['ค่าใช้จ่ายอื่น', total.extra],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>฿{money(value)}</dd>
                </div>
              ))}
            </dl>
            <div className="grand-total">
              <span>ยอดรวมทั้งหมด</span>
              <strong>
                {invalid ? 'ตรวจสอบเลขมิเตอร์' : '฿' + money(total.total)}
              </strong>
            </div>
            <p>
              อยากออกบิลจากข้อมูลผู้เช่าได้เลย? ให้ HorCare
              ช่วยดูแลงานประจำเดือน
            </p>
            <a className="button accent" href={HORCARE_URL}>
              เริ่มใช้งานฟรี <Ic d="M7 17 17 7M7 7h10v10" size={17} />
            </a>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}
