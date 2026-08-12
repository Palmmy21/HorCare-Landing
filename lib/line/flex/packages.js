// Flex message — Package pricing carousel (3 bubbles: Start, Plus, Pro)
// Strictly follows LINE Flex Message 1.0 specification

const PACKAGES = [
  {
    name: 'HorCare',
    emoji: '👑',
    color: '#0066FF', // Blue
    rooms: 'ไม่จำกัดห้อง · สูงสุด 10 หอ',
    monthly: 399,
    yearly: 2590,
    yearlySave: '46%',
    features: [
      'จัดการห้องพักไม่จำกัดจำนวน',
      'ส่งบิลและแจ้งเตือนผ่าน LINE',
      'อ่านมิเตอร์ด้วย AI',
      'ระบบจัดการครบวงจร',
    ],
    badge: 'Premium',
  },
];

function buildPackageBubble(pkg) {
  return {
    type: 'bubble',
    header: {
      type: 'box',
      layout: 'vertical',
      backgroundColor: pkg.color,
      contents: [
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'text',
              text: `${pkg.emoji} ${pkg.name}`,
              weight: 'bold',
              size: 'lg',
              color: '#FFFFFF',
              flex: 1,
              gravity: 'center',
            },
            {
              type: 'text',
              text: `[${pkg.badge}]`,
              size: 'xs',
              color: '#FFFFFF',
              weight: 'bold',
              gravity: 'center',
              flex: 0,
            },
          ],
        },
        {
          type: 'text',
          text: pkg.rooms,
          size: 'xs',
          color: '#E0E7FF',
          margin: 'sm',
        },
      ],
    },
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      contents: [
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'text',
              text: `฿${pkg.monthly}`,
              weight: 'bold',
              size: 'xxl',
              color: '#1F2937',
              flex: 0,
            },
            {
              type: 'text',
              text: '/เดือน',
              size: 'sm',
              color: '#6B7280',
              gravity: 'bottom',
              margin: 'sm',
              flex: 0,
            },
          ],
        },
        {
          type: 'text',
          text: `หรือ ฿${pkg.yearly.toLocaleString()}/ปี (ประหยัด ${pkg.yearlySave})`,
          size: 'xs',
          color: '#059669',
          margin: 'sm',
        },
        {
          type: 'separator',
          margin: 'md',
        },
        ...pkg.features.map(f => ({
          type: 'box',
          layout: 'horizontal',
          spacing: 'md',
          margin: 'sm',
          contents: [
            {
              type: 'text',
              text: '✓',
              size: 'sm',
              color: '#059669',
              flex: 0,
            },
            {
              type: 'text',
              text: f,
              size: 'sm',
              color: '#374151',
              wrap: true,
            },
          ],
        })),
      ],
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      contents: [
        {
          type: 'button',
          style: 'primary',
          color: pkg.color,
          height: 'sm',
          action: {
            type: 'message',
            label: `รายเดือน ฿${pkg.monthly}`,
            text: `สมัคร ${pkg.name} รายเดือน`,
          },
        },
        {
          type: 'button',
          style: 'secondary',
          height: 'sm',
          action: {
            type: 'message',
            label: `รายปี ฿${pkg.yearly.toLocaleString()}`,
            text: `สมัคร ${pkg.name} รายปี`,
          },
        },
        {
          type: 'text',
          text: 'ลูกค้าเก่า: สามารถต่ออายุแพ็กเกจเดิมได้ในราคาเท่าเดิม หากไม่ต้องการเปลี่ยน',
          size: 'xs',
          color: '#F59E0B',
          wrap: true,
          margin: 'md',
          align: 'center'
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
