export default function initLogin() {
    const form = document.querySelector('#login-form')
    const emailInput = document.querySelector('#email')
    const passwordInput = document.querySelector('#password')

    const emailError = document.querySelector('#email-error')
    const passwordError = document.querySelector('#password-error')

    const togglePassword = document.querySelector('#toggle-password')
    const showIcon = togglePassword?.querySelector('[data-icon="show"]')
    const hideIcon = togglePassword?.querySelector('[data-icon="hide"]')

    if (!form) return

    // Show / hide password
    togglePassword?.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password'

        passwordInput.type = isPassword ? 'text' : 'password'
        showIcon?.classList.toggle('hidden', isPassword)
        hideIcon?.classList.toggle('hidden', !isPassword)

        togglePassword.setAttribute(
            'aria-label',
            isPassword ? 'Hide password' : 'Show password'
        )

        togglePassword.setAttribute(
            'aria-pressed',
            String(isPassword)
        )
    })

    // Form validation
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        let isValid = true

        // Reset errors
        emailError.textContent = ''
        emailError.classList.add('hidden')

        passwordError.textContent = ''
        passwordError.classList.add('hidden')

        emailInput.removeAttribute('aria-invalid')
        passwordInput.removeAttribute('aria-invalid')

        // Validate email
        const email = emailInput.value.trim()

        if (!email) {

        emailError.textContent = 'Please enter your email address.'
        emailError.classList.remove('hidden')
        emailInput.setAttribute('aria-invalid', 'true')

        isValid = false

        } else if (!emailInput.validity.valid) {
            emailError.textContent = 'Please enter a valid email address.'
            emailError.classList.remove('hidden')
            emailInput.setAttribute('aria-invalid', 'true')
            isValid = false
        }

        // Validate password
        const password = passwordInput.value

        if (!password) {
            passwordError.textContent = 'Please enter your password.'
            passwordError.classList.remove('hidden')
            passwordInput.setAttribute('aria-invalid', 'true')
            isValid = false
        }

        // Stop if validation fails
        if (!isValid) {
            return
        }

        // Demo behavior
        console.log('Login form is valid.')
    })
}