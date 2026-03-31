// EXTENDED ROUTER CONFIGURATION
// This shows how to add more routes based on your navbar structure

import { getRoute } from './router-config.js'

// Extended routes for full site navigation
const extendedRoutes = {
  // Main pages
  '/': {
    name: 'home',
    path: 'index.html',
    title: 'Home - PK Engineering'
  },
  '/category': {
    name: 'category',
    path: 'pages/category.html',
    title: 'Product Category'
  },
  '/detail': {
    name: 'detail',
    path: 'pages/detail.html',
    title: 'Product Details'
  },
  '/contact': {
    name: 'contact',
    path: 'pages/contact_us.html',
    title: 'Contact Us'
  },

  // Product categories (you can organize these or handle via query params)
  '/product/ups': {
    name: 'ups',
    path: 'pages/category.html',
    title: 'UPS Products',
    meta: { category: 'UPS' }
  },
  '/product/battery-vrla': {
    name: 'battery-vrla',
    path: 'pages/category.html',
    title: 'Battery VRLA Products',
    meta: { category: 'Battery VRLA' }
  },
  '/product/battery-lithium': {
    name: 'battery-lithium',
    path: 'pages/category.html',
    title: 'Battery Lithium Products',
    meta: { category: 'Battery Lithium' }
  },
  '/product/bms': {
    name: 'bms',
    path: 'pages/category.html',
    title: 'BMS Products',
    meta: { category: 'BMS' }
  },

  // Service pages
  '/service/sla-battery': {
    name: 'service-sla',
    path: 'pages/detail.html',
    title: 'SLA Battery Service',
    meta: { type: 'service', title: 'For SLA Battery' }
  },
  '/service/lithium-battery': {
    name: 'service-lithium',
    path: 'pages/detail.html',
    title: 'Lithium Battery Service',
    meta: { type: 'service', title: 'For Lithium Battery' }
  },

  // Other pages
  '/project': {
    name: 'project',
    path: 'pages/detail.html',
    title: 'Our Projects',
    meta: { title: 'Project' }
  },
  '/references': {
    name: 'references',
    path: 'pages/detail.html',
    title: 'Site References',
    meta: { title: 'Site References' }
  }
}

// How to use in navbar:
/*
<a href="#" data-route="/category?category=UPS">UPS Products</a>
<a href="#" data-route="/product/ups">UPS (alternative)</a>
<a href="#" data-route="/contact">Contact Us</a>
<a href="#" data-route="/project">Projects</a>

// Or programmatically:
import { navigateTo } from './navigation.js'

// With query parameters:
navigateTo('/category?category=UPS&subcategory=EATON%20UPS')

// Or with clean routes:
navigateTo('/product/ups')
*/

export { extendedRoutes }
