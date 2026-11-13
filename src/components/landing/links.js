// LINE Official Account deep links. Each one pre-fills a chat message so the team knows what the visitor wants.
const oaMessage = (text) => 'https://line.me/R/oaMessage/@127qwwfi/?' + encodeURIComponent(text)

// Step 1 of the funnel: book a demo. The template asks for what the team needs to prepare the call.
export const DEMO_URL = oaMessage(
  'สนใจจองเดโม HorCare\nประเภท: หอพัก / อพาร์ตเมนต์\nจำนวนห้อง: \nวันและเวลาที่สะดวก: ',
)

export const IMPORT_URL = oaMessage(
  'อยากให้ทีมช่วยนำเข้าข้อมูล\nจำนวนห้อง: \nข้อมูลที่มี: Excel / สมุดจด / โปรแกรมเดิม\n(แนบไฟล์หรือรูปถ่ายในแชตนี้ได้เลย)',
)
