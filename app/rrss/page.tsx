'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mascot } from '@/components/Mascot'

// TODO: Replace with Supabase query from `social_posts` table when ready
const STORIES = [
  { id: 'you',  label: 'Tu viaje', plus: true,  bg: '#EAE7DA', border: '#FA9223',  emoji: null, city: null },
  { id: 's1',   label: '@martina', plus: false, bg: '#5CA4A4',  border: '#0B2150', emoji: '🏛️', city: 'Roma' },
  { id: 's2',   label: '@arthur',  plus: false, bg: '#FA9223',  border: '#0B2150', emoji: '🌊', city: 'Bali' },
  { id: 's3',   label: '@lucas',   plus: false, bg: '#FFB4AD',  border: '#0B2150', emoji: '🗼', city: 'Lisboa' },
  { id: 's4',   label: '@sara',    plus: false, bg: '#066FB4',  border: '#0B2150', emoji: '🌸', city: 'Kyoto' },
  { id: 's5',   label: '@leo',     plus: false, bg: '#0B2150',  border: '#5CA4A4', emoji: '🏔️', city: 'Nepal' },
]

const TRENDING = [
  { tag: '#cinqueterre',   posts: '1.2k posts' },
  { tag: '#japonenotoño',  posts: '840 posts' },
  { tag: '#roadtrip-norte',posts: '512 posts' },
  { tag: '#islasgriegas',  posts: '398 posts' },
]

const MOSAIC1 = [
  { color: '#FA9223', emoji: '🏛️', rot: '-3deg' },
  { color: '#5CA4A4', emoji: '🌅', rot: '2deg' },
  { color: '#FFB4AD', emoji: '🍕', rot: '-1deg' },
  { color: '#066FB4', emoji: '🛵', rot: '3deg' },
]
const MOSAIC2 = [
  { color: '#5CA4A4', emoji: '🌊', rot: '2deg' },
  { color: '#0B2150', emoji: '🏯', rot: '-2deg' },
  { color: '#FFB4AD', emoji: '🍜', rot: '3deg' },
  { color: '#FA9223', emoji: '🎌', rot: '-1deg' },
]

// ── Shared sub-components ──

function PeelCorner({ color = '#5CA4A4', size = 48 }: { color?: string; size?: number }) {
  const S = size
  const id = `pc-${color.replace('#', '')}-${S}`
  return (
    <div style={{ position: 'absolute', top: 0, right: 0, width: S, height: S, pointerEvents: 'none', zIndex: 4 }}>
      <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} fill="none">
        <defs>
          <filter id={`shd-${id}`} x="-40%" y="-40%" width="200%" height="200%">
            <feDropShadow dx="-2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.22)" />
          </filter>
          <linearGradient id={`grd-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f9f6ef" />
            <stop offset="55%" stopColor="#EAE7DA" />
            <stop offset="100%" stopColor="#d6d2c3" />
          </linearGradient>
        </defs>
        <ellipse cx={S * 0.6} cy={S * 0.4} rx={S * 0.28} ry={S * 0.16} transform={`rotate(-45 ${S * 0.6} ${S * 0.4})`} fill="rgba(0,0,0,0.11)" />
        <path d={`M${S} 0 L${S} ${S * 0.8} Q${S * 0.86} ${S * 0.5} ${S * 0.2} 0 Z`} fill={`url(#grd-${id})`} filter={`url(#shd-${id})`} />
        <path d={`M${S * 0.2} 0 Q${S * 0.58} ${S * 0.24} ${S} ${S * 0.8}`} stroke={color} strokeWidth="0.7" strokeDasharray="3 2" opacity="0.3" fill="none" />
      </svg>
    </div>
  )
}

function PhotoBg({ color, emoji, height = 220, label = '' }: { color: string; emoji: string; height?: number; label?: string }) {
  return (
    <div style={{ width: '100%', height, background: color, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg,transparent,transparent 9px,rgba(255,255,255,0.12) 9px,rgba(255,255,255,0.12) 10px)' }} />
      <span style={{ fontSize: 48, filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.25))' }}>{emoji}</span>
      <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center', padding: '0 16px', position: 'relative' }}>{label}</span>
    </div>
  )
}

function Post1() {
  const [liked, setLiked] = useState(false)
  return (
    <div className="bg-white rounded-[22px] relative" style={{ boxShadow: '0 4px 20px rgba(11,33,80,0.10)' }}>
      <PeelCorner color="#5CA4A4" />
      <div className="rounded-[22px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-3.5 pt-3 pb-2.5">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white border-2 border-navy flex-shrink-0" style={{ background: '#5CA4A4' }}>M</div>
          <div className="flex-1">
            <p className="font-bold text-xs text-navy">@martina_travels</p>
            <p className="text-xs text-navy opacity-50 flex items-center gap-1 mt-0.5">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" /></svg>
              Cinque Terre, Italia
            </p>
          </div>
          <span className="text-xs text-navy opacity-35">hace 2h</span>
        </div>

        {/* Photo */}
        <div className="mx-3 mb-3 rounded-2xl overflow-hidden relative" style={{ transform: 'rotate(-2deg)', boxShadow: '0 6px 20px rgba(11,33,80,0.15)' }}>
          <PhotoBg color="#5CA4A4" emoji="🏛️" height={220} label="Cinque Terre · Abril 2025" />
          <div className="absolute bottom-2.5 left-2.5" style={{ background: '#EAE7DA', color: '#0B2150', borderRadius: 8, padding: '4px 9px', fontSize: 11, fontWeight: 800, border: '1.5px solid #0B2150', boxShadow: '2px 2px 0 #0B2150', letterSpacing: '0.08em', transform: 'rotate(-2deg)', fontFamily: 'Playfair Display, serif' }}>14 ABR</div>
        </div>

        <p className="px-3.5 pb-2 text-xs text-navy" style={{ lineHeight: 1.55 }}>el sunset de mi vida 🌅 ¿alguien más ha estado?</p>
        <div className="px-3.5 pb-2">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#FA922220', color: '#FA9223', borderRadius: 99, padding: '3px 10px', fontSize: 11, fontWeight: 800, border: '1.5px solid #FA922240' }}>👋 Con @lucas.viaja</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 px-3.5 pb-3">
          <button onClick={() => setLiked(!liked)} className="flex items-center gap-1.5 text-xs text-navy opacity-55 hover:opacity-100 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? '#FA9223' : 'none'} stroke={liked ? '#FA9223' : '#0B2150'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          </button>
          <button className="flex items-center gap-1.5 text-xs text-navy opacity-55 hover:opacity-100 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B2150" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          </button>
          <button className="flex items-center gap-1.5 text-xs text-navy opacity-55 hover:opacity-100 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B2150" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
          </button>
          <button className="ml-auto flex items-center gap-1.5 text-xs text-navy opacity-55 hover:opacity-100 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B2150" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          </button>
        </div>

        <button className="mx-3 mb-3 w-[calc(100%-24px)] flex items-center justify-center gap-1.5 font-bold text-xs rounded-full py-2.5" style={{ background: '#EBF5F5', color: '#5CA4A4', border: '2px solid #5CA4A4', boxShadow: '2px 2px 0 #5CA4A4' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" /></svg>
          Añadir a mi scrapbook
        </button>
      </div>
    </div>
  )
}

function Post2() {
  return (
    <div className="bg-white rounded-[22px] relative" style={{ boxShadow: '0 4px 20px rgba(11,33,80,0.10)' }}>
      <PeelCorner color="#FA9223" />
      <div className="rounded-[22px] overflow-hidden">
        <div className="flex items-center gap-2 px-3.5 pt-3 pb-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white border-2 border-navy flex-shrink-0" style={{ background: '#FA9223' }}>A</div>
          <div className="flex-1">
            <p className="font-bold text-xs text-navy">@arthur.goes</p>
            <p className="text-xs text-navy opacity-50 mt-0.5">📍 Roma, Italia</p>
          </div>
          <span className="text-xs text-navy opacity-35">hace 5h</span>
        </div>

        <h3 className="font-brasica font-black text-navy px-3.5 pb-2" style={{ fontSize: 22, lineHeight: 1.1 }}>ROMA<br />EN 4 DÍAS</h3>

        <div className="mx-3 mb-2.5 rounded-2xl overflow-hidden grid grid-cols-2 gap-1.5">
          {MOSAIC1.map((m, i) => (
            <div key={i} className="h-24 flex items-center justify-center relative overflow-hidden" style={{ background: m.color, transform: `rotate(${m.rot})` }}>
              <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(-45deg,transparent,transparent 7px,rgba(255,255,255,0.13) 7px,rgba(255,255,255,0.13) 8px)' }} />
              <span className="text-3xl relative z-10" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))' }}>{m.emoji}</span>
            </div>
          ))}
        </div>

        <div className="px-3.5 pb-2 text-xs text-navy opacity-50 flex items-center gap-1.5">
          <span>📍 12 paradas</span><span className="opacity-30">·</span><span>📸 47 fotos</span>
        </div>
        <button className="mx-3 mb-2 w-[calc(100%-24px)] flex items-center justify-center gap-2 text-white font-bold text-sm rounded-full py-3" style={{ background: '#FA9223', border: 'none', boxShadow: '3px 3px 0 #0B2150' }}>
          Ver scrapbook completo
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
        <p className="px-3.5 pb-2 text-xs text-navy opacity-45 font-semibold">❤️ 234 viajeros guardaron este scrapbook</p>
        <div className="flex items-center gap-4 px-3.5 pb-3">
          {['♡', '💬', '↗'].map((icon, i) => (
            <button key={i} className="text-lg text-navy opacity-55 hover:opacity-100 transition-opacity">{icon}</button>
          ))}
          <button className="ml-auto text-lg text-navy opacity-55 hover:opacity-100 transition-opacity">🔖</button>
        </div>
      </div>
    </div>
  )
}

function Post3() {
  return (
    <div className="bg-white rounded-[22px] relative" style={{ boxShadow: '0 4px 20px rgba(11,33,80,0.10)' }}>
      <PeelCorner color="#FFB4AD" />
      <div className="rounded-[22px] overflow-hidden">
        <div className="flex items-center gap-2 px-3.5 pt-3 pb-2">
          <div className="flex flex-shrink-0">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white border-2 border-navy" style={{ background: '#066FB4', zIndex: 2, position: 'relative' }}>A</div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-navy border-2 border-navy" style={{ background: '#FFB4AD', marginLeft: -12, zIndex: 1, position: 'relative' }}>M</div>
          </div>
          <div className="flex-1 ml-1.5">
            <p className="font-bold text-xs text-navy">@arthur + @marta</p>
            <p className="text-xs text-navy opacity-50 mt-0.5">📍 Japón, 2025</p>
          </div>
          <span className="text-xs text-navy opacity-35">hace 1d</span>
        </div>

        <div className="px-3.5 pb-2">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#FFB4AD40', color: '#c44', borderRadius: 99, padding: '3px 10px', fontSize: 11, fontWeight: 800, border: '1.5px solid #FFB4AD' }}>✈️ Viaje compartido</span>
        </div>

        <h3 className="font-brasica font-black text-navy px-3.5 pb-2" style={{ fontSize: 22, lineHeight: 1.1 }}>JAPÓN,<br />DOS MIRADAS</h3>

        <div className="mx-3 mb-2.5 rounded-2xl overflow-hidden grid grid-cols-2 gap-1.5 relative">
          {MOSAIC2.map((m, i) => (
            <div key={i} className="h-24 flex items-center justify-center relative overflow-hidden" style={{ background: m.color, transform: `rotate(${m.rot})` }}>
              <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(-45deg,transparent,transparent 7px,rgba(255,255,255,0.13) 7px,rgba(255,255,255,0.13) 8px)' }} />
              <span className="text-3xl relative z-10" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))' }}>{m.emoji}</span>
            </div>
          ))}
          <div className="absolute top-2.5 right-2.5 rounded-full px-2 py-0.5 text-xs font-bold border border-navy" style={{ background: '#FFB4AD', color: '#0B2150', boxShadow: '1px 1px 0 #0B2150' }}>👥 2 autores</div>
        </div>

        <div className="px-3.5 pb-2 text-xs text-navy opacity-50 flex items-center gap-1.5">
          <span>📍 18 paradas</span><span className="opacity-30">·</span><span>📸 83 fotos</span><span className="opacity-30">·</span><span>🗓️ 10 días</span>
        </div>
        <button className="mx-3 mb-2 w-[calc(100%-24px)] flex items-center justify-center gap-2 text-white font-bold text-sm rounded-full py-3" style={{ background: '#FA9223', border: 'none', boxShadow: '3px 3px 0 #0B2150' }}>
          Ver scrapbook completo
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
        <p className="px-3.5 pb-2 text-xs text-navy opacity-45 font-semibold">❤️ 512 viajeros guardaron este scrapbook</p>
        <div className="flex items-center gap-4 px-3.5 pb-3">
          {['♡', '💬', '↗'].map((icon, i) => (
            <button key={i} className="text-lg text-navy opacity-55 hover:opacity-100 transition-opacity">{icon}</button>
          ))}
          <button className="ml-auto text-lg text-navy opacity-55 hover:opacity-100 transition-opacity">🔖</button>
        </div>
        <button className="mx-3 mb-3 w-[calc(100%-24px)] flex items-center justify-center gap-1.5 font-bold text-xs rounded-full py-2.5" style={{ background: '#EBF5F5', color: '#5CA4A4', border: '2px solid #5CA4A4', boxShadow: '2px 2px 0 #5CA4A4' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" /></svg>
          Añadir a mi scrapbook
        </button>
      </div>
    </div>
  )
}

function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <>
      <div className="fixed inset-0 z-50" style={{ background: 'rgba(11,33,80,0.35)' }} onClick={onClose} />
      <div className="fixed top-0 left-0 bottom-0 z-50 flex flex-col overflow-hidden" style={{ width: 'min(82%, 320px)', background: '#EAE7DA', backgroundImage: 'radial-gradient(circle, #0B215010 1px, transparent 1px)', backgroundSize: '18px 18px', borderRadius: '0 28px 28px 0', boxShadow: '6px 0 32px rgba(11,33,80,0.14)' }}>
        <div className="flex items-center justify-between" style={{ padding: '20px 22px 16px', borderBottom: '2px solid rgba(11,33,80,0.07)' }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border-[2.5px] border-navy flex items-center justify-center font-bold text-lg text-white flex-shrink-0" style={{ background: '#066FB4' }}>A</div>
            <div>
              <p className="font-brasica font-bold text-navy" style={{ fontSize: 16 }}>Ana García</p>
              <p className="text-xs text-navy opacity-40">@anaviajera</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-navy" style={{ background: '#0B215015', border: 'none', fontSize: 15, cursor: 'pointer' }}>✕</button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2.5">
          {[
            { label: 'Viajes',   icon: '✈️', href: '/home' },
            { label: 'RRSS',    icon: '🌍', href: '/rrss', active: true },
            { label: 'Tienda',  icon: '🛒', href: '/tienda' },
            { label: 'Usuario', icon: '👤', href: '/perfil' },
            { label: 'Sobre Nosotros', icon: '💛', href: '/sobre-nosotros' },
          ].map((item, i) => (
            <Link key={i} href={item.href} style={{ textDecoration: 'none' }}>
              <div className="nav-item flex items-center gap-3.5" style={{ padding: '14px 22px', background: item.active ? 'rgba(11,33,80,0.07)' : 'transparent', borderLeft: item.active ? '4px solid #FA9223' : '4px solid transparent' }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ fontWeight: item.active ? 800 : 700, fontSize: 17, color: '#0B2150', opacity: item.active ? 1 : 0.7, flex: 1 }}>{item.label}</span>
                {item.active && <div className="w-2 h-2 rounded-full bg-orange" />}
              </div>
            </Link>
          ))}
          <div style={{ margin: '8px 22px', height: 1.5, background: 'rgba(11,33,80,0.08)' }} />
          <div className="nav-item flex items-center gap-3.5" style={{ padding: '12px 22px' }}>
            <Mascot size={28} handUp color="#0B2150" />
            <span style={{ fontWeight: 700, fontSize: 17, color: '#0B2150', opacity: 0.55 }}>Ayuda</span>
          </div>
        </nav>
        <div style={{ padding: '16px 22px 22px', borderTop: '2px solid rgba(11,33,80,0.07)' }}>
          <p className="text-center text-navy opacity-35 font-semibold" style={{ fontSize: 11, letterSpacing: '0.06em' }}>MEMENTO MUNDI © 2025</p>
        </div>
      </div>
    </>
  )
}

export default function RRSSPage() {
  const [drawer, setDrawer] = useState(false)
  const [activeTab, setActiveTab] = useState<'paraTi' | 'siguiendo' | 'cerca'>('paraTi')

  return (
    <div
      className="min-h-screen bg-cream flex flex-col relative"
      style={{ backgroundImage: 'radial-gradient(circle, rgba(11,33,80,0.07) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
    >
      {/* ── TOP BAR ── */}
      <header className="sticky top-0 z-20 bg-cream flex flex-col" style={{ borderBottom: '1.5px solid rgba(11,33,80,0.07)' }}>
        <div className="flex items-center justify-between px-4 pt-3 pb-2.5">
          <button
            onClick={() => setDrawer(true)}
            className="flex flex-col gap-1.5 p-1.5 rounded-lg icon-btn"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {[0, 1, 2].map(i => <div key={i} className="w-6 h-0.5 rounded bg-navy" />)}
          </button>
          <img src="/MEMENTO_FRASE.svg" alt="Memento Mundi" className="h-6 object-contain" />
          <div className="flex items-center gap-2">
            <button className="relative w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(11,33,80,0.07)', border: 'none', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B2150" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange border border-cream" />
            </button>
            <div className="w-8 h-8 rounded-full border-2 border-navy flex items-center justify-center font-bold text-xs text-white" style={{ background: '#066FB4' }}>A</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 px-4 pb-2.5">
          {([['paraTi', 'Para ti'], ['siguiendo', 'Siguiendo'], ['cerca', 'Cerca']] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="rounded-full font-bold text-xs transition-all px-3 py-1.5"
              style={{
                fontFamily: 'Nunito, sans-serif',
                background: activeTab === id ? '#FA9223' : 'rgba(11,33,80,0.09)',
                color: activeTab === id ? 'white' : 'rgba(11,33,80,0.5)',
                boxShadow: activeTab === id ? '2px 2px 0 #0B2150' : 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* ── STORIES ── */}
      <div className="px-4 pt-3 pb-2.5 flex-shrink-0">
        <p className="font-brasica text-xs font-bold text-navy opacity-45 uppercase tracking-widest mb-2.5">Viajes en directo</p>
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {STORIES.map(s => (
            <div key={s.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer">
              <div className="relative">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{ background: s.plus ? 'rgba(11,33,80,0.05)' : s.bg, border: `2.5px solid ${s.border}`, boxShadow: `2px 2px 0 ${s.border}` }}
                >
                  {s.plus ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FA9223" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  ) : (
                    <span>{s.emoji}</span>
                  )}
                </div>
                {s.city && (
                  <div className="absolute -bottom-1 -right-1 text-white rounded-full px-1.5 font-bold border border-navy" style={{ background: '#FA9223', fontSize: 8, boxShadow: '1px 1px 0 #0B2150' }}>
                    📍{s.city}
                  </div>
                )}
              </div>
              <span className="text-xs font-bold text-navy opacity-60 text-center" style={{ maxWidth: 62, lineHeight: 1.2, color: s.plus ? '#FA9223' : undefined, opacity: s.plus ? 1 : 0.6 }}>
                {s.plus ? 'Tu viaje' : s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-4 h-px" style={{ background: 'rgba(11,33,80,0.07)' }} />

      {/* ── FEED ── */}
      <div className="flex-1 overflow-y-auto px-4 pt-2.5 pb-28 flex flex-col gap-5">
        <Post1 />
        <Post2 />
        <Post3 />
      </div>

      {/* ── BOTTOM NAV ── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around bg-cream" style={{ padding: '10px 8px 14px', borderTop: '1.5px solid rgba(11,33,80,0.09)' }}>
        <Link href="/home">
          <button className="flex flex-col items-center gap-0.5 bg-transparent border-none cursor-pointer" style={{ opacity: 0.42 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B2150" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            <span className="text-xs font-bold text-navy" style={{ fontSize: 9 }}>Inicio</span>
          </button>
        </Link>
        <Link href="/tienda">
          <button className="flex flex-col items-center gap-0.5 bg-transparent border-none cursor-pointer" style={{ opacity: 0.42 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B2150" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l1.5-5h15L21 9" /><path d="M4 9v11h16V9" /><path d="M9 14h6" /></svg>
            <span className="text-xs font-bold text-navy" style={{ fontSize: 9 }}>Tienda</span>
          </button>
        </Link>

        {/* QR button (floated up) */}
        <button
          className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer"
          style={{ marginTop: -20 }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center border-[2.5px] border-navy"
            style={{ background: '#FA9223', boxShadow: '3px 3px 0 #0B2150' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
              <path d="M14 14h3v3M21 17v4h-4M14 21h0" />
            </svg>
          </div>
          <span className="text-xs font-bold text-navy mt-1.5" style={{ fontSize: 9, opacity: 0.6 }}>Escanear</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 bg-transparent border-none cursor-pointer" style={{ opacity: 0.42 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B2150" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          <span className="text-xs font-bold text-navy" style={{ fontSize: 9 }}>Mundo</span>
        </button>

        <Link href="/perfil">
          <button className="flex flex-col items-center gap-0.5 bg-transparent border-none cursor-pointer" style={{ opacity: 0.42 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B2150" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            <span className="text-xs font-bold text-navy" style={{ fontSize: 9 }}>Mi diario</span>
          </button>
        </Link>
      </div>

      <Drawer open={drawer} onClose={() => setDrawer(false)} />
    </div>
  )
}
