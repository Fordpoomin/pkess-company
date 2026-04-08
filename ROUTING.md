# Dynamic Routing System

This project now includes a dynamic page loading system powered by Vite.

## How to Use

### 1. **Add Routes to Configuration**

Edit `src/router-config.js` to add new routes:

```javascript
export const routes = {
  '/': {
    name: 'home',
    path: 'index.html',
    title: 'Home'
  },
  '/about': {
    name: 'about',
    path: 'pages/about.html',
    title: 'About Us'
  }
  // Add more routes here
}
```

### 2. **Create Navigation Links**

Use the `data-route` attribute on links:

```html
<a href="#" data-route="/">Home</a>
<a href="#" data-route="/category">Category</a>
<a href="#" data-route="/contact">Contact</a>
```

The router will automatically handle clicks on these links and load the content dynamically.

### 3. **Programmatic Navigation**

In your JavaScript code:

```javascript
import { navigateTo } from './src/navigation.js'

// Navigate to a route
navigateTo('/category')
navigateTo('/contact')
```

### 4. **Listen to Route Changes**

```javascript
import { onRouteChange } from './src/navigation.js'

onRouteChange((route) => {
  console.log('Navigated to:', route.name)
  // Do something when route changes
})
```

## Features

✅ **Dynamic Page Loading** - Load pages without full page reload
✅ **History API** - Browser back/forward buttons work
✅ **URL-based Routing** - Routes based on pathname
✅ **Page Transitions** - Loader shows during page transitions
✅ **Script Execution** - Scripts in loaded pages are executed
✅ **Error Handling** - Graceful error display if page fails to load
✅ **Query Parameters** - Support for ?id=123 style parameters

## File Structure

```
src/
  ├── main.js              - Main entry point
  ├── router.js            - Router implementation
  ├── router-config.js     - Route configuration
  ├── navigation.js        - Navigation utilities
  └── supabaseClient.js    - Supabase config (commented out)

pages/
  ├── category.html        - Category page
  ├── contact_us.html      - Contact page
  └── detail.html          - Detail page

index.html                  - Home page (main entry)
```

## Page Loading

Pages are loaded into the `#page-content` container. The router will:

1. Fetch the page HTML
2. Extract the main content
3. Insert it into the container
4. Execute any scripts in the loaded content
5. Dispatch a `page-loaded` event

## Troubleshooting

**Links not working?**
- Make sure links have `data-route="/path"` attribute
- Routes must be defined in `src/router-config.js`

**Styles not loading in dynamic pages?**
- CSS is loaded via `<link>` tags in HTML files
- Make sure CSS paths are correct in your page files

**Scripts not executing?**
- Scripts in loaded pages are automatically executed
- Use `onRouteChange()` to run code when pages load

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Requires ES6 module support
