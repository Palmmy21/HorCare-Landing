// Flex message — Package pricing carousel (3 bubbles: Start, Plus, Pro)
// Each bubble has two action buttons: monthly / yearly

const PACKAGES = [
  {
    name: 'Start',
    emoji: '🚀',
    color: '#3B82F6',
    rooms: '≤50 ห้อง · 1 หอ',
    monthly: 79,
    yearly: 790,
    yearlySave: '17%',
    features: [
      'แจ้งเตือนผู้เช่าผ่าน LINE',
      'ออกบิลอัตโนมัติ',
      'จดมิเตอร์ค่าน้ำ/ไฟ',
      'รับสลิปจ่ายเงินอัตโนมัติ',
    ],
    badge: 'แนะนำ',
  },
  {
    name: 'Plus',
    emoji: '⭐',
    color: '#A855F7',
    rooms: '≤150 ห้อง · 5 หอ',
    monthly: 199,
    yearly: 1190,
    yearlySave: '50%',
    features: [
      'ทุกอย่างใน Start',
      'Multi-หอพัก (สูงสุด 5)',
      'ข้อมูลผู้เช่าเต็มรูปแบบ',
      'รองรับห้องเช่าเชิงพาณิชย์',
    ],
    badge: 'ยอดนิยม',
  },
  {
    name: 'Pro',
    emoji: '👑',
    color: '#F59E0B',
    rooms: 'ไม่จำกัดห้อง · 10 หอ',
    monthly: 299,
    yearly: 1990,
    yearlySave: '45%',
    features: [
      'ทุกอย่างใน Plus',
      'สูงสุด 10 หอพัก',
      'ห้องพักไม่จำกัด',
      'ระบบแจ้งซ่อมเต็มรูปแบบ',
    ],
    badge: 'Premium',
  },
];

function buildPackageBubble(pkg) {
  return {
    type: 'bubble',
    size: 'kilo',
    header: {
      type: 'box',
      layout: 'vertical',
      backgroundColor: pkg.color,
      paddingAll: '16px',
      contents: [
        {
          type: 'box',
          layout: 'horizontal',
          alignItems: 'center',
          contents: [
            { type: 'text', text: `${pkg.emoji} ${pkg.name}`, weight: 'bold', size: 'lg', color: '#FFFFFF', flex: 1 },
            {
              type: 'box',
              layout: 'vertical',
              backgroundColor: '#FFFFFF',
              cornerRadius: '20px',
              paddingTop: '2px',
              paddingBottom: '2px',
              paddingStart: '8px',
              paddingEnd: '8px',
              flex: 0,
              contents: [
                { type: 'text', text: pkg.badge, size: 'xxs', color: pkg.color, weight: 'bold', align: 'center' },
              ],
            },
          ],
        },
        { type: 'text', text: pkg.rooms, size: 'xs', color: '#E0E7FF', margin: 'sm' },
      ],
    },
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      paddingAll: '16px',
      contents: [
        // Price display
        {
          type: 'box',
          layout: 'horizontal',
          alignItems: 'baseline',
          contents: [
            { type: 'text', text: `฿${pkg.monthly}`, weight: 'bold', size: 'xxl', color: '#1F2937' },
            { type: 'text', text: '/เดือน', size: 'sm', color: '#6B7280', gravity: 'bottom', margin: 'sm' },
          ],
        },
        { type: 'text', text: `หรือ ฿${pkg.yearly.toLocaleString()}/ปี (ประหยัด ${pkg.yearlySave})`, size: 'xs', color: '#059669', margin: 'sm' },
        { type: 'separator', margin: 'md' },
        // Features
        ...pkg.features.map(f => ({
          type: 'box',
          layout: 'horizontal',
          spacing: 'sm',
          margin: 'sm',
          contents: [
            { type: 'text', text: '✓', size: 'sm', color: '#059669', flex: 0 },
            { type: 'text', text: f, size: 'sm', color: '#374151', wrap: true },
          ],
        })),
      ],
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      paddingAll: '16px',
      contents: [
        {
          type: 'button',
          style: 'primary',
          color: pkg.color,
          action: {
            type: 'message',
            label: `รายเดือน ฿${pkg.monthly}`,
            text: `สมัคร ${pkg.name} รายเดือน`,
          },
        },
        {
          type: 'button',
          style: 'secondary',
          action: {
            type: 'message',
            label: `รายปี ฿${pkg.yearly.toLocaleString()} (ประหยัด ${pkg.yearlySave})`,
            text: `สมัคร ${pkg.name} รายปี`,
          },
        },
      ],
    },
  };
}

export function buildPackagesFlex() {
  return {
    type: 'flex',
    altText: '💰 แพ็กเกจ HorCare — เลือกแพ็กเกจที่เหมาะกับคุณ',
    contents: {
      type: 'carousel',
      contents: PACKAGES.map(buildPackageBubble),
    },
  };
}

export { PACKAGES };
