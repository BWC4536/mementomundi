'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  userName?: string
  userAvatar?: string
  userInitial?: string
}

export function Navbar({ userName = 'Ana García', userAvatar, userInitial = 'A' }: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter()

  async function handleSignOut() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.auth.signOut()
    }
    router.push('/login')
    router.refresh()
  }

  const NAV_ITEMS = [
    { label: 'Viajes', href: '/home', active: true, icon: TicketIcon },
    { label: 'RRSS', href: '/rrss', active: false, icon: GlobeIcon },
    { label: 'Tienda', href: '/tienda', active: false, icon: ShopIcon },
    { label: 'Sobre Nosotros', href: '/sobre-nosotros', active: false, icon: HeartIcon },
  ]

  return (
    <>
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-4 py-3 sticky top-0 z-20" style={{ background: '#EAE7DA' }}>
        {/* Hamburger */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col gap-[5px] p-1.5 rounded-lg transition-all hover:bg-navy/5 active:scale-95"
          aria-label="Abrir menú"
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-5 h-0.5 rounded-full bg-navy" />
          ))}
        </button>

        {/* Wordmark */}
        <img src="/MEMENTO_FRASE.svg" alt="Memento Mundi" className="h-7 object-contain" />

        {/* Profile dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-dark/40"
              style={{ background: userAvatar ? 'transparent' : '#066FB4' }}
              aria-label="Menú de perfil"
            >
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{userInitial}</span>
              )}
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              sideOffset={8}
              align="end"
              className="z-50 min-w-[180px] rounded-xl shadow-xl overflow-hidden"
              style={{
                background: '#EAE7DA',
                border: '1.5px solid rgba(11,33,80,0.1)',
                boxShadow: '0 8px 24px rgba(11,33,80,0.15)',
              }}
            >
              {/* User info header */}
              <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(11,33,80,0.07)' }}>
                <p className="font-bold text-sm text-navy" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {userName}
                </p>
              </div>

              {[
                { label: 'Mi Perfil', href: '/perfil', icon: UserIcon },
                { label: 'Medallas', href: '/perfil?tab=medallas', icon: MedalIcon },
                { label: 'Configuración', href: '/perfil?tab=config', icon: SettingsIcon },
              ].map((item) => (
                <DropdownMenu.Item key={item.label} asChild>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-navy hover:bg-navy/5 transition-colors cursor-pointer outline-none"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    <item.icon />
                    {item.label}
                  </Link>
                </DropdownMenu.Item>
              ))}

              <DropdownMenu.Separator className="h-px my-1" style={{ background: 'rgba(11,33,80,0.07)' }} />

              <DropdownMenu.Item asChild>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer outline-none hover:bg-red-50"
                  style={{ color: '#DC2626', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  <LogOutIcon />
                  Log Out
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </nav>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex"
          >
            {/* Overlay */}
            <div
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0"
              style={{ background: 'rgba(11,33,80,0.35)', backdropFilter: 'blur(2px)' }}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-[78%] max-w-xs flex flex-col shadow-2xl"
              style={{ background: '#EAE7DA' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid rgba(11,33,80,0.08)' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base"
                    style={{ background: '#066FB4', fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {userInitial}
                  </div>
                  <div>
                    <p className="font-bold text-navy text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{userName}</p>
                    <p className="text-xs opacity-40 text-navy">Viajero Mundi</p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:bg-navy/10 active:scale-95"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1l10 10M11 1L1 11" stroke="#0B2150" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Nav Items */}
              <nav className="flex-1 overflow-y-auto py-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 px-5 py-3 transition-all"
                    style={{
                      background: item.active ? 'rgba(11,33,80,0.06)' : 'transparent',
                      borderLeft: item.active ? '3px solid #FA9223' : '3px solid transparent',
                    }}
                  >
                    <span className="w-5 h-5 opacity-60 flex-shrink-0">
                      <item.icon />
                    </span>
                    <span
                      className="text-navy"
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: item.active ? 700 : 500,
                        opacity: item.active ? 1 : 0.65,
                        fontSize: '15px',
                      }}
                    >
                      {item.label}
                    </span>
                    {item.active && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#FA9223' }} />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Footer */}
              <div className="p-5" style={{ borderTop: '1px solid rgba(11,33,80,0.08)' }}>
                <Link
                  href="/nuevo-viaje"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ background: '#FA9223', fontFamily: 'Space Grotesk, sans-serif', fontSize: '15px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v12M2 8h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Nuevo Viaje
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Icons ────────────────────────────────────────────────────────────────────

function TicketIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 6.5C2 5.67 2.67 5 3.5 5h11c.83 0 1.5.67 1.5 1.5v1a1.5 1.5 0 0 0 0 3v1c0 .83-.67 1.5-1.5 1.5h-11C2.67 13 2 12.33 2 11.5v-1a1.5 1.5 0 0 0 0-3v-1Z" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M9 2c0 0-3 3-3 7s3 7 3 7M9 2c0 0 3 3 3 7s-3 7-3 7M2 9h14" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  )
}

function ShopIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 3h14l-1.5 7H3.5L2 3Z" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="6" cy="15" r="1" fill="currentColor"/>
      <circle cx="13" cy="15" r="1" fill="currentColor"/>
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 14s-6-4-6-8a4 4 0 0 1 6-3.46A4 4 0 0 1 15 6c0 4-6 8-6 8Z" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="5" r="3" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M1.5 14c0-3.31 2.69-5 6-5s6 1.69 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

function MedalIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5 1.5h5l-1.5 4h-2L5 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M2.93 2.93l1.06 1.06M11 11l1.07 1.07M2.93 12.07l1.06-1.07M11 4l1.07-1.07" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

function LogOutIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M6 2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3M10 10l3-3-3-3M13 7.5H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
