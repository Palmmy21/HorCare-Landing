// Flex message shown when a user taps "B - บริการของเรา"
export function buildServicesFlex(landingUrl) {
  return {
    type: 'flex',
    altText: 'บริการของ HorCare',
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          { type: 'text', text: 'บริการของ HorCare', weight: 'bold', size: 'lg', color: '#1F2937' },
          { type: 'text', text: 'ระบบจัดการหอพักครบวงจร', size: 'sm', color: '#6B7280' },
        ],
      },
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
          featureRow('🏠', 'จัดการห้องพัก', 'สถานะห้องว่าง/ไม่ว่างแบบเรียลไทม์'),
          featureRow('👥', 'จัดการผู้เช่า & สัญญา', 'เก็บประวัติผู้เช่าและสัญญาเช่าในที่เดียว'),
          featureRow('💡', 'ค่าน้ำค่าไฟ', 'จดมิเตอร์และคำนวณค่าน้ำค่าไฟอัตโนมัติ'),
          featureRow('🧾', 'ใบแจ้งหนี้', 'ออกใบแจ้งหนี้และแจ้งเตือนผู้เช่าอัตโนมัติ'),
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
            action: { type: 'uri', label: 'เริ่มใช้งานฟรี', uri: landingUrl },
          },
        ],
      },
    },
  };
}

function featureRow(icon, title, desc) {
  return {
    type: 'box',
    layout: 'horizontal',
    spacing: 'md',
    contents: [
      { type: 'text', text: icon, flex: 0 },
      {
        type: 'box',
        layout: 'vertical',
        contents: [
          { type: 'text', text: title, weight: 'bold', size: 'sm', wrap: true },
          { type: 'text', text: desc, size: 'xs', color: '#6B7280', wrap: true },
        ],
      },
    ],
  };
}
