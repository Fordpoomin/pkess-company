/** @jsx h */
import { h } from '../tsx-runtime'
import { Breadcrumb } from './Breadcrumb'
import { buildCategoryHref, buildDetailHref, normalizeLegacyHref } from '../url-utils'

type Item = {
  title: string
  img: string
  link?: string
}

type CategoryData = Record<string, Record<string, Item[] | Item[]> & { _items?: Item[] }>

function normalizeImageSrc(src: string) {
  return normalizeLegacyHref(src).replace(/^\/detail/, '/assets').replace(/^\/category/, '/assets')
}

function resolveItemHref(category: string, title: string, subcategory?: string, legacyHref?: string) {
  if (legacyHref) {
    const normalized = normalizeLegacyHref(legacyHref)
    if (normalized.startsWith('/detail')) return normalized
  }

  return buildDetailHref(category, title, subcategory)
}

function ProductCard(props: { title: string; img: string; href: string }) {
  return (
    <div className="col-6 col-md-4 col-lg-3">
      <a href={props.href} className="text-decoration-none text-dark d-block h-100">
        <div className="card-product card-product-modern">
          <div className="thumb">
            <img src={props.img} alt={props.title} />
          </div>
          <div className="title">
            <span>{props.title}</span>
          </div>
        </div>
      </a>
    </div>
  )
}

export function CategoryPage(props: {
  category: string
  subcategory: string
  categoryData: CategoryData
}) {
  const category = props.category
  const subcategory = props.subcategory
  const catData = props.categoryData?.[category] || {}
  const directItems = (catData._items || []) as Item[]
  const subcategories = Object.keys(catData).filter((key) => key !== '_items')
  const subcategoryItems = (catData[subcategory] || []) as Item[]

  const crumbs = subcategory
    ? [
        { label: 'Home', href: '/' },
        { label: category || 'Category', href: buildCategoryHref(category) },
        { label: subcategory || 'Subcategory', active: true }
      ]
    : [
        { label: 'Home', href: '/' },
        { label: category || 'Category', active: true }
      ]

  return (
    <main className="content page-shell">
      <section className="hero-banner modern-page-hero">
        <div className="overlay text-center text-white py-5">
          <h1>{subcategory || category || 'Category'}</h1>
          <p className="lead">{subcategory ? category : 'Explore product lines and subcategories'}</p>
        </div>
      </section>

      <Breadcrumb items={crumbs} />

      <section className="container mt-4 pb-5">
        {!subcategory && directItems.length ? (
          <div className="mb-5">
            <div className="section-head">
              <h5>Items</h5>
              <p>สินค้าในหมวดนี้ที่เข้าถึงได้โดยตรง</p>
            </div>
            <div className="row g-4">
              {directItems.map((item) => (
                <ProductCard
                  title={item.title}
                  img={normalizeImageSrc(item.img)}
                  href={resolveItemHref(category, item.title, undefined, item.link)}
                />
              ))}
            </div>
          </div>
        ) : ''}

        {!subcategory ? (
          <div className="mb-4">
            <div className="section-head">
              <h5>Categories</h5>
              <p>เลือกหมวดย่อยเพื่อดูรายการสินค้าอย่างละเอียด</p>
            </div>
            <div className="row g-4">
              {subcategories.map((sub) => {
                const firstItem = ((catData[sub] as Item[]) || [])[0]
                return (
                  <ProductCard
                    title={sub}
                    img={normalizeImageSrc(firstItem?.img || '/assets/images/placeholder.png')}
                    href={buildCategoryHref(category, sub)}
                  />
                )
              })}
            </div>
            {!directItems.length && !subcategories.length ? <p className="text-muted text-center">No items found in this category.</p> : ''}
          </div>
        ) : (
          <div className="mb-4">
            <div className="section-head">
              <h5>{subcategory}</h5>
              <p>รายการสินค้าในหมวดย่อยนี้</p>
            </div>
            <div className="row g-4">
              {subcategoryItems.map((item) => (
                <ProductCard
                  title={item.title}
                  img={normalizeImageSrc(item.img)}
                  href={resolveItemHref(category, item.title, subcategory, item.link)}
                />
              ))}
            </div>
            {!subcategoryItems.length ? <p className="text-muted text-center">No items found in this subcategory.</p> : ''}
          </div>
        )}
      </section>
    </main>
  )
}
