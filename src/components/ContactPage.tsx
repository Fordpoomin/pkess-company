/** @jsx h */
import { h } from '../tsx-runtime'
import { Breadcrumb } from './Breadcrumb'

export function ContactPage() {
  return (
    <main className="content page-shell">
      <section className="hero-banner modern-page-hero">
        <div className="overlay">
          <h1 id="page-title">CONTACT US</h1>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact Us', active: true }]} />

      <section className="container py-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="contact-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.7856039997456!2d100.67642437486256!3d14.055158090173853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d8109d0b74d89%3A0x8233cb757eacc231!2sPK%20engineering%20solution%20service%20company!5e0!3m2!1sth!2sth!4v1693649714587!5m2!1sth!2sth"
                width="100%"
                height="320"
                style="border:0;"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="mt-3 text-center">
                <a
                  href="https://www.google.com/maps/place/PK+engineering+solution+service+company/@14.055158,100.678613,17z/"
                  target="_blank"
                  rel="noreferrer"
                  className="hero-button secondary contact-map-link"
                >
                  เปิดใน Google Maps
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="contact-card contact-info">
              <h5>PK ENGINEERING SOLUTION SERVICE CO., LTD.</h5>
              <p>18/26 Moo.5, Sub-district Khlong Si, District Khlong Luang, Pathum Thani 12120</p>
              <p>Tax ID: <strong>0125556007364</strong></p>
              <p><strong>E-mail:</strong> <a href="mailto:sales@pk-ess.com">sales@pk-ess.com</a> / <a href="mailto:admin@pk-ess.com">admin@pk-ess.com</a></p>
              <p><strong>Phone:</strong> 02-944-4588 <span className="text-danger">(24 Hr)</span></p>
              <p><strong>Fax:</strong> 02-944-4587</p>
              <p className="fw-bold text-danger">SERVICE HOTLINE : 06-3268-8721</p>
            </div>
          </div>
        </div>

        <div className="row text-center mt-4 g-4">
          <div className="col-md-6">
            <div className="contact-card">
              <img src="/assets/images/line-service-admin.jpg" className="img-fluid" alt="Line Service Admin" width="220" />
              <div className="mt-3">Line Service admin</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact-card">
              <img src="/assets/images/line-service-hotline.jpg" className="img-fluid" alt="Line Service Hotline" width="220" />
              <div className="mt-3">SERVICE HOTLINE</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
