import './style.css'

import { loadComponents } from './js/components.js'
import './assets/img/logo-white.webp'

async function init() {
  await loadComponents()

  const { default: initNavbar } = await import('./js/navbar.js')
  initNavbar?.()

  if (document.querySelector('#pricing')) {
    const { default: initPricing } = await import('./js/pricing.js')
    initPricing?.()
  }

  if (document.querySelector('#login-form')) {
    const { default: initLogin } = await import('./js/login.js')
    initLogin?.()
  }
}

init()