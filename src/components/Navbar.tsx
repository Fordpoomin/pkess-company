/** @jsx h */
import { h } from '../tsx-runtime'
import { primaryLinks, productGroups, serviceLinks } from '../site-data'

function isCurrentLink(href: string) {
  const currentPath = window.location.pathname
  const currentUrl = `${window.location.pathname}${window.location.search}`

  if (href === '/') {
    return currentPath === '/' || /\/index\.html$/.test(currentPath)
  }

  return currentUrl === href || currentPath === href || currentUrl.startsWith(`${href}?`)
}

export function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar site-navbar fixed-top">
        <div className="container-fluid navbar-shell">
          <a className="navbar-brand brand-lockup" href="/" aria-label="PK Engineering Solution Service">
            <span className="brand-mark">
              <img src="/assets/images/logo.png" alt="PKESS logo" className="brand-logo" />
            </span>
            <span className="brand-copy">
              <span className="brand-kicker">Engineering Power Solutions</span>
              <span className="brand-title">PK ENGINEERING SOLUTION SERVICE CO.,LTD.</span>
            </span>
          </a>

          <div className="desktop-nav">
            <a className={`nav-chip ${isCurrentLink('/') ? 'is-active' : ''}`} href="/">Home</a>

            <div className="nav-flyout" data-menu-root>
              <a className={`nav-chip nav-chip-button ${isCurrentLink('/products') ? 'is-active' : ''}`} href="/products" data-menu-trigger="products" aria-expanded="false">
                Product
                <span className="nav-chip-glow"></span>
              </a>
              <div className="menu-panel mega-panel" data-menu-panel="products">
                <div className="panel-intro">
                  <span className="panel-eyebrow">Featured Product Lines</span>
                  <h3>Browse every product group</h3>
                  <p>Open the product group page directly or jump into a category from the quick menu.</p>
                  <a className="group-primary-link" href="/products">View all product groups</a>
                </div>
                <div className="mega-grid">
                  {productGroups.map((group) => (
                    <section className="mega-card">
                      <a className="mega-card-title" href={group.href}>{group.title}</a>
                      <span className="mega-card-accent">{group.accent}</span>
                      <div className="mega-link-list">
                        {group.links.map((link) => (
                          <a className="mega-link" href={link.href}>
                            <span>{link.label}</span>
                            {link.description ? <small>{link.description}</small> : ''}
                          </a>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>

            <div className="nav-flyout" data-menu-root>
              <a className={`nav-chip nav-chip-button ${isCurrentLink('/services') ? 'is-active' : ''}`} href="/services" data-menu-trigger="services" aria-expanded="false">
                Service
                <span className="nav-chip-glow"></span>
              </a>
              <div className="menu-panel service-panel" data-menu-panel="services">
                <a className="group-primary-link" href="/services">View all service groups</a>
                {serviceLinks.map((link) => (
                  <a className="service-link" href={link.href}>
                    <strong>{link.label}</strong>
                    <span>{link.description}</span>
                  </a>
                ))}
              </div>
            </div>

            {primaryLinks.slice(1).map((link) => (
              <a className={`nav-chip ${isCurrentLink(link.href) ? 'is-active' : ''}`} href={link.href}>{link.label}</a>
            ))}
          </div>

          <button className="mobile-nav-toggle" type="button" data-mobile-toggle aria-label="Open menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className="mobile-nav-backdrop" data-mobile-close></div>
      <aside className="mobile-nav-drawer" id="mobileNav">
        <div className="mobile-nav-head">
          <div>
            <span className="panel-eyebrow">Quick Navigation</span>
            <h3>Menu</h3>
          </div>
          <button className="mobile-close" type="button" data-mobile-close aria-label="Close menu">x</button>
        </div>

        <div className="mobile-nav-body">
          <a className="mobile-link" href="/">Home</a>
          <a className="mobile-link" href="/products">Product</a>

          <details className="mobile-group" open>
            <summary>Product</summary>
            <div className="mobile-group-body">
              {productGroups.map((group) => (
                <section className="mobile-product-card">
                  <a className="mobile-product-title" href={group.href}>{group.title}</a>
                  <div className="mobile-sub-links">
                    {group.links.map((link) => (
                      <a className="mobile-sub-link" href={link.href}>{link.label}</a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </details>

          <a className="mobile-link" href="/services">Service</a>
          <details className="mobile-group">
            <summary>Service</summary>
            <div className="mobile-group-body">
              {serviceLinks.map((link) => (
                <a className="mobile-sub-link" href={link.href}>{link.label}</a>
              ))}
            </div>
          </details>

          {primaryLinks.slice(1).map((link) => (
            <a className="mobile-link" href={link.href}>{link.label}</a>
          ))}
        </div>
      </aside>
    </header>
  )
}
