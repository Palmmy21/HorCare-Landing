// Flex message shown when a user taps "D - ติดต่อแอดมิน"
export function buildContactAdminFlex() {
  return {
    type: 'flex',
    altText: 'ติดต่อแอดมิน HorCare',
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
          { type: 'text', text: 'ติดต่อแอดมินโดยตรง', weight: 'bold', size: 'lg', color: '#1F2937' },
          {
            type: 'text',
            text: 'ทีมงาน HorCare ได้รับข้อความของคุณแล้ว หรือติดต่อช่องทางด้านล่างได้เลยค่ะ',
            size: 'sm',
            color: '#6B7280',
            wrap: true,
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'secondary',
            action: { type: 'uri', label: 'IG: puttipong_hrc', uri: 'https://www.instagram.com/puttipong_hrc/' },
          },
          {
            type: 'button',
            style: 'secondary',
            action: { type: 'uri', label: 'IG: palm.sakdidech', uri: 'https://www.instagram.com/palm.sakdidech/' },
          },
          {
            type: 'button',
            style: 'secondary',
            action: { type: 'uri', label: 'อีเมล horcare.admin@gmail.com', uri: 'mailto:horcare.admin@gmail.com' },
          },
          {
            type: 'text',
            text: 'หรือพิมพ์แจ้งปัญหาที่แชทนี้ได้เลยค่ะ',
            size: 'xs',
            color: '#9CA3AF',
            wrap: true,
            margin: 'md',
          },
        ],
      },
    },
  };
}
