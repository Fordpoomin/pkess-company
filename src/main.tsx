/** @jsx h */
import './app.css'
import router from './router.js'
import { App } from './App'
import { h, renderMarkup } from './tsx-runtime'

type LoadedData = {
  categoryData: Record<string, any>
  detailData: Record<string, any>
}

const state: {
  route: any
  loading: boolean
  data: LoadedData
} = {
  route: null,
  loading: true,
  data: {
    categoryData: {},
    detailData: {}
  }
}

let rootElement: HTMLElement | null = null
let desktopMenuCleanup: (() => void) | null = null
let scrollCleanup: (() => void) | null = null
let hoverCloseTimer = 0

function showLoader() {
  const loader = document.getElementById('page-loader')
  if (loader) loader.style.display = 'flex'
}

function hideLoader() {
  const loader = document.getElementById('page-loader')
  if (!loader) return
  window.setTimeout(() => {
    loader.style.display = 'none'
    document.body.classList.add('loaded')
  }, 180)
}

function render() {
  if (!rootElement || !state.route) return

  renderMarkup(
    rootElement,
    <App
      route={state.route}
      loading={state.loading}
      categoryData={state.data.categoryData}
      detailData={state.data.detailData}
    />
  )

  setupMobileMenu()
  setupDesktopMenus()
  setupNavbarScroll()
  setupRevealAnimations()
  setupImageFallback()
  hideLoader()
}

async function loadData() {
  const [categoryRes, detailRes] = await Promise.all([
    fetch('/data/category.json', { cache: 'no-store' }),
    fetch('/data/detail.json', { cache: 'no-store' })
  ])

  if (!categoryRes.ok || !detailRes.ok) {
    throw new Error('Failed to load site data')
  }

  const [categoryData, detailData] = await Promise.all([categoryRes.json(), detailRes.json()])
  state.data = { categoryData, detailData }
}

function setupMobileMenu() {
  const body = document.body
  const drawer = document.getElementById('mobileNav')
  const toggle = document.querySelector<HTMLElement>('[data-mobile-toggle]')
  const closers = Array.from(document.querySelectorAll<HTMLElement>('[data-mobile-close]'))

  if (!drawer || !toggle) return

  const closeMenu = () => body.classList.remove('mobile-nav-open')

  toggle.onclick = () => {
    body.classList.toggle('mobile-nav-open')
  }

  closers.forEach((closer) => {
    closer.onclick = closeMenu
  })

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu, { once: true })
  })
}

function setupDesktopMenus() {
  desktopMenuCleanup?.()

  const menuRoots = Array.from(document.querySelectorAll<HTMLElement>('[data-menu-root]'))
  if (!menuRoots.length) return

  const closeAll = () => {
    menuRoots.forEach((root) => {
      root.classList.remove('is-open')
      const trigger = root.querySelector<HTMLElement>('[data-menu-trigger]')
      trigger?.setAttribute('aria-expanded', 'false')
    })
  }

  const openMenu = (root: HTMLElement) => {
    window.clearTimeout(hoverCloseTimer)
    closeAll()
    root.classList.add('is-open')
    root.querySelector<HTMLElement>('[data-menu-trigger]')?.setAttribute('aria-expanded', 'true')
  }

  const scheduleClose = () => {
    window.clearTimeout(hoverCloseTimer)
    hoverCloseTimer = window.setTimeout(closeAll, 180)
  }

  const removeFns: Array<() => void> = []

  menuRoots.forEach((root) => {
    const trigger = root.querySelector<HTMLElement>('[data-menu-trigger]')
    const panel = root.querySelector<HTMLElement>('[data-menu-panel]')
    if (!trigger || !panel) return

    const handleEnter = () => openMenu(root)
    const handleLeave = () => scheduleClose()
    const handleFocus = () => openMenu(root)
    const handleClick = (event: Event) => {
      event.preventDefault()
      if (root.classList.contains('is-open')) {
        closeAll()
      } else {
        openMenu(root)
      }
    }

    trigger.addEventListener('mouseenter', handleEnter)
    panel.addEventListener('mouseenter', handleEnter)
    trigger.addEventListener('focus', handleFocus)
    root.addEventListener('mouseleave', handleLeave)
    if (trigger.tagName === 'BUTTON') {
      trigger.addEventListener('click', handleClick)
      removeFns.push(() => trigger.removeEventListener('click', handleClick))
    }

    removeFns.push(() => trigger.removeEventListener('mouseenter', handleEnter))
    removeFns.push(() => panel.removeEventListener('mouseenter', handleEnter))
    removeFns.push(() => trigger.removeEventListener('focus', handleFocus))
    removeFns.push(() => root.removeEventListener('mouseleave', handleLeave))
  })

  const handleDocumentClick = (event: Event) => {
    const target = event.target as HTMLElement | null
    if (!target?.closest('[data-menu-root]')) {
      closeAll()
    }
  }

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeAll()
  }

  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleEscape)

  desktopMenuCleanup = () => {
    removeFns.forEach((remove) => remove())
    document.removeEventListener('click', handleDocumentClick)
    document.removeEventListener('keydown', handleEscape)
  }
}

function setupNavbarScroll() {
  scrollCleanup?.()
  const navbar = document.querySelector<HTMLElement>('.site-navbar')
  if (!navbar) return

  const syncScrolled = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 12)
  }

  syncScrolled()
  window.addEventListener('scroll', syncScrolled, { passive: true })
  scrollCleanup = () => window.removeEventListener('scroll', syncScrolled)
}

function setupRevealAnimations() {
  const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
  if (!items.length) return

  items.forEach((item, index) => {
    item.style.setProperty('--delay', `${index * 60}ms`)
  })

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  items.forEach((item) => observer.observe(item))
}

function setupImageFallback() {
  const fallbackSrc = '/assets/images/placeholder.png'

  document.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
    if (img.dataset.fallbackApplied === '1') return

    img.onerror = () => {
      if (img.dataset.fallbackShown === '1') return
      img.dataset.fallbackShown = '1'
      img.srcset = ''
      img.src = fallbackSrc
      if (!img.alt) img.alt = 'image not available'
    }

    img.dataset.fallbackApplied = '1'
  })
}

async function bootstrap() {
  rootElement = document.getElementById('app')
  if (!rootElement) return

  showLoader()
  router.init()
  state.route = router.getCurrentRoute()
  render()

  window.addEventListener('page-loaded', (event: any) => {
    state.route = event.detail
    showLoader()
    render()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  try {
    await loadData()
  } catch (error) {
    console.error(error)
  } finally {
    state.loading = false
    render()
  }
}

bootstrap()
