export default function initPricing() {

  const billingButtons = document.querySelectorAll('[data-billing]')
  const priceElements = document.querySelectorAll('[data-price]')
  const billingLabels = document.querySelectorAll('[data-billing-label]')

  const pricing = {
    monthly: {
      pro: '$19',
      team: '$49',
    },

    yearly: {
      pro: '$15',
      team: '$39',
    },
  }

  billingButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const billing = button.dataset.billing

      // Update prices
      priceElements.forEach((priceElement) => {
        const plan = priceElement.dataset.price
        if (pricing[billing]?.[plan]) {
          priceElement.textContent = pricing[billing][plan]
        }
      })

      // Update billing labels
      billingLabels.forEach((label) => {
        label.textContent =
            billing === 'yearly'
            ? 'Billed yearly'
            : 'Billed monthly'
        })

      // Update active button
      billingButtons.forEach((billingButton) => {

        const isActive =
          billingButton.dataset.billing === billing

        billingButton.classList.toggle(
          'bg-foreground',
          isActive
        )

        billingButton.classList.toggle(
          'text-background',
          isActive
        )

        billingButton.classList.toggle(
          'text-muted',
          !isActive
        )

        billingButton.classList.toggle(
          'hover:text-foreground',
          !isActive
        )
      })
    })
  })
}