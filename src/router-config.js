// Router configuration - Define all routes
export const routes = {
  '/': {
    name: 'home',
    path: 'index.html',
    title: 'PK Engineering Solution Service'
  },
  '/category': {
    name: 'category',
    path: 'pages/category.html',
    title: 'Category'
  },
  '/contact': {
    name: 'contact',
    path: 'pages/contact_us.html',
    title: 'Contact Us'
  },
  '/detail': {
    name: 'detail',
    path: 'pages/detail.html',
    title: 'Detail',
    requiresQuery: ['id'] // Requires query parameter
  }
}

// Get route by path
export function getRoute(pathname) {
  return routes[pathname] || routes['/']
}

// Get all route names
export function getRouteNames() {
  return Object.keys(routes)
}
