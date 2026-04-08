// Router module - Handle client-side navigation with clean URLs
import { routes, getRoute } from './router-config.js'
import { normalizePath } from './url-utils'

class Router {
  constructor() {
    this.currentRoute = null
    this.initialized = false
  }

  init() {
    if (!this.initialized) {
      window.addEventListener('popstate', () => this.navigate(window.location.pathname + window.location.search))
      document.addEventListener('click', (event) => this.handleDocumentClick(event))
      this.initialized = true
    }

    const normalized = normalizePath(window.location.pathname)
    const resolvedRoute = getRoute(normalized, window.location.search)
    const initialTarget = this.buildPath(resolvedRoute)
    if (initialTarget !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState({}, '', `${initialTarget}${window.location.hash}`)
    }

    this.navigate(window.location.pathname + window.location.search, { replace: true })
  }

  handleDocumentClick(event) {
    const target = event.target
    if (!(target instanceof Element)) return

    const link = target.closest('a')
    if (!link) return
    if (link.target === '_blank' || link.hasAttribute('download')) return

    const href = link.getAttribute('href')
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return

    const url = new URL(href, window.location.origin)
    if (url.origin !== window.location.origin) return

    const normalizedPath = normalizePath(url.pathname)
    const route = getRoute(normalizedPath, url.search)
    if (!routes[route.path] && route.path !== '/detail' && route.path !== '/category') return

    event.preventDefault()
    this.push(`${this.buildPath(route)}${url.hash}`)
  }

  push(pathname) {
    const nextPath = pathname || '/'
    window.history.pushState({}, '', nextPath)
    this.navigate(nextPath)
  }

  navigate(pathWithSearch, options = {}) {
    const [pathname, search = ''] = pathWithSearch.split('?')
    const query = search ? `?${search}` : window.location.search
    const route = getRoute(pathname, query)
    const routeKey = `${route.path}${JSON.stringify(route.query)}`
    const currentKey = this.currentRoute ? `${this.currentRoute.path}${JSON.stringify(this.currentRoute.query)}` : null

    if (routeKey === currentKey && !options.replace) {
      return
    }

    this.currentRoute = route
    document.title = route.title
    window.dispatchEvent(new CustomEvent('page-loaded', { detail: route }))
  }

  buildPath(route) {
    const hasQuery = route.path === '/category' || route.path === '/detail'
    if (!hasQuery) return route.path

    const params = new URLSearchParams()
    Object.entries(route.query || {}).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    const query = params.toString()
    return query ? `${route.path}?${query}` : route.path
  }

  getCurrentRoute() {
    return this.currentRoute
  }
}

export default new Router()
