'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-4 py-3 bg-cream sticky top-0 z-20">
        <button
          onClick={() => setDrawerOpen(true)}
          className="icon-btn flex flex-col gap-1.5 p-1"
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-6 h-0.5 rounded bg-navy" />
          ))}
        </button>

        <img
          src="/memento-logo.svg"
          alt="Memento Mundi"
          className="h-8 object-contain"
        />

        <div className="w-9 h-9 rounded-full bg-teal-dark flex items-center justify-center text-white font-bold text-sm">
          A
        </div>
      </nav>

      {/* Drawer */}
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
            className="absolute inset-0 bg-navy bg-opacity-35"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="relative w-4/5 bg-cream bg-dots bg-dot-lg flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-navy border-opacity-7">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-teal-dark border-2 border-navy flex items-center justify-center font-bold text-lg text-white">
                  A
                </div>
                <div>
                  <p className="font-brasica font-bold text-navy">Ana García</p>
                  <p className="text-xs text-navy text-opacity-40">@anaviajera</p>
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="icon-btn w-8 h-8 rounded-full bg-navy bg-opacity-8 flex items-center justify-center text-navy"
              >
                ✕
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 overflow-y-auto py-2">
              {[
                { label: 'Viajes', icon: '✈️', href: '/home', active: true },
                { label: 'RRSS', icon: '🌍', href: '/rrss', active: false },
                { label: 'Tienda', icon: '🛒', href: '/tienda', active: false },
                { label: 'Usuario', icon: '👤', href: '/perfil', active: false },
                { label: 'Sobre Nosotros', icon: '💛', href: '/sobre-nosotros', active: false },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="nav-item flex items-center gap-3.5 px-5.5 py-3.5"
                  style={{
                    background: item.active ? 'rgba(11, 33, 80, 0.07)' : 'transparent',
                    borderLeft: item.active ? '4px solid #FA9223' : '4px solid transparent',
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span
                    className="text-lg"
                    style={{
                      fontWeight: item.active ? 800 : 700,
                      fontFamily: item.active ? 'Playfair Display, serif' : 'Nunito, sans-serif',
                      opacity: item.active ? 1 : 0.65,
                    }}
                  >
                    {item.label}
                  </span>
                  {item.active && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-orange" />
                  )}
                </Link>
              ))}

              <div className="my-2 mx-5.5 h-0.5 bg-navy bg-opacity-8 rounded" />

              <div className="flex items-center gap-3.5 px-5.5 py-3">
                <svg width="24" height="24" viewBox="0 0 100 130" fill="none">
                  <rect x="38" y="72" width="12" height="35" rx="4" fill="#0B2150" />
                  <rect x="52" y="72" width="12" height="35" rx="4" fill="#0B2150" />
                  <ellipse cx="44" cy="109" rx="10" ry="5" fill="#0B2150" />
                  <ellipse cx="58" cy="109" rx="10" ry="5" fill="#0B2150" />
                  <circle cx="50" cy="42" r="32" fill="white" stroke="#0B2150" strokeWidth="3" />
                  <path d="M72 16 L82 26 L72 26 Z" fill="#EAE7DA" stroke="#0B2150" strokeWidth="2" />
                  <ellipse cx="42" cy="42" rx="3" ry="4" fill="#0B2150" />
                  <path d="M50 41 Q54 38 58 41" stroke="#0B2150" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <line x1="50" y1="80" x2="20" y2="55" stroke="#0B2150" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="16" cy="52" r="5" fill="#0B2150" />
                  <text x="2" y="40" fontSize="18" fill="#0B2150" fontWeight="bold">?</text>
                </svg>
                <span className="text-lg font-grown text-navy text-opacity-55">Ayuda</span>
              </div>
            </nav>

            {/* Footer */}
            <div className="p-5 border-t border-navy border-opacity-7">
              <button className="btn-primary w-full bg-orange text-white rounded-full py-3.5 px-5.5 font-bold text-base shadow-lg flex items-center justify-center gap-2">
                <span className="text-xl">+</span> Nuevo Viaje
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
