export type QueryValue = string | undefined

export function normalizePath(pathname: string) {
  const cleanPath = pathname.replace(/\/+$/, '') || '/'

  switch (cleanPath) {
    case '/index.html':
      return '/'
    case '/category.html':
    case '/pages/category.html':
      return '/category'
    case '/detail.html':
    case '/pages/detail.html':
      return '/detail'
    case '/contact.html':
    case '/contact_us.html':
    case '/pages/contact_us.html':
      return '/contact'
    default:
      return cleanPath
  }
}

export function decodeParam(value: string | null) {
  return value ? decodeURIComponent(value) : ''
}

export function toQueryRecord(search: string) {
  const params = new URLSearchParams(search)
  return {
    category: decodeParam(params.get('category')),
    subcategory: decodeParam(params.get('subcategory')),
    detail: decodeParam(params.get('detail')),
    title: decodeParam(params.get('title'))
  }
}

export function buildCategoryHref(category: QueryValue, subcategory?: QueryValue) {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (subcategory) params.set('subcategory', subcategory)
  const query = params.toString()
  return query ? `/category?${query}` : '/category'
}

export function buildDetailHref(category: QueryValue, detail: QueryValue, subcategory?: QueryValue) {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (subcategory) params.set('subcategory', subcategory)
  if (detail) params.set('detail', detail)
  const query = params.toString()
  return query ? `/detail?${query}` : '/detail'
}

export function normalizeLegacyHref(href: string) {
  try {
    const url = new URL(href, window.location.origin)
    const pathname = normalizePath(url.pathname)
    return `${pathname}${url.search}${url.hash}`
  } catch {
    return href
  }
}
