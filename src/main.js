import './style.css'

import { loadComponents } from './js/components.js'
import './assets/img/logo-white.webp'

async function init() {
  await loadComponents()

  const { default: initNavbar } = await import('./js/navbar.js')

  initNavbar?.()
}

init()