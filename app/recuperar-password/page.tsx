'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { Mail, Key, Map, Send } from 'lucide-react'
import { resetPasswordAction } from '@/app/auth/actions'
import { StickerBadge } from '@/components/ui/StickerBadge'

const DECO_STICKERS = [
  { icon: Mail, color: 'cream'  as const, top: '14%', left: '10%', rot: -12, label: 'Email', delay: 0 },
  { icon: Key,  color: 'navy'   as const, top: '24%', right: '12%', rot: 14, label: 'Clave', delay: 0.6 },
  { icon: Map,  color: 'teal'   as const, bottom: '28%', left: '14%', rot: 10, label: 'Mapa', delay: 1.2 },
  { icon: Send, color: 'coral'  as const, bottom: '16%', right: '10%', rot: -8, label: 'Envío', delay: 0.3 },
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

export default function RecuperarPasswordPage() {
  const controls = useAnimation()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [globalError, setGlobalError] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setGlobalError('')
    setEmailError('')

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Introduce un email válido')
      return
    }

    setLoading(true)
    try {
      const result = await resetPasswordAction({ email, origin: window.location.origin })
      if (result?.error) throw new Error(result.error)
      setSent(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'No se pudo enviar el email. Inténtalo de nuevo.'
      setGlobalError(msg)
      await controls.start({
        x: [0, -10, 10, -8, 8, -4, 4, 0],
        transition: { duration: 0.45 },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-cream">

      {/* ── LEFT PANEL (desktop only) ── */}
      <div
        className="hidden lg:flex flex-col items-center justify-center flex-1 relative overflow-hidden"
        style={{ background: '#FA9223' }}
      >
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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center px-8 max-w-sm"
        >
          <h1 className="font-brasica font-black text-cream mb-3 leading-tight" style={{ fontSize: 50 }}>
            Recupera tu mundo
          </h1>
          <p className="font-grown text-cream" style={{ fontSize: 17, opacity: 0.85 }}>
            Te enviamos un email para volver a entrar
          </p>
        </motion.div>

        <div
          className="absolute bottom-0 left-0 right-0 h-24 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #0B2150 1.5px, transparent 1.5px)', backgroundSize: '18px 18px' }}
        />
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 lg:max-w-lg lg:mx-auto">

        <div className="lg:hidden mb-8">
          <img src="/MEMENTO_FRASE.svg" alt="Memento Mundi" className="h-10 object-contain" />
        </div>

        <motion.div animate={controls} className="w-full max-w-sm">

          {!sent ? (
            <>
              <div className="mb-7">
                <h2 className="font-brasica font-black text-navy mb-1" style={{ fontSize: 34 }}>
                  ¿Olvidaste tu contraseña?
                </h2>
                <p className="font-grown text-navy" style={{ fontSize: 15, opacity: 0.55 }}>
                  Te enviamos un enlace para crear una nueva
                </p>
              </div>

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
                    Email
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                    placeholder="tu@email.com"
                    style={inputStyle(!!emailError)}
                    onFocus={(e) => { if (!emailError) (e.target as HTMLInputElement).style.borderColor = '#FA9223' }}
                    onBlur={(e) => { if (!emailError) (e.target as HTMLInputElement).style.borderColor = 'rgba(11,33,80,0.12)' }}
                  />
                  {emailError && (
                    <p className="text-xs mt-1 font-grown" style={{ color: '#DC2626' }}>{emailError}</p>
                  )}
                </div>

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
                    'Enviar enlace →'
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
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div
                className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ background: '#FA9223', border: '2.5px solid #0B2150', boxShadow: '4px 4px 0 #0B2150' }}
              >
                <Mail size={28} strokeWidth={2.25} color="#0B2150" />
              </div>
              <h2 className="font-brasica font-black text-navy mb-2" style={{ fontSize: 28 }}>
                Email enviado
              </h2>
              <p className="font-grown text-navy mb-6" style={{ fontSize: 15, opacity: 0.65 }}>
                Si existe una cuenta con <strong className="text-navy">{email}</strong>,
                te llegará un enlace para crear una nueva contraseña.
              </p>
              <p className="font-grown text-navy mb-6" style={{ fontSize: 13, opacity: 0.45 }}>
                ¿No lo ves? Revisa la carpeta de spam.
              </p>
              <Link
                href="/login"
                className="inline-block font-bold"
                style={{ color: '#FA9223', fontSize: 14 }}
              >
                ← Volver a iniciar sesión
              </Link>
            </motion.div>
          )}

          {!sent && (
            <p className="text-center font-grown text-navy mt-6" style={{ fontSize: 14, opacity: 0.55 }}>
              ¿Te acordaste?{' '}
              <Link href="/login" className="font-bold" style={{ color: '#FA9223', textDecoration: 'none' }}>
                Inicia sesión
              </Link>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
