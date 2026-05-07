export interface LoginErrors {
  email?: string
  password?: string
}

export function validateLogin(email: string, password: string): LoginErrors {
  const errors: LoginErrors = {}
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Introduce un email válido'
  }
  if (!password || password.length < 8) {
    errors.password = 'Mínimo 8 caracteres'
  }
  return errors
}

export function hasLoginErrors(errors: LoginErrors): boolean {
  return Object.keys(errors).length > 0
}

// ── Signup ──────────────────────────────────────────────────

export interface SignupErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  acceptTerms?: string
}

export function validateSignup(fields: {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}): SignupErrors {
  const errors: SignupErrors = {}

  if (!fields.name || fields.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres'
  }
  if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Introduce un email válido'
  }
  if (!fields.password || fields.password.length < 8) {
    errors.password = 'Mínimo 8 caracteres'
  } else if (!/[A-Z]/.test(fields.password)) {
    errors.password = 'Debe contener al menos una mayúscula'
  } else if (!/[0-9]/.test(fields.password)) {
    errors.password = 'Debe contener al menos un número'
  }
  if (fields.confirmPassword !== fields.password) {
    errors.confirmPassword = 'Las contraseñas no coinciden'
  }
  if (!fields.acceptTerms) {
    errors.acceptTerms = 'Debes aceptar los términos para continuar'
  }
  return errors
}

export function checkPasswordStrength(password: string): number {
  let s = 0
  if (password.length >= 8)  s++
  if (password.length >= 12) s++
  if (/[A-Z]/.test(password)) s++
  if (/[0-9]/.test(password)) s++
  if (/[^A-Za-z0-9]/.test(password)) s++
  return Math.min(s, 4)
}

export function hasSignupErrors(errors: SignupErrors): boolean {
  return Object.keys(errors).length > 0
}
