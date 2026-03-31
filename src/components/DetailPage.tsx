/** @jsx h */
import { h } from '../tsx-runtime'
import { contentPages } from '../content-data'
import { Breadcrumb } from './Breadcrumb'
import { buildCategoryHref } from '../url-utils'
import { normalizeLegacyHref } from '../url-utils'

type DetailEntry = {
  imgs?: string[]
  html?: string
}

type DetailData = Record<string, Record<string, Record<string, DetailEntry>>>

function normalizeAssetPath(src?: string) {
  if (!src) return '/assets/images/placeholder.png'
  return normalizeLegacyHref(src).replace(/^\/detail/, '/assets').replace(/^\/category/, '/assets')
}

function resolveDetailImages(images?: string[]) {
  const normalizedImages = (images || []).map(normalizeAssetPath)
  const filteredImages = normalizedImages.filter((src, index) => {
    if (index === 0 && /-main\.(jpg|jpeg|png|webp|avif)$/i.test(src) && normalizedImages.length > 1) {
      return false
    }
    return true
  })

  return filteredImages.length ? filteredImages : ['/assets/images/placeholder.png']
}

function getDetailData(detailData: DetailData, category: string, subcategory: string, detail: string) {
  const byCategory = detailData?.[category] || {}
  const bySubcategory = byCategory?.[subcategory] ?? byCategory?.[''] ?? {}
  return bySubcategory?.[detail]
}

export function DetailPage(props: {
  pathname: string
  category: string
  subcategory: string
  detail: string
  detailData: DetailData
}) {
  const staticPage = contentPages[props.pathname as keyof typeof contentPages]

  if (staticPage) {
    return (
      <main className="content page-shell">
        <section className="hero-banner modern-page-hero">
          <div className="overlay text-center text-white py-5">
            <h1>{staticPage.title}</h1>
            <p className="lead">{staticPage.subtitle}</p>
          </div>
        </section>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: staticPage.title, active: true }]} />
        <section className="container py-4 pb-5">
          <div className="rich-panel" dangerouslySetInnerHTML={staticPage.html}></div>
        </section>
      </main>
    )
  }

  const data = getDetailData(props.detailData, props.category, props.subcategory, props.detail)
  const images = resolveDetailImages(data?.imgs)
  const html = data?.html || '<p class="text-muted">Coming soon...</p>'
  const crumbs = props.subcategory
    ? [
        { label: 'Home', href: '/' },
        { label: props.category || 'Category', href: buildCategoryHref(props.category) },
        { label: props.subcategory || 'Subcategory', href: buildCategoryHref(props.category, props.subcategory) },
        { label: props.detail || 'Detail', active: true }
      ]
    : [
        { label: 'Home', href: '/' },
        { label: props.category || 'Category', href: buildCategoryHref(props.category) },
        { label: props.detail || 'Detail', active: true }
      ]

  return (
    <main className="content page-shell">
      <section className="hero-banner modern-page-hero">
        <div className="overlay text-center text-white py-5">
          <h1>{props.detail || 'Detail'}</h1>
          <p className="lead">{props.subcategory ? `${props.category} • ${props.subcategory}` : props.category}</p>
        </div>
      </section>
      <Breadcrumb items={crumbs} />
      <section className="container-lg py-4 pb-5">
        <div className="detail-layout">
          <div className="detail-media">
            <img src={images[0]} className="img-fluid rounded-4 shadow-sm" alt={props.detail || 'product'} />
          </div>
          <div className="detail-copy">
            <h3>{props.detail || 'Detail'}</h3>
            <div className="text-secondary rich-panel" dangerouslySetInnerHTML={html}></div>
          </div>
        </div>
        {images.length > 1 ? (
          <div className="detail-gallery">
            {images.slice(1).map((src) => (
              <img src={src} className="img-fluid w-100" alt={props.detail || 'product'} />
            ))}
          </div>
        ) : ''}
      </section>
    </main>
  )
}
