'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { Clock } from 'lucide-react'
import { updatePasswordAction } from '@/app/auth/actions'
import { createClient } from '@/lib/supabase/client'
import { checkPasswordStrength } from '@/schemas/auth.schema'
import { PasswordStrength } from '@/components/PasswordStrength'

const inputStyle = (hasError: boolean) => ({
  width: '100%',
  padding: '13px 14px',
  borderRadius: 12,
  background: 'white',
  border: `2px solid ${hasError ? '#DC2626' : 'rgba(11,33,80,0.12)'}`,
  fontFamily: 'Nunito, sans-serif',
  fontSize: 15,
  color: '#0B2150',
  outline: 'none',
  transition: 'border-color 0.2s',
})

export default function ActualizarPasswordPage() {
  const router = useRouter()
  const controls = useAnimation()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [strength, setStrength] = useState(0)
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({})
  const [globalError, setGlobalError] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasSession, setHasSession] = useState<boolean | null>(null)
  const [success, setSuccess] = useState(false)

  // Verify recovery session exists (user came via the email link)
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasSession(!!session)
    })
  }, [])

  // Auto-redirect after successful password change
  useEffect(() => {
    if (!success) return
    const t = setTimeout(() => router.push('/home'), 2000)
    return () => clearTimeout(t)
  }, [success, router])

  function handlePasswordChange(val: string) {
    setPassword(val)
    setStrength(checkPasswordStrength(val))
    setErrors((p) => ({ ...p, password: undefined }))
  }

  function validate() {
    const errs: typeof errors = {}
    if (!password || password.length < 8) {
      errs.password = 'Mínimo 8 caracteres'
    } else if (!/[A-Z]/.test(password)) {
      errs.password = 'Debe contener al menos una mayúscula'
    } else if (!/[0-9]/.test(password)) {
      errs.password = 'Debe contener al menos un número'
    }
    if (confirmPassword !== password) {
      errs.confirmPassword = 'Las contraseñas no coinciden'
    }
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setGlobalError('')
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    try {
      const result = await updatePasswordAction({ password })
      if (result?.error) throw new Error(result.error)
      setSuccess(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'No se pudo actualizar la contraseña.'
      setGlobalError(msg)
      await controls.start({
        x: [0, -10, 10, -8, 8, -4, 4, 0],
        transition: { duration: 0.45 },
      })
    } finally {
      setLoading(false)
    }
  }

  const EyeIcon = ({ open }: { open: boolean }) => open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )

  // While verifying session
  if (hasSession === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <span className="w-8 h-8 border-2 border-navy border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // No recovery session — link expired or accessed directly
  if (!hasSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm text-center"
        >
          <div
            className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5"
            style={{ background: '#FEE2E2', border: '2.5px solid #DC2626' }}
          >
            <Clock size={28} strokeWidth={2.25} color="#DC2626" />
          </div>
          <h2 className="font-brasica font-black text-navy mb-2" style={{ fontSize: 28 }}>
            Enlace expirado
          </h2>
          <p className="font-grown text-navy mb-6" style={{ fontSize: 15, opacity: 0.65 }}>
            El enlace de recuperación ya no es válido. Solicita uno nuevo para continuar.
          </p>
          <Link
            href="/recuperar-password"
            className="inline-block px-6 py-3 rounded-full font-bold text-white"
            style={{
              background: '#FA9223',
              border: '2.5px solid #0B2150',
              boxShadow: '4px 4px 0 #0B2150',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 14,
            }}
          >
            Solicitar nuevo enlace
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-5 py-10">
      <motion.div animate={controls} className="w-full max-w-sm">

        <div className="mb-6 text-center">
          <img src="/MEMENTO_FRASE.svg" alt="Memento Mundi" className="h-9 object-contain mx-auto mb-6" />
          <h2 className="font-brasica font-black text-navy mb-1" style={{ fontSize: 30 }}>
            Nueva contraseña
          </h2>
          <p className="font-grown text-navy" style={{ fontSize: 14, opacity: 0.55 }}>
            Elige una contraseña segura para tu cuenta
          </p>
        </div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div
              className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{ background: '#10B981', border: '2.5px solid #0B2150', boxShadow: '4px 4px 0 #0B2150' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="font-brasica font-black text-navy mb-2" style={{ fontSize: 22 }}>
              ¡Contraseña actualizada!
            </p>
            <p className="font-grown text-navy" style={{ fontSize: 14, opacity: 0.6 }}>
              Te redirigimos a tu cuenta…
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {globalError && (
              <div
                className="px-4 py-3 rounded-xl font-grown text-sm font-semibold"
                style={{ background: '#FEE2E2', color: '#DC2626', border: '1.5px solid #FCA5A5' }}
              >
                {globalError}
              </div>
            )}

            <div>
              <label className="block font-grown font-bold text-navy mb-1.5" style={{ fontSize: 13, opacity: 0.75 }}>
                Nueva contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  autoFocus
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  style={{ ...inputStyle(!!errors.password), paddingRight: 44 }}
                  onFocus={(e) => { if (!errors.password) (e.target as HTMLInputElement).style.borderColor = '#FA9223' }}
                  onBlur={(e) => { if (!errors.password) (e.target as HTMLInputElement).style.borderColor = 'rgba(11,33,80,0.12)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy opacity-35 hover:opacity-70 transition-opacity"
                >
                  <EyeIcon open={showPass} />
                </button>
              </div>
              <PasswordStrength strength={strength} />
              {errors.password && (
                <p className="text-xs mt-1 font-grown" style={{ color: '#DC2626' }}>{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block font-grown font-bold text-navy mb-1.5" style={{ fontSize: 13, opacity: 0.75 }}>
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: undefined })) }}
                  placeholder="Repite tu contraseña"
                  style={{ ...inputStyle(!!errors.confirmPassword), paddingRight: 44 }}
                  onFocus={(e) => { if (!errors.confirmPassword) (e.target as HTMLInputElement).style.borderColor = '#FA9223' }}
                  onBlur={(e) => { if (!errors.confirmPassword) (e.target as HTMLInputElement).style.borderColor = 'rgba(11,33,80,0.12)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy opacity-35 hover:opacity-70 transition-opacity"
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs mt-1 font-grown" style={{ color: '#DC2626' }}>{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-4 rounded-full font-brasica font-black text-white flex items-center justify-center gap-2 overflow-hidden transition-opacity"
              style={{
                background: '#FA9223',
                border: '2.5px solid #0B2150',
                boxShadow: '4px 4px 0 #0B2150',
                fontSize: 17,
                opacity: loading ? 0.75 : 1,
                marginTop: 8,
              }}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Guardar contraseña →'
              )}
              <span
                className="absolute bottom-0 right-0 w-0 h-0"
                style={{
                  borderStyle: 'solid',
                  borderWidth: '0 0 14px 14px',
                  borderColor: 'transparent transparent rgba(11,33,80,0.2) transparent',
                }}
              />
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
