import { useEffect } from 'react'

const LINE_URL = 'https://lin.ee/9RxwIrM'

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
    title:'1. ข้อมูลที่เราเก็บรวบรวม',
    body:[
      'HorCare เก็บรวบรวมข้อมูลที่จำเป็นต่อการให้บริการระบบจัดการหอพักเท่านั้น ได้แก่ ข้อมูลส่วนบุคคลของเจ้าของหอพัก (ชื่อ อีเมล เบอร์โทรศัพท์) ข้อมูลหอพัก (ชื่อ ที่อยู่ จำนวนห้อง) และข้อมูลของผู้เช่าที่เจ้าของหอพักบันทึกเข้าระบบ',
      'เราอาจเก็บข้อมูลการใช้งานระบบโดยอัตโนมัติ เช่น IP address ประเภทเบราว์เซอร์ และหน้าที่เข้าใช้งาน เพื่อวัตถุประสงค์ในการพัฒนาและปรับปรุงประสบการณ์การใช้งาน',
    ]
  },
  {
    title:'2. วัตถุประสงค์การใช้ข้อมูล',
    body:[
      'ข้อมูลที่เก็บรวบรวมถูกนำไปใช้เพื่อ: (1) ให้บริการระบบจัดการหอพักตามที่ตกลง (2) ออกใบแจ้งหนี้และดำเนินการชำระเงิน (3) ส่งการแจ้งเตือนที่เกี่ยวข้องกับบัญชีและการใช้งาน (4) ให้การสนับสนุนและช่วยเหลือทางเทคนิค (5) ปรับปรุงและพัฒนาบริการของเรา',
    ]
  },
  {
    title:'3. การเปิดเผยข้อมูลต่อบุคคลที่สาม',
    body:[
      'HorCare จะไม่ขาย ให้เช่า หรือเปิดเผยข้อมูลส่วนบุคคลของคุณต่อบุคคลที่สามโดยไม่ได้รับอนุญาต ยกเว้นกรณีที่จำเป็นต่อการให้บริการ เช่น ผู้ให้บริการชำระเงิน ผู้ให้บริการโครงสร้างพื้นฐาน Cloud หรือเมื่อกฎหมายกำหนดให้ต้องเปิดเผย',
    ]
  },
  {
    title:'4. ความปลอดภัยของข้อมูล',
    body:[
      'เราใช้มาตรการรักษาความปลอดภัยระดับสูง ได้แก่ การเข้ารหัส SSL/TLS สำหรับการส่งข้อมูลทุกชนิด การสำรองข้อมูลอัตโนมัติทุกวัน และการควบคุมการเข้าถึงข้อมูลเฉพาะผู้ที่ได้รับอนุญาตเท่านั้น',
    ]
  },
  {
    title:'5. สิทธิ์ของเจ้าของข้อมูลตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)',
    body:[
      'คุณมีสิทธิ์ในการ: เข้าถึงข้อมูลส่วนบุคคลของคุณ, แก้ไขข้อมูลที่ไม่ถูกต้อง, ขอลบข้อมูลออกจากระบบ, คัดค้านการประมวลผลข้อมูล และขอรับสำเนาข้อมูลในรูปแบบที่สามารถนำไปใช้งานต่อได้',
      'หากต้องการใช้สิทธิ์เหล่านี้ ติดต่อเราผ่าน LINE @horcare ทีมงานพร้อมดำเนินการภายใน 30 วัน',
    ]
  },
  {
    title:'6. นโยบายคุกกี้',
    body:[
      'เราใช้คุกกี้เพื่อจดจำการเข้าสู่ระบบและการตั้งค่าของคุณ คุณสามารถปิดการใช้งานคุกกี้ในเบราว์เซอร์ได้ แต่อาจส่งผลต่อการใช้งานระบบบางส่วน',
    ]
  },
  {
    title:'7. การเปลี่ยนแปลงนโยบาย',
    body:[
      'HorCare ขอสงวนสิทธิ์ในการปรับปรุงนโยบายนี้ได้ตลอดเวลา การเปลี่ยนแปลงสำคัญจะแจ้งล่วงหน้าผ่านอีเมลหรือการแจ้งเตือนในระบบอย่างน้อย 30 วันก่อนมีผล',
    ]
  },
  {
    title:'8. ติดต่อเรา',
    body:[
      `หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว ติดต่อเราได้ที่ LINE: @horcare หรือผ่านช่องทางติดต่อบนเว็บไซต์ ทีมงานพร้อมตอบภายใน 2 วันทำการ`,
    ]
  },
]

export default function Privacy() {
  useEffect(() => {
    document.title = 'นโยบายความเป็นส่วนตัว — HorCare'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ background:'#fff', minHeight:'100vh' }}>
      <PageHeader />
      <main style={{ maxWidth:760, margin:'0 auto', padding:'56px 2rem 100px' }}>
        <div style={{ marginBottom:40 }}>
          <span style={{ fontFamily:'Kanit,sans-serif', fontSize:11, fontWeight:600, color:'#1565C0', background:'rgba(21,101,192,0.08)', padding:'4px 12px', borderRadius:100 }}>
            นโยบายความเป็นส่วนตัว
          </span>
          <h1 style={{ fontFamily:'Kanit,sans-serif', fontWeight:700, fontSize:'clamp(1.6rem,3vw,2.2rem)', color:'#1A2433', marginTop:12, marginBottom:6, lineHeight:1.3 }}>
            HorCare ใส่ใจข้อมูลของคุณ
          </h1>
          <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:14, color:'#90A4AE' }}>อัปเดตล่าสุด: 1 มิถุนายน 2026</p>
        </div>

        <div style={{ background:'linear-gradient(135deg,rgba(21,101,192,0.05),rgba(0,184,162,0.05))', border:'1px solid rgba(0,184,162,0.15)', borderRadius:12, padding:'16px 20px', marginBottom:40 }}>
          <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:14, color:'#374151', lineHeight:1.8 }}>
            เอกสารนี้อธิบายวิธีที่ HorCare เก็บรวบรวม ใช้ และปกป้องข้อมูลของคุณ ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
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
          <a href="/terms" style={{ fontFamily:'Kanit,sans-serif', fontWeight:600, fontSize:14, color:'#546E7A', textDecoration:'none' }}>
            เงื่อนไขการใช้งาน →
          </a>
        </div>
      </main>
      <footer style={{ background:'#1A2433', padding:'24px 2rem', textAlign:'center' }}>
        <p style={{ fontFamily:'Sarabun,sans-serif', fontSize:12, color:'#546E7A' }}>© 2026 HorCare. สงวนลิขสิทธิ์</p>
      </footer>
    </div>
  )
}
