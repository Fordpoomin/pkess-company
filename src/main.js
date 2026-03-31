// Vite Entry Point
// Import router
import router from './router.js'

// CSS is loaded via <link> in HTML (public folder files)
// JS is loaded via <script src> in HTML (public folder files)
function loadComponents() {
  // Load navbar
  fetch('/assets/components/navbar.html')
    .then(res => res.text())
    .then(html => {
      const navbarPlaceholder = document.getElementById('navbar-placeholder')
      if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = html
      }
    })
    .catch(error => console.error('Error loading navbar:', error))

  // Load footer
  fetch('/assets/components/footer.html')
    .then(res => res.text())
    .then(html => {
      const footerPlaceholder = document.getElementById('footer-placeholder')
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = html
      }
    })
    .catch(error => console.error('Error loading footer:', error))
}

// Load scripts
function loadScripts() {
  const script = document.createElement('script')
  script.src = '/assets/js/scripts.js'
  script.type = 'text/javascript'
  document.body.appendChild(script)
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  // Load components (navbar, footer)
  loadComponents()
  loadScripts()
  
  // Initialize router after components are loaded
  setTimeout(() => {
    router.init('page-content')
  }, 500)

  // Hide loader when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('page-loader')
      if (loader) {
        loader.style.display = 'none'
      }
      document.body.classList.add('loaded')
    }, 500)
  })
})

// Supabase client - configure when ready
// import { supabase } from './supabaseClient.js'
// export { supabase }
