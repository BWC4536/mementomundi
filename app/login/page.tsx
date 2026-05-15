'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { Camera, Plane, Luggage, Map } from 'lucide-react'
import { validateLogin, hasLoginErrors } from '@/schemas/auth.schema'
import { signInAction } from '@/app/auth/actions'
import { createClient } from '@/lib/supabase/client'
import { StickerBadge } from '@/components/ui/StickerBadge'

const DECO_STICKERS = [
  { icon: Camera, color: 'orange' as const, top: '12%', left: '8%',  rot: -14, label: 'Foto', delay: 0 },
  { icon: Plane,  color: 'coral'  as const, top: '22%', right: '10%', rot: 10,  label: 'Vuelo', delay: 0.6 },
  { icon: Luggage,color: 'cream'  as const, bottom: '28%', left: '12%', rot: 8, label: 'Maleta', delay: 1.2 },
  { icon: Map,    color: 'teal'   as const, bottom: '18%', right: '8%', rot: -10, label: 'Mapa', delay: 0.3 },
]

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

export default function LoginPage() {
  const router = useRouter()
  const controls = useAnimation()
  const formRef = useRef<HTMLDivElement>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)
  const [errors, setErrors] = useState<ReturnType<typeof validateLogin>>({})
  const [globalError, setGlobalError] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/home')
    })
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setGlobalError('')
    const errs = validateLogin(email, password)
    setErrors(errs)
    if (hasLoginErrors(errs)) return

    setLoading(true)
    try {
      const result = await signInAction({ email, password })
      if (result?.error) throw new Error(result.error)
      router.push('/home')
      router.refresh()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Email o contraseña incorrectos'
      setGlobalError(msg)
      await controls.start({
        x: [0, -10, 10, -8, 8, -4, 4, 0],
        transition: { duration: 0.45 },
      })
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
        options: { redirectTo: `${window.location.origin}/auth/callback?next=/home` },
      })
      if (error) {
        setGlobalError('No se pudo conectar con Google')
        setOauthLoading(false)
      }
      // On success the browser is redirected to Google; no need to setLoading(false).
    } catch {
      setGlobalError('No se pudo conectar con Google')
      setOauthLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-cream">

      {/* ── LEFT PANEL (desktop only) ── */}
      <div
        className="hidden lg:flex flex-col items-center justify-center flex-1 relative overflow-hidden"
        style={{ background: '#5CA4A4' }}
      >
        {/* Decorative sticker badges with Lucide icons */}
        {DECO_STICKERS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5, rotate: s.rot }}
            animate={{ opacity: 1, scale: 1, rotate: s.rot }}
            transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 200 }}
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

        {/* Mascot illustration */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
          className="relative mb-8"
          style={{ width: 260, height: 300 }}
        >
          <Image
            src="/character-female.png"
            alt="Memento Mundi traveler"
            fill
            className="object-contain drop-shadow-[0_20px_25px_rgba(11,33,72,0.35)]"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center px-8 max-w-xs"
        >
          <h1
            className="font-brasica font-black text-cream mb-3 leading-tight"
            style={{ fontSize: 52 }}
          >
            Vuelve a tu mundo
          </h1>
          <p className="font-grown text-cream" style={{ fontSize: 18, opacity: 0.8 }}>
            Tus viajes te esperan
          </p>
        </motion.div>

        {/* Dot texture bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #0B2150 1.5px, transparent 1.5px)', backgroundSize: '18px 18px' }}
        />
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 lg:max-w-lg lg:mx-auto relative">
        <div className="grain absolute inset-0 opacity-30 pointer-events-none" aria-hidden />

        {/* Logo — mobile/tablet only */}
        <div className="lg:hidden mb-8">
          <img src="/MEMENTO_FRASE.svg" alt="Memento Mundi" className="h-10 object-contain" />
        </div>

        <motion.div
          ref={formRef}
          animate={controls}
          className="w-full max-w-sm"
        >
          {/* Header */}
          <div className="mb-7">
            <h2 className="font-brasica font-black text-navy mb-1" style={{ fontSize: 36 }}>
              Hola otra vez
            </h2>
            <p className="font-grown text-navy" style={{ fontSize: 16, opacity: 0.55 }}>
              Entra para ver tus viajes
            </p>
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={oauthLoading}
            className="relative w-full flex items-center justify-center gap-3 py-3.5 rounded-full font-grown font-bold transition-opacity overflow-hidden"
            style={{
              background: 'white',
              border: '2px solid #0B2150',
              boxShadow: '3px 3px 0 #0B2150',
              fontSize: 15,
              color: '#0B2150',
              opacity: oauthLoading ? 0.7 : 1,
            }}
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
            {/* Peel corner */}
            <span className="absolute bottom-0 right-0 w-0 h-0" style={{ borderStyle: 'solid', borderWidth: '0 0 12px 12px', borderColor: 'transparent transparent rgba(11,33,80,0.15) transparent' }} />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: 'rgba(11,33,80,0.12)' }} />
            <span className="font-grown text-navy" style={{ fontSize: 13, opacity: 0.4 }}>o</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(11,33,80,0.12)' }} />
          </div>

          {/* Email/Password form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Global error */}
            {globalError && (
              <div className="px-4 py-3 rounded-xl font-grown text-sm font-semibold" style={{ background: '#FEE2E2', color: '#DC2626', border: '1.5px solid #FCA5A5' }}>
                {globalError}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block font-grown font-bold text-navy mb-1.5" style={{ fontSize: 13, opacity: 0.75 }}>
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })) }}
                placeholder="tu@email.com"
                style={inputStyle(!!errors.email)}
                onFocus={(e) => { if (!errors.email) (e.target as HTMLInputElement).style.borderColor = '#FA9223' }}
                onBlur={(e) => { if (!errors.email) (e.target as HTMLInputElement).style.borderColor = 'rgba(11,33,80,0.12)' }}
              />
              {errors.email && (
                <p className="text-xs mt-1 font-grown" style={{ color: '#DC2626' }}>{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block font-grown font-bold text-navy mb-1.5" style={{ fontSize: 13, opacity: 0.75 }}>
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })) }}
                  placeholder="••••••••"
                  style={{ ...inputStyle(!!errors.password), paddingRight: 44 }}
                  onFocus={(e) => { if (!errors.password) (e.target as HTMLInputElement).style.borderColor = '#FA9223' }}
                  onBlur={(e) => { if (!errors.password) (e.target as HTMLInputElement).style.borderColor = 'rgba(11,33,80,0.12)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy opacity-35 hover:opacity-70 transition-opacity"
                  tabIndex={-1}
                >
                  {showPass ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs mt-1 font-grown" style={{ color: '#DC2626' }}>{errors.password}</p>
              )}
            </div>

            {/* Remember + forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setRemember((r) => !r)}
                  className="w-4 h-4 rounded flex items-center justify-center transition-colors"
                  style={{ background: remember ? '#FA9223' : 'white', border: `2px solid ${remember ? '#FA9223' : 'rgba(11,33,80,0.2)'}` }}
                >
                  {remember && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="font-grown text-navy" style={{ fontSize: 13, opacity: 0.6 }}>Recordarme</span>
              </label>
              <Link
                href="/recuperar-password"
                className="font-grown font-semibold"
                style={{ fontSize: 13, color: '#5CA4A4', textDecoration: 'none' }}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-4 rounded-full font-brasica font-black text-white flex items-center justify-center gap-2 transition-opacity overflow-hidden"
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
                'Entrar →'
              )}
              {/* Peel corner */}
              <span className="absolute bottom-0 right-0 w-0 h-0" style={{ borderStyle: 'solid', borderWidth: '0 0 14px 14px', borderColor: 'transparent transparent rgba(11,33,80,0.2) transparent' }} />
            </button>
          </form>

          {/* Signup link */}
          <p className="text-center font-grown text-navy mt-6" style={{ fontSize: 14, opacity: 0.55 }}>
            ¿Aún no tienes cuenta?{' '}
            <Link
              href="/signup"
              className="font-bold"
              style={{ color: '#FA9223', textDecoration: 'none', opacity: 1 }}
            >
              Únete
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
