/** @jsx h */
import { h } from '../tsx-runtime'
import { homeSections } from '../site-data'

export function HomePage() {
  return (
    <main className="content modern-home">
      <section className="hero-splash">
        <div className="hero-copy">
          <span className="hero-badge">Modernized Navigation Experience</span>
          <h1>พาเมนูหลักไปสู่ลุคที่ทันสมัยขึ้น พร้อมสีสันและจังหวะการเคลื่อนไหวที่ดูพรีเมียมกว่าเดิม</h1>
          <p>หน้าแรกถูกย้ายมาเรนเดอร์จาก TSX แล้ว ทำให้ต่อยอดคอมโพเนนต์และปรับดีไซน์ในอนาคตได้คล่องกว่าการแก้ HTML แบบเดิม</p>
          <div className="hero-actions">
            <a className="hero-button primary" href="/contact">คุยกับทีมงาน</a>
            <a className="hero-button secondary" href="/project">ดูผลงาน</a>
          </div>
        </div>
        <div className="hero-metrics">
          <article>
            <strong>TSX Shell</strong>
            <span>ย้ายหน้าแรกและเมนูหลักไปอยู่บน component-based structure</span>
          </article>
          <article>
            <strong>Glass Gradient</strong>
            <span>เมนูใหม่ใช้สีแบบ layered gradient พร้อม shadow และ blur</span>
          </article>
          <article>
            <strong>Mobile Ready</strong>
            <span>มี slide-in drawer สำหรับมือถือที่อ่านง่ายและกดสะดวกขึ้น</span>
          </article>
        </div>
      </section>

      <section className="content-showcase">
        {homeSections.map((src, index) => (
          <div className="showcase-frame reveal" style={`--delay:${index * 70}ms`}>
            <img src={src} alt={`PKESS showcase section ${index + 1}`} className="img-fluid w-100" />
          </div>
        ))}
      </section>
    </main>
  )
}
