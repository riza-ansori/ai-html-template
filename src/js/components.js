export async function loadComponents() {
  const elements = document.querySelectorAll('[data-component]')

  await Promise.all(
    [...elements].map(async (element) => {
      const componentName = element.dataset.component

      try {
        const response = await fetch(
          `/src/components/${componentName}.html`
        )

        if (!response.ok) {
          throw new Error(
            `Failed to load component: ${componentName}`
          )
        }

        const html = await response.text()

        if (element.closest('head')) {
          element.insertAdjacentHTML('beforebegin', html)
          element.remove()
        } else {
          element.outerHTML = html
        }
      } catch (error) {
        console.error(error)
      }
    })
  )
}