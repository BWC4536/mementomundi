'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Landmark, Waves, Building, Flower, Mountain,
  Sunrise, Pizza, Bike, Building2, UtensilsCrossed, Flag,
  Heart, MessageCircle, Share2, Bookmark,
  Plus, MapPin, Camera, Calendar, Users,
  Plane, Globe, ShoppingBag, User, Sparkles,
  Bell, X, Home, QrCode, Map as MapIcon, HelpCircle,
  ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { MotionSection } from '@/components/ui/MotionSection'

// TODO: Replace with Supabase query from `social_posts` table when ready
interface Story {
  id: string
  label: string
  plus?: boolean
  bg: string
  border: string
  icon: LucideIcon | null
  city: string | null
}

const STORIES: Story[] = [
  { id: 'you', label: 'Tu viaje', plus: true,  bg: '#EAE7DA', border: '#FA9223', icon: null,      city: null },
  { id: 's1',  label: '@martina', plus: false, bg: '#5CA4A4', border: '#0B2150', icon: Landmark,  city: 'Roma' },
  { id: 's2',  label: '@arthur',  plus: false, bg: '#FA9223', border: '#0B2150', icon: Waves,     city: 'Bali' },
  { id: 's3',  label: '@lucas',   plus: false, bg: '#FFB4AD', border: '#0B2150', icon: Building,  city: 'Lisboa' },
  { id: 's4',  label: '@sara',    plus: false, bg: '#066FB4', border: '#0B2150', icon: Flower,    city: 'Kyoto' },
  { id: 's5',  label: '@leo',     plus: false, bg: '#0B2150', border: '#5CA4A4', icon: Mountain,  city: 'Nepal' },
]

interface MosaicTile {
  color: string
  icon: LucideIcon
  rot: string
}

const MOSAIC1: MosaicTile[] = [
  { color: '#FA9223', icon: Landmark, rot: '-3deg' },
  { color: '#5CA4A4', icon: Sunrise,  rot: '2deg' },
  { color: '#FFB4AD', icon: Pizza,    rot: '-1deg' },
  { color: '#066FB4', icon: Bike,     rot: '3deg' },
]
const MOSAIC2: MosaicTile[] = [
  { color: '#5CA4A4', icon: Waves,             rot: '2deg' },
  { color: '#0B2150', icon: Building2,         rot: '-2deg' },
  { color: '#FFB4AD', icon: UtensilsCrossed,   rot: '3deg' },
  { color: '#FA9223', icon: Flag,              rot: '-1deg' },
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

function PhotoBg({ color, icon: Icon, height = 220, label = '' }: { color: string; icon: LucideIcon; height?: number; label?: string }) {
  return (
    <div style={{ width: '100%', height, background: color, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg,transparent,transparent 9px,rgba(255,255,255,0.12) 9px,rgba(255,255,255,0.12) 10px)' }} aria-hidden />
      <Icon size={56} strokeWidth={1.6} color="#0B2150" style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.25))', opacity: 0.85 }} aria-hidden />
      <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.78)', letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center', padding: '0 16px', position: 'relative', fontFamily: 'Nunito, sans-serif' }}>{label}</span>
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
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-sm text-white border-2 border-navy flex-shrink-0" style={{ background: '#5CA4A4' }}>M</div>
          <div className="flex-1">
            <p className="font-grown font-bold text-xs text-navy">@martina_travels</p>
            <p className="text-xs text-navy/55 inline-flex items-center gap-1 mt-0.5">
              <MapPin size={10} strokeWidth={2.5} aria-hidden />
              Cinque Terre, Italia
            </p>
          </div>
          <span className="text-xs text-navy/35 font-grown italic">hace 2h</span>
        </div>

        {/* Photo */}
        <div className="mx-3 mb-3 rounded-2xl overflow-hidden relative" style={{ transform: 'rotate(-2deg)', boxShadow: '0 6px 20px rgba(11,33,80,0.15)' }}>
          <PhotoBg color="#5CA4A4" icon={Landmark} height={220} label="Cinque Terre · Abril 2025" />
          <div className="absolute bottom-2.5 left-2.5 font-display font-black" style={{ background: '#EAE7DA', color: '#0B2150', borderRadius: 8, padding: '4px 9px', fontSize: 11, border: '1.5px solid #0B2150', boxShadow: '2px 2px 0 #0B2150', letterSpacing: '0.08em', transform: 'rotate(-2deg)' }}>14 ABR</div>
        </div>

        <p className="px-3.5 pb-2 text-sm text-navy font-grown italic" style={{ lineHeight: 1.55 }}>
          el sunset de mi vida. ¿alguien más ha estado?
        </p>
        <div className="px-3.5 pb-2">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#FA922220', color: '#FA9223', borderRadius: 99, padding: '4px 10px', fontSize: 11, fontWeight: 800, border: '1.5px solid #FA922240' }}>
            <Users size={11} strokeWidth={2.5} aria-hidden />
            Con @lucas.viaja
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 px-3.5 pb-3">
          <button
            onClick={() => setLiked(!liked)}
            aria-label={liked ? 'Quitar like' : 'Dar like'}
            className="flex items-center text-navy/55 hover:text-navy transition-colors cursor-pointer"
          >
            <Heart
              size={20}
              strokeWidth={2}
              fill={liked ? '#FA9223' : 'none'}
              color={liked ? '#FA9223' : '#0B2150'}
            />
          </button>
          <button aria-label="Comentar" className="text-navy/55 hover:text-navy transition-colors cursor-pointer">
            <MessageCircle size={20} strokeWidth={2} />
          </button>
          <button aria-label="Compartir" className="text-navy/55 hover:text-navy transition-colors cursor-pointer">
            <Share2 size={20} strokeWidth={2} />
          </button>
          <button aria-label="Guardar" className="ml-auto text-navy/55 hover:text-navy transition-colors cursor-pointer">
            <Bookmark size={20} strokeWidth={2} />
          </button>
        </div>

        <button className="mx-3 mb-3 w-[calc(100%-24px)] inline-flex items-center justify-center gap-1.5 font-grown font-bold text-xs rounded-full py-2.5" style={{ background: '#EBF5F5', color: '#5CA4A4', border: '2px solid #5CA4A4', boxShadow: '2px 2px 0 #5CA4A4' }}>
          <BookmarkPlusIcon />
          Añadir a mi scrapbook
        </button>
      </div>
    </div>
  )
}

function BookmarkPlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  )
}

function Post2() {
  return (
    <div className="bg-white rounded-[22px] relative" style={{ boxShadow: '0 4px 20px rgba(11,33,80,0.10)' }}>
      <PeelCorner color="#FA9223" />
      <div className="rounded-[22px] overflow-hidden">
        <div className="flex items-center gap-2 px-3.5 pt-3 pb-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-sm text-white border-2 border-navy flex-shrink-0" style={{ background: '#FA9223' }}>A</div>
          <div className="flex-1">
            <p className="font-grown font-bold text-xs text-navy">@arthur.goes</p>
            <p className="text-xs text-navy/55 inline-flex items-center gap-1 mt-0.5">
              <MapPin size={10} strokeWidth={2.5} aria-hidden />
              Roma, Italia
            </p>
          </div>
          <span className="text-xs text-navy/35 font-grown italic">hace 5h</span>
        </div>

        <h3 className="font-display font-black text-navy px-3.5 pb-2" style={{ fontSize: 22, lineHeight: 1.05 }}>
          ROMA<br /><span className="italic text-orange">EN 4 DÍAS</span>
        </h3>

        <div className="mx-3 mb-2.5 rounded-2xl overflow-hidden grid grid-cols-2 gap-1.5">
          {MOSAIC1.map((m, i) => {
            const Icon = m.icon
            return (
              <div key={i} className="h-24 flex items-center justify-center relative overflow-hidden" style={{ background: m.color, transform: `rotate(${m.rot})` }}>
                <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(-45deg,transparent,transparent 7px,rgba(255,255,255,0.13) 7px,rgba(255,255,255,0.13) 8px)' }} aria-hidden />
                <Icon size={36} strokeWidth={1.75} color="#0B2150" className="relative z-10" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))', opacity: 0.9 }} aria-hidden />
              </div>
            )
          })}
        </div>

        <div className="px-3.5 pb-2 text-xs text-navy/55 inline-flex items-center gap-3 font-grown">
          <span className="inline-flex items-center gap-1"><MapPin size={11} strokeWidth={2.25} />12 paradas</span>
          <span className="text-navy/30">·</span>
          <span className="inline-flex items-center gap-1"><Camera size={11} strokeWidth={2.25} />47 fotos</span>
        </div>
        <button className="mx-3 mb-2 w-[calc(100%-24px)] inline-flex items-center justify-center gap-2 text-white font-grown font-bold text-sm rounded-full py-3 cursor-pointer transition hover:translate-y-0.5" style={{ background: '#FA9223', border: 'none', boxShadow: '3px 3px 0 #0B2150' }}>
          Ver scrapbook completo
          <ArrowRight size={13} strokeWidth={2.5} />
        </button>
        <p className="px-3.5 pb-2 text-xs text-navy/55 font-grown inline-flex items-center gap-1.5">
          <Heart size={11} strokeWidth={2.5} fill="#FA9223" color="#FA9223" />
          234 viajeros guardaron este scrapbook
        </p>
        <div className="flex items-center gap-4 px-3.5 pb-3">
          {[Heart, MessageCircle, Share2].map((Icon, i) => (
            <button key={i} className="text-navy/55 hover:text-navy transition-colors cursor-pointer">
              <Icon size={18} strokeWidth={2} />
            </button>
          ))}
          <button className="ml-auto text-navy/55 hover:text-navy transition-colors cursor-pointer">
            <Bookmark size={18} strokeWidth={2} />
          </button>
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
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-sm text-white border-2 border-navy" style={{ background: '#066FB4', zIndex: 2, position: 'relative' }}>A</div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-sm text-navy border-2 border-navy" style={{ background: '#FFB4AD', marginLeft: -12, zIndex: 1, position: 'relative' }}>M</div>
          </div>
          <div className="flex-1 ml-1.5">
            <p className="font-grown font-bold text-xs text-navy">@arthur + @marta</p>
            <p className="text-xs text-navy/55 inline-flex items-center gap-1 mt-0.5">
              <MapPin size={10} strokeWidth={2.5} aria-hidden />
              Japón, 2025
            </p>
          </div>
          <span className="text-xs text-navy/35 font-grown italic">hace 1d</span>
        </div>

        <div className="px-3.5 pb-2">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#FFB4AD40', color: '#c44', borderRadius: 99, padding: '4px 10px', fontSize: 11, fontWeight: 800, border: '1.5px solid #FFB4AD' }}>
            <Plane size={11} strokeWidth={2.5} />
            Viaje compartido
          </span>
        </div>

        <h3 className="font-display font-black text-navy px-3.5 pb-2" style={{ fontSize: 22, lineHeight: 1.05 }}>
          JAPÓN,<br /><span className="italic text-coral">DOS MIRADAS</span>
        </h3>

        <div className="mx-3 mb-2.5 rounded-2xl overflow-hidden grid grid-cols-2 gap-1.5 relative">
          {MOSAIC2.map((m, i) => {
            const Icon = m.icon
            return (
              <div key={i} className="h-24 flex items-center justify-center relative overflow-hidden" style={{ background: m.color, transform: `rotate(${m.rot})` }}>
                <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(-45deg,transparent,transparent 7px,rgba(255,255,255,0.13) 7px,rgba(255,255,255,0.13) 8px)' }} aria-hidden />
                <Icon size={36} strokeWidth={1.75} color={i === 1 ? '#EAE7DA' : '#0B2150'} className="relative z-10" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))', opacity: 0.9 }} aria-hidden />
              </div>
            )
          })}
          <div className="absolute top-2.5 right-2.5 rounded-full px-2 py-0.5 text-xs font-grown font-bold border border-navy inline-flex items-center gap-1" style={{ background: '#FFB4AD', color: '#0B2150', boxShadow: '1px 1px 0 #0B2150' }}>
            <Users size={10} strokeWidth={2.5} />2 autores
          </div>
        </div>

        <div className="px-3.5 pb-2 text-xs text-navy/55 inline-flex items-center gap-3 font-grown">
          <span className="inline-flex items-center gap-1"><MapPin size={11} strokeWidth={2.25} />18 paradas</span>
          <span className="text-navy/30">·</span>
          <span className="inline-flex items-center gap-1"><Camera size={11} strokeWidth={2.25} />83 fotos</span>
          <span className="text-navy/30">·</span>
          <span className="inline-flex items-center gap-1"><Calendar size={11} strokeWidth={2.25} />10 días</span>
        </div>
        <button className="mx-3 mb-2 w-[calc(100%-24px)] inline-flex items-center justify-center gap-2 text-white font-grown font-bold text-sm rounded-full py-3 cursor-pointer transition hover:translate-y-0.5" style={{ background: '#FA9223', border: 'none', boxShadow: '3px 3px 0 #0B2150' }}>
          Ver scrapbook completo
          <ArrowRight size={13} strokeWidth={2.5} />
        </button>
        <p className="px-3.5 pb-2 text-xs text-navy/55 font-grown inline-flex items-center gap-1.5">
          <Heart size={11} strokeWidth={2.5} fill="#FA9223" color="#FA9223" />
          512 viajeros guardaron este scrapbook
        </p>
        <div className="flex items-center gap-4 px-3.5 pb-3">
          {[Heart, MessageCircle, Share2].map((Icon, i) => (
            <button key={i} className="text-navy/55 hover:text-navy transition-colors cursor-pointer">
              <Icon size={18} strokeWidth={2} />
            </button>
          ))}
          <button className="ml-auto text-navy/55 hover:text-navy transition-colors cursor-pointer">
            <Bookmark size={18} strokeWidth={2} />
          </button>
        </div>
        <button className="mx-3 mb-3 w-[calc(100%-24px)] inline-flex items-center justify-center gap-1.5 font-grown font-bold text-xs rounded-full py-2.5" style={{ background: '#EBF5F5', color: '#5CA4A4', border: '2px solid #5CA4A4', boxShadow: '2px 2px 0 #5CA4A4' }}>
          <BookmarkPlusIcon />
          Añadir a mi scrapbook
        </button>
      </div>
    </div>
  )
}

function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  const navItems: Array<{ label: string; icon: LucideIcon; href: string; active?: boolean }> = [
    { label: 'Viajes',         icon: Plane,        href: '/home' },
    { label: 'RRSS',           icon: Globe,        href: '/rrss', active: true },
    { label: 'Tienda',         icon: ShoppingBag,  href: '/tienda' },
    { label: 'Usuario',        icon: User,         href: '/perfil' },
    { label: 'Sobre Nosotros', icon: Sparkles,     href: '/sobre-nosotros' },
  ]

  return (
    <>
      <div className="fixed inset-0 z-50" style={{ background: 'rgba(11,33,80,0.35)' }} onClick={onClose} />
      <div className="fixed top-0 left-0 bottom-0 z-50 flex flex-col overflow-hidden" style={{ width: 'min(82%, 320px)', background: '#EAE7DA', backgroundImage: 'radial-gradient(circle, #0B215010 1px, transparent 1px)', backgroundSize: '18px 18px', borderRadius: '0 28px 28px 0', boxShadow: '6px 0 32px rgba(11,33,80,0.14)' }}>
        <div className="flex items-center justify-between" style={{ padding: '20px 22px 16px', borderBottom: '2px solid rgba(11,33,80,0.07)' }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border-[2.5px] border-navy flex items-center justify-center font-display font-black text-lg text-white flex-shrink-0" style={{ background: '#066FB4' }}>A</div>
            <div>
              <p className="font-display font-bold text-navy" style={{ fontSize: 16 }}>Ana García</p>
              <p className="text-xs text-navy/45 font-grown">@anaviajera</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="w-8 h-8 rounded-full flex items-center justify-center text-navy cursor-pointer"
            style={{ background: '#0B215015', border: 'none' }}
          >
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2.5">
          {navItems.map((item, i) => {
            const Icon = item.icon
            return (
              <Link key={i} href={item.href} style={{ textDecoration: 'none' }}>
                <div
                  className="flex items-center gap-3.5 transition-colors"
                  style={{
                    padding: '14px 22px',
                    background: item.active ? 'rgba(11,33,80,0.07)' : 'transparent',
                    borderLeft: item.active ? '4px solid #FA9223' : '4px solid transparent',
                    cursor: 'pointer',
                  }}
                >
                  <Icon size={20} strokeWidth={2} color="#0B2150" style={{ opacity: item.active ? 1 : 0.7 }} />
                  <span className="font-grown" style={{ fontWeight: item.active ? 800 : 700, fontSize: 16, color: '#0B2150', opacity: item.active ? 1 : 0.7, flex: 1 }}>
                    {item.label}
                  </span>
                  {item.active && <div className="w-2 h-2 rounded-full bg-orange" />}
                </div>
              </Link>
            )
          })}
          <div style={{ margin: '8px 22px', height: 1.5, background: 'rgba(11,33,80,0.08)' }} />
          <Link href="/ayuda" style={{ textDecoration: 'none' }}>
            <div className="flex items-center gap-3.5" style={{ padding: '12px 22px', cursor: 'pointer' }}>
              <HelpCircle size={20} strokeWidth={2} color="#0B2150" style={{ opacity: 0.6 }} />
              <span className="font-grown" style={{ fontWeight: 700, fontSize: 16, color: '#0B2150', opacity: 0.6 }}>Ayuda</span>
            </div>
          </Link>
        </nav>
        <div style={{ padding: '16px 22px 22px', borderTop: '2px solid rgba(11,33,80,0.07)' }}>
          <p className="text-center text-navy/40 font-display font-bold uppercase" style={{ fontSize: 11, letterSpacing: '0.16em' }}>
            Memento Mundi © 2025
          </p>
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
            aria-label="Abrir menú"
            className="flex flex-col gap-1.5 p-1.5 rounded-lg cursor-pointer transition-colors hover:bg-navy/5"
            style={{ background: 'none', border: 'none' }}
          >
            {[0, 1, 2].map(i => <div key={i} className="w-6 h-0.5 rounded bg-navy" />)}
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/MEMENTO_FRASE.svg" alt="Memento Mundi" className="h-6 object-contain" />
          <div className="flex items-center gap-2">
            <button
              aria-label="Notificaciones"
              className="relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
              style={{ background: 'rgba(11,33,80,0.07)', border: 'none' }}
            >
              <Bell size={16} strokeWidth={2} color="#0B2150" />
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange border border-cream" />
            </button>
            <div className="w-8 h-8 rounded-full border-2 border-navy flex items-center justify-center font-display font-black text-xs text-white" style={{ background: '#066FB4' }}>A</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 px-4 pb-2.5">
          {([['paraTi', 'Para ti'], ['siguiendo', 'Siguiendo'], ['cerca', 'Cerca']] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="rounded-full font-grown font-bold text-xs transition-all px-3 py-1.5 cursor-pointer"
              style={{
                background: activeTab === id ? '#FA9223' : 'rgba(11,33,80,0.09)',
                color: activeTab === id ? 'white' : 'rgba(11,33,80,0.5)',
                boxShadow: activeTab === id ? '2px 2px 0 #0B2150' : 'none',
                border: 'none',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* ── STORIES ── */}
      <MotionSection className="px-4 pt-3 pb-2.5 flex-shrink-0" amount={0.05}>
        <p className="font-display font-bold text-xs text-navy/55 uppercase tracking-widest mb-2.5">
          Viajes en directo
        </p>
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {STORIES.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer">
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: s.plus ? 'rgba(11,33,80,0.05)' : s.bg,
                      border: `2.5px solid ${s.border}`,
                      boxShadow: `2px 2px 0 ${s.border}`,
                    }}
                  >
                    {s.plus ? (
                      <Plus size={22} strokeWidth={2.5} color="#FA9223" />
                    ) : Icon ? (
                      <Icon size={24} strokeWidth={2} color={s.bg === '#0B2150' ? '#EAE7DA' : '#0B2150'} />
                    ) : null}
                  </div>
                  {s.city && (
                    <div
                      className="absolute -bottom-1 -right-1 text-white rounded-full px-1.5 py-0.5 font-grown font-bold border border-navy inline-flex items-center gap-0.5"
                      style={{ background: '#FA9223', fontSize: 8, boxShadow: '1px 1px 0 #0B2150' }}
                    >
                      <MapPin size={7} strokeWidth={3} />{s.city}
                    </div>
                  )}
                </div>
                <span
                  className="font-grown text-xs font-bold text-center"
                  style={{ maxWidth: 62, lineHeight: 1.2, color: s.plus ? '#FA9223' : '#0B2150', opacity: s.plus ? 1 : 0.6 }}
                >
                  {s.plus ? 'Tu viaje' : s.label}
                </span>
              </div>
            )
          })}
        </div>
      </MotionSection>

      <div className="mx-4 h-px" style={{ background: 'rgba(11,33,80,0.07)' }} />

      {/* ── FEED ── */}
      <div className="flex-1 overflow-y-auto px-4 pt-2.5 pb-28 flex flex-col gap-5">
        <MotionSection><Post1 /></MotionSection>
        <MotionSection delay={0.1}><Post2 /></MotionSection>
        <MotionSection delay={0.2}><Post3 /></MotionSection>
      </div>

      {/* ── BOTTOM NAV ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around bg-cream"
        style={{ padding: '10px 8px 14px', borderTop: '1.5px solid rgba(11,33,80,0.09)' }}
      >
        <Link href="/home" aria-label="Inicio">
          <button className="flex flex-col items-center gap-0.5 bg-transparent border-none cursor-pointer" style={{ opacity: 0.42 }}>
            <Home size={20} strokeWidth={2} color="#0B2150" />
            <span className="font-grown font-bold text-navy" style={{ fontSize: 9 }}>Inicio</span>
          </button>
        </Link>
        <Link href="/tienda" aria-label="Tienda">
          <button className="flex flex-col items-center gap-0.5 bg-transparent border-none cursor-pointer" style={{ opacity: 0.42 }}>
            <ShoppingBag size={20} strokeWidth={2} color="#0B2150" />
            <span className="font-grown font-bold text-navy" style={{ fontSize: 9 }}>Tienda</span>
          </button>
        </Link>

        {/* QR button (floated up) */}
        <Link href="/nuevo-viaje" aria-label="Escanear QR">
          <button
            className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer"
            style={{ marginTop: -20 }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center border-[2.5px] border-navy transition hover:translate-y-0.5"
              style={{ background: '#FA9223', boxShadow: '3px 3px 0 #0B2150' }}
            >
              <QrCode size={24} strokeWidth={2.4} color="white" />
            </div>
            <span className="font-grown font-bold text-navy mt-1.5" style={{ fontSize: 9, opacity: 0.6 }}>Escanear</span>
          </button>
        </Link>

        <button className="flex flex-col items-center gap-0.5 bg-transparent border-none cursor-pointer" style={{ opacity: 0.42 }}>
          <MapIcon size={20} strokeWidth={2} color="#0B2150" />
          <span className="font-grown font-bold text-navy" style={{ fontSize: 9 }}>Mundo</span>
        </button>

        <Link href="/perfil" aria-label="Mi diario">
          <button className="flex flex-col items-center gap-0.5 bg-transparent border-none cursor-pointer" style={{ opacity: 0.42 }}>
            <User size={20} strokeWidth={2} color="#0B2150" />
            <span className="font-grown font-bold text-navy" style={{ fontSize: 9 }}>Mi diario</span>
          </button>
        </Link>
      </div>

      <Drawer open={drawer} onClose={() => setDrawer(false)} />
    </div>
  )
}
