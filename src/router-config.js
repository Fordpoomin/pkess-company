import { normalizePath, toQueryRecord } from './url-utils'

export const routes = {
  '/': {
    name: 'home',
    title: 'PK Engineering Solution Service'
  },
  '/category': {
    name: 'category',
    title: 'Category'
  },
  '/detail': {
    name: 'detail',
    title: 'Detail'
  },
  '/contact': {
    name: 'contact',
    title: 'Contact Us'
  },
  '/project': {
    name: 'project',
    title: 'Project'
  },
  '/references': {
    name: 'references',
    title: 'Site References'
  },
  '/service/sla-battery': {
    name: 'service-sla',
    title: 'For SLA Battery'
  },
  '/service/lithium-battery': {
    name: 'service-lithium',
    title: 'For Lithium Battery'
  }
}

export function getRoute(pathname, search = '') {
  const normalizedPath = normalizePath(pathname)
  const query = toQueryRecord(search)
  const titleAliases = {
    'For SLA Battery': '/service/sla-battery',
    'For Lithium Battery': '/service/lithium-battery',
    Project: '/project',
    'Site References': '/references',
    'Contact Us': '/contact'
  }
  const aliasedPath = normalizedPath === '/detail' && query.title ? titleAliases[query.title] || normalizedPath : normalizedPath
  const route = routes[aliasedPath] || routes['/']

  return {
    ...route,
    path: aliasedPath,
    query
  }
}

export function getRouteNames() {
  return Object.keys(routes)
}
