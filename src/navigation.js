// Navigation utility - Use this to add routing to navbar links
import router from './router.js'

// Enable routing on links with data-route attribute
// Example: <a href="#" data-route="/category">Category</a>

export function initNavigation() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-route]')
    if (link) {
      e.preventDefault()
      const route = link.getAttribute('data-route')
      router.push(route)
    }
  })
}

// Programmatic navigation
export function navigateTo(pathname) {
  router.push(pathname)
}

// Get current route
export function getCurrentRoute() {
  return router.getCurrentRoute()
}

// Listen to route changes
export function onRouteChange(callback) {
  window.addEventListener('page-loaded', (event) => {
    callback(event.detail)
  })
}
