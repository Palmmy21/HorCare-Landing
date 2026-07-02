// Flex message shown when a user taps "C - โปรโมชั่น/คูปอง"
// NOTE: placeholder content — wire this up to a real promo source before launch.
export function buildPromotionFlex(landingUrl) {
  return {
    type: 'flex',
    altText: 'โปรโมชั่น HorCare',
    contents: {
      type: 'bubble',
      hero: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#16A34A',
        paddingAll: 'lg',
        contents: [
          { type: 'text', text: '🎁 โปรโมชั่นล่าสุด', color: '#FFFFFF', weight: 'bold', size: 'lg' },
        ],
      },
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          { type: 'text', text: 'สมัครวันนี้ รับส่วนลด 20%', weight: 'bold', wrap: true },
          { type: 'text', text: 'สำหรับหอพักที่สมัครใช้งาน HorCare ภายในเดือนนี้ ใช้ได้กับแพ็กเกจรายปี', size: 'sm', color: '#6B7280', wrap: true },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            style: 'primary',
            color: '#16A34A',
            action: { type: 'uri', label: 'ดูรายละเอียด', uri: `${landingUrl}#pricing` },
          },
        ],
      },
    },
  };
}
