// Router module - Handle page navigation and dynamic loading
import { routes, getRoute } from './router-config.js'

class Router {
  constructor() {
    this.currentRoute = null
    this.contentContainer = null
    this.isLoading = false
  }

  async init(containerId = 'page-content') {
    this.contentContainer = document.getElementById(containerId)
    if (!this.contentContainer) {
      console.warn(`Container #${containerId} not found`)
      return
    }

    // Listen for navigation events
    window.addEventListener('popstate', () => this.navigate(window.location.pathname))
    
    // Handle link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a')
      if (link && link.dataset.route) {
        e.preventDefault()
        this.push(link.dataset.route)
      }
    })

    // Initial load
    const route = getRoute(window.location.pathname)
    this.currentRoute = route
    document.title = route.title
    
    // Trigger page-loaded event for home page
    window.dispatchEvent(new CustomEvent('page-loaded', { detail: route }))
  }

  async navigate(pathname) {
    const route = getRoute(pathname)
    
    if (this.currentRoute?.path === route.path) {
      return // Already on this route
    }

    // Special case: home page is already loaded in DOM
    if (pathname === '/' && this.contentContainer.innerHTML.trim() !== '') {
      this.currentRoute = route
      document.title = route.title
      window.dispatchEvent(new CustomEvent('page-loaded', { detail: route }))
      return
    }

    if (this.isLoading) {
      return // Already loading
    }

    this.isLoading = true
    this.showLoader()

    try {
      await this.loadPage(route)
      this.currentRoute = route
      document.title = route.title
    } catch (error) {
      console.error('Navigation error:', error)
      this.showError(`Failed to load ${route.title}`)
    } finally {
      this.isLoading = false
      this.hideLoader()
    }
  }

  async loadPage(route) {
    try {
      const response = await fetch(`/${route.path}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const html = await response.text()
      
      // Extract body content or specific container
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      
      // Try to find main content - look for common selectors
      let content = doc.querySelector('.content') ||
                    doc.querySelector('main') ||
                    doc.querySelector('[role="main"]') ||
                    doc.body
      
      // If we found a specific container, use it
      if (content && content !== doc.body) {
        this.contentContainer.innerHTML = content.innerHTML
      } else {
        // Otherwise extract content between navbar and footer
        const navbar = doc.getElementById('navbar-placeholder')
        const footer = doc.querySelector('footer')
        
        let startIdx = 0
        let endIdx = doc.body.children.length
        
        if (navbar) {
          startIdx = Array.from(doc.body.children).indexOf(navbar) + 1
        }
        if (footer) {
          endIdx = Array.from(doc.body.children).indexOf(footer)
        }
        
        let contentHtml = ''
        for (let i = startIdx; i < endIdx; i++) {
          contentHtml += doc.body.children[i].outerHTML
        }
        
        this.contentContainer.innerHTML = contentHtml || doc.body.innerHTML
      }

      // Execute scripts in the loaded content
      this.executeScripts(this.contentContainer)
      
      // Dispatch custom event for page load
      window.dispatchEvent(new CustomEvent('page-loaded', { detail: route }))
    } catch (error) {
      throw error
    }
  }

  executeScripts(container) {
    const scripts = container.querySelectorAll('script')
    scripts.forEach(script => {
      const newScript = document.createElement('script')
      newScript.textContent = script.textContent
      newScript.type = script.type
      if (script.src) {
        newScript.src = script.src
      }
      container.appendChild(newScript)
    })
  }

  push(pathname) {
    window.history.pushState({}, '', pathname)
    this.navigate(pathname)
  }

  showLoader() {
    const loader = document.getElementById('page-loader')
    if (loader) {
      loader.style.display = 'flex'
    }
  }

  hideLoader() {
    const loader = document.getElementById('page-loader')
    if (loader) {
      setTimeout(() => {
        loader.style.display = 'none'
      }, 300)
    }
  }

  showError(message) {
    const errorHtml = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error:</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `
    this.contentContainer.innerHTML = errorHtml
  }

  // Get current route info
  getCurrentRoute() {
    return this.currentRoute
  }
}

export default new Router()
