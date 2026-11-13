import { useLanguage } from '../../i18n/useLanguage.js'
import { Ic, P } from '../shared.jsx'
import { IMPORT_URL } from './links.js'

const sources = ['ไฟล์ Excel / Google Sheets', 'รูปถ่ายสมุดจดบัญชี', 'ไฟล์จากโปรแกรมเดิม', 'รายชื่อผู้เช่าในแชต LINE']

const steps = [
  ['ส่งข้อมูลที่มีอยู่', 'ส่งทาง LINE ได้เลย ไฟล์ไม่ต้องเรียบร้อย ไม่ต้องจัดรูปแบบใหม่'],
  ['ทีมลงข้อมูลให้', 'ห้อง ผู้เช่า ค่าเช่า เงินประกัน และเลขมิเตอร์ยกมา ถูกจัดเข้าระบบให้ครบ'],
  ['ตรวจด้วยกันก่อนออกบิลแรก', 'ทีมนัดดูข้อมูลกับคุณ แล้วออกบิลเดือนแรกไปพร้อมกัน'],
]

/** The migration offer, made loud: the biggest reason owners stay on Excel is the fear of re-typing everything. */
export function ImportService() {
  const { t } = useLanguage()
  return (
    <section className="section lp-import" id="import">
      <div className="container lp-import-card" data-reveal>
        <div className="lp-import-copy">
          <span className="lp-eyebrow is-light">{t('บริการช่วยนำเข้าข้อมูล')}</span>
          <h2>
            {t('ไม่ต้องพิมพ์ข้อมูลใหม่')}
            <br />
            <span>{t('ส่งมา เดี๋ยวทีมลงให้')}</span>
          </h2>
          <p>{t('ใช้ Excel หรือสมุดจดอยู่ก็ย้ายมาได้ ทีม HorCare จัดข้อมูลห้องและผู้เช่าเข้าระบบให้ คุณแค่ตรวจแล้วเริ่มใช้')}</p>
          <ul className="lp-import-sources" aria-label={t('ข้อมูลที่รับได้')}>
            {sources.map((s) => (
              <li key={s}>
                <Ic d={P.check} size={16} /> {t(s)}
              </li>
            ))}
          </ul>
          <div className="hero-actions">
            <a className="button accent" href={IMPORT_URL} target="_blank" rel="noreferrer" data-track="import_send_file">
              {t('ส่งไฟล์ให้ทีมทาง LINE')}
              <Ic d={P.arrow} size={18} />
            </a>
          </div>
          <small>{t('รวมอยู่ในแพ็กเกจ HorCare Pro และ Business · แพ็กเกจฟรีนำเข้าห้องเองได้จากเทมเพลต Excel')}</small>
        </div>
        <ol className="lp-import-steps">
          {steps.map(([title, text], i) => (
            <li key={title}>
              <span className="lp-start-num">{i + 1}</span>
              <div>
                <b>{t(title)}</b>
                <p>{t(text)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
