/** @jsx h */
import { h } from '../tsx-runtime'
import { Breadcrumb } from './Breadcrumb'
import { productGroups, serviceLinks } from '../site-data'

export function GroupLandingPage(props: { type: 'products' | 'services' }) {
  const isProducts = props.type === 'products'
  const title = isProducts ? 'Product Groups' : 'Service Groups'
  const subtitle = isProducts
    ? 'เลือกกลุ่มสินค้าหลักเพื่อเข้าสู่หมวดที่ต้องการ'
    : 'รวมบริการหลักที่เข้าถึงได้จากเมนูใหญ่โดยตรง'

  return (
    <main className="content page-shell">
      <section className="hero-banner modern-page-hero">
        <div className="overlay text-center text-white py-5">
          <h1>{title}</h1>
          <p className="lead">{subtitle}</p>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: isProducts ? 'Product' : 'Service', active: true }]} />

      <section className="container py-4 pb-5">
        {isProducts ? (
          <div className="group-grid">
            {productGroups.map((group) => (
              <article className="rich-panel group-card">
                <div className="section-head">
                  <h5>{group.title}</h5>
                  <p>{group.accent}</p>
                </div>
                <div className="group-links">
                  <a className="group-primary-link" href={group.href}>Open {group.title}</a>
                  {group.links.map((link) => (
                    <a className="group-sub-link" href={link.href}>
                      <strong>{link.label}</strong>
                      {link.description ? <span>{link.description}</span> : ''}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="group-grid group-grid-services">
            {serviceLinks.map((link) => (
              <article className="rich-panel group-card">
                <div className="section-head">
                  <h5>{link.label}</h5>
                  <p>{link.description}</p>
                </div>
                <a className="group-primary-link" href={link.href}>Open service page</a>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
