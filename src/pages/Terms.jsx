import { useEffect } from 'react'

function PageHeader() {
  return (
    <header style={{ position:'sticky', top:0, zIndex:50, background:'rgba(255,255,255,0.97)', borderBottom:'1px solid rgba(0,184,162,0.13)', backdropFilter:'blur(8px)', boxShadow:'0 1px 12px rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 2.5rem', height:64, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <a href="/" style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none' }}>
          <img src="/2.png" width={40} height={40} alt="HorCare Logo" style={{ objectFit:'contain' }} />
          <span style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:18 }}>
            <span style={{ color:'#2DC76D' }}>Hor</span><span style={{ color:'#1565C0' }}>Care</span>
          </span>
        </a>
        <a href="/" style={{ fontFamily:'Sarabun,sans-serif', fontSize:14, color:'#546E7A', textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>
          ← กลับหน้าหลัก
        </a>
      </div>
    </header>
  )
}

const SECTIONS = [
  {
    title:'1. การยอมรับเงื่อนไข',
    body:[
      'การลงทะเบียนหรือใช้งานบริการ HorCare ถือว่าคุณยอมรับเงื่อนไขการใช้งานฉบับนี้ทุกประการ หากคุณไม่เห็นด้วยกับเงื่อนไขใด ๆ กรุณาหยุดการใช้งานทันที',
    ]
  },
  {
    title:'2. คำอธิบายบริการ',
    body:[
      'HorCare ให้บริการซอฟต์แวร์จัดการหอพักผ่านระบบออนไลน์ (Software as a Service) ครอบคลุมการจัดการห้องพัก ผู้เช่า สัญญาเช่า ค่าน้ำค่าไฟ ใบแจ้งหนี้ และรายงานสถิติ',
      'เราขอสงวนสิทธิ์ในการปรับปรุง เปลี่ยนแปลง หรือยกเลิกฟีเจอร์ใด ๆ ได้ตลอดเวลา โดยจะแจ้งล่วงหน้าในกรณีที่กระทบต่อการใช้งานอย่างมีนัยสำคัญ',
    ]
  },
  {
    title:'3. บัญชีผู้ใช้',
    body:[
      'คุณมีหน้าที่รับผิดชอบในการรักษาความปลอดภัยของบัญชีและรหัสผ่าน หากพบการใช้งานโดยไม่ได้รับอนุญาต กรุณาแจ้งเราทันทีที่ LINE @horcare',
      'บัญชีหนึ่งบัญชีสำหรับหนึ่งกิจการหอพัก ห้ามโอน ขาย หรือแบ่งปันบัญชีให้บุคคลภายนอกกิจการ',
    ]
  },
  {
    title:'4. การชำระเงินและการคืนเงิน',
    body:[
      'ค่าบริการชำระรายเดือน คำนวณตามจำนวนห้องพักจริงในระบบ ราคายังไม่รวมภาษีมูลค่าเพิ่ม 7% โดยจะออกใบกำกับภาษีให้ทุกเดือน',
      'ไม่มีการคืนเงินสำหรับค่าบริการที่ชำระแล้ว ยกเว้นกรณีที่ระบบขัดข้องจากความผิดพลาดของ HorCare ซึ่งจะพิจารณาเป็นรายกรณี',
      'แพ็กเกจฟรีไม่มีค่าใช้จ่ายและไม่มีวันหมดอายุ ตราบเท่าที่จำนวนห้องไม่เกิน 10 ห้อง',
    ]
  },
  {
    title:'5. การยกเลิกบริการ',
    body:[
      'คุณสามารถยกเลิกแพ็กเกจได้ตลอดเวลาผ่านหน้าตั้งค่าบัญชี บัญชีจะยังใช้งานได้จนถึงวันสิ้นรอบการชำระที่ถัดมา หลังจากนั้นข้อมูลจะถูกเก็บรักษาไว้ 90 วันก่อนลบออกจากระบบ',
    ]
  },
  {
    title:'6. ข้อห้ามในการใช้งาน',
    body:[
      'ห้ามใช้บริการ HorCare เพื่อ: (1) กิจกรรมที่ผิดกฎหมาย (2) ส่งข้อมูลที่เป็นอันตรายหรือมีไวรัส (3) พยายามเจาะหรือรบกวนระบบ (4) เก็บรวบรวมข้อมูลผู้ใช้รายอื่นโดยไม่ได้รับอนุญาต (5) ใช้งานในลักษณะที่กระทบต่อผู้ใช้รายอื่น',
    ]
  },
  {
    title:'7. ความเป็นเจ้าของข้อมูล',
    body:[
      'ข้อมูลหอพักและผู้เช่าที่คุณบันทึกเข้าระบบเป็นทรัพย์สินของคุณ HorCare ไม่มีสิทธิ์ในข้อมูลเหล่านั้น คุณสามารถ Export ข้อมูลออกจากระบบได้ตลอดเวลาตามแพ็กเกจที่เลือก',
    ]
  },
  {
    title:'8. การจำกัดความรับผิด',
    body:[
      'HorCare รับประกัน Uptime 99.9% ต่อเดือน หากเกิดการขัดข้องเกินกว่าที่รับประกัน จะชดเชยเป็นเครดิตค่าบริการตามสัดส่วนที่ขัดข้องจริง',
      'HorCare ไม่รับผิดชอบต่อความเสียหายที่เกิดจากการใช้ข้อมูลในระบบไม่ถูกต้อง การตัดสินใจทางธุรกิจ หรือเหตุสุดวิสัยที่อยู่นอกเหนือการควบคุม',
    ]
  },
  {
    title:'9. กฎหมายที่บังคับใช้',
    body:[
      'เงื่อนไขการใช้งานนี้อยู่ภายใต้กฎหมายไทย ข้อพิพาทใด ๆ ให้อยู่ในเขตอำนาจศาลไทย',
    ]
  },
  {
    title:'10. ติดต่อเรา',
    body:[
      'หากมีคำถามเกี่ยวกับเงื่อนไขการใช้งาน ติดต่อเราได้ที่ LINE: @horcare ทีมงานพร้อมตอบภายใน 2 วันทำการ',
    ]
  },
]

export default function Terms() {
  useEffect(() => {
    document.title = 'เงื่อนไขการใช้งาน — HorCare'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ background:'#fff', minHeight:'100vh' }}>
      <PageHeader />
      <main style={{ maxWidth:760, margin:'0 auto', padding:'56px 2rem 100px' }}>
        <div style={{ marginBottom:40 }}>
          <span style={{ fontFamily:'Kanit,sans-serif', fontSize:11, fontWeight:600, color:'#F57C00', background:'rgba(245,124,0,0.08)', padding:'4px 12px', borderRadius:100 }}>
            เงื่อนไขการใช้งาน
          </span>
          <h1 style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:'clamp(1.6rem,3vw,2.2rem)', color:'#1A2433', marginTop:12, marginBottom:6, lineHeight:1.3 }}>
            ข้อตกลงในการใช้บริการ HorCare
          </h1>
          <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:14, color:'#90A4AE' }}>อัปเดตล่าสุด: 1 มิถุนายน 2026</p>
        </div>

        <div style={{ background:'linear-gradient(135deg,rgba(245,124,0,0.05),rgba(255,152,0,0.05))', border:'1px solid rgba(245,124,0,0.18)', borderRadius:12, padding:'16px 20px', marginBottom:40 }}>
          <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:14, color:'#374151', lineHeight:1.8 }}>
            โปรดอ่านเงื่อนไขนี้อย่างละเอียดก่อนใช้งาน HorCare การใช้งานระบบถือว่าคุณยอมรับข้อตกลงทุกข้อ
          </p>
        </div>

        {SECTIONS.map((s, i) => (
          <section key={i} style={{ marginBottom:36 }}>
            <h2 style={{ fontFamily:'Kanit,sans-serif', fontWeight:600, fontSize:'1.05rem', color:'#1A2433', marginBottom:12, paddingBottom:8, borderBottom:'1px solid #F3F4F6' }}>
              {s.title}
            </h2>
            {s.body.map((p, j) => (
              <p key={j} style={{ fontFamily:'Sarabun,sans-serif', fontSize:14.5, color:'#374151', lineHeight:1.85, marginBottom:10 }}>{p}</p>
            ))}
          </section>
        ))}

        <div style={{ borderTop:'1px solid #F3F4F6', paddingTop:32, marginTop:8, display:'flex', gap:16, flexWrap:'wrap' }}>
          <a href="/" style={{ fontFamily:'Kanit,sans-serif', fontWeight:600, fontSize:14, color:'#00B8A2', textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
            ← กลับหน้าหลัก
          </a>
          <a href="/privacy" style={{ fontFamily:'Kanit,sans-serif', fontWeight:600, fontSize:14, color:'#546E7A', textDecoration:'none' }}>
            นโยบายความเป็นส่วนตัว →
          </a>
        </div>
      </main>
      <footer style={{ background:'#1A2433', padding:'24px 2rem', textAlign:'center' }}>
        <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:12, color:'#546E7A' }}>© 2026 HorCare. สงวนลิขสิทธิ์</p>
      </footer>
    </div>
  )
}
