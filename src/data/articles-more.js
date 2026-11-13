// Articles added November 2026. Each one carries its English copy in `en`, which translate.js
// registers automatically, so new posts never need a separate entry in i18n/en.js.
// Claims about HorCare follow src/components/Pricing/PricingPage.tsx in the app: never cite a [soon] feature.

const OCPB = { name: 'OCPB: Residential rental contracts and utility charges', url: 'https://www.ocpb.go.th/news_view_en.php?nid=17156' }

const C = {
  horcare: { cc: '#173c63', cb: 'rgba(23,60,99,0.1)', grad: 'linear-gradient(135deg,#E8F5FF,#FFF0DC)' },
  tips: { cc: '#2DC76D', cb: 'rgba(45,199,109,0.1)' },
  tech: { cc: '#7B1FA2', cb: 'rgba(123,31,162,0.1)' },
  law: { cc: '#1565C0', cb: 'rgba(21,101,192,0.1)' },
  pm: { cc: '#416448', cb: '#eaf0e3', grad: 'none' },
}

export const NEW_ARTICLES = [
  {
    slug: 'why-horcare',
    cat: 'รู้จัก HorCare',
    ...C.horcare,
    title: 'ทำไมต้อง HorCare? ระบบจัดการหอพักที่ทำมาเพื่อรอบเก็บเงินรายเดือน',
    desc: '6 เหตุผลที่เจ้าของหอพักและอพาร์ตเมนต์เลือก HorCare ตั้งแต่ออกบิลทั้งตึก ส่งบิลทาง LINE ตรวจสลิปด้วย AI ไปจนถึงทีมช่วยย้ายข้อมูลจาก Excel และใครที่อาจยังไม่เหมาะ',
    date: '14 พฤศจิกายน 2026',
    dateISO: '2026-11-14',
    min: '6',
    keywords: ['ทำไมต้อง HorCare', 'ระบบจัดการหอพัก', 'โปรแกรมหอพัก', 'ระบบจัดการอพาร์ตเมนต์', 'โปรแกรมจัดการหอพักฟรี'],
    body: [
      {
        h: 'ปัญหาจริงของเจ้าของหอ ไม่ใช่การขาดซอฟต์แวร์',
        p: 'เจ้าของหอพักส่วนใหญ่ไม่ได้ขาดเครื่องมือ มี Excel มีสมุด มี LINE อยู่แล้ว ปัญหาคือข้อมูลกระจายอยู่หลายที่ และช่วงต้นเดือนต้องทำงานซ้ำเดิมทุกครั้ง จดมิเตอร์ คิดบิลทีละห้อง ส่งบิลทีละแชต แล้วไล่เปิดสลิปเทียบกับยอด\n\nHorCare เริ่มออกแบบจากรอบงานนี้ ไม่ได้เริ่มจากรายการฟีเจอร์ ทุกอย่างในระบบจึงตอบคำถามเดียวกันว่า เดือนนี้เก็บเงินครบหรือยัง และห้องไหนยังค้าง',
      },
      {
        h: '1. ทำมาเพื่อหอพักและอพาร์ตเมนต์โดยเฉพาะ',
        p: 'ระบบบริหารอสังหาฯ หลายตัวออกแบบมาให้ครอบคลุมทุกอย่าง จนเจ้าของหอต้องตั้งค่าเยอะกว่าจะใช้ได้ HorCare ตั้งต้นจากหอพักและอพาร์ตเมนต์รายเดือน ห้อง ผู้เช่า สัญญา มิเตอร์ และบิล จึงเชื่อมกันตั้งแต่วันแรก\n\nถ้าวันหนึ่งคุณมีคอนโด บ้านเช่า หรือพื้นที่เช่าประเภทอื่นเพิ่ม ก็ดูแลรวมในบัญชีเดียวกันได้ โดยไม่ต้องเปลี่ยนระบบ',
      },
      {
        h: '2. ออกบิลทั้งตึกในรอบเดียว',
        p: 'กรอกเลขมิเตอร์เป็นตารางทั้งชั้น หรือในแพ็กเกจ HorCare Pro ถ่ายรูปมิเตอร์แล้วให้ AI อ่านเลขให้ ระบบคำนวณค่าเช่า ค่าน้ำ ค่าไฟ และค่าส่วนกลางครบทุกห้อง ลดการพิมพ์ซ้ำและความผิดพลาดจากเครื่องคิดเลข\n\nเมื่อเลขมิเตอร์ผิดปกติ เช่น น้อยกว่าเดือนก่อน ควรตรวจก่อนออกบิลเสมอ เพราะบิลที่ผิดหนึ่งใบมักกินเวลามากกว่าทำบิลใหม่ทั้งตึก',
      },
      {
        h: '3. ส่งบิลและรับเงินผ่าน LINE ที่ผู้เช่าใช้อยู่แล้ว',
        p: 'ในแพ็กเกจ HorCare Pro บิลถูกส่งผ่าน LINE Official Account ของหอพร้อม QR โอนเงิน ผู้เช่าไม่ต้องติดตั้งแอปใหม่ เมื่อส่งสลิปกลับมา AI ช่วยตรวจยอดและบัญชีผู้รับ ห้องที่จ่ายแล้วขึ้นสถานะทันที ส่วนห้องที่ยังไม่จ่ายได้รับการแจ้งเตือนอัตโนมัติ\n\nผลคือเจ้าของไม่ต้องเปิดแชตทีละห้องเพื่อไล่ดูว่าใครโอนแล้ว',
      },
      {
        h: '4. ย้ายมาจาก Excel ได้โดยไม่ต้องพิมพ์ใหม่',
        p: 'เหตุผลอันดับหนึ่งที่เจ้าของหอยังไม่เปลี่ยนระบบคือกลัวต้องกรอกข้อมูลใหม่ทั้งหมด แพ็กเกจฟรีนำเข้าห้องเองได้จากเทมเพลต Excel ส่วนแพ็กเกจ HorCare Pro และ Business มีทีมช่วยนำเข้าข้อมูลและเซ็ตอัพให้ ส่งไฟล์ที่มีอยู่ทาง LINE แล้วตรวจข้อมูลด้วยกันก่อนออกบิลเดือนแรก',
      },
      {
        h: '5. ราคาชัดเจน และเริ่มฟรีได้จริง',
        p: '1. แพ็กเกจ Free ฿0 ไม่มีวันหมดอายุ สูงสุด 250 ห้อง จัดการห้อง ผู้เช่า สัญญา มิเตอร์ บิล และใบเสร็จ\n2. HorCare Pro ฿399 ต่อเดือน หรือ ฿2,990 ต่อปี ไม่จำกัดห้อง สูงสุด 10 อาคาร เพิ่ม LINE อัตโนมัติ QR ในบิล AI ตรวจสลิปและอ่านมิเตอร์\n3. Business ฿679 ต่อเดือน หรือ ฿5,000 ต่อปี ไม่จำกัดสาขา ทีมงานหลายคนในบัญชีเดียว และทีมย้ายข้อมูลทุกสาขาให้\n4. ทดลอง HorCare Pro ฟรี 30 วัน ครบแล้วกลับเป็นแพ็กเกจฟรีเอง ไม่ตัดเงินอัตโนมัติ\n\nราคายังไม่รวม VAT ตรวจราคาล่าสุดได้ที่หน้าแพ็กเกจ',
      },
      {
        h: '6. คุยกับคนที่สร้างระบบได้โดยตรง',
        p: 'HorCare ดูแลลูกค้าผ่าน LINE @127qwwfi คุยกับทีมที่พัฒนาระบบเอง ไม่ผ่านคอลเซ็นเตอร์ ข้อมูลรับส่งผ่าน HTTPS เก็บบน Google Cloud (Firebase) และผู้ดูแลแต่ละคนเห็นเฉพาะอาคารที่ได้รับสิทธิ์ ความเห็นจากเจ้าของหอถูกนำไปพัฒนาระบบต่อเนื่อง',
      },
      {
        h: 'HorCare อาจยังไม่เหมาะกับใคร',
        p: 'ถ้าคุณมีห้องเช่าไม่กี่ห้องและเก็บเงินสดทั้งหมด สมุดหนึ่งเล่มอาจพอแล้ว ถ้าธุรกิจของคุณต้องการระบบบัญชีขององค์กรขนาดใหญ่ที่เชื่อมกับ ERP เฉพาะทาง ควรคุยกับทีมก่อนเพื่อดูว่าตรงความต้องการหรือไม่\n\nวิธีตัดสินใจที่ดีที่สุดคือลองกับข้อมูลจริงหนึ่งตึก จองเดโมกับทีมทาง LINE หรือเริ่มแพ็กเกจฟรีแล้วออกบิลเดือนแรกดู',
      },
    ],
    related: ['excel-vs-dormitory-software', 'free-dormitory-management-software'],
    en: {
      cat: 'About HorCare',
      title: 'Why HorCare? Dormitory software built around the monthly billing round',
      desc: 'Six reasons dormitory and apartment owners choose HorCare, from billing a whole building and LINE billing to AI slip checks and data import from Excel, plus who it may not suit yet.',
      date: 'November 14, 2026',
      keywords: ['Why HorCare', 'dormitory management system', 'dormitory software', 'apartment management system', 'free dormitory management software'],
      body: [
        { h: 'Owners don’t lack software. They lack one place for it.', p: 'Most dormitory owners already have tools: Excel, a ledger book, LINE. The trouble is that data lives in many places, and the start of every month means the same repeated work: reading meters, calculating each bill, sending bills chat by chat, then opening slips to match amounts.\n\nHorCare was designed from that round, not from a feature list. Everything in it answers one question: have we collected everything this month, and which rooms still owe?' },
        { h: '1. Built specifically for dormitories and apartments', p: 'Many property platforms try to cover everything, so a dormitory owner has to configure a lot before it works. HorCare starts from monthly-rent dormitories and apartments, so rooms, tenants, contracts, meters and bills are connected from day one.\n\nIf you later add condos, rental homes or other rental spaces, you can manage them in the same account without switching systems.' },
        { h: '2. Bill the whole building in one round', p: 'Type meter readings into a table for a whole floor, or on HorCare Pro, photograph the meter and let AI read it. The system calculates rent, water, electricity and common fees for every room, cutting re-typing and calculator mistakes.\n\nWhen a reading looks wrong, for example lower than last month, check it before billing. One wrong bill often costs more time than billing the whole building again.' },
        { h: '3. Bills and payments on the LINE tenants already use', p: 'On HorCare Pro, bills go out through your LINE Official Account with a payment QR, and tenants install nothing new. When a slip comes back, AI checks the amount and receiving account, paid rooms update instantly, and unpaid rooms get automatic reminders.\n\nYou no longer open every chat to see who has transferred.' },
        { h: '4. Move from Excel without re-typing', p: 'The top reason owners don’t switch is the fear of entering everything again. On Free you can import rooms yourself from the Excel template, and HorCare Pro and Business include data import and setup by our team. Send what you have on LINE, then review it together before the first month’s bills.' },
        { h: '5. Clear prices, and a free plan that is really free', p: '1. Free: ฿0, never expires, up to 250 rooms, with rooms, tenants, contracts, meters, bills and receipts\n2. HorCare Pro: ฿399 a month or ฿2,990 a year, unlimited rooms, up to 10 buildings, adding LINE automation, QR in bills, AI slip checks and meter reading\n3. Business: ฿679 a month or ฿5,000 a year, unlimited branches, several staff in one account, and data migration for every branch\n4. A 30-day free HorCare Pro trial that returns to Free on its own, with no automatic charge\n\nPrices exclude VAT. See the pricing section for the latest.' },
        { h: '6. Talk directly to the people who built it', p: 'HorCare supports customers on LINE @127qwwfi, where you talk to the team that builds the system, not a call centre. Traffic runs over HTTPS, data is stored on Google Cloud (Firebase), and each admin sees only the buildings they are granted. Owner feedback goes straight into ongoing development.' },
        { h: 'Who HorCare may not suit yet', p: 'If you have a handful of rooms and collect everything in cash, a single ledger book may be enough. If your business needs enterprise accounting tied to a specific ERP, talk to the team first to see whether it fits.\n\nThe best way to decide is to try it with one real building: book a demo on LINE, or start the Free plan and send your first month’s bills.' },
      ],
    },
  },
  {
    slug: 'free-dormitory-management-software',
    cat: 'เทคโนโลยี',
    ...C.tech,
    grad: 'linear-gradient(135deg,#F3E5F5,#E8EAF6)',
    title: 'โปรแกรมจัดการหอพักฟรี เลือกอย่างไร? 7 ข้อที่ต้องเช็กก่อนใช้',
    desc: 'โปรแกรมหอพักฟรีมีหลายแบบ ทั้งแบบจำกัดห้อง จำกัดเวลา และ Excel สำเร็จรูป บทความนี้สรุปข้อจำกัดที่ต้องดู เพื่อไม่ต้องย้ายระบบอีกรอบเมื่อหอโตขึ้น',
    date: '13 พฤศจิกายน 2026',
    dateISO: '2026-11-13',
    min: '6',
    keywords: ['โปรแกรมจัดการหอพักฟรี', 'โปรแกรมหอพักฟรี', 'ระบบหอพักฟรี', 'แอปจัดการหอพัก', 'โปรแกรมออกบิลหอพัก'],
    body: [
      {
        h: '"ฟรี" มีหลายแบบ',
        p: 'โปรแกรมจัดการหอพักที่ใช้ฟรีมักแบ่งได้เป็น 3 แบบ แบบแรกฟรีตลอดแต่จำกัดจำนวนห้องหรือฟีเจอร์ แบบที่สองฟรีช่วงทดลองแล้วต้องจ่าย และแบบที่สามคือไฟล์ Excel หรือ Google Sheets สำเร็จรูปที่ต้องดูแลสูตรเอง\n\nไม่มีแบบไหนผิด แต่ต้องรู้ว่ากำลังเลือกแบบใด เพราะต้นทุนที่แท้จริงอาจไม่ใช่ค่าสมาชิก แต่เป็นเวลาที่ต้องย้ายข้อมูลใหม่ในอนาคต',
      },
      {
        h: '7 ข้อที่ต้องเช็กก่อนเลือก',
        p: '1. ฟรีกี่ห้อง และเกินแล้วเกิดอะไรขึ้น ข้อมูลยังอยู่ไหม\n2. มีวันหมดอายุหรือไม่ หมดทดลองแล้วถูกตัดเงินอัตโนมัติหรือเปล่า\n3. ออกบิล ค่าน้ำค่าไฟ และใบเสร็จได้ครบในแพ็กเกจฟรีหรือไม่\n4. ส่งออกข้อมูลได้หรือไม่ ถ้าวันหนึ่งอยากย้ายออก\n5. นำเข้าข้อมูลห้องจาก Excel ได้หรือไม่\n6. ใช้บนมือถือได้สะดวกแค่ไหน\n7. มีช่องทางติดต่อคนจริงเมื่อมีปัญหาหรือไม่',
      },
      {
        h: 'ข้อจำกัดที่มักเจอในโปรแกรมฟรี',
        p: 'งานอัตโนมัติอย่างการส่งบิลผ่าน LINE การตรวจสลิป หรือการอ่านมิเตอร์จากรูป มักมีต้นทุนต่อการใช้งานจริง จึงมักอยู่ในแพ็กเกจเสียเงิน ส่วนไฟล์ Excel ฟรีมักไม่มีปัญหาเรื่องค่าใช้จ่าย แต่มีความเสี่ยงเรื่องสูตรเพี้ยน ไฟล์หลายเวอร์ชัน และไม่มีประวัติการแก้ไข\n\nให้ถามตัวเองว่างานไหนกินเวลาที่สุด ถ้าเป็นการคิดบิล แพ็กเกจฟรีที่ดีก็ช่วยได้มาก ถ้าเป็นการไล่ตามเงิน งานอัตโนมัติอาจคุ้มค่ากว่าค่าแพ็กเกจ',
      },
      {
        h: 'แพ็กเกจฟรีของ HorCare ทำอะไรได้บ้าง',
        p: 'HorCare Free ใช้ได้ไม่มีวันหมดอายุ รองรับสูงสุด 250 ห้อง จัดการห้องและข้อมูลผู้เช่า นำเข้าห้องจากเทมเพลต Excel บันทึกมิเตอร์น้ำและไฟ ออกบิลและใบแจ้งหนี้ สร้างสัญญาเช่าออนไลน์ และพิมพ์ใบเสร็จได้ ไม่ต้องผูกบัตรเครดิต\n\nเมื่ออยากให้ระบบส่งบิลทาง LINE และตรวจสลิปให้ ทดลอง HorCare Pro ได้ฟรี 30 วัน ครบแล้วบัญชีกลับเป็นแพ็กเกจฟรีเอง ข้อมูลยังอยู่ครบ',
      },
      {
        h: 'ทดลองให้ได้คำตอบใน 1 รอบบิล',
        p: 'อย่าทดลองด้วยการกดดูเมนู ให้นำห้องจริง 5–10 ห้องมาทำครบรอบ ตั้งแต่ใส่ผู้เช่า จดมิเตอร์ ออกบิล ไปจนถึงบันทึกการรับชำระ แล้วจับเวลาเทียบกับวิธีเดิม ตัวเลขนี้จะบอกได้ชัดกว่ารีวิวใด ๆ ว่าโปรแกรมไหนเหมาะกับหอของคุณ',
      },
    ],
    related: ['excel-vs-dormitory-software', 'why-horcare'],
    en: {
      cat: 'Technology',
      title: 'How to choose free dormitory management software: 7 checks first',
      desc: 'Free dormitory software comes in several forms: room-limited, time-limited and ready-made Excel. Here are the limits to check so you don’t have to migrate again as your building grows.',
      date: 'November 13, 2026',
      keywords: ['free dormitory management software', 'free dormitory software', 'free dormitory system', 'dormitory management app', 'dormitory billing software'],
      body: [
        { h: '“Free” comes in several kinds', p: 'Free dormitory software usually falls into three kinds: free forever but limited in rooms or features, free during a trial and then paid, or a ready-made Excel or Google Sheets file whose formulas you maintain yourself.\n\nNone is wrong, but know which one you’re choosing. The real cost is often not the subscription but the time to migrate your data again later.' },
        { h: '7 checks before you choose', p: '1. How many rooms are free, and what happens past the limit? Does your data stay?\n2. Does it expire, and are you charged automatically after a trial?\n3. Can the free plan handle bills, water and electricity, and receipts?\n4. Can you export your data if you ever want to leave?\n5. Can you import rooms from Excel?\n6. How easy is it to use on a phone?\n7. Can you reach a real person when something goes wrong?' },
        { h: 'Limits you’ll often meet in free software', p: 'Automation such as LINE billing, slip checks or reading meters from photos has a real per-use cost, so it usually sits in paid plans. Free Excel files cost nothing but risk broken formulas, many file versions and no edit history.\n\nAsk which task takes you the most time. If it’s calculating bills, a good free plan helps a lot. If it’s chasing payments, automation may be worth more than the plan costs.' },
        { h: 'What HorCare’s free plan does', p: 'HorCare Free never expires and handles up to 250 rooms: rooms and tenant records, room import from an Excel template, water and electricity meter readings, bills and invoices, online lease contracts and printed receipts. No credit card needed.\n\nWhen you want bills sent on LINE and slips checked for you, try HorCare Pro free for 30 days. Afterwards the account returns to Free on its own, with all data intact.' },
        { h: 'Get your answer in one billing round', p: 'Don’t test by clicking through menus. Take 5–10 real rooms through a full round, from adding tenants and reading meters to billing and recording payments, and time it against your current method. That number will tell you more clearly than any review which software suits your building.' },
      ],
    },
  },
  {
    slug: 'apartment-management-system',
    cat: 'Property Management',
    ...C.pm,
    title: 'ระบบจัดการอพาร์ตเมนต์ ต่างจากระบบหอพักอย่างไร และควรมีอะไรบ้าง',
    desc: 'อพาร์ตเมนต์มีผู้เช่าระยะยาว สัญญาหลากหลาย และค่าใช้จ่ายหลายรายการ บทความนี้สรุปความสามารถที่ระบบจัดการอพาร์ตเมนต์ควรมี พร้อมเช็กลิสต์ก่อนเลือกใช้',
    date: '12 พฤศจิกายน 2026',
    dateISO: '2026-11-12',
    min: '5',
    keywords: ['ระบบจัดการอพาร์ตเมนต์', 'โปรแกรมอพาร์ทเม้นท์', 'โปรแกรมจัดการอพาร์ตเมนต์', 'ระบบบริหารอพาร์ตเมนต์', 'ออกบิลอพาร์ตเมนต์'],
    body: [
      {
        h: 'หอพักกับอพาร์ตเมนต์ ต่างกันตรงไหนในมุมการจัดการ',
        p: 'ในการพูดทั่วไป สองคำนี้มักใช้แทนกัน แต่ในงานบริหาร อพาร์ตเมนต์มักมีผู้เช่าเป็นคนทำงานหรือครอบครัว อยู่ยาวกว่า ห้องมีหลายขนาด ค่าเช่าต่างกันตามชั้นและวิว และมีค่าใช้จ่ายเพิ่ม เช่น ค่าที่จอดรถ อินเทอร์เน็ต หรือค่าส่วนกลาง\n\nส่วนประเภทกิจการตามกฎหมายเป็นอีกเรื่อง ควรตรวจกับหน่วยงานในพื้นที่ ไม่ควรสรุปจากชื่อที่เรียกเท่านั้น',
      },
      {
        h: 'ความสามารถที่ระบบจัดการอพาร์ตเมนต์ควรมี',
        p: '1. ตั้งค่าเช่าแยกตามห้อง และเพิ่มรายการเรียกเก็บได้หลายแบบ\n2. เก็บสัญญา เงินประกัน และวันครบสัญญา พร้อมเตือนก่อนหมด\n3. จดมิเตอร์และออกบิลทั้งอาคารในรอบเดียว\n4. ส่งบิลและรับสลิปในช่องทางที่ผู้เช่าใช้\n5. รับเรื่องแจ้งซ่อมและติดตามสถานะ\n6. ดูรายรับ ห้องว่าง และยอดค้างแยกตามอาคาร',
      },
      {
        h: 'ผู้เช่าระยะยาว ต้องการประสบการณ์ที่ดีกว่า',
        p: 'ผู้เช่าอพาร์ตเมนต์มักคาดหวังความเป็นมืออาชีพ บิลที่อ่านง่าย มีรายการชัด ช่องทางจ่ายเงินสะดวก และการแจ้งซ่อมที่มีคนตอบ สิ่งเหล่านี้ส่งผลต่อการต่อสัญญาโดยตรง ห้องว่างหนึ่งเดือนมักแพงกว่าค่าระบบทั้งปี\n\nการส่งบิลผ่าน LINE พร้อม QR และพอร์ทัลที่ผู้เช่าเปิดดูประวัติบิลได้เอง ช่วยลดคำถามซ้ำและทำให้ภาพลักษณ์ของอาคารดูน่าเชื่อถือขึ้น',
      },
      {
        h: 'มีหลายอาคาร ต้องคิดเรื่องอะไรเพิ่ม',
        p: 'เมื่อมีมากกว่าหนึ่งอาคาร ควรเลือกระบบที่สลับดูแต่ละอาคารได้ และแยกสิทธิ์ผู้ดูแลตามอาคาร HorCare Pro รองรับสูงสุด 10 อาคารแบบไม่จำกัดห้อง ส่วน Business ไม่จำกัดสาขา ให้ทีมงาน ช่าง และแม่บ้านดูแลหลายสาขาในบัญชีเดียว และดูยอดทุกสาขาผ่าน LINE ได้',
      },
      {
        h: 'เริ่มจากอาคารเดียวก่อน',
        p: 'ย้ายอาคารที่ข้อมูลเป็นระเบียบที่สุดเข้าระบบก่อน ทำครบหนึ่งรอบบิล แล้วค่อยขยายไปอาคารอื่น วิธีนี้ช่วยให้ทีมคุ้นกับระบบโดยไม่กระทบการเก็บเงินทั้งหมดในเดือนเดียว',
      },
    ],
    related: ['property-management-platform-guide', 'why-horcare'],
    en: {
      cat: 'Property Management',
      title: 'Apartment management systems: how they differ from dormitory software',
      desc: 'Apartments have long-stay tenants, varied contracts and several charge types. Here is what apartment management software should do, with a checklist before you choose.',
      date: 'November 12, 2026',
      keywords: ['apartment management system', 'apartment software', 'apartment management software', 'apartment administration system', 'apartment billing'],
      body: [
        { h: 'Dormitory vs apartment: the management difference', p: 'In everyday speech the two words are used interchangeably, but in practice apartments usually house working people or families who stay longer, rooms vary in size, rent differs by floor and view, and there are extra charges such as parking, internet or common fees.\n\nThe legal business category is a separate matter. Check it with your local authority rather than relying on the name.' },
        { h: 'What apartment management software should do', p: '1. Set rent per room and add several kinds of charges\n2. Keep contracts, deposits and end dates, with reminders before expiry\n3. Read meters and bill the whole building in one round\n4. Send bills and receive slips on the channel tenants use\n5. Take repair requests and track their status\n6. Show income, vacancies and balances per building' },
        { h: 'Long-stay tenants expect a better experience', p: 'Apartment tenants expect professionalism: readable bills with clear items, convenient payment and repair requests that get answered. These affect renewals directly. One empty month often costs more than a year of software.\n\nBills on LINE with a payment QR, and a portal where tenants can see their own bill history, cut repeated questions and make the building look more trustworthy.' },
        { h: 'Several buildings: what else to plan for', p: 'With more than one building, choose a system that switches between buildings and scopes admins per building. HorCare Pro supports up to 10 buildings with unlimited rooms, and Business has unlimited branches, lets staff, technicians and housekeepers work across branches in one account, and shows every branch’s totals on LINE.' },
        { h: 'Start with one building', p: 'Move your best-organised building first, run one full billing round, then expand. Your team gets used to the system without putting the whole month’s collection at risk.' },
      ],
    },
  },
  {
    slug: 'dormitory-security-deposit',
    cat: 'กฎหมาย',
    ...C.law,
    grad: 'linear-gradient(135deg,#E3F2FD,#E0F7FA)',
    title: 'เงินประกันหอพัก: เก็บ คืน และหักอย่างไรให้ไม่มีปัญหากับผู้เช่า',
    desc: 'วิธีจัดการเงินประกันหอพักอย่างเป็นระบบ ตั้งแต่ระบุเงื่อนไขในสัญญา บันทึกสภาพห้อง จนถึงคืนเงินพร้อมรายการหัก และจุดที่ต้องตรวจข้อกำหนดของ สคบ.',
    date: '11 พฤศจิกายน 2026',
    dateISO: '2026-11-11',
    min: '5',
    keywords: ['เงินประกันหอพัก', 'คืนเงินประกันหอพัก', 'เงินมัดจำหอพัก', 'หักเงินประกันห้องเช่า', 'สัญญาเช่าหอพัก'],
    body: [
      {
        h: 'เงินประกันคือเรื่องที่ผู้เช่าร้องเรียนบ่อยที่สุด',
        p: 'ข้อพิพาทระหว่างเจ้าของหอกับผู้เช่ามักเกิดตอนย้ายออก ผู้เช่าคาดว่าจะได้เงินคืนเต็ม เจ้าของเห็นความเสียหายที่ต้องซ่อม ต้นเหตุส่วนใหญ่ไม่ใช่ความไม่ซื่อสัตย์ แต่เป็นการไม่มีหลักฐานและไม่ได้ตกลงเงื่อนไขให้ชัดตั้งแต่วันแรก',
      },
      {
        h: 'ตรวจข้อกำหนดก่อนกำหนดจำนวนและเงื่อนไข',
        p: 'ข้อกำหนดเรื่องจำนวนเงินประกัน ระยะเวลาคืนเงิน และสิ่งที่หักได้ อาจขึ้นกับประเภทกิจการและจำนวนห้องที่ให้เช่า อย่าคัดลอกตัวเลขจากตัวอย่างบนอินเทอร์เน็ตไปใช้ สคบ. มีข้อมูลเรื่องสัญญาเช่าอาคารเพื่ออยู่อาศัยให้ใช้เป็นจุดเริ่มตรวจสอบ และหากมีเงื่อนไขเฉพาะควรให้ผู้เชี่ยวชาญตรวจสัญญา',
      },
      {
        h: 'เขียนเงื่อนไขในสัญญาให้ชัด',
        p: '1. จำนวนเงินประกัน และแยกจากค่าเช่าล่วงหน้าให้ชัด\n2. กรณีใดบ้างที่หักเงินประกันได้ เช่น ค่าเสียหายเกินการใช้งานปกติ หรือยอดค้างชำระ\n3. ระยะเวลาและช่องทางคืนเงิน\n4. ขั้นตอนตรวจห้องตอนย้ายออก และใครต้องอยู่ด้วย',
      },
      {
        h: 'หลักฐานที่ช่วยได้มากที่สุด: บันทึกวันย้ายเข้า',
        p: 'ถ่ายรูปทุกมุมของห้องในวันย้ายเข้า รวมถึงผนัง พื้น เฟอร์นิเจอร์ เครื่องใช้ไฟฟ้า และเลขมิเตอร์ ให้ผู้เช่าตรวจและรับทราบ แล้วเก็บไว้กับข้อมูลห้อง ตอนย้ายออกให้ถ่ายมุมเดียวกันเทียบ การมีรูปคู่กันช่วยให้คุยกันด้วยข้อเท็จจริง ไม่ใช่ความจำ\n\nการสึกหรอจากการใช้งานปกติ เช่น สีซีดตามเวลา ต่างจากความเสียหาย ควรแยกให้ชัดก่อนหัก',
      },
      {
        h: 'คืนเงินพร้อมรายการที่ตรวจสอบได้',
        p: 'เมื่อคืนเงินประกัน ให้ส่งรายการหักเป็นลายลักษณ์อักษร ระบุสาเหตุ จำนวนเงิน และแนบรูปประกอบ คิดค่าน้ำค่าไฟงวดสุดท้ายจากเลขมิเตอร์วันย้ายออก ในระบบจัดการหอพักอย่าง HorCare ข้อมูลสัญญา เงินประกัน มิเตอร์ และยอดค้างอยู่ในห้องเดียวกัน จึงสรุปยอดคืนได้เร็วและอธิบายผู้เช่าได้ทันที',
      },
    ],
    sources: [OCPB],
    related: ['rental-contract-guide', 'move-in-move-out-checklist'],
    en: {
      cat: 'Legal',
      title: 'Dormitory security deposits: collecting, refunding and deducting without disputes',
      desc: 'How to handle dormitory deposits systematically, from contract terms and room condition records to refunds with itemised deductions, and what to check against OCPB rules.',
      date: 'November 11, 2026',
      keywords: ['dormitory security deposit', 'dormitory deposit refund', 'rental deposit', 'deposit deductions', 'dormitory lease contract'],
      body: [
        { h: 'Deposits are the most common tenant complaint', p: 'Disputes between owners and tenants usually happen at move-out: the tenant expects a full refund, the owner sees damage to repair. The cause is rarely dishonesty. It is missing evidence and terms that were never made clear on day one.' },
        { h: 'Check the rules before setting amounts and terms', p: 'Rules on deposit amounts, refund timing and what may be deducted can depend on your business category and the number of rooms let. Don’t copy figures from examples online. The OCPB publishes information on residential lease contracts as a starting point, and if your terms are unusual, have a professional review the contract.' },
        { h: 'Write clear terms into the contract', p: '1. The deposit amount, kept clearly separate from rent paid in advance\n2. When deductions are allowed, such as damage beyond normal use or unpaid balances\n3. Refund timing and method\n4. The move-out inspection process and who attends' },
        { h: 'Your best evidence: the move-in record', p: 'Photograph every angle of the room on move-in day, including walls, floors, furniture, appliances and meter readings. Have the tenant check and acknowledge them, then keep them with the room record. At move-out, photograph the same angles to compare. Matching photos let you discuss facts, not memories.\n\nNormal wear, such as paint fading over time, is different from damage. Separate the two before deducting.' },
        { h: 'Refund with an itemised, checkable list', p: 'When refunding, send a written list of deductions with the reason, amount and supporting photos. Calculate the final water and electricity from the move-out meter reading. In dormitory software such as HorCare, the contract, deposit, meters and balance sit on the same room, so the refund is quick to work out and easy to explain.' },
      ],
    },
  },
  {
    slug: 'move-in-move-out-checklist',
    cat: 'เคล็ดลับ',
    ...C.tips,
    grad: 'linear-gradient(135deg,#E0FBF0,#FFF8E1)',
    title: 'เช็กลิสต์ย้ายเข้า-ย้ายออกหอพัก สำหรับเจ้าของ (ใช้ได้ทันที)',
    desc: 'ขั้นตอนรับผู้เช่าใหม่และคืนห้องแบบครบ ตั้งแต่เอกสาร กุญแจ เลขมิเตอร์ รูปสภาพห้อง จนถึงบิลงวดสุดท้าย ลดข้อพิพาทและห้องว่างระหว่างผู้เช่า',
    date: '10 พฤศจิกายน 2026',
    dateISO: '2026-11-10',
    min: '5',
    keywords: ['เช็กลิสต์ย้ายเข้าหอพัก', 'ย้ายออกหอพัก', 'ตรวจห้องก่อนย้ายออก', 'รับผู้เช่าใหม่', 'บริหารหอพัก'],
    body: [
      {
        h: 'ทำไมต้องมีเช็กลิสต์',
        p: 'วันย้ายเข้าและย้ายออกคือสองวันที่ข้อมูลของห้องเปลี่ยนมากที่สุด ทั้งผู้เช่า สัญญา เงินประกัน มิเตอร์ และสภาพห้อง ถ้าพลาดเพียงเลขมิเตอร์หนึ่งตัว บิลเดือนถัดไปจะผิดทันที เช็กลิสต์ช่วยให้ทุกคนในทีมทำแบบเดียวกันทุกครั้ง',
      },
      {
        h: 'เช็กลิสต์วันย้ายเข้า',
        p: '1. ตรวจเอกสารยืนยันตัวตนของผู้เช่า และเก็บเท่าที่จำเป็น\n2. ลงนามสัญญา และให้ผู้เช่าได้รับสำเนา\n3. รับเงินประกันและค่าเช่างวดแรก พร้อมออกใบเสร็จ\n4. จดเลขมิเตอร์น้ำและไฟ พร้อมถ่ายรูป\n5. ถ่ายรูปสภาพห้องและทรัพย์สินทุกชิ้น\n6. ส่งมอบกุญแจหรือคีย์การ์ด และบันทึกจำนวน\n7. เชื่อมผู้เช่ากับช่องทางรับบิล เช่น LINE ของหอ\n8. แจ้งกฎของอาคาร วันครบกำหนดชำระ และช่องทางแจ้งซ่อม',
      },
      {
        h: 'เช็กลิสต์วันย้ายออก',
        p: '1. ยืนยันวันย้ายออกตามระยะเวลาแจ้งล่วงหน้าในสัญญา\n2. จดเลขมิเตอร์วันสุดท้ายพร้อมรูป\n3. ตรวจห้องเทียบกับรูปวันย้ายเข้า โดยมีผู้เช่าอยู่ด้วยถ้าเป็นไปได้\n4. รับคืนกุญแจครบตามจำนวน\n5. ออกบิลงวดสุดท้าย รวมค่าน้ำค่าไฟถึงวันย้ายออก\n6. สรุปรายการหักเงินประกัน (ถ้ามี) เป็นลายลักษณ์อักษร\n7. คืนเงินประกันตามช่องทางและระยะเวลาที่ตกลง\n8. ปิดสถานะผู้เช่า และเปลี่ยนห้องเป็นห้องว่างพร้อมปล่อยเช่า',
      },
      {
        h: 'ลดวันห้องว่างระหว่างผู้เช่า',
        p: 'เมื่อผู้เช่าแจ้งย้ายออก ให้เริ่มประกาศห้องทันที ไม่ต้องรอห้องว่าง นัดซ่อมหรือทำความสะอาดล่วงหน้า และเตรียมรูปห้องไว้ใช้ซ้ำ ระบบที่เห็นวันครบสัญญาของทุกห้องช่วยให้วางแผนได้ก่อนหลายสัปดาห์',
      },
      {
        h: 'เก็บทุกอย่างไว้ในห้องเดียวกัน',
        p: 'ใน HorCare ข้อมูลผู้เช่า สัญญา เลขมิเตอร์ และบิลผูกกับห้อง เมื่อผู้เช่าย้ายออก ประวัติของห้องยังอยู่ครบ ผู้เช่าคนใหม่เริ่มจากเลขมิเตอร์ล่าสุดได้ทันที และทีมงานทุกคนดูข้อมูลชุดเดียวกัน',
      },
    ],
    related: ['dormitory-security-deposit', 'rental-contract-guide'],
    en: {
      cat: 'Tips',
      title: 'Dormitory move-in and move-out checklist for owners (ready to use)',
      desc: 'A complete process for new tenants and room handovers, from documents, keys and meter readings to condition photos and the final bill, cutting disputes and empty days between tenants.',
      date: 'November 10, 2026',
      keywords: ['dormitory move-in checklist', 'dormitory move-out', 'move-out room inspection', 'onboarding new tenants', 'dormitory management'],
      body: [
        { h: 'Why you need a checklist', p: 'Move-in and move-out are the two days when a room’s data changes most: tenant, contract, deposit, meters and condition. Miss a single meter reading and next month’s bill is wrong. A checklist keeps everyone on the team doing it the same way every time.' },
        { h: 'Move-in checklist', p: '1. Check the tenant’s ID and keep only what you need\n2. Sign the contract and give the tenant a copy\n3. Collect the deposit and first rent, and issue a receipt\n4. Record water and electricity meter readings with photos\n5. Photograph the room and every item in it\n6. Hand over keys or key cards and record how many\n7. Connect the tenant to your billing channel, such as the building’s LINE\n8. Explain building rules, the payment due date and how to request repairs' },
        { h: 'Move-out checklist', p: '1. Confirm the move-out date against the notice period in the contract\n2. Record the final meter readings with photos\n3. Inspect the room against the move-in photos, with the tenant present if possible\n4. Collect every key\n5. Issue the final bill, including water and electricity to move-out day\n6. Put any deposit deductions in writing\n7. Refund the deposit by the agreed method and time\n8. Close the tenancy and mark the room vacant and ready to let' },
        { h: 'Cut empty days between tenants', p: 'As soon as a tenant gives notice, start advertising the room. Don’t wait for it to empty. Book repairs or cleaning in advance and keep room photos ready to reuse. A system that shows every room’s contract end date lets you plan weeks ahead.' },
        { h: 'Keep everything on the same room', p: 'In HorCare, tenant records, contracts, meter readings and bills are tied to the room. When a tenant leaves, the room’s history stays intact, the next tenant starts from the latest meter reading, and the whole team sees the same data.' },
      ],
    },
  },
  {
    slug: 'rent-payment-qr-fake-slip',
    cat: 'เทคโนโลยี',
    ...C.tech,
    grad: 'linear-gradient(135deg,#EDE7F6,#E1F5FE)',
    title: 'รับค่าเช่าผ่าน QR และป้องกันสลิปปลอม: คู่มือสำหรับเจ้าของหอพัก',
    desc: 'สลิปโอนเงินปลอมเกิดขึ้นจริงและแยกด้วยตาได้ยาก บทความนี้สรุปวิธีรับค่าเช่าผ่าน QR ตรวจสลิปให้ถูกต้อง และลดงานไล่เทียบยอดทุกต้นเดือน',
    date: '9 พฤศจิกายน 2026',
    dateISO: '2026-11-09',
    min: '5',
    keywords: ['สลิปปลอม', 'ตรวจสลิปโอนเงิน', 'รับค่าเช่าผ่าน QR', 'QR พร้อมเพย์ค่าเช่า', 'ตรวจสลิปอัตโนมัติ'],
    body: [
      {
        h: 'ทำไมการโอนเงินค่าเช่าถึงต้องตรวจ',
        p: 'การโอนผ่านแอปธนาคารสะดวกทั้งผู้เช่าและเจ้าของ แต่ภาพสลิปเป็นเพียงรูปภาพ ซึ่งแก้ไขหรือใช้ซ้ำได้ ปัญหาที่พบบ่อยมีทั้งสลิปที่ถูกตัดต่อยอด สลิปเก่าที่ส่งซ้ำ และสลิปที่โอนเข้าบัญชีอื่น การดูด้วยตาอย่างเดียวจึงไม่พอ',
      },
      {
        h: 'สิ่งที่ต้องตรวจในสลิปทุกใบ',
        p: '1. ยอดเงินตรงกับบิลของห้องนั้น\n2. ชื่อและเลขบัญชีผู้รับเป็นบัญชีของหอจริง\n3. วันเวลาโอนสมเหตุสมผล ไม่ใช่สลิปเก่า\n4. เลขอ้างอิงไม่ซ้ำกับสลิปที่เคยรับ\n5. เงินเข้าบัญชีจริงเมื่อตรวจกับรายการเดินบัญชี',
      },
      {
        h: 'ใช้ QR ที่ระบุยอดในบิล',
        p: 'การแนบ QR พร้อมเพย์ที่ระบุยอดเงินไว้ในบิลแต่ละห้อง ช่วยลดการโอนผิดยอดและผิดบัญชี ผู้เช่าสแกนแล้วจ่ายได้เลย ไม่ต้องพิมพ์เลขบัญชีเอง และยอดที่ได้รับตรงกับบิลตั้งแต่ต้น\n\nควรบอกผู้เช่าชัด ๆ ว่าบัญชีรับเงินของหอมีบัญชีเดียว และจะไม่เปลี่ยนผ่านแชต เพื่อป้องกันมิจฉาชีพแอบอ้าง',
      },
      {
        h: 'ให้ระบบช่วยตรวจ แต่ยังกระทบยอดกับบัญชีธนาคาร',
        p: 'ในแพ็กเกจ HorCare Pro บิลที่ส่งทาง LINE มี QR โอนเงิน เมื่อผู้เช่าส่งสลิปกลับมา AI ช่วยอ่านและตรวจยอดกับบัญชีผู้รับ ห้องที่ตรงขึ้นสถานะชำระแล้ว ส่วนสลิปที่ผิดปกติถูกแยกให้คนตรวจ\n\nไม่ว่าจะใช้ระบบใด ควรกระทบยอดกับรายการเดินบัญชีธนาคารเป็นประจำ เพราะหลักฐานสุดท้ายว่าได้รับเงินคือเงินที่เข้าบัญชีจริง',
      },
      {
        h: 'ลดงานต้นเดือนได้แค่ไหน',
        p: 'หอ 60 ห้องที่ต้องเปิดสลิปทีละใบ เทียบยอด แล้วจดลงสมุด อาจใช้เวลาหลายชั่วโมงในช่วงต้นเดือน เมื่อระบบตรวจรอบแรกให้ เจ้าของเหลือเพียงดูรายการที่ถูกแยกไว้ และเห็นทันทีว่าห้องไหนยังไม่จ่าย',
      },
    ],
    related: ['handle-late-rent-payment', 'line-notify-vs-line-oa'],
    en: {
      cat: 'Technology',
      title: 'Collecting rent by QR and stopping fake slips: a guide for dormitory owners',
      desc: 'Fake transfer slips are real and hard to spot by eye. Here is how to collect rent by QR, check slips properly and cut the monthly work of matching payments.',
      date: 'November 9, 2026',
      keywords: ['fake slip', 'check transfer slip', 'collect rent by QR', 'PromptPay QR rent', 'automatic slip check'],
      body: [
        { h: 'Why rent transfers need checking', p: 'Bank-app transfers are convenient for tenants and owners, but a slip is only an image, which can be edited or reused. Common problems include edited amounts, old slips sent again and transfers to a different account. Looking by eye alone is not enough.' },
        { h: 'What to check on every slip', p: '1. The amount matches that room’s bill\n2. The receiving name and account are really the building’s\n3. The transfer time is plausible, not an old slip\n4. The reference number hasn’t been seen before\n5. The money actually arrived when checked against the bank statement' },
        { h: 'Use a QR with the amount in the bill', p: 'Attaching a PromptPay QR with the amount set to each room’s bill cuts wrong amounts and wrong accounts. Tenants scan and pay without typing an account number, and what you receive matches the bill from the start.\n\nTell tenants clearly that the building has one receiving account and will never change it over chat, to protect them from impostors.' },
        { h: 'Let the system check, but still reconcile with the bank', p: 'On HorCare Pro, bills sent on LINE include a payment QR. When a tenant sends a slip back, AI reads it and checks the amount and receiving account. Matching rooms are marked paid, and unusual slips are set aside for a person to review.\n\nWhatever system you use, reconcile against your bank statement regularly. The final proof of payment is money in the account.' },
        { h: 'How much monthly work this saves', p: 'A 60-room building that opens each slip, matches the amount and writes it in a ledger can spend hours at the start of the month. When the system does the first check, the owner only reviews what was set aside and sees at once which rooms haven’t paid.' },
      ],
    },
  },
  {
    slug: 'meter-reading-workflow',
    cat: 'เคล็ดลับ',
    ...C.tips,
    grad: 'linear-gradient(135deg,#E8FDF5,#FFF3E0)',
    title: 'จดมิเตอร์น้ำไฟหอพักให้เร็วและไม่พลาด: ขั้นตอนที่ใช้ได้จริง',
    desc: 'วางรอบจดมิเตอร์ให้เสร็จในเช้าเดียว ลดเลขผิด ห้องตกหล่น และบิลที่ต้องแก้ พร้อมวิธีใช้รูปถ่ายและ AI อ่านมิเตอร์',
    date: '7 พฤศจิกายน 2026',
    dateISO: '2026-11-07',
    min: '5',
    keywords: ['จดมิเตอร์หอพัก', 'จดมิเตอร์น้ำไฟ', 'อ่านมิเตอร์ด้วย AI', 'มิเตอร์ไฟหอพัก', 'ค่าน้ำค่าไฟหอพัก'],
    body: [
      {
        h: 'ความผิดพลาดส่วนใหญ่เกิดตอนจด ไม่ใช่ตอนคำนวณ',
        p: 'บิลค่าน้ำค่าไฟที่ผิดมักไม่ได้มาจากสูตร แต่มาจากเลขที่จดผิด จดสลับห้อง อ่านผิดหลัก หรือลืมห้องที่ไม่ได้อยู่ เมื่อพบตอนผู้เช่าทักมาถาม ก็ต้องแก้บิล ขอโทษ และเสียความน่าเชื่อถือ การวางขั้นตอนจดที่ดีจึงคุ้มกว่าการตรวจทีหลัง',
      },
      {
        h: 'ขั้นตอนจดมิเตอร์ที่แนะนำ',
        p: '1. กำหนดวันจดเดียวกันทุกเดือน เพื่อให้รอบการใช้ใกล้เคียงกัน\n2. เดินตามลำดับห้องที่แน่นอน เช่น ชั้นล่างขึ้นชั้นบน\n3. ถ่ายรูปมิเตอร์ทุกตัว ให้เห็นเลขและรหัสห้อง\n4. กรอกเลขลงตารางทั้งชั้นทันที ไม่จดกระดาษแล้วพิมพ์ซ้ำ\n5. ให้ระบบเตือนเมื่อเลขน้อยกว่าเดือนก่อน หรือสูงผิดปกติ\n6. ตรวจห้องที่ถูกเตือนก่อนออกบิล',
      },
      {
        h: 'รูปถ่ายคือหลักฐานที่ดีที่สุด',
        p: 'เมื่อผู้เช่าสงสัยค่าไฟ รูปมิเตอร์ที่มีวันที่ช่วยตอบได้ทันที ในแพ็กเกจ HorCare Pro ถ่ายรูปมิเตอร์แล้ว AI อ่านเลขให้ ลดการพิมพ์และเก็บรูปไว้กับห้องโดยอัตโนมัติ ควรตรวจเลขที่ AI อ่านเมื่อรูปมืดหรือเบลอ',
      },
      {
        h: 'กรณีพิเศษที่ต้องจัดการ',
        p: 'เมื่อเปลี่ยนมิเตอร์ ให้บันทึกเลขปิดของตัวเก่าและเลขเริ่มต้นของตัวใหม่พร้อมวันที่ ห้องที่ผู้เช่าย้ายกลางเดือนให้จดเลขวันย้ายแยก และห้องว่างควรจดต่อทุกเดือน เพื่อจับการรั่วหรือการใช้ไฟโดยไม่ได้รับอนุญาต',
      },
      {
        h: 'เชื่อมเลขมิเตอร์กับบิลโดยตรง',
        p: 'เมื่อเลขมิเตอร์อยู่ในระบบเดียวกับบิล ไม่มีขั้นตอนคัดลอก ระบบคำนวณหน่วยที่ใช้และยอดเงินจากอัตราที่ตั้งไว้ทันที ก่อนตั้งอัตราเรียกเก็บ อย่าลืมตรวจข้อกำหนดที่ใช้บังคับกับกิจการของคุณ',
      },
    ],
    sources: [OCPB],
    related: ['calculate-water-electricity-dormitory', 'how-dormitory-management-saves-time'],
    en: {
      cat: 'Tips',
      title: 'Reading dormitory water and electricity meters fast and accurately',
      desc: 'Plan a meter round you can finish in one morning, with fewer wrong readings, missed rooms and corrected bills, plus how to use photos and AI meter reading.',
      date: 'November 7, 2026',
      keywords: ['dormitory meter reading', 'water and electricity meter reading', 'AI meter reading', 'dormitory electricity meter', 'dormitory utility bills'],
      body: [
        { h: 'Most errors happen while reading, not calculating', p: 'Wrong utility bills rarely come from the formula. They come from misread numbers, swapped rooms, wrong digits or forgotten empty rooms. When a tenant asks about it, you correct the bill, apologise and lose credibility. A good reading process is worth more than checking afterwards.' },
        { h: 'A recommended meter-reading process', p: '1. Read on the same day every month so usage periods are similar\n2. Walk a fixed order, for example from the ground floor up\n3. Photograph every meter, showing the reading and room code\n4. Enter readings straight into a table for the whole floor instead of writing on paper and re-typing\n5. Let the system warn you when a reading is lower than last month or unusually high\n6. Check flagged rooms before billing' },
        { h: 'Photos are your best evidence', p: 'When a tenant questions the electricity bill, a dated meter photo answers it immediately. On HorCare Pro, photograph the meter and AI reads the number, saving typing and storing the photo with the room automatically. Check AI readings when a photo is dark or blurry.' },
        { h: 'Special cases to handle', p: 'When a meter is replaced, record the old meter’s final reading and the new one’s starting reading with the date. For tenants moving mid-month, take a separate reading on moving day. Keep reading empty rooms every month to catch leaks or unauthorised use.' },
        { h: 'Connect readings directly to bills', p: 'When readings live in the same system as bills, there’s no copying step: the system calculates units used and the amount from your rates at once. Before setting rates, check the rules that apply to your type of business.' },
      ],
    },
  },
  {
    slug: 'dormitory-maintenance-request-system',
    cat: 'เคล็ดลับ',
    ...C.tips,
    grad: 'linear-gradient(135deg,#FFF3E0,#E0FBF0)',
    title: 'ระบบแจ้งซ่อมหอพัก: รับเรื่อง มอบหมายงาน และติดตามให้จบ',
    desc: 'เลิกรับแจ้งซ่อมกระจายในแชต วางขั้นตอนแจ้งซ่อมที่ผู้เช่าใช้ง่าย ช่างรู้งาน และเจ้าของเห็นสถานะทุกงาน พร้อมสิ่งที่ควรบันทึกเพื่อคุมค่าใช้จ่าย',
    date: '5 พฤศจิกายน 2026',
    dateISO: '2026-11-05',
    min: '5',
    keywords: ['ระบบแจ้งซ่อมหอพัก', 'แจ้งซ่อมหอพัก', 'งานซ่อมบำรุงหอพัก', 'แจ้งซ่อมผ่าน LINE', 'บริหารหอพัก'],
    body: [
      {
        h: 'ปัญหาของการรับแจ้งซ่อมในแชต',
        p: 'เมื่อผู้เช่าแจ้งซ่อมผ่านแชตส่วนตัว ข้อความจะจมไปกับเรื่องอื่น ไม่มีใครรู้ว่างานไหนมอบให้ใครแล้ว งานไหนเสร็จ และผู้เช่าต้องทักซ้ำ ผลคือผู้เช่าไม่พอใจทั้งที่ทีมทำงานหนัก เพราะมองไม่เห็นความคืบหน้า',
      },
      {
        h: 'ขั้นตอนแจ้งซ่อมที่ดี',
        p: '1. ผู้เช่าแจ้งผ่านช่องทางเดียว พร้อมรูปและรายละเอียด\n2. ทุกเรื่องได้หมายเลขงานและสถานะ เช่น รับเรื่อง กำลังดำเนินการ เสร็จแล้ว\n3. มอบหมายช่างหรือแม่บ้านที่รับผิดชอบชัดเจน\n4. ผู้เช่าได้รับแจ้งเมื่อสถานะเปลี่ยน\n5. บันทึกค่าอะไหล่และค่าแรงไว้กับงาน\n6. ปิดงานพร้อมรูปหลังซ่อม',
      },
      {
        h: 'แยกงานเร่งด่วนออกจากงานทั่วไป',
        p: 'น้ำรั่ว ไฟดับทั้งห้อง หรือประตูล็อกไม่ได้ ควรมีช่องทางเร่งด่วนและเวลาตอบกลับที่ชัด ส่วนงานทั่วไป เช่น หลอดไฟขาด สามารถรวมรอบซ่อมได้ การแยกระดับช่วยให้ทีมเล็กทำงานได้ทันโดยไม่พลาดเรื่องสำคัญ',
      },
      {
        h: 'ข้อมูลงานซ่อมช่วยคุมต้นทุน',
        p: 'เมื่อบันทึกงานซ่อมไว้ครบ จะเห็นว่าห้องไหนแอร์เสียบ่อย อุปกรณ์ไหนควรเปลี่ยนทั้งชุด และค่าซ่อมต่อเดือนเท่าไร ข้อมูลนี้ช่วยตัดสินใจลงทุนและตั้งค่าเช่าได้แม่นขึ้น',
      },
      {
        h: 'แจ้งซ่อมใน HorCare',
        p: 'ในแพ็กเกจ HorCare Pro มีกระดานงานแจ้งซ่อม พร้อมระบบสต็อก ทรัพย์สิน และค่าใช้จ่าย เจ้าของเห็นสถานะทุกงานในที่เดียว ส่วนแพ็กเกจ Business ให้ทีมงาน ช่าง และแม่บ้านรับงานได้หลายสาขาในบัญชีเดียว',
      },
    ],
    related: ['how-dormitory-management-saves-time', 'apartment-management-system'],
    en: {
      cat: 'Tips',
      title: 'Dormitory maintenance requests: take them in, assign them, see them through',
      desc: 'Stop taking repair requests scattered across chats. Set up a process tenants find easy, technicians understand and owners can track, plus what to record to control costs.',
      date: 'November 5, 2026',
      keywords: ['dormitory maintenance request system', 'dormitory repair requests', 'dormitory maintenance', 'repair requests on LINE', 'dormitory management'],
      body: [
        { h: 'The problem with repair requests in chat', p: 'When tenants report repairs in private chats, messages get buried among everything else. Nobody knows which jobs are assigned or done, and tenants have to ask again. Tenants end up unhappy even though the team works hard, because progress is invisible.' },
        { h: 'A good repair request process', p: '1. Tenants report through one channel, with photos and details\n2. Every request gets a job number and status, such as received, in progress, done\n3. A specific technician or housekeeper is assigned\n4. Tenants are notified when the status changes\n5. Parts and labour costs are recorded on the job\n6. Jobs are closed with an after photo' },
        { h: 'Separate urgent jobs from routine ones', p: 'Water leaks, a whole room without power or a door that won’t lock need an urgent channel and a clear response time. Routine jobs, such as a blown bulb, can be batched. Triage lets a small team keep up without missing what matters.' },
        { h: 'Repair records help control costs', p: 'With complete records you can see which rooms’ air conditioners fail often, which equipment should be replaced as a set, and what repairs cost each month. That makes investment and rent decisions more accurate.' },
        { h: 'Repair requests in HorCare', p: 'HorCare Pro includes a maintenance board along with stock, asset and expense tracking, so owners see every job’s status in one place. Business lets staff, technicians and housekeepers take jobs across several branches in one account.' },
      ],
    },
  },
  {
    slug: 'dormitory-income-expense-bookkeeping',
    cat: 'เคล็ดลับ',
    ...C.tips,
    grad: 'linear-gradient(135deg,#E8F5E9,#E3F2FD)',
    title: 'ทำบัญชีรายรับรายจ่ายหอพักแบบง่าย ให้รู้กำไรจริงทุกเดือน',
    desc: 'แยกหมวดรายรับรายจ่ายหอพัก บันทึกให้ตรวจย้อนได้ และอ่านตัวเลขสำคัญอย่างอัตราเข้าพักและยอดค้าง เพื่อรู้ว่าหอทำกำไรจริงเท่าไร',
    date: '3 พฤศจิกายน 2026',
    dateISO: '2026-11-03',
    min: '5',
    keywords: ['บัญชีรายรับรายจ่ายหอพัก', 'ทำบัญชีหอพัก', 'กำไรหอพัก', 'รายได้หอพัก', 'อัตราเข้าพัก'],
    body: [
      {
        h: 'ยอดเงินเข้าไม่ใช่กำไร',
        p: 'เจ้าของหอหลายคนดูยอดเงินที่เข้าบัญชีแล้วคิดว่านั่นคือรายได้ของเดือน แต่ยอดนั้นอาจรวมเงินประกันที่ต้องคืน ค่าเช่าของเดือนก่อนที่เพิ่งจ่าย และยังไม่หักค่าไฟส่วนกลาง ค่าซ่อม หรือค่าแม่บ้าน การแยกหมวดให้ชัดคือก้าวแรกของการรู้กำไรจริง',
      },
      {
        h: 'หมวดรายรับและรายจ่ายที่ควรแยก',
        p: '1. รายรับ: ค่าเช่า ค่าน้ำ ค่าไฟ ค่าส่วนกลาง ค่าปรับล่าช้า และรายได้อื่น\n2. เงินประกัน: แยกออกจากรายรับ เพราะเป็นเงินที่อาจต้องคืน\n3. รายจ่ายประจำ: ค่าไฟและค่าน้ำส่วนกลาง ค่าแรงพนักงาน อินเทอร์เน็ต\n4. รายจ่ายซ่อมบำรุง: อะไหล่ ค่าช่าง ทาสี\n5. รายจ่ายลงทุน: ปรับปรุงห้อง เปลี่ยนเครื่องใช้ไฟฟ้าทั้งชุด',
      },
      {
        h: 'ตัวเลขที่ควรดูทุกเดือน',
        p: '1. อัตราเข้าพัก: จำนวนห้องที่มีผู้เช่าเทียบกับห้องทั้งหมด\n2. ยอดเรียกเก็บเทียบยอดที่ได้รับจริง\n3. ยอดค้างชำระแยกตามอายุหนี้\n4. ค่าซ่อมบำรุงต่อห้อง\n5. กำไรก่อนภาษีหลังหักรายจ่ายทั้งหมด',
      },
      {
        h: 'บันทึกให้ตรวจย้อนได้',
        p: 'ทุกรายการควรมีวันที่ หมวด จำนวนเงิน และหลักฐาน เช่น ใบเสร็จหรือสลิป เรื่องภาษีของรายได้ค่าเช่าขึ้นกับรูปแบบกิจการและสถานะผู้ประกอบการ ควรตรวจกับกรมสรรพากรหรือปรึกษานักบัญชี และเก็บหลักฐานให้ครบเพื่อใช้ยื่นภาษี',
      },
      {
        h: 'ให้บิลกลายเป็นบัญชีอัตโนมัติ',
        p: 'เมื่อออกบิลและบันทึกการรับชำระในระบบเดียวกัน รายรับแต่ละหมวดถูกสรุปให้เอง HorCare แสดงยอดเรียกเก็บ ยอดรับชำระ ยอดค้าง และห้องว่าง พร้อมส่งออกสรุปยอดรายเดือนเป็น PDF ได้ เจ้าของจึงเห็นภาพรวมโดยไม่ต้องรวมตัวเลขเองทุกสิ้นเดือน',
      },
    ],
    sources: [{ name: 'Revenue Department of Thailand', url: 'https://www.rd.go.th/' }],
    related: ['5-ways-increase-dormitory-income', 'handle-late-rent-payment'],
    en: {
      cat: 'Tips',
      title: 'Simple dormitory bookkeeping: know your real profit every month',
      desc: 'Separate dormitory income and expense categories, keep records you can trace, and read key numbers like occupancy and arrears to know what your building really earns.',
      date: 'November 3, 2026',
      keywords: ['dormitory income and expense bookkeeping', 'dormitory accounting', 'dormitory profit', 'dormitory income', 'occupancy rate'],
      body: [
        { h: 'Money in is not profit', p: 'Many owners look at what arrived in the bank and treat it as the month’s income. But it may include deposits that must be returned and last month’s rent paid late, and it hasn’t yet had common-area electricity, repairs or cleaning taken out. Separating categories is the first step to knowing your real profit.' },
        { h: 'Income and expense categories to separate', p: '1. Income: rent, water, electricity, common fees, late fees and other income\n2. Deposits: kept apart from income, because they may be returned\n3. Running costs: common-area electricity and water, staff wages, internet\n4. Maintenance: parts, technicians, painting\n5. Capital spending: room upgrades, replacing appliances as a set' },
        { h: 'Numbers to review every month', p: '1. Occupancy: occupied rooms against total rooms\n2. Amount billed against amount actually received\n3. Arrears grouped by age\n4. Maintenance cost per room\n5. Profit before tax after all expenses' },
        { h: 'Keep records you can trace', p: 'Every entry should have a date, category, amount and evidence such as a receipt or slip. Tax on rental income depends on your business form and status. Check with the Revenue Department or an accountant, and keep complete evidence for filing.' },
        { h: 'Turn bills into bookkeeping automatically', p: 'When bills and payments are recorded in one system, income by category is summarised for you. HorCare shows amounts billed, collected and outstanding plus vacancies, and exports a monthly summary as PDF, so owners see the picture without adding up numbers at month end.' },
      ],
    },
  },
  {
    slug: 'reduce-dormitory-vacancy',
    cat: 'เคล็ดลับ',
    ...C.tips,
    grad: 'linear-gradient(135deg,#FFF8E1,#E0F2F1)',
    title: 'ลดห้องว่างหอพัก: 6 วิธีหาผู้เช่าเร็วขึ้นและให้อยู่นานขึ้น',
    desc: 'ห้องว่างหนึ่งเดือนคือรายได้ที่เสียไปถาวร รวมวิธีลดวันห้องว่าง ตั้งแต่ประกาศให้เร็ว ตอบคำถามไว จนถึงทำให้ผู้เช่าเดิมอยากต่อสัญญา',
    date: '1 พฤศจิกายน 2026',
    dateISO: '2026-11-01',
    min: '5',
    keywords: ['ลดห้องว่างหอพัก', 'หาผู้เช่าหอพัก', 'ปล่อยเช่าห้องให้เร็ว', 'อัตราเข้าพักหอพัก', 'ประกาศห้องว่าง'],
    body: [
      {
        h: 'ห้องว่างแพงกว่าที่คิด',
        p: 'ห้องราคา 4,000 บาทที่ว่าง 2 เดือนต่อปี คือรายได้ที่หายไป 8,000 บาทต่อห้อง ถ้ามี 10 ห้องที่เป็นแบบนี้ ตัวเลขทั้งปีอาจมากกว่าค่าซ่อมบำรุงทั้งอาคาร การลดวันห้องว่างจึงมักให้ผลเร็วกว่าการขึ้นค่าเช่า',
      },
      {
        h: '6 วิธีลดวันห้องว่าง',
        p: '1. เริ่มประกาศตั้งแต่วันที่ผู้เช่าแจ้งย้ายออก ไม่รอห้องว่าง\n2. ใช้รูปห้องจริงที่สว่าง ชัด และบอกราคารวมค่าใช้จ่ายให้ครบ\n3. ตอบคำถามผู้สนใจให้เร็ว เพราะผู้หาห้องมักทักหลายที่พร้อมกัน\n4. นัดดูห้องได้ง่าย และมีคนพาดูหรือมีวิดีโอให้ดูก่อน\n5. ทำความสะอาดและซ่อมให้เสร็จก่อนวันนัดดู\n6. ดูแลผู้เช่าเดิมให้ดี เพราะการต่อสัญญาคือห้องที่ไม่ต้องหาคนใหม่',
      },
      {
        h: 'ผู้เช่าอยู่นานขึ้นเพราะอะไร',
        p: 'ผู้เช่าที่ย้ายออกมักไม่ได้ย้ายเพราะราคาอย่างเดียว แต่เพราะแจ้งซ่อมแล้วไม่มีใครตอบ บิลผิดบ่อย หรือจ่ายเงินยุ่งยาก การส่งบิลที่ถูกต้องตรงเวลา จ่ายง่ายผ่าน QR และแจ้งซ่อมแล้วเห็นความคืบหน้า คือสิ่งที่ผู้เช่าสัมผัสได้ทุกเดือน',
      },
      {
        h: 'ใช้ข้อมูลวางแผนล่วงหน้า',
        p: 'ดูวันครบสัญญาของทุกห้องล่วงหน้าอย่างน้อย 1–2 เดือน ทักถามผู้เช่าว่าจะต่อหรือไม่ และเตรียมประกาศไว้ ข้อมูลอัตราเข้าพักย้อนหลังยังบอกได้ว่าช่วงไหนของปีหาผู้เช่ายาก เพื่อวางโปรโมชันหรือสัญญาให้ครบกำหนดในช่วงที่หาคนง่าย',
      },
      {
        h: 'HorCare ช่วยได้ตรงไหน',
        p: 'HorCare แสดงห้องว่าง ห้องที่มีผู้เช่า และวันครบสัญญาในที่เดียว แพ็กเกจ Business มีหน้าประกาศห้องว่างทุกสาขา และงานส่งบิล ตรวจสลิป และแจ้งซ่อมในแพ็กเกจ HorCare Pro ช่วยให้ประสบการณ์ของผู้เช่าดีขึ้นทุกเดือน',
      },
    ],
    related: ['5-ways-increase-dormitory-income', 'move-in-move-out-checklist'],
    en: {
      cat: 'Tips',
      title: 'Reduce dormitory vacancies: 6 ways to find tenants faster and keep them longer',
      desc: 'Every empty month is income lost for good. Here is how to cut vacant days, from advertising early and replying fast to making current tenants want to renew.',
      date: 'November 1, 2026',
      keywords: ['reduce dormitory vacancy', 'find dormitory tenants', 'let rooms faster', 'dormitory occupancy rate', 'vacancy listing'],
      body: [
        { h: 'Vacancies cost more than you think', p: 'A ฿4,000 room empty two months a year loses ฿8,000 per room. With ten rooms like that, the yearly figure can exceed the whole building’s maintenance budget. Cutting vacant days often pays off faster than raising rent.' },
        { h: '6 ways to cut vacant days', p: '1. Start advertising the day a tenant gives notice, not when the room empties\n2. Use bright, clear photos of the real room and state the full price including charges\n3. Reply to enquiries quickly, since people contact several places at once\n4. Make viewings easy, with someone to show the room or a video first\n5. Finish cleaning and repairs before the viewing date\n6. Look after current tenants, because a renewal is a room you don’t have to fill' },
        { h: 'Why tenants stay longer', p: 'Tenants rarely leave over price alone. They leave because repair requests go unanswered, bills are often wrong or paying is a hassle. Accurate, on-time bills, easy QR payment and repairs with visible progress are things tenants feel every month.' },
        { h: 'Use data to plan ahead', p: 'Check every room’s contract end date at least one to two months ahead, ask tenants whether they will renew, and prepare listings. Past occupancy data also shows which months are hard to fill, so you can plan promotions or align contract ends with easier months.' },
        { h: 'Where HorCare helps', p: 'HorCare shows vacant rooms, occupied rooms and contract end dates in one place. Business adds a vacancy listing page for every branch, and HorCare Pro’s billing, slip checks and repair requests improve the tenant experience every month.' },
      ],
    },
  },
  {
    slug: 'migrate-dormitory-data-from-excel',
    cat: 'เทคโนโลยี',
    ...C.tech,
    grad: 'linear-gradient(135deg,#E8EAF6,#E0FBF0)',
    title: 'ย้ายข้อมูลหอพักจาก Excel เข้าระบบ: เตรียมอะไร และให้ทีมช่วยได้แค่ไหน',
    desc: 'ขั้นตอนย้ายข้อมูลห้อง ผู้เช่า ค่าเช่า เงินประกัน และเลขมิเตอร์จาก Excel หรือสมุดจด เข้าระบบจัดการหอพัก โดยไม่กระทบรอบเก็บเงิน',
    date: '30 ตุลาคม 2026',
    dateISO: '2026-10-30',
    min: '5',
    keywords: ['ย้ายข้อมูลหอพัก', 'นำเข้าข้อมูล Excel หอพัก', 'เปลี่ยนจาก Excel เป็นโปรแกรมหอพัก', 'เริ่มใช้ระบบจัดการหอพัก', 'โปรแกรมหอพัก'],
    body: [
      {
        h: 'กลัวย้ายข้อมูล คือเหตุผลที่หลายหอยังใช้ Excel',
        p: 'เจ้าของหอหลายคนรู้ว่า Excel เริ่มไม่พอ แต่ไม่อยากเสียเวลากรอกข้อมูลทุกห้องใหม่ ข่าวดีคือการย้ายข้อมูลไม่จำเป็นต้องสมบูรณ์ในครั้งเดียว ข้อมูลที่ต้องใช้ออกบิลเดือนแรกมีไม่มาก ที่เหลือเติมทีหลังได้',
      },
      {
        h: 'ข้อมูลขั้นต่ำที่ต้องมีก่อนออกบิลแรก',
        p: '1. รายชื่อห้อง และค่าเช่าของแต่ละห้อง\n2. ชื่อผู้เช่าและเบอร์ติดต่อของห้องที่มีคนอยู่\n3. เลขมิเตอร์น้ำและไฟล่าสุดของทุกห้อง\n4. อัตราค่าน้ำ ค่าไฟ และค่าใช้จ่ายอื่นที่เรียกเก็บ\n5. ยอดค้างชำระยกมา (ถ้ามี)\n\nส่วนสัญญา เงินประกัน และวันครบสัญญา เติมระหว่างเดือนได้',
      },
      {
        h: 'เตรียมไฟล์ให้ย้ายง่าย',
        p: 'ใช้หนึ่งแถวต่อหนึ่งห้อง รหัสห้องต้องไม่ซ้ำ ตัวเลขเป็นตัวเลขจริงไม่ใช่ข้อความ และลบแถวสรุปยอดหรือเซลล์รวมออก ถ้าข้อมูลอยู่หลายไฟล์หรืออยู่ในสมุด ไม่ต้องจัดเอง ทีมช่วยรวมให้ได้',
      },
      {
        h: 'ทำเอง หรือให้ทีมช่วย',
        p: 'ในแพ็กเกจฟรีของ HorCare นำเข้าห้องเองได้จากเทมเพลต Excel ส่วนแพ็กเกจ HorCare Pro มีทีมช่วยนำเข้าข้อมูลและเซ็ตอัพให้ และ Business มีทีมย้ายข้อมูลทุกสาขา ส่งไฟล์ Excel รูปถ่ายสมุด หรือไฟล์จากโปรแกรมเดิมทาง LINE @127qwwfi แล้วตรวจข้อมูลด้วยกันก่อนออกบิลเดือนแรก',
      },
      {
        h: 'เลือกจังหวะย้ายให้ไม่กระทบเงินเข้า',
        p: 'ย้ายหลังเก็บเงินรอบปัจจุบันเสร็จ และก่อนวันจดมิเตอร์รอบถัดไป ใช้ Excel คู่ขนานหนึ่งเดือนเพื่อเทียบยอด เมื่อบิลจากระบบตรงกับที่คุณคำนวณเอง ก็เลิกใช้ไฟล์เดิมได้อย่างมั่นใจ',
      },
    ],
    related: ['excel-vs-dormitory-software', 'why-horcare'],
    en: {
      cat: 'Technology',
      title: 'Moving dormitory data from Excel: what to prepare and how our team can help',
      desc: 'How to move rooms, tenants, rents, deposits and meter readings from Excel or a ledger book into dormitory software without disrupting your billing round.',
      date: 'October 30, 2026',
      keywords: ['dormitory data migration', 'import dormitory Excel data', 'switch from Excel to dormitory software', 'start using dormitory software', 'dormitory software'],
      body: [
        { h: 'Fear of migrating is why many buildings stay on Excel', p: 'Many owners know Excel is no longer enough but don’t want to re-enter every room. The good news: migration doesn’t have to be complete in one go. The data needed for the first month’s bills is small, and the rest can be added later.' },
        { h: 'The minimum data before your first bill', p: '1. The list of rooms and each room’s rent\n2. Tenant names and phone numbers for occupied rooms\n3. The latest water and electricity readings for every room\n4. Your water, electricity and other charge rates\n5. Any outstanding balances carried over\n\nContracts, deposits and end dates can be filled in during the month.' },
        { h: 'Prepare a file that imports easily', p: 'Use one row per room, keep room codes unique, store numbers as numbers rather than text, and remove total rows or merged cells. If your data is spread across files or in a ledger book, don’t tidy it yourself. The team can combine it for you.' },
        { h: 'Do it yourself, or let the team help', p: 'On HorCare’s free plan you can import rooms yourself from the Excel template. HorCare Pro includes data import and setup by our team, and Business includes migration for every branch. Send your Excel file, ledger photos or old-software export on LINE @127qwwfi, then review the data together before the first month’s bills.' },
        { h: 'Time the move so cash flow isn’t disrupted', p: 'Move after this round’s collection is done and before the next meter-reading day. Run Excel in parallel for one month to compare totals. When the system’s bills match your own calculations, you can retire the old file with confidence.' },
      ],
    },
  },
]

/** Thai → English pairs for translate.js, built from each article's `en` copy. */
export function articleTranslations() {
  const pairs = {}
  for (const a of NEW_ARTICLES) {
    const { en } = a
    pairs[a.title] = en.title
    pairs[a.desc] = en.desc
    pairs[a.cat] = en.cat
    pairs[a.date] = en.date
    a.keywords.forEach((k, i) => { if (en.keywords[i]) pairs[k] = en.keywords[i] })
    a.body.forEach((s, i) => {
      pairs[s.h] = en.body[i].h
      pairs[s.p] = en.body[i].p
    })
  }
  return pairs
}
