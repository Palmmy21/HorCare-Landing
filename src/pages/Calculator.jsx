import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

const HORCARE_URL = 'https://hor-care.vercel.app/'

const ELECTRICITY_RATE = 8.0   // บาท/หน่วย (อัตราหอพักทั่วไป ไม่เกิน กกพ.)
const WATER_RATE       = 18.0  // บาท/หน่วย (ลบ.ม.)

function NumInput({ label, unit, value, onChange, min = 0, hint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 500, fontSize: 14, color: '#1A2433' }}>
        {label}
      </label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type="number"
          min={min}
          value={value}
          onChange={e => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          style={{
            width: '100%', padding: '10px 52px 10px 14px',
            fontFamily: 'Kanit,sans-serif', fontSize: 16, fontWeight: 600,
            border: '1.5px solid rgba(0,184,162,0.3)', borderRadius: 10,
            outline: 'none', color: '#1A2433', background: '#fff',
            boxSizing: 'border-box',
          }}
          onFocus={e => e.target.style.borderColor = '#00B8A2'}
          onBlur={e  => e.target.style.borderColor = 'rgba(0,184,162,0.3)'}
        />
        <span style={{
          position: 'absolute', right: 12,
          fontFamily: 'Sarabun,sans-serif', fontSize: 12, color: '#90A4AE', pointerEvents: 'none',
        }}>{unit}</span>
      </div>
      {hint && <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 11.5, color: '#90A4AE', margin: 0 }}>{hint}</p>}
    </div>
  )
}

function ResultRow({ label, value, color = '#1A2433', large = false, border = false }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 0',
      borderTop: border ? '1px solid #f0f0f0' : 'none',
    }}>
      <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: large ? 15 : 13.5, color: '#546E7A' }}>{label}</span>
      <span style={{ fontFamily: 'Kanit,sans-serif', fontWeight: large ? 700 : 600, fontSize: large ? 20 : 14, color }}>{value}</span>
    </div>
  )
}

function RoomRow({ room, onUpdate, onRemove, index }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 14, padding: '18px 20px',
      border: '1px solid rgba(0,184,162,0.12)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 14, color: '#00B8A2' }}>
          ห้องที่ {index + 1}
        </span>
        {index > 0 && (
          <button onClick={onRemove} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Sarabun,sans-serif', fontSize: 12, color: '#E53935', padding: '2px 6px',
          }}>ลบ</button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12 }}>
        <NumInput label="เลขมิเตอร์ไฟ (ต้น)" unit="หน่วย" value={room.elecPrev}
          onChange={v => onUpdate({ ...room, elecPrev: v })} />
        <NumInput label="เลขมิเตอร์ไฟ (ปลาย)" unit="หน่วย" value={room.elecCurr}
          onChange={v => onUpdate({ ...room, elecCurr: v })} />
        <NumInput label="เลขมิเตอร์น้ำ (ต้น)" unit="ลบ.ม." value={room.waterPrev}
          onChange={v => onUpdate({ ...room, waterPrev: v })} />
        <NumInput label="เลขมิเตอร์น้ำ (ปลาย)" unit="ลบ.ม." value={room.waterCurr}
          onChange={v => onUpdate({ ...room, waterCurr: v })} />
        <NumInput label="ค่าเช่าห้อง" unit="บาท" value={room.rent}
          onChange={v => onUpdate({ ...room, rent: v })} />
        <NumInput label="ค่าใช้จ่ายอื่นๆ" unit="บาท" value={room.extra}
          onChange={v => onUpdate({ ...room, extra: v })} hint="ค่าส่วนกลาง ค่าจอดรถ ฯลฯ" />
      </div>

      {/* Per-room summary */}
      {(() => {
        const elec  = Math.max(0, (room.elecCurr  || 0) - (room.elecPrev  || 0))
        const water = Math.max(0, (room.waterCurr || 0) - (room.waterPrev || 0))
        const elecCost  = elec  * ELECTRICITY_RATE
        const waterCost = water * WATER_RATE
        const total = (room.rent || 0) + elecCost + waterCost + (room.extra || 0)
        return (
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed rgba(0,184,162,0.2)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 12, color: '#546E7A' }}>
              ไฟ <strong style={{ color: '#FF9800' }}>{elec} หน่วย</strong> = {elecCost.toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท
            </span>
            <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 12, color: '#546E7A' }}>
              น้ำ <strong style={{ color: '#1E88E5' }}>{water} ลบ.ม.</strong> = {waterCost.toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท
            </span>
            <span style={{ fontFamily: 'Kanit,sans-serif', fontSize: 13, fontWeight: 700, color: '#2DC76D', marginLeft: 'auto' }}>
              รวม {total.toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท
            </span>
          </div>
        )
      })()}
    </div>
  )
}

const newRoom = () => ({ elecPrev: 0, elecCurr: 0, waterPrev: 0, waterCurr: 0, rent: 3000, extra: 0 })

export default function Calculator() {
  const [elecRate,  setElecRate]  = useState(ELECTRICITY_RATE)
  const [waterRate, setWaterRate] = useState(WATER_RATE)
  const [rooms, setRooms] = useState([newRoom()])

  const updateRoom = useCallback((i, r) => setRooms(prev => prev.map((x, idx) => idx === i ? r : x)), [])
  const removeRoom = useCallback(i => setRooms(prev => prev.filter((_, idx) => idx !== i)), [])
  const addRoom    = useCallback(() => setRooms(prev => [...prev, newRoom()]), [])

  const summary = rooms.map(r => {
    const elec  = Math.max(0, (r.elecCurr  || 0) - (r.elecPrev  || 0))
    const water = Math.max(0, (r.waterCurr || 0) - (r.waterPrev || 0))
    const elecCost  = elec  * elecRate
    const waterCost = water * waterRate
    return { elec, water, elecCost, waterCost, rent: r.rent || 0, extra: r.extra || 0,
      total: (r.rent || 0) + elecCost + waterCost + (r.extra || 0) }
  })

  const grand = summary.reduce((acc, s) => ({
    elec:      acc.elec      + s.elec,
    water:     acc.water     + s.water,
    elecCost:  acc.elecCost  + s.elecCost,
    waterCost: acc.waterCost + s.waterCost,
    rent:      acc.rent      + s.rent,
    extra:     acc.extra     + s.extra,
    total:     acc.total     + s.total,
  }), { elec: 0, water: 0, elecCost: 0, waterCost: 0, rent: 0, extra: 0, total: 0 })

  const fmt = n => n.toLocaleString('th-TH', { minimumFractionDigits: 2 })

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFB', fontFamily: 'Kanit,sans-serif' }}>

      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid rgba(0,184,162,0.12)', padding: '0 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <img src="/2.png" width={36} height={36} alt="HorCare" style={{ objectFit: 'contain' }} />
            <span style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 18 }}>
              <span style={{ color: '#2DC76D' }}>Hor</span><span style={{ color: '#1565C0' }}>Care</span>
            </span>
          </Link>
          <a href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 13, color: '#fff', background: 'linear-gradient(135deg,#2DC76D,#00B8A2)', padding: '8px 18px', borderRadius: 100, textDecoration: 'none' }}>
            ใช้ฟรีในระบบ HorCare →
          </a>
        </div>
      </nav>

      {/* Header */}
      <div style={{ background: 'linear-gradient(150deg,#0B1A27,#122338 55%,#0A1F14)', padding: '52px 24px 44px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(45,199,109,0.13)', border: '1px solid rgba(45,199,109,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 20 }}>
          <span style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 11.5, fontWeight: 600, color: '#2DC76D', letterSpacing: '0.1em', textTransform: 'uppercase' }}>เครื่องคำนวณ • ฟรี 100%</span>
        </div>
        <h1 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,4vw,2.6rem)', color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>
          เครื่องคำนวณค่าน้ำค่าไฟหอพัก
        </h1>
        <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 15.5, color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
          คำนวณค่าน้ำ ค่าไฟ และยอดรวมที่เรียกเก็บจากผู้เช่าได้ทันที รองรับหลายห้องพร้อมกัน
        </p>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 24, alignItems: 'start' }}>

          {/* Left — inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Rate settings */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '20px', border: '1px solid rgba(0,184,162,0.12)' }}>
              <h2 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 14, color: '#1A2433', marginBottom: 14 }}>
                ⚙️ ตั้งค่าอัตราค่าน้ำค่าไฟ
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <NumInput
                  label="อัตราค่าไฟ" unit="บาท/หน่วย"
                  value={elecRate} onChange={setElecRate}
                  hint="กกพ. กำหนดไม่เกิน ~8–9 บาท/หน่วย"
                />
                <NumInput
                  label="อัตราค่าน้ำ" unit="บาท/ลบ.ม."
                  value={waterRate} onChange={setWaterRate}
                  hint="ค่าน้ำเฉลี่ยหอพักทั่วไป"
                />
              </div>
            </div>

            {/* Room rows */}
            {rooms.map((r, i) => (
              <RoomRow key={i} index={i} room={r}
                onUpdate={r => updateRoom(i, r)}
                onRemove={() => removeRoom(i)} />
            ))}

            {/* Add room */}
            <button onClick={addRoom} style={{
              width: '100%', padding: '12px', borderRadius: 12,
              border: '1.5px dashed rgba(0,184,162,0.4)', background: 'rgba(0,184,162,0.04)',
              fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 14, color: '#00B8A2',
              cursor: 'pointer', transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,184,162,0.09)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,184,162,0.04)'}>
              + เพิ่มห้อง ({rooms.length} ห้องที่คำนวณอยู่)
            </button>
          </div>

          {/* Right — summary (sticky) */}
          <div style={{ position: 'sticky', top: 76 }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '22px', border: '1.5px solid rgba(0,184,162,0.22)', boxShadow: '0 4px 24px rgba(0,184,162,0.1)' }}>
              <h2 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 15, color: '#1A2433', marginBottom: 14 }}>
                📊 สรุปยอดรวมทุกห้อง
              </h2>

              <ResultRow label={`ค่าไฟรวม (${grand.elec.toFixed(0)} หน่วย)`}
                value={`฿${fmt(grand.elecCost)}`} color="#FF9800" />
              <ResultRow label={`ค่าน้ำรวม (${grand.water.toFixed(0)} ลบ.ม.)`}
                value={`฿${fmt(grand.waterCost)}`} color="#1E88E5" />
              <ResultRow label="ค่าเช่ารวม"
                value={`฿${fmt(grand.rent)}`} />
              {grand.extra > 0 && (
                <ResultRow label="ค่าอื่นๆ รวม"
                  value={`฿${fmt(grand.extra)}`} />
              )}

              <div style={{ marginTop: 4, paddingTop: 12, borderTop: '2px solid #f0f0f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 15, color: '#1A2433' }}>ยอดรวมทั้งหมด</span>
                  <span style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 800, fontSize: 26, color: '#2DC76D' }}>฿{fmt(grand.total)}</span>
                </div>
                <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 11.5, color: '#90A4AE', marginTop: 4 }}>
                  จาก {rooms.length} ห้อง • ค่าเฉลี่ย ฿{fmt(grand.total / rooms.length)}/ห้อง
                </p>
              </div>

              <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #f5f5f5' }}>
                <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 12.5, color: '#546E7A', lineHeight: 1.7, marginBottom: 12 }}>
                  คำนวณด้วยมือทุกเดือนเหนื่อยไหม? <strong style={{ color: '#1A2433' }}>HorCare</strong> ทำให้อัตโนมัติ — บันทึกมิเตอร์ ระบบคำนวณและสร้างบิลให้ทันที
                </p>
                <a href={HORCARE_URL} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'block', textAlign: 'center', padding: '11px', borderRadius: 100,
                    background: 'linear-gradient(135deg,#2DC76D,#00B8A2)', color: '#fff',
                    fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 14, textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(45,199,109,0.35)',
                  }}>
                  ใช้ฟรีใน HorCare →
                </a>
              </div>
            </div>

            {/* Share note */}
            <div style={{ marginTop: 12, background: 'rgba(21,101,192,0.06)', border: '1px solid rgba(21,101,192,0.15)', borderRadius: 12, padding: '14px 16px' }}>
              <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 12, color: '#546E7A', lineHeight: 1.6, margin: 0 }}>
                🔗 แชร์เครื่องคำนวณนี้ให้เพื่อนเจ้าของหอพัก<br />
                <strong style={{ color: '#1565C0' }}>horcare-landing.vercel.app/calculator</strong>
              </p>
            </div>
          </div>
        </div>

        {/* SEO info section */}
        <section style={{ marginTop: 52, padding: '36px', background: '#fff', borderRadius: 16, border: '1px solid rgba(0,184,162,0.1)' }}>
          <h2 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 700, fontSize: 'clamp(1.2rem,2vw,1.6rem)', color: '#1A2433', marginBottom: 20 }}>
            วิธีคำนวณค่าน้ำค่าไฟหอพักอย่างถูกต้อง
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20 }}>
            {[
              {
                icon: '⚡',
                title: 'สูตรคำนวณค่าไฟ',
                body: 'ค่าไฟ = (มิเตอร์ปลาย − มิเตอร์ต้น) × อัตรา ตัวอย่าง: ใช้ 50 หน่วย × 8 บาท = 400 บาท กกพ. กำหนดอัตราสูงสุดสำหรับหอพักไว้ที่ประมาณ 8–9 บาทต่อหน่วย',
              },
              {
                icon: '💧',
                title: 'สูตรคำนวณค่าน้ำ',
                body: 'ค่าน้ำ = (มิเตอร์ปลาย − มิเตอร์ต้น) × อัตราต่อ ลบ.ม. ควรอิงตามอัตราการประปาในพื้นที่ บวกค่าบริการได้ไม่เกินที่กฎหมายกำหนด',
              },
              {
                icon: '📄',
                title: 'ควรระบุในสัญญา',
                body: 'ระบุอัตราค่าน้ำค่าไฟในสัญญาเช่าให้ชัดเจน เพื่อป้องกันข้อพิพาท ผู้เช่ามีสิทธิ์ขอดูหลักฐานการอ่านมิเตอร์ ควรถ่ายรูปมิเตอร์ทุกต้นเดือน',
              },
              {
                icon: '🤖',
                title: 'ใช้ระบบช่วยคำนวณ',
                body: 'HorCare มีระบบบันทึกมิเตอร์พร้อมถ่ายรูปหลักฐาน คำนวณค่าน้ำค่าไฟและสร้างใบแจ้งหนี้อัตโนมัติทุกเดือน ลดข้อผิดพลาดและข้อพิพาทกับผู้เช่า',
              },
            ].map(({ icon, title, body }) => (
              <div key={title}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <h3 style={{ fontFamily: 'Kanit,sans-serif', fontWeight: 600, fontSize: 15, color: '#1A2433', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontFamily: 'Sarabun,sans-serif', fontSize: 13.5, color: '#546E7A', lineHeight: 1.75, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
