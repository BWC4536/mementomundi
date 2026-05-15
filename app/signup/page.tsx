'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import {
  validateSignup, hasSignupErrors, checkPasswordStrength,
  type SignupErrors,
} from '@/schemas/auth.schema'
import { PasswordStrength } from '@/components/PasswordStrength'
import { OnboardingModal } from '@/components/OnboardingModal'
import { signUpAction } from '@/app/auth/actions'
import { createClient } from '@/lib/supabase/client'
import { Map, Star, Plane, Camera } from 'lucide-react'
import { StickerBadge } from '@/components/ui/StickerBadge'

const DECO_STICKERS = [
  { icon: Map,    color: 'cream'  as const, top: '10%', left: '9%',  rot: 12,  label: 'Aventura', delay: 0 },
  { icon: Star,   color: 'orange' as const, top: '30%', right: '8%', rot: -8,  label: 'Memorias', delay: 0.6 },
  { icon: Plane,  color: 'teal'   as const, bottom: '30%', left: '7%', rot: -14, label: 'Volar', delay: 1.2 },
  { icon: Camera, color: 'navy'   as const, bottom: '15%', right: '10%', rot: 10, label: 'Captura', delay: 0.3 },
]

const inputBase = (hasError: boolean) => ({
  width: '100%',
  padding: '12px 14px',
  borderRadius: 12,
  background: 'white',
  border: `2px solid ${hasError ? '#DC2626' : 'rgba(11,33,80,0.12)'}`,
  fontFamily: 'Nunito, sans-serif',
  fontSize: 15,
  color: '#0B2150',
  outline: 'none',
  transition: 'border-color 0.2s',
})

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-xs mt-1 font-grown" style={{ color: '#DC2626' }}>{msg}</p>
}

function Checkbox({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: React.ReactNode }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <div
        onClick={onChange}
        className="mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-colors"
        style={{ background: checked ? '#FA9223' : 'white', border: `2px solid ${checked ? '#FA9223' : 'rgba(11,33,80,0.2)'}` }}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span className="font-grown text-navy leading-snug" style={{ fontSize: 13, opacity: 0.75 }}>{children}</span>
    </label>
  )
}

export default function SignupPage() {
  const router = useRouter()
  const controls = useAnimation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [strength, setStrength] = useState(0)
  const [errors, setErrors] = useState<SignupErrors>({})
  const [globalError, setGlobalError] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  function clearError<K extends keyof SignupErrors>(key: K) {
    setErrors((p) => { const n = { ...p }; delete n[key]; return n })
  }

  function handlePasswordChange(val: string) {
    setPassword(val)
    setStrength(checkPasswordStrength(val))
    clearError('password')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setGlobalError('')
    const errs = validateSignup({ name, email, password, confirmPassword, acceptTerms })
    setErrors(errs)
    if (hasSignupErrors(errs)) return

    setLoading(true)
    try {
      const result = await signUpAction({ name, email, password, newsletter })
      if (result?.error) throw new Error(result.error)
      setShowOnboarding(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Este email ya está en uso o ha ocurrido un error.'
      setGlobalError(msg)
      await controls.start({ x: [0, -10, 10, -8, 8, -4, 4, 0], transition: { duration: 0.45 } })
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setOauthLoading(true)
    setGlobalError('')
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback?next=/tienda` },
      })
      if (error) {
        setGlobalError('No se pudo conectar con Google')
        setOauthLoading(false)
      }
    } catch {
      setGlobalError('No se pudo conectar con Google')
      setOauthLoading(false)
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

  return (
    <>
      <div className="min-h-screen flex bg-cream">

        {/* ── LEFT PANEL (desktop only) ── */}
        <div
          className="hidden lg:flex flex-col items-center justify-center flex-1 relative overflow-hidden"
          style={{ background: '#FFB4AD' }}
        >
          {DECO_STICKERS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, rotate: s.rot }}
              animate={{ opacity: 1, scale: 1, rotate: s.rot }}
              transition={{ delay: 0.15 + i * 0.1, type: 'spring', stiffness: 200 }}
              className="absolute select-none pointer-events-none float-slow"
              style={{
                top: (s as { top?: string }).top,
                left: (s as { left?: string }).left,
                right: (s as { right?: string }).right,
                bottom: (s as { bottom?: string }).bottom,
                ['--r' as string]: `${s.rot}deg`,
                animationDelay: `${s.delay}s`,
              } as React.CSSProperties}
            >
              <StickerBadge color={s.color} icon={s.icon} size="md" rotate={s.rot}>
                {s.label}
              </StickerBadge>
            </motion.div>
          ))}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="relative mb-8"
            style={{ width: 260, height: 300 }}
          >
            <Image
              src="/character-male.png"
              alt="Memento Mundi traveler"
              fill
              className="object-contain drop-shadow-[0_20px_25px_rgba(11,33,72,0.35)]"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-center px-8 max-w-xs"
          >
            <h1 className="font-brasica font-black text-navy mb-3 leading-tight" style={{ fontSize: 48 }}>
              Empieza tu primer recuerdo
            </h1>
            <p className="font-grown text-navy" style={{ fontSize: 17, opacity: 0.65 }}>
              Cada viaje merece ser recordado de verdad
            </p>
          </motion.div>

          <div
            className="absolute bottom-0 left-0 right-0 h-24 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, #0B2150 1.5px, transparent 1.5px)', backgroundSize: '18px 18px' }}
          />
        </div>

        {/* ── RIGHT PANEL (form) ── */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 overflow-y-auto lg:max-w-lg lg:mx-auto relative">
          <div className="grain absolute inset-0 opacity-30 pointer-events-none" aria-hidden />

          {/* Logo — mobile only */}
          <div className="lg:hidden mb-6">
            <img src="/MEMENTO_FRASE.svg" alt="Memento Mundi" className="h-9 object-contain" />
          </div>

          <motion.div animate={controls} className="w-full max-w-sm">

            <div className="mb-6">
              <h2 className="font-brasica font-black text-navy mb-1" style={{ fontSize: 34 }}>
                Crear cuenta
              </h2>
              <p className="font-grown text-navy" style={{ fontSize: 15, opacity: 0.55 }}>
                Únete y empieza a coleccionar recuerdos
              </p>
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={oauthLoading}
              className="relative w-full flex items-center justify-center gap-3 py-3.5 rounded-full font-grown font-bold transition-opacity overflow-hidden mb-5"
              style={{ background: 'white', border: '2px solid #0B2150', boxShadow: '3px 3px 0 #0B2150', fontSize: 15, color: '#0B2150', opacity: oauthLoading ? 0.7 : 1 }}
            >
              {oauthLoading ? (
                <span className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              Continuar con Google
              <span className="absolute bottom-0 right-0 w-0 h-0" style={{ borderStyle: 'solid', borderWidth: '0 0 12px 12px', borderColor: 'transparent transparent rgba(11,33,80,0.15) transparent' }} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: 'rgba(11,33,80,0.12)' }} />
              <span className="font-grown text-navy" style={{ fontSize: 13, opacity: 0.4 }}>o</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(11,33,80,0.12)' }} />
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">

              {globalError && (
                <div className="px-4 py-3 rounded-xl font-grown text-sm font-semibold" style={{ background: '#FEE2E2', color: '#DC2626', border: '1.5px solid #FCA5A5' }}>
                  {globalError}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block font-grown font-bold text-navy mb-1.5" style={{ fontSize: 13, opacity: 0.75 }}>Nombre completo</label>
                <input
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); clearError('name') }}
                  placeholder="Ana García"
                  style={inputBase(!!errors.name)}
                  onFocus={(e) => { if (!errors.name) (e.target as HTMLInputElement).style.borderColor = '#FA9223' }}
                  onBlur={(e) => { if (!errors.name) (e.target as HTMLInputElement).style.borderColor = 'rgba(11,33,80,0.12)' }}
                />
                <FieldError msg={errors.name} />
              </div>

              {/* Email */}
              <div>
                <label className="block font-grown font-bold text-navy mb-1.5" style={{ fontSize: 13, opacity: 0.75 }}>Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError('email') }}
                  placeholder="ana@ejemplo.com"
                  style={inputBase(!!errors.email)}
                  onFocus={(e) => { if (!errors.email) (e.target as HTMLInputElement).style.borderColor = '#FA9223' }}
                  onBlur={(e) => { if (!errors.email) (e.target as HTMLInputElement).style.borderColor = 'rgba(11,33,80,0.12)' }}
                />
                <FieldError msg={errors.email} />
              </div>

              {/* Password */}
              <div>
                <label className="block font-grown font-bold text-navy mb-1.5" style={{ fontSize: 13, opacity: 0.75 }}>Contraseña</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    style={{ ...inputBase(!!errors.password), paddingRight: 44 }}
                    onFocus={(e) => { if (!errors.password) (e.target as HTMLInputElement).style.borderColor = '#FA9223' }}
                    onBlur={(e) => { if (!errors.password) (e.target as HTMLInputElement).style.borderColor = 'rgba(11,33,80,0.12)' }}
                  />
                  <button type="button" onClick={() => setShowPass((p) => !p)} tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy opacity-35 hover:opacity-70 transition-opacity">
                    <EyeIcon open={showPass} />
                  </button>
                </div>
                <PasswordStrength strength={strength} />
                <FieldError msg={errors.password} />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block font-grown font-bold text-navy mb-1.5" style={{ fontSize: 13, opacity: 0.75 }}>Confirmar contraseña</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); clearError('confirmPassword') }}
                    placeholder="Repite tu contraseña"
                    style={{ ...inputBase(!!errors.confirmPassword), paddingRight: 44 }}
                    onFocus={(e) => { if (!errors.confirmPassword) (e.target as HTMLInputElement).style.borderColor = '#FA9223' }}
                    onBlur={(e) => { if (!errors.confirmPassword) (e.target as HTMLInputElement).style.borderColor = 'rgba(11,33,80,0.12)' }}
                  />
                  <button type="button" onClick={() => setShowConfirm((p) => !p)} tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy opacity-35 hover:opacity-70 transition-opacity">
                    <EyeIcon open={showConfirm} />
                  </button>
                </div>
                <FieldError msg={errors.confirmPassword} />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-1">
                <Checkbox checked={acceptTerms} onChange={() => { setAcceptTerms((p) => !p); clearError('acceptTerms') }}>
                  Acepto los{' '}
                  <Link href="/terminos" className="font-bold" style={{ color: '#FA9223' }}>Términos de Servicio</Link>
                  {' '}y la{' '}
                  <Link href="/privacidad" className="font-bold" style={{ color: '#FA9223' }}>Política de Privacidad</Link>
                </Checkbox>
                {errors.acceptTerms && (
                  <p className="text-xs font-grown" style={{ color: '#DC2626', paddingLeft: 28 }}>{errors.acceptTerms}</p>
                )}

                <Checkbox checked={newsletter} onChange={() => setNewsletter((p) => !p)}>
                  Quiero recibir tips de viaje y novedades (opcional)
                </Checkbox>
              </div>

              {/* Submit */}
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
                  'Crear mi cuenta →'
                )}
                <span className="absolute bottom-0 right-0 w-0 h-0" style={{ borderStyle: 'solid', borderWidth: '0 0 14px 14px', borderColor: 'transparent transparent rgba(11,33,80,0.2) transparent' }} />
              </button>
            </form>

            <p className="text-center font-grown text-navy mt-5" style={{ fontSize: 14, opacity: 0.55 }}>
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="font-bold" style={{ color: '#FA9223', textDecoration: 'none', opacity: 1 }}>
                Entrar
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Onboarding modal */}
      {showOnboarding && (
        <OnboardingModal
          name={name}
          onComplete={() => {
            setShowOnboarding(false)
            router.push('/tienda')
          }}
        />
      )}
    </>
  )
}
