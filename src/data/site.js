import { ARTICLES } from './articles.js'
export const BASE_URL = 'https://horcare-landing.vercel.app'
export const HOME_TITLE =
  'HorCare | Property Management Platform บริหารอสังหาฯ ให้เช่า'
export const HOME_DESCRIPTION =
  'รวมงานอสังหาฯ ให้เช่าไว้ใน HorCare จัดการห้อง ผู้เช่า สัญญา ออกบิลค่าน้ำค่าไฟ และแจ้งเตือนผ่าน LINE เริ่มใช้ฟรีสูงสุด 250 ห้อง ดูแพ็กเกจและขอเดโมได้เลย'
export const FAQS = [
  [
    'Property Management Platform คืออะไร?',
    'แพลตฟอร์มที่รวมงานบริหารอสังหาริมทรัพย์ให้เช่า ตั้งแต่ข้อมูลห้องและผู้เช่า สัญญาเช่า ค่าน้ำค่าไฟ ไปจนถึงใบแจ้งหนี้และการติดตามรายได้ ช่วยให้คุณเห็นข้อมูลในที่เดียว แทนการสลับหลายไฟล์',
  ],
  [
    'HorCare เหมาะกับอสังหาฯ แบบไหน?',
    'เหมาะกับงานให้เช่ารายเดือน เช่น อพาร์ตเมนต์ หอพัก คอนโดปล่อยเช่า และบ้านเช่า หากมีรูปแบบสัญญาหรือการจัดเก็บค่าใช้จ่ายเฉพาะ ทักทีมทาง LINE เพื่อดูเดโมและตรวจสอบความเหมาะสมก่อนเริ่มใช้',
  ],
  [
    'แพ็กเกจฟรีใช้ได้นานแค่ไหน?',
    'แพ็กเกจฟรีไม่มีวันหมดอายุ รองรับสูงสุด 250 ห้อง จัดการห้องและผู้เช่า จดมิเตอร์ ออกบิล สร้างสัญญาเช่า และพิมพ์ใบเสร็จได้ เมื่ออยากใช้ LINE อัตโนมัติและฟีเจอร์เพิ่มเติม สามารถเลือกแพ็กเกจ HorCare ได้',
  ],
  [
    'มีหลายโครงการ จัดการร่วมกันได้ไหม?',
    'แพ็กเกจ HorCare รองรับสูงสุด 10 โครงการและไม่จำกัดจำนวนห้อง สำหรับพอร์ตที่ใหญ่กว่านี้ สามารถปรึกษาทีมเพื่อเช็กขอบเขตการใช้งานที่เหมาะสม',
  ],
  [
    'ผู้เช่าต้องติดตั้งแอปใหม่หรือเปล่า?',
    'ฟีเจอร์ส่งบิลและแจ้งเตือนในแพ็กเกจ HorCare ใช้ LINE เป็นช่องทางสื่อสาร ผู้เช่าจึงรับข้อมูลผ่าน LINE ที่คุ้นเคย โดยทีมช่วยแนะนำขั้นตอนเชื่อมต่อก่อนใช้งาน',
  ],
  [
    'ยังใช้ Excel อยู่ จะเริ่มต้นอย่างไร?',
    'เริ่มจากสมัครบัญชี เพิ่มโครงการและห้อง แล้วตั้งค่ารายการค่าเช่า ค่าน้ำ และค่าไฟ หากมีข้อมูลเดิมจำนวนมาก ทักทีมเพื่อปรึกษาวิธีเตรียมข้อมูลและขั้นตอนย้ายที่เหมาะกับโครงการของคุณ',
  ],
]
export function pageMeta(path) {
  path = path.replace(/\/+$/, '') || '/'
  if (path === '/') return { title: HOME_TITLE, description: HOME_DESCRIPTION }
  const pages = {
    '/blog': [
      'Property Journal | ความรู้บริหารอสังหาฯ ให้เช่า — HorCare',
      'แนวคิดและคู่มือสำหรับเจ้าของอสังหาฯ ให้เช่า ตั้งแต่จัดการผู้เช่า ออกบิลค่าน้ำค่าไฟ ไปจนถึงเลือก Property Management Platform',
    ],
    '/calculator': [
      'คำนวณค่าน้ำค่าไฟและค่าเช่าออนไลน์ ฟรี | HorCare',
      'เครื่องมือคำนวณค่าน้ำ ค่าไฟ และค่าเช่ารายห้อง กำหนดอัตราเอง เพิ่มหลายห้อง และตรวจสอบยอดรวมก่อนออกบิล ใช้ฟรีโดยไม่ต้องสมัคร',
    ],
    '/privacy': [
      'นโยบายความเป็นส่วนตัว | HorCare',
      'อ่านนโยบายความเป็นส่วนตัวและการดูแลข้อมูลผู้ใช้งาน HorCare Property Management Platform',
    ],
    '/terms': [
      'เงื่อนไขการใช้งาน | HorCare',
      'ข้อกำหนดและเงื่อนไขการใช้บริการ HorCare Property Management Platform',
    ],
  }
  if (pages[path]) return { title: pages[path][0], description: pages[path][1] }
  const article = ARTICLES.find((a) => path === `/blog/${a.slug}`)
  return article
    ? { title: `${article.title} | HorCare`, description: article.desc }
    : {
        title: 'ไม่พบหน้านี้ | HorCare',
        description: 'กลับไปหน้าหลัก HorCare Property Management Platform',
        notFound: true,
      }
}
export function routeSchema(path) {
  const base = { '@context': 'https://schema.org' }
  if (path === '/')
    return {
      ...base,
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${BASE_URL}/#organization`,
          name: 'HorCare',
          url: BASE_URL,
          logo: `${BASE_URL}/HORCARE%20small.png`,
          sameAs: ['https://line.me/R/ti/p/@127qwwfi'],
        },
        {
          '@type': 'SoftwareApplication',
          name: 'HorCare',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description: HOME_DESCRIPTION,
          url: BASE_URL,
          offers: [
            {
              '@type': 'Offer',
              name: 'Free',
              price: '0',
              priceCurrency: 'THB',
            },
            {
              '@type': 'Offer',
              name: 'HorCare รายเดือน',
              price: '399',
              priceCurrency: 'THB',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: FAQS.map(([name, text]) => ({
            '@type': 'Question',
            name,
            acceptedAnswer: { '@type': 'Answer', text },
          })),
        },
      ],
    }
  const article = ARTICLES.find((a) => path === `/blog/${a.slug}`)
  if (article)
    return {
      ...base,
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.desc,
      datePublished: article.dateISO,
      inLanguage: 'th',
      mainEntityOfPage: BASE_URL + path,
      author: { '@type': 'Organization', name: 'HorCare', url: BASE_URL },
      publisher: {
        '@id': `${BASE_URL}/#organization`,
        '@type': 'Organization',
        name: 'HorCare',
      },
    }
  return {
    ...base,
    '@type': path === '/blog' ? 'CollectionPage' : 'WebPage',
    name: pageMeta(path).title,
    description: pageMeta(path).description,
    url: BASE_URL + path,
    inLanguage: 'th',
  }
}
