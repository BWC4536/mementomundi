'use client'

import { useState } from 'react'
import {
  Edit3, Settings, Lock, Bell, Download, LogOut, ChevronRight,
  Globe, Plane, MapPin,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { MotionSection } from '@/components/ui/MotionSection'
import { StickerBadge } from '@/components/ui/StickerBadge'
import { signOutAction } from '@/app/auth/actions'

interface MenuItem {
  label: string
  icon: typeof Edit3
  danger?: boolean
  onClick?: () => void | Promise<void>
}

export default function PerfilPage() {
  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOutAction()
    } catch {
      setSigningOut(false)
    }
  }

  const menu: MenuItem[] = [
    { label: 'Editar perfil', icon: Edit3 },
    { label: 'Mis preferencias', icon: Settings },
    { label: 'Privacidad y seguridad', icon: Lock },
    { label: 'Notificaciones', icon: Bell },
    { label: 'Descargar mis datos', icon: Download },
    { label: 'Cerrar sesión', icon: LogOut, danger: true, onClick: handleSignOut },
  ]

  return (
    <div className="min-h-screen bg-cream text-navy">
      <Navbar user={{ displayName: 'Ana García', initial: 'A' }} />

      {/* Hero header */}
      <MotionSection className="relative overflow-hidden pt-8 pb-6">
        <div className="grain absolute inset-0 opacity-30 pointer-events-none" aria-hidden />
        <div
          className="absolute top-6 right-6 hidden sm:block float-slow"
          style={{ ['--r' as string]: '-12deg' } as React.CSSProperties}
        >
          <StickerBadge color="orange" icon={MapPin} rotate={-12} size="sm">
            Viajera
          </StickerBadge>
        </div>
        <div
          className="absolute bottom-2 left-6 hidden sm:block float-slow"
          style={{ ['--r' as string]: '10deg', animationDelay: '1s' } as React.CSSProperties}
        >
          <StickerBadge color="coral" icon={Plane} rotate={10} size="sm">
            En ruta
          </StickerBadge>
        </div>

        <div className="max-w-md mx-auto px-6 text-center relative">
          {/* Avatar with sticker shadow */}
          <div
            className="relative inline-flex items-center justify-center w-24 h-24 rounded-full
                       bg-teal-dark text-cream font-display font-black text-5xl
                       border-2 border-navy mb-4"
            style={{ boxShadow: '0 6px 0 -1px #0B2130, 0 14px 24px rgba(11,33,80,0.25)' }}
          >
            A
          </div>

          <h1 className="font-display font-black text-navy text-3xl mb-1">
            Ana <span className="italic">García</span>
          </h1>
          <p className="font-grown text-sm text-navy/55 mb-3">@anaviajera</p>
          <p className="font-grown text-sm text-navy/65 max-w-xs mx-auto leading-relaxed">
            Aventurera, viajera, coleccionista de momentos.
            <span className="inline-flex items-center gap-1.5 ml-1.5 align-middle">
              <Globe size={14} strokeWidth={2.25} className="inline" />
              <Plane size={14} strokeWidth={2.25} className="inline" />
            </span>
          </p>
        </div>
      </MotionSection>

      {/* Stats grid */}
      <MotionSection className="px-6 pb-6" delay={0.1}>
        <div className="max-w-md mx-auto grid grid-cols-3 gap-3">
          {[
            { label: 'Viajes', value: '3' },
            { label: 'Pegatinas', value: '45' },
            { label: 'Seguidores', value: '234' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-card border-2 border-navy/15 rounded-2xl p-4 text-center
                         shadow-[6px_6px_0_0_#0B2130]
                         transition hover:-translate-y-1"
            >
              <p className="font-display font-black text-orange text-4xl leading-none mb-1">
                {stat.value}
              </p>
              <p className="font-grown text-[11px] font-bold uppercase tracking-wider text-navy/55">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </MotionSection>

      {/* Menu */}
      <MotionSection className="px-6 pb-24" delay={0.2}>
        <div className="max-w-md mx-auto space-y-2.5">
          {menu.map((item, i) => {
            const Icon = item.icon
            const isDanger = item.danger
            const isDisabled = isDanger && signingOut

            return (
              <button
                key={i}
                onClick={item.onClick}
                disabled={isDisabled}
                className={`group w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition
                  ${isDanger
                    ? 'bg-cream border-red-200 hover:border-red-400 disabled:opacity-50'
                    : 'bg-card border-navy/15 hover:border-navy/40 hover:-translate-y-0.5'}
                  shadow-[4px_4px_0_0_#0B2130]
                  cursor-pointer disabled:cursor-not-allowed`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${isDanger ? 'bg-red-100' : 'bg-cream border border-navy/10'}`}
                >
                  <Icon
                    size={18}
                    strokeWidth={2.25}
                    color={isDanger ? '#DC2626' : '#0B2150'}
                  />
                </div>
                <span
                  className={`font-grown text-sm font-bold flex-1 text-left
                    ${isDanger ? 'text-red-600' : 'text-navy'}`}
                >
                  {isDisabled ? 'Cerrando sesión…' : item.label}
                </span>
                <ChevronRight
                  size={18}
                  strokeWidth={2}
                  className={`flex-shrink-0 transition-transform
                    ${isDanger ? 'text-red-400' : 'text-navy/30 group-hover:text-navy group-hover:translate-x-0.5'}`}
                />
              </button>
            )
          })}
        </div>
      </MotionSection>
    </div>
  )
}
