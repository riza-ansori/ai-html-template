export default function initNavbar() {
  const header = document.querySelector('#site-header')
  const mobileTrigger = document.querySelector('#mobile-menu-trigger')
  const mobileMenu = document.querySelector('#mobile-menu')
  const menuIcon = document.querySelector('#menu-icon')
  const closeIcon = document.querySelector('#close-icon')

  const solutionsTrigger =
    document.querySelector('#solutions-trigger')

  const solutionsMenu =
    document.querySelector('#solutions-menu')

  if (!header) return

  let mobileMenuOpen = false
  let solutionsMenuOpen = false

  function updateHeader() {
    if (window.scrollY > 20) {
      header.classList.add(
        'border-border',
        'bg-surface/90',
        'backdrop-blur-md',
        'shadow-sm'
      )

      header.classList.remove(
        'border-transparent',
        'bg-transparent'
      )
    } else {
      header.classList.remove(
        'border-border',
        'bg-surface/90',
        'backdrop-blur-md',
        'shadow-sm'
      )

      header.classList.add(
        'border-transparent',
        'bg-transparent'
      )
    }
  }

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen

    mobileMenu.classList.toggle(
      'hidden',
      !mobileMenuOpen
    )

    menuIcon.classList.toggle(
      'hidden',
      mobileMenuOpen
    )

    closeIcon.classList.toggle(
      'hidden',
      !mobileMenuOpen
    )

    mobileTrigger.setAttribute(
      'aria-expanded',
      String(mobileMenuOpen)
    )

    document.body.classList.toggle(
      'overflow-hidden',
      mobileMenuOpen
    )
  }

  function closeMobileMenu() {
    mobileMenuOpen = false

    mobileMenu.classList.add('hidden')

    menuIcon.classList.remove('hidden')
    closeIcon.classList.add('hidden')

    mobileTrigger.setAttribute(
      'aria-expanded',
      'false'
    )

    document.body.classList.remove('overflow-hidden')
  }

  function toggleSolutionsMenu() {
    solutionsMenuOpen = !solutionsMenuOpen

    solutionsMenu.classList.toggle(
      'invisible',
      !solutionsMenuOpen
    )

    solutionsMenu.classList.toggle(
      'opacity-0',
      !solutionsMenuOpen
    )

    solutionsMenu.classList.toggle(
      'translate-y-2',
      !solutionsMenuOpen
    )

    solutionsMenu.classList.toggle(
      'visible',
      solutionsMenuOpen
    )

    solutionsMenu.classList.toggle(
      'opacity-100',
      solutionsMenuOpen
    )

    solutionsMenu.classList.toggle(
      'translate-y-0',
      solutionsMenuOpen
    )

    solutionsTrigger.setAttribute(
      'aria-expanded',
      String(solutionsMenuOpen)
    )
  }

  function closeSolutionsMenu() {
    solutionsMenuOpen = false

    solutionsMenu.classList.add(
      'invisible',
      'opacity-0',
      'translate-y-2'
    )

    solutionsMenu.classList.remove(
      'visible',
      'opacity-100',
      'translate-y-0'
    )

    solutionsTrigger.setAttribute(
      'aria-expanded',
      'false'
    )
  }

  window.addEventListener('scroll', updateHeader)

  mobileTrigger?.addEventListener(
    'click',
    toggleMobileMenu
  )

  solutionsTrigger?.addEventListener(
    'click',
    toggleSolutionsMenu
  )

  document.addEventListener('click', (event) => {
    if (
      solutionsMenuOpen &&
      !solutionsTrigger.contains(event.target) &&
      !solutionsMenu.contains(event.target)
    ) {
      closeSolutionsMenu()
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeSolutionsMenu()
      closeMobileMenu()
    }
  })

  document
    .querySelectorAll('#mobile-menu a')
    .forEach((link) => {
      link.addEventListener(
        'click',
        closeMobileMenu
      )
    })

  updateHeader()
}