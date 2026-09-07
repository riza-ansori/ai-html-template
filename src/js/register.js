export default function initRegister() {
  const form = document.querySelector('#register-form')

  if (!form) return

  const nameInput = document.querySelector('#name')
  const emailInput = document.querySelector('#email')
  const passwordInput = document.querySelector('#password')
  const confirmPasswordInput = document.querySelector('#confirm-password')

  const togglePassword = document.querySelector('#toggle-password')
  const toggleConfirmPassword = document.querySelector('#toggle-confirm-password')

  const toggleVisibility = (input, button) => {
    const showIcon = button.querySelector('[data-icon="show"]')
    const hideIcon = button.querySelector('[data-icon="hide"]')

    const isHidden = input.type === 'password'

    input.type = isHidden ? 'text' : 'password'

    showIcon.classList.toggle('hidden', isHidden)
    hideIcon.classList.toggle('hidden', !isHidden)

    button.setAttribute(
      'aria-label',
      isHidden ? 'Hide password' : 'Show password'
    )

    button.setAttribute(
      'aria-pressed',
      String(isHidden)
    )
  }

  togglePassword?.addEventListener('click', () => {
    toggleVisibility(passwordInput, togglePassword)
  })

  toggleConfirmPassword?.addEventListener('click', () => {
    toggleVisibility(confirmPasswordInput, toggleConfirmPassword)
  })

  const showError = (input, message) => {
    const error = document.querySelector(`#${input.id}-error`)

    input.classList.add('border-red-500')
    error.textContent = message
    error.classList.remove('hidden')
  }

  const clearError = (input) => {
    const error = document.querySelector(`#${input.id}-error`)

    input.classList.remove('border-red-500')
    error.textContent = ''
    error.classList.add('hidden')
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateName = () => {
    clearError(nameInput)

    if (!nameInput.value.trim()) {
      showError(nameInput, 'Full name is required.')
      return false
    }

    return true
  }

  const validateEmail = () => {
    clearError(emailInput)

    const email = emailInput.value.trim()

    if (!email) {
      showError(emailInput, 'Email address is required.')
      return false
    }

    if (!isValidEmail(email)) {
      showError(emailInput, 'Please enter a valid email address.')
      return false
    }

    return true
  }

  const validatePassword = () => {
    clearError(passwordInput)

    if (!passwordInput.value) {
      showError(passwordInput, 'Password is required.')
      return false
    }

    return true
  }

  const validateConfirmPassword = () => {
    clearError(confirmPasswordInput)

    if (!confirmPasswordInput.value) {
      showError(confirmPasswordInput, 'Please confirm your password.')
      return false
    }

    if (confirmPasswordInput.value !== passwordInput.value) {
      showError(confirmPasswordInput, 'Passwords do not match.')
      return false
    }

    return true
  }

  nameInput.addEventListener('blur', validateName)

  emailInput.addEventListener('blur', validateEmail)

  passwordInput.addEventListener('blur', validatePassword)

  confirmPasswordInput.addEventListener('blur', validateConfirmPassword)

  passwordInput.addEventListener('input', () => {
    clearError(passwordInput)

    if (confirmPasswordInput.value) {
      validateConfirmPassword()
    }
  })

  confirmPasswordInput.addEventListener('input', () => {
    clearError(confirmPasswordInput)

    if (
      confirmPasswordInput.value &&
      confirmPasswordInput.value !== passwordInput.value
    ) {
      showError(confirmPasswordInput, 'Passwords do not match.')
    }
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const isNameValid = validateName()
    const isEmailValid = validateEmail()
    const isPasswordValid = validatePassword()
    const isConfirmPasswordValid = validateConfirmPassword()

    if (
      !isNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      return
    }

    // Registration backend will be connected here later.
  })
}
