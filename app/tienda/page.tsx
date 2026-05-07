'use client'

import { useState, useEffect, useRef } from 'react'
import { Mascot } from '@/components/Mascot'

// TODO: Replace with Supabase query from `products` table once client is set up
// import { createClient } from '@/lib/supabase/client'
const PACKS = [
  {
    id: 'pack10',
    tag: 'Starter',
    name: 'Pack 10 Pegatinas',
    desc: 'Perfecto para tu primer viaje. 10 pegatinas originales ilustradas a mano para empezar a dejar huella.',
    price: '9,90€',
    priceSub: 'envío incluido',
    accent: '#5CA4A4',
    tagBg: '#5CA4A420',
    imgBg: '#EBF5F5',
    cardBg: '#F3FAFA',
    stickerCount: 3,
    bestseller: false,
    canvas: false,
  },
  {
    id: 'pack20',
    tag: 'Popular',
    name: 'Pack 20 Pegatinas',
    desc: 'El favorito de la comunidad. 20 pegatinas para llenar tu álbum de aventuras sin parar.',
    price: '17,90€',
    priceSub: '¡ahorra 2€!',
    accent: '#FA9223',
    tagBg: '#FA922320',
    imgBg: '#FFF3E6',
    cardBg: '#FFF8F0',
    stickerCount: 5,
    bestseller: true,
    canvas: false,
  },
  {
    id: 'pack50',
    tag: 'Premium',
    name: 'Pack 50+ Pegatinas + Lienzo de Recuerdo',
    desc: 'La experiencia completa. Más de 50 pegatinas exclusivas y un Lienzo de Recuerdo para enmarcar tu aventura.',
    price: '39,90€',
    priceSub: 'edición limitada',
    accent: '#0B2150',
    tagBg: '#0B215018',
    imgBg: '#E8EDF5',
    cardBg: '#F0F3F8',
    stickerCount: 7,
    bestseller: false,
    canvas: true,
  },
] as const

const HERO_STICKERS = [
  { emoji: '🏛️', left: '8%',  top: '22%', rotate: '-15deg', size: 52, anim: 'float0' },
  { emoji: '🌊', left: '82%', top: '15%', rotate: '10deg',  size: 44, anim: 'float1' },
  { emoji: '🗼', left: '75%', top: '68%', rotate: '-8deg',  size: 48, anim: 'float2' },
  { emoji: '🌸', left: '12%', top: '70%', rotate: '12deg',  size: 40, anim: 'float3' },
  { emoji: '⛵', left: '50%', top: '82%', rotate: '5deg',   size: 36, anim: 'float4' },
]

const STICKER_POSITIONS = [
  { emoji: '🏛️', left: '18%', top: '20%', rotate: '-12deg', size: 42 },
  { emoji: '🌊', left: '55%', top: '10%', rotate: '8deg',   size: 36 },
  { emoji: '🗼', left: '10%', top: '55%', rotate: '5deg',   size: 38 },
  { emoji: '🌸', left: '58%', top: '50%', rotate: '-9deg',  size: 40 },
  { emoji: '🦋', left: '30%', top: '68%', rotate: '14deg',  size: 34 },
  { emoji: '⛵', left: '65%', top: '72%', rotate: '-6deg',  size: 36 },
  { emoji: '🍊', left: '40%', top: '30%', rotate: '3deg',   size: 32 },
]

function StickerSetImage({ count }: { count: number }) {
  return (
    <div className="relative w-full h-full" style={{ minHeight: 160 }}>
      {STICKER_POSITIONS.slice(0, count).map((s, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: s.left,
            top: s.top,
            fontSize: s.size,
            lineHeight: 1,
            transform: `rotate(${s.rotate})`,
            filter: 'drop-shadow(2px 3px 6px rgba(11,33,80,0.22))',
            userSelect: 'none',
          }}
        >
          {s.emoji}
        </span>
      ))}
    </div>
  )
}

function CanvasDecoration() {
  return (
    <div
      style={{
        width: '80%',
        aspectRatio: '3/2',
        background: 'white',
        borderRadius: 10,
        boxShadow: '0 4px 18px rgba(11,33,80,0.15), 3px 3px 0 #0B2150',
        border: '2px solid #0B2150',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 6,
        padding: 12,
        position: 'relative',
      }}
    >
      <span style={{ fontSize: 28 }}>🗺️</span>
      <p
        style={{
          fontSize: 9,
          fontWeight: 800,
          color: '#0B2150',
          opacity: 0.4,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textAlign: 'center',
          fontFamily: 'Playfair Display, serif',
        }}
      >
        Lienzo de<br />Recuerdo
      </p>
      <span
        style={{
          position: 'absolute',
          top: -10,
          right: -10,
          fontSize: 22,
          transform: 'rotate(15deg)',
          filter: 'drop-shadow(1px 2px 4px rgba(0,0,0,0.2))',
        }}
      >
        🏛️
      </span>
      <span
        style={{
          position: 'absolute',
          bottom: -10,
          left: -10,
          fontSize: 22,
          transform: 'rotate(-10deg)',
          filter: 'drop-shadow(1px 2px 4px rgba(0,0,0,0.2))',
        }}
      >
        🌊
      </span>
    </div>
  )
}

export default function TiendaPage() {
  const [selectedPack, setSelectedPack] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current
      if (!hero) return
      setScrolled(hero.getBoundingClientRect().bottom <= 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const selectedData = PACKS.find(p => p.id === selectedPack)

  return (
    <>
      <style>{`
        @keyframes float0{from{transform:rotate(-15deg) translateY(0)}to{transform:rotate(-15deg) translateY(-12px)}}
        @keyframes float1{from{transform:rotate(10deg) translateY(0)}to{transform:rotate(10deg) translateY(-10px)}}
        @keyframes float2{from{transform:rotate(-8deg) translateY(0)}to{transform:rotate(-8deg) translateY(-14px)}}
        @keyframes float3{from{transform:rotate(12deg) translateY(0)}to{transform:rotate(12deg) translateY(-8px)}}
        @keyframes float4{from{transform:rotate(5deg) translateY(0)}to{transform:rotate(5deg) translateY(-11px)}}
        @keyframes bounceY{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}
      `}</style>

      {/* ── FIXED TOP NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
        style={{
          padding: '12px clamp(14px, 4vw, 24px)',
          background: scrolled ? 'rgba(234,231,218,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 2px 16px rgba(11,33,80,0.08)' : 'none',
        }}
      >
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col gap-1.5 p-1.5 rounded-lg"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-6 h-0.5 rounded transition-colors duration-300"
              style={{ background: scrolled ? '#0B2150' : '#EAE7DA' }}
            />
          ))}
        </button>

        <img
          src="/MEMENTO_FRASE.svg"
          alt="Memento Mundi"
          className="h-7 object-contain transition-all duration-300"
          style={{
            maxWidth: '38vw',
            filter: scrolled ? 'none' : 'brightness(0) invert(1)',
          }}
        />

        <div
          className="w-8 h-8 rounded-full border-2 border-navy flex items-center justify-center font-bold text-sm text-white"
          style={{ background: '#066FB4' }}
        >
          A
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ height: '100svh', minHeight: 560, background: '#0B2150' }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Floating stickers */}
        {HERO_STICKERS.map((s, i) => (
          <div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              left: s.left,
              top: s.top,
              fontSize: s.size,
              lineHeight: 1,
              opacity: 0.65,
              animation: `${s.anim} ${3 + i * 0.4}s ease-in-out infinite alternate`,
              filter: 'drop-shadow(2px 4px 12px rgba(0,0,0,0.35))',
            }}
          >
            {s.emoji}
          </div>
        ))}

        <h1
          className="relative z-10 text-center select-none"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(72px, 18vw, 200px)',
            fontWeight: 900,
            color: '#EAE7DA',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          MEMENTO
        </h1>
        <p
          className="relative z-10 mt-3.5"
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: 'clamp(13px, 2.5vw, 17px)',
            fontWeight: 600,
            color: 'rgba(234,231,218,0.55)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          Tu tienda de recuerdos
        </p>

        {/* Scroll hint */}
        <div
          className="absolute flex flex-col items-center gap-1.5"
          style={{
            bottom: 32,
            left: '50%',
            animation: 'bounceY 1.8s ease-in-out infinite',
            color: '#EAE7DA',
            opacity: 0.4,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <span>Descubrir</span>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M8 2 L8 14 M3 10 L8 16 L13 10" stroke="#EAE7DA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ── PACKS SECTION ── */}
      <section
        className="flex flex-col items-center bg-cream"
        style={{ padding: 'clamp(48px, 8vw, 96px) clamp(16px, 5vw, 64px) 160px', gap: 'clamp(24px, 4vw, 36px)' }}
      >
        <div className="text-center mb-2">
          <p
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#0B2150',
              opacity: 0.4,
              marginBottom: 4,
            }}
          >
            Elige tu pack
          </p>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(24px, 4vw, 34px)',
              fontWeight: 900,
              color: '#0B2150',
              lineHeight: 1.15,
              marginBottom: 8,
            }}
          >
            Llena tu álbum de aventuras
          </h2>
          <p style={{ fontSize: 14, color: '#0B2150', opacity: 0.5, maxWidth: 400, margin: '0 auto', lineHeight: 1.6 }}>
            Pegatinas originales ilustradas a mano.<br />Cada una cuenta una historia.
          </p>
        </div>

        {/* Pack cards */}
        <div className="w-full max-w-[820px] flex flex-col" style={{ gap: 'clamp(18px, 3vw, 28px)' }}>
          {PACKS.map(pack => {
            const isSelected = selectedPack === pack.id
            return (
              <div
                key={pack.id}
                onClick={() => setSelectedPack(isSelected ? null : pack.id)}
                className="relative cursor-pointer flex flex-row rounded-3xl overflow-hidden transition-all duration-200"
                style={{
                  background: isSelected ? pack.cardBg : 'white',
                  border: `2.5px solid ${isSelected ? pack.accent : 'transparent'}`,
                  boxShadow: isSelected
                    ? `0 8px 32px rgba(11,33,80,0.13), 6px 6px 0px ${pack.accent}`
                    : '0 4px 20px rgba(11,33,80,0.08), 0 1px 4px rgba(11,33,80,0.05)',
                  transform: isSelected ? 'translateY(-2px)' : undefined,
                  minHeight: 200,
                }}
              >
                {/* Check icon */}
                <div
                  className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: pack.accent,
                    opacity: isSelected ? 1 : 0,
                    transform: isSelected ? 'scale(1)' : 'scale(0.5)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Bestseller badge */}
                {pack.bestseller && (
                  <div
                    className="absolute top-3.5 left-3.5 z-10 text-white"
                    style={{
                      background: '#FA9223',
                      padding: '3px 10px',
                      borderRadius: 99,
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      boxShadow: '2px 2px 0 #0B2150',
                    }}
                  >
                    ⭐ Más vendido
                  </div>
                )}

                {/* Image column */}
                <div
                  className="flex-shrink-0 flex items-center justify-center overflow-hidden"
                  style={{ width: 'clamp(130px, 30%, 200px)', background: pack.imgBg, padding: 16 }}
                >
                  {pack.canvas ? <CanvasDecoration /> : <StickerSetImage count={pack.stickerCount} />}
                </div>

                {/* Content column */}
                <div
                  className="flex-1 flex flex-col justify-between"
                  style={{ padding: 'clamp(18px, 3vw, 28px) clamp(16px, 3vw, 28px)', gap: 12 }}
                >
                  <div>
                    <div
                      className="inline-flex items-center"
                      style={{
                        background: pack.tagBg,
                        color: pack.accent,
                        borderRadius: 99,
                        padding: '3px 10px',
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {pack.tag}
                    </div>
                    <h3
                      className="mt-2"
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: 'clamp(20px, 3.5vw, 26px)',
                        fontWeight: 900,
                        color: '#0B2150',
                        lineHeight: 1.15,
                      }}
                    >
                      {pack.name}
                    </h3>
                    <p className="mt-2" style={{ fontSize: 'clamp(12px, 1.8vw, 14px)', color: '#0B2150', opacity: 0.55, lineHeight: 1.55 }}>
                      {pack.desc}
                    </p>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 900, color: pack.accent }}>
                      {pack.price}
                    </div>
                    <div style={{ fontSize: 12, color: '#0B2150', opacity: 0.4, fontWeight: 600, marginTop: 2 }}>
                      {pack.priceSub}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── MASCOT ── */}
      <div className="mascot-help fixed z-20 flex flex-col items-center" style={{ bottom: 90, left: 14 }}>
        <Mascot size={42} handUp color="#0B2150" />
        <span style={{ fontSize: 9, fontWeight: 700, color: '#0B2150', opacity: 0.45, letterSpacing: '0.05em', marginTop: 1 }}>
          Ayuda
        </span>
      </div>

      {/* ── CART BAR ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center"
        style={{
          padding: '14px clamp(14px, 5vw, 32px) max(18px, env(safe-area-inset-bottom))',
          background: 'rgba(234,231,218,0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1.5px solid rgba(11,33,80,0.08)',
        }}
      >
        <button
          disabled={!selectedPack}
          className="flex-1 max-w-[500px] mx-auto flex items-center justify-center gap-2.5 rounded-full font-bold transition-all duration-150"
          style={{
            padding: '16px 28px',
            fontFamily: 'Nunito, sans-serif',
            fontSize: 'clamp(15px, 2.5vw, 18px)',
            fontWeight: 800,
            background: selectedPack ? '#FA9223' : 'rgba(11,33,80,0.18)',
            color: selectedPack ? 'white' : 'rgba(11,33,80,0.4)',
            border: 'none',
            cursor: selectedPack ? 'pointer' : 'default',
            boxShadow: selectedPack ? '3px 3px 0px #0B2150' : 'none',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {selectedPack ? `Añadir al carrito — ${selectedData?.price}` : 'Selecciona un pack'}
        </button>
      </div>

      {/* ── DRAWER ── */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(11,33,80,0.35)' }}
            onClick={() => setDrawerOpen(false)}
          />
          <div
            className="fixed top-0 left-0 bottom-0 z-50 flex flex-col overflow-hidden"
            style={{
              width: 'min(82%, 320px)',
              background: '#EAE7DA',
              backgroundImage: 'radial-gradient(circle, #0B215010 1px, transparent 1px)',
              backgroundSize: '18px 18px',
              borderRadius: '0 28px 28px 0',
              boxShadow: '6px 0 32px rgba(11,33,80,0.14)',
            }}
          >
            <div
              className="flex items-center justify-between"
              style={{ padding: '20px 22px 16px', borderBottom: '2px solid rgba(11,33,80,0.07)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full border-[2.5px] border-navy flex items-center justify-center font-bold text-lg text-white"
                  style={{ background: '#066FB4' }}
                >
                  A
                </div>
                <div>
                  <p style={{ fontFamily: 'Playfair Display, serif', color: '#0B2150', fontWeight: 800, fontSize: 16 }}>Ana García</p>
                  <p style={{ color: '#0B2150', opacity: 0.4, fontSize: 11 }}>@anaviajera</p>
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: '#0B215015', border: 'none', color: '#0B2150', fontSize: 15, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-2.5">
              {[
                { label: 'Viajes',         icon: '✈️', href: '/home' },
                { label: 'RRSS',           icon: '🌍', href: '/rrss' },
                { label: 'Tienda',         icon: '🛒', href: '/tienda', active: true },
                { label: 'Usuario',        icon: '👤', href: '/perfil' },
                { label: 'Sobre Nosotros', icon: '💛', href: '/sobre-nosotros' },
              ].map((item, i) => (
                <a key={i} href={item.href} style={{ textDecoration: 'none' }}>
                  <div
                    className="nav-item flex items-center gap-3.5"
                    style={{
                      padding: '14px 22px',
                      background: item.active ? 'rgba(11,33,80,0.07)' : 'transparent',
                      borderLeft: item.active ? '4px solid #FA9223' : '4px solid transparent',
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <span style={{ fontWeight: item.active ? 800 : 700, fontSize: 17, color: '#0B2150', opacity: item.active ? 1 : 0.7, fontFamily: item.active ? 'Playfair Display, serif' : 'Nunito, sans-serif', flex: 1 }}>
                      {item.label}
                    </span>
                    {item.active && <div className="w-2 h-2 rounded-full bg-orange" />}
                  </div>
                </a>
              ))}
              <div style={{ margin: '8px 22px', height: 1.5, background: 'rgba(11,33,80,0.08)' }} />
              <div className="nav-item flex items-center gap-3.5" style={{ padding: '12px 22px' }}>
                <Mascot size={28} handUp color="#0B2150" />
                <span style={{ fontWeight: 700, fontSize: 17, color: '#0B2150', opacity: 0.55 }}>Ayuda</span>
              </div>
            </nav>

            <div style={{ padding: '16px 22px 22px', borderTop: '2px solid rgba(11,33,80,0.07)' }}>
              <p style={{ fontSize: 11, color: '#0B2150', opacity: 0.35, textAlign: 'center', fontWeight: 600, letterSpacing: '0.06em' }}>
                MEMENTO MUNDI © 2025
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
