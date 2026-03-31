/** @jsx h */
import { h } from './tsx-runtime'
import { CategoryPage } from './components/CategoryPage'
import { ContactPage } from './components/ContactPage'
import { DetailPage } from './components/DetailPage'
import { Footer } from './components/Footer'
import { HomePage } from './components/HomePage'
import { Navbar } from './components/Navbar'

function LoadingPage() {
  return (
    <main className="content page-shell">
      <section className="container py-5">
        <div className="rich-panel text-center">
          <h3>Loading content...</h3>
          <p className="text-muted mb-0">Preparing the latest product and detail data for this page.</p>
        </div>
      </section>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="content page-shell">
      <section className="container py-5">
        <div className="rich-panel text-center">
          <h3>Page not found</h3>
          <p className="text-muted">The requested path is not configured yet.</p>
        </div>
      </section>
    </main>
  )
}

function renderCurrentPage(props: any) {
  const route = props.route

  if (props.loading) {
    return <LoadingPage />
  }

  switch (route.path) {
    case '/':
      return <HomePage />
    case '/category':
      return <CategoryPage category={route.query.category} subcategory={route.query.subcategory} categoryData={props.categoryData} />
    case '/detail':
    case '/project':
    case '/references':
    case '/service/sla-battery':
    case '/service/lithium-battery':
      return (
        <DetailPage
          pathname={route.path}
          category={route.query.category}
          subcategory={route.query.subcategory}
          detail={route.query.detail}
          detailData={props.detailData}
        />
      )
    case '/contact':
      return <ContactPage />
    default:
      return <NotFoundPage />
  }
}

export function App(props: any) {
  return (
    <div className="app-shell">
      <div id="page-loader">
        <div className="loader-card">
          <div className="spinner-border text-light" role="status" style="width: 3rem; height: 3rem;">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <Navbar />
      <div id="page-content">
        {renderCurrentPage(props)}
      </div>
      <Footer />
    </div>
  )
}
