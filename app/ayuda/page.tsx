'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Package, Camera, BookOpen, CreditCard, Palette, MessageCircle,
  Search, X, Play, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight,
  Mail, Smartphone, Plane, Globe, ShoppingBag, User, Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Mascot } from '@/components/Mascot'

// TODO: Replace with Supabase query from `faqs` table once client is set up

interface Category {
  id: string
  title: string
  sub: string
  icon: LucideIcon
  bg: string
  rot: number
}

const CATEGORIES: Category[] = [
  { id: 'pedidos',  title: 'Pedidos y envíos',     sub: 'Estado, plazos, devoluciones',   icon: Package,        bg: '#FFE7CC', rot: -2.5 },
  { id: 'qr',       title: 'Cómo funciona el QR',  sub: 'Escanear y vincular pegatinas',  icon: Camera,         bg: '#D6ECEC', rot: 1.8 },
  { id: 'book',     title: 'Mi scrapbook',         sub: 'Crear, editar y compartir',      icon: BookOpen,       bg: '#FFE0DC', rot: -1.2 },
  { id: 'cuenta',   title: 'Cuenta y pagos',       sub: 'Login, métodos, facturas',       icon: CreditCard,     bg: '#D6E4F5', rot: 2.3 },
  { id: 'perso',    title: 'Personalización',      sub: 'Diseña tu pack a medida',        icon: Palette,        bg: '#FFEFD9', rot: -2.0 },
  { id: 'contacto', title: 'Contacto',             sub: 'Habla con nuestro equipo',       icon: MessageCircle,  bg: '#E2F1F1', rot: 1.4 },
]

const FAQS = [
  { q: '¿Cuánto tarda en llegar mi pedido?',          a: 'Los envíos estándar tardan entre 3 y 5 días laborables en península, 5-7 en Baleares y Canarias. Te enviamos un correo con el número de seguimiento en cuanto sale del almacén.' },
  { q: '¿Cómo escaneo una pegatina por primera vez?', a: 'Abre la cámara del móvil sobre el QR de la pegatina (o usa la app), pulsa el enlace y vincúlala a un viaje existente o crea uno nuevo. Ya está, ya cuenta dentro de tu scrapbook.' },
  { q: '¿Puedo añadir más participantes a un viaje?', a: 'Sí. Desde el detalle del viaje toca «Compartir» y envía el enlace o invita por email. Pueden subir fotos, comentarios y escanear pegatinas también.' },
  { q: '¿Las pegatinas son resistentes al agua?',     a: 'Las pegatinas estándar tienen laminado mate impermeable, aguantan lluvia y golpes. La línea «kraft» es papel y no se recomienda para exterior.' },
  { q: '¿Cómo cambio mi método de pago?',             a: 'Entra en Perfil → Cuenta y pagos → Métodos de pago. Puedes añadir tarjeta, Bizum o PayPal y marcar uno como preferido.' },
  { q: '¿Puedo devolver un pack si no me gusta?',     a: 'Tienes 14 días desde la recepción para devolverlo, siempre que no hayas activado ninguna pegatina. Te reembolsamos en el mismo método de pago en 3-5 días.' },
  { q: '¿Qué hago si pierdo una pegatina?',           a: 'Si la pegatina aún no estaba activada, no pasa nada. Si ya estaba vinculada, escríbenos y la regeneramos en tu cuenta.' },
  { q: '¿Puedo personalizar el diseño de mi pack?',   a: 'Claro: en Tienda → Personaliza tu pack puedes elegir colores, ilustraciones y añadir tu nombre. Los packs custom tardan 2-3 días extra en preparación.' },
  { q: '¿Cómo descargo mi scrapbook en PDF?',         a: 'Desde el detalle del viaje pulsa el icono de descarga arriba a la derecha y elige formato PDF. Se generará en unos segundos y lo recibirás por correo.' },
]

const VIDEOS = [
  { id: 1, title: 'Cómo escanear tu primera pegatina', duration: '0:42', bg: 'linear-gradient(160deg, #FFB4AD 0%, #FA9223 100%)' },
  { id: 2, title: 'Personalizar tu pack en 60 seg',     duration: '1:05', bg: 'linear-gradient(160deg, #5CA4A4 0%, #066FB4 100%)' },
  { id: 3, title: 'Crea tu primer viaje',               duration: '0:38', bg: 'linear-gradient(160deg, #FA9223 0%, #0B2150 100%)' },
  { id: 4, title: 'Invita a tus compis al scrapbook',   duration: '0:51', bg: 'linear-gradient(160deg, #FFB4AD 0%, #066FB4 100%)' },
  { id: 5, title: 'Descarga tu álbum en PDF',           duration: '0:33', bg: 'linear-gradient(160deg, #5CA4A4 0%, #FFB4AD 100%)' },
]

const SECTIONS = [
  { id: 'cats',    num: '01', label: 'Categorías' },
  { id: 'faq',     num: '02', label: 'FAQ destacadas' },
  { id: 'videos',  num: '03', label: 'Tutoriales' },
  { id: 'contact', num: '04', label: 'Contáctanos' },
]

function SectionLabel({ idx, label, sub, rightAction }: { idx: string; label: string; sub?: string; rightAction?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-3 pb-2.5" style={{ borderBottom: '2px dashed rgba(11,33,80,0.18)' }}>
      <div className="flex-1 min-w-0">
        <p className="font-brasica text-navy opacity-40 uppercase mb-1" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em' }}>· {idx} ·</p>
        <h2 className="font-brasica font-black text-navy" style={{ fontSize: 'clamp(22px, 3vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.01em' }}>{label}</h2>
        {sub && <p className="text-navy opacity-55 mt-1 font-semibold" style={{ fontSize: 13 }}>{sub}</p>}
      </div>
      {rightAction}
    </div>
  )
}

export default function AyudaPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [openFaq, setOpenFaq] = useState<number>(0)
  const [activeSection, setActiveSection] = useState('cats')
  const carouselRef = useRef<HTMLDivElement>(null)

  const filteredFaqs = FAQS.filter(f =>
    !search ||
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  )

  const scrollVid = (dir: number) => {
    carouselRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' })
  }

  const goSection = (id: string) => {
    setActiveSection(id)
    const el = document.getElementById(`sec-${id}`)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 130
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const onScroll = () => {
      let current = 'cats'
      for (const s of SECTIONS) {
        const el = document.getElementById(`sec-${s.id}`)
        if (!el) continue
        if (el.getBoundingClientRect().top < 200) current = s.id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-cream relative" style={{ fontFamily: 'Nunito, sans-serif', color: '#0B2150' }}>

      {/* ── TOP NAV ── */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between"
        style={{ padding: '14px clamp(14px, 4vw, 32px)', background: 'rgba(234,231,218,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1.5px solid rgba(11,33,80,0.06)' }}
      >
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col gap-1.5 p-1.5 rounded-lg"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {[0, 1, 2].map(i => <div key={i} className="w-6 h-0.5 rounded bg-navy" />)}
        </button>
        <img src="/MEMENTO_FRASE.svg" alt="Memento Mundi" className="h-8 object-contain" style={{ maxWidth: '40vw' }} />
        <div className="w-9 h-9 rounded-full border-2 border-navy flex items-center justify-center font-bold text-sm text-white" style={{ background: '#066FB4' }}>A</div>
      </header>

      {/* ── HERO ── */}
      <section className="relative text-center" style={{ padding: 'clamp(28px, 6vw, 64px) clamp(16px, 4vw, 48px) 12px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,180,173,0.18) 0, transparent 35%), radial-gradient(circle at 80% 70%, rgba(92,164,164,0.18) 0, transparent 35%), radial-gradient(circle, rgba(11,33,80,0.06) 1px, transparent 1px)', backgroundSize: 'auto, auto, 22px 22px' }} />
        <p className="font-brasica text-navy opacity-45 uppercase relative mb-3" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em' }}>· Centro de ayuda ·</p>
        <h1 className="font-brasica font-black text-navy relative mb-1" style={{ fontSize: 'clamp(34px, 7vw, 52px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          ¿En qué te <span style={{ color: '#FA9223', fontStyle: 'italic' }}>echamos</span> una mano?
        </h1>
        <p className="text-navy opacity-55 mt-3 relative mx-auto" style={{ fontSize: 'clamp(13px, 1.6vw, 16px)', maxWidth: 540 }}>
          Resolvemos tus dudas en segundos. Busca abajo o explora las categorías.
        </p>
      </section>

      {/* ── STICKY SEARCH ── */}
      <div className="sticky z-10" style={{ top: 64, padding: '14px clamp(14px, 4vw, 28px) 8px', background: 'linear-gradient(to bottom, #EAE7DA 80%, rgba(234,231,218,0))' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div
            className="flex items-center gap-2.5 bg-white"
            style={{ border: '3px solid #0B2150', borderRadius: 99, boxShadow: '5px 5px 0 #0B2150', padding: '14px 22px', transition: 'box-shadow .2s, transform .2s' }}
          >
            <Search size={22} strokeWidth={2.6} color="#0B2150" aria-hidden />
            <input
              type="text"
              placeholder="Busca tu duda..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-navy font-semibold"
              style={{ border: 'none', outline: 'none', fontFamily: 'Nunito, sans-serif', fontSize: 17 }}
              aria-label="Buscar pregunta"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                aria-label="Limpiar búsqueda"
                className="w-6 h-6 rounded-full flex items-center justify-center text-cream flex-shrink-0"
                style={{ background: '#0B2150', border: 'none', cursor: 'pointer' }}
              >
                <X size={13} strokeWidth={3} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div style={{ width: '100%', maxWidth: 1400, margin: '0 auto', padding: '22px clamp(14px, 4vw, 48px) 100px' }}>
        <div className="lg:grid" style={{ '--sidebar-w': '240px' } as React.CSSProperties}>
          <div className="hidden lg:flex" style={{ width: 240, position: 'sticky', top: 130, alignSelf: 'start', flexDirection: 'column', gap: 4, padding: '22px 16px', background: 'white', border: '2.5px solid #0B2150', borderRadius: 18, boxShadow: '4px 4px 0 #0B2150', height: 'fit-content', float: 'left', marginRight: 36, marginBottom: 20 }}>
            <p className="font-brasica text-navy opacity-45 uppercase mb-2.5" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', padding: '0 12px' }}>En esta página</p>
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => goSection(s.id)}
                className="flex items-center gap-2.5 text-left w-full rounded-xl text-navy"
                style={{
                  padding: '10px 12px',
                  fontWeight: 700,
                  fontSize: 14,
                  background: activeSection === s.id ? '#FA922315' : 'transparent',
                  color: activeSection === s.id ? '#FA9223' : '#0B2150',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background .15s',
                }}
              >
                {activeSection === s.id && <div style={{ width: 4, height: 16, borderRadius: 2, background: '#FA9223', flexShrink: 0 }} />}
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 11, opacity: 0.5, letterSpacing: '0.12em', flexShrink: 0 }}>{s.num}</span>
                <span className="flex-1">{s.label}</span>
              </button>
            ))}
            <div style={{ margin: '10px 6px', height: 1.5, background: 'rgba(11,33,80,0.08)' }} />
            <div className="flex items-center gap-2.5 px-3">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#4FB477', boxShadow: '0 0 0 0 rgba(79,180,119,0.6)', animation: 'pulse 2.2s infinite' }} />
              <p className="text-navy opacity-70 font-bold" style={{ fontSize: 12 }}>Servicio operativo</p>
            </div>
          </div>

          {/* Main content */}
          <main>

            {/* CATEGORIES */}
            <div id="sec-cats" className="mb-12">
              <SectionLabel idx="01" label="Categorías rápidas" sub="Elige el tema y vamos directos al grano" />
              <div className="mt-5 grid gap-4.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {CATEGORIES.map(cat => {
                  const Icon = cat.icon
                  return (
                    <div
                      key={cat.id}
                      className="flex items-center gap-3.5 cursor-pointer"
                      style={{
                        background: cat.bg,
                        border: '2.5px solid #0B2150',
                        borderRadius: 18,
                        boxShadow: '4px 4px 0 #0B2150',
                        padding: '18px',
                        transform: `rotate(${cat.rot}deg)`,
                        transition: 'transform .25s, box-shadow .2s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg)'; (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0 #0B2150' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = `rotate(${cat.rot}deg)`; (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0 #0B2150' }}
                    >
                      <div className="w-16 h-16 rounded-xl bg-white border-[2.5px] border-navy flex items-center justify-center flex-shrink-0">
                        <Icon size={30} strokeWidth={2} color="#0B2150" aria-hidden />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-black text-navy" style={{ fontSize: 17, lineHeight: 1.15, marginBottom: 3 }}>{cat.title}</p>
                        <p className="text-navy opacity-65 font-semibold font-grown" style={{ fontSize: 12 }}>{cat.sub}</p>
                      </div>
                      <ArrowRight size={18} strokeWidth={2.5} className="text-navy/55 flex-shrink-0" aria-hidden />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* FAQ */}
            <div id="sec-faq" className="mb-12">
              <SectionLabel idx="02" label="Preguntas frecuentes" sub={`${filteredFaqs.length} de ${FAQS.length} resultados`} />
              <div className="mt-5 flex flex-col gap-3.5" style={{ maxWidth: 820 }}>
                {filteredFaqs.length === 0 && (
                  <div className="text-center py-5" style={{ background: '#f3f0e3', border: '2.5px solid #0B2150', borderRadius: 14, boxShadow: '3px 3px 0 #0B2150' }}>
                    <p className="font-brasica font-bold text-navy" style={{ fontSize: 17 }}>Sin resultados</p>
                    <p className="text-navy opacity-55 mt-1" style={{ fontSize: 13 }}>Prueba con otras palabras o pídenos ayuda abajo.</p>
                  </div>
                )}
                {filteredFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#f3f0e3',
                      border: '2.5px solid #0B2150',
                      borderRadius: 14,
                      boxShadow: '3px 3px 0 #0B2150',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                      className="w-full flex items-center justify-between gap-3 text-left"
                      style={{ padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 16, color: '#0B2150' }}
                    >
                      <span className="flex-1">{faq.q}</span>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-cream font-bold"
                        style={{
                          background: openFaq === idx ? '#FA9223' : '#0B2150',
                          fontSize: 16,
                          transition: 'transform .25s, background .25s',
                          transform: openFaq === idx ? 'rotate(45deg)' : 'none',
                        }}
                      >
                        +
                      </div>
                    </button>

                    {openFaq === idx && (
                      <>
                        {/* Ticket divider with punch holes */}
                        <div className="relative mx-4" style={{ borderTop: '2px dotted rgba(11,33,80,0.45)' }}>
                          <div style={{ position: 'absolute', top: -9, left: -27, width: 18, height: 18, borderRadius: '50%', background: '#EAE7DA', border: '2.5px solid #0B2150' }} />
                          <div style={{ position: 'absolute', top: -9, right: -27, width: 18, height: 18, borderRadius: '50%', background: '#EAE7DA', border: '2.5px solid #0B2150' }} />
                        </div>
                        <p className="text-navy px-5 py-4" style={{ fontSize: 14.5, lineHeight: 1.6, opacity: 0.78 }}>{faq.a}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* VIDEOS */}
            <div id="sec-videos" className="mb-12">
              <SectionLabel
                idx="03"
                label="Tutoriales en vídeo"
                sub="Cápsulas de 1 minuto"
                rightAction={
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => scrollVid(-1)}
                      aria-label="Vídeo anterior"
                      className="w-9 h-9 rounded-full flex items-center justify-center text-navy bg-white border-2 border-navy hover:bg-navy/5 transition-colors"
                      style={{ cursor: 'pointer' }}
                    >
                      <ChevronLeft size={18} strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={() => scrollVid(1)}
                      aria-label="Vídeo siguiente"
                      className="w-9 h-9 rounded-full flex items-center justify-center text-navy bg-white border-2 border-navy hover:bg-navy/5 transition-colors"
                      style={{ cursor: 'pointer' }}
                    >
                      <ChevronRight size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                }
              />
              <div
                ref={carouselRef}
                className="flex gap-4.5 mt-6 mb-12 pb-2"
                style={{ overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', marginLeft: -4, marginRight: -4, paddingLeft: 4, paddingRight: 4 }}
              >
                {VIDEOS.map(v => (
                  <div
                    key={v.id}
                    className="flex-shrink-0 relative cursor-pointer"
                    style={{
                      width: 200,
                      aspectRatio: '9/16',
                      borderRadius: 18,
                      border: '2.5px solid #0B2150',
                      boxShadow: '4px 4px 0 #0B2150',
                      overflow: 'hidden',
                      background: v.bg,
                      scrollSnapAlign: 'start',
                      transition: 'transform .25s, box-shadow .2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translate(-1px,-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0 #0B2150' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0 #0B2150' }}
                  >
                    {/* Decorative circles */}
                    <svg viewBox="0 0 200 360" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.35, width: '100%', height: '100%' }}>
                      <circle cx="50" cy="70" r="55" fill="white" />
                      <circle cx="155" cy="140" r="38" fill="white" opacity="0.6" />
                      <circle cx="70" cy="260" r="70" fill="white" opacity="0.4" />
                    </svg>
                    <div className="absolute top-2.5 right-2.5 rounded-lg text-white font-bold" style={{ background: 'rgba(11,33,80,0.7)', padding: '2px 7px', fontSize: 10, letterSpacing: '0.04em' }}>{v.duration}</div>
                    <div className="absolute font-brasica text-white font-bold" style={{ left: 12, right: 12, bottom: 44, fontSize: 15, lineHeight: 1.2, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{v.title}</div>
                    <div className="absolute left-3 bottom-3 flex items-center gap-1.5 rounded-full" style={{ background: 'rgba(11,33,80,0.85)', padding: '6px 11px 6px 9px', backdropFilter: 'blur(6px)' }}>
                      <Play size={11} strokeWidth={0} fill="#EAE7DA" color="#EAE7DA" aria-hidden />
                      <span className="text-cream font-grown font-bold" style={{ fontSize: 11 }}>VER</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div id="sec-contact" className="mb-8">
              <SectionLabel idx="04" label="¿Aún necesitas ayuda?" sub="Estamos a un mensaje" />
              <div
                className="mt-5 bg-white"
                style={{ border: '2.5px solid #0B2150', borderRadius: 24, boxShadow: '4px 4px 0 #0B2150', padding: 'clamp(18px, 3vw, 28px)', maxWidth: 820 }}
              >
                <div className="flex items-start gap-4 mb-5 flex-wrap">
                  <Mascot size={64} wink color="#0B2150" />
                  <div className="flex-1 pt-1.5" style={{ minWidth: 200 }}>
                    <p className="font-brasica font-black text-navy" style={{ fontSize: 'clamp(18px, 2.2vw, 22px)', lineHeight: 1.15, marginBottom: 6 }}>
                      Si seguimos sin aclararte la duda...
                    </p>
                    <p className="text-navy opacity-65" style={{ fontSize: 14, lineHeight: 1.5 }}>
                      Escríbenos por donde te apetezca. Solemos contestar en menos de 2 horas en horario laboral.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
                  {([
                    { bg: '#D6ECEC', icon: MessageCircle, label: 'Chat en vivo', sub: 'Respuesta ~2 min' },
                    { bg: '#FFE0DC', icon: Mail,          label: 'Email',        sub: 'Respuesta ~2 h' },
                    { bg: '#FFE7CC', icon: Smartphone,    label: 'WhatsApp',     sub: 'L–V de 9 a 19h' },
                  ] as const).map((c, i) => {
                    const Icon = c.icon
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-2.5 text-center cursor-pointer"
                        style={{ background: c.bg, border: '2.5px solid #0B2150', borderRadius: 16, padding: '22px 16px', boxShadow: '3px 3px 0 #0B2150', transition: 'transform .15s, box-shadow .2s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translate(-1px,-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0 #0B2150' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '3px 3px 0 #0B2150' }}
                      >
                        <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-navy" style={{ background: 'rgba(255,255,255,0.55)' }}>
                          <Icon size={28} strokeWidth={2} color="#0B2150" aria-hidden />
                        </div>
                        <p className="font-display font-bold text-navy" style={{ fontSize: 15 }}>{c.label}</p>
                        <p className="text-navy/60 font-grown font-bold" style={{ fontSize: 11 }}>{c.sub}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* STATUS */}
            <div id="sec-status" className="flex items-center justify-center gap-2.5 py-3 flex-wrap opacity-70">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#4FB477', animation: 'pulse 2.2s infinite' }} />
              <p className="text-navy font-bold" style={{ fontSize: 13 }}>Todo funcionando correctamente</p>
              <span className="text-navy opacity-50" style={{ fontSize: 11 }}>· actualizado hace 2 min</span>
            </div>

          </main>
        </div>
      </div>

      {/* ── DRAWER ── */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 z-50" style={{ background: 'rgba(11,33,80,0.35)' }} onClick={() => setDrawerOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 z-50 flex flex-col overflow-hidden" style={{ width: 'min(82%, 320px)', background: '#EAE7DA', backgroundImage: 'radial-gradient(circle, #0B215010 1px, transparent 1px)', backgroundSize: '18px 18px', borderRadius: '0 28px 28px 0', boxShadow: '6px 0 32px rgba(11,33,80,0.14)' }}>
            <div className="flex items-center justify-between" style={{ padding: '20px 22px 16px', borderBottom: '2px solid rgba(11,33,80,0.07)' }}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full border-[2.5px] border-navy flex items-center justify-center font-bold text-lg text-white flex-shrink-0" style={{ background: '#066FB4' }}>A</div>
                <div>
                  <p className="font-brasica font-bold text-navy" style={{ fontSize: 16 }}>Ana García</p>
                  <p className="text-xs text-navy opacity-40">@anaviajera</p>
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Cerrar menú"
                className="w-8 h-8 rounded-full flex items-center justify-center text-navy"
                style={{ background: '#0B215015', border: 'none', cursor: 'pointer' }}
              >
                <X size={15} strokeWidth={2.5} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2.5">
              {([
                { label: 'Viajes',         icon: Plane,        href: '/home' },
                { label: 'RRSS',           icon: Globe,        href: '/rrss' },
                { label: 'Tienda',         icon: ShoppingBag,  href: '/tienda' },
                { label: 'Usuario',        icon: User,         href: '/perfil' },
                { label: 'Sobre Nosotros', icon: Sparkles,     href: '/sobre-nosotros' },
              ] as const).map((item, i) => {
                const Icon = item.icon
                return (
                  <Link key={i} href={item.href} style={{ textDecoration: 'none' }}>
                    <div className="flex items-center gap-3.5 transition-colors" style={{ padding: '14px 22px', borderLeft: '4px solid transparent', cursor: 'pointer' }}>
                      <Icon size={20} strokeWidth={2} color="#0B2150" style={{ opacity: 0.7 }} />
                      <span className="font-grown" style={{ fontWeight: 700, fontSize: 16, color: '#0B2150', opacity: 0.7, flex: 1 }}>{item.label}</span>
                    </div>
                  </Link>
                )
              })}
              <div style={{ margin: '8px 22px', height: 1.5, background: 'rgba(11,33,80,0.08)' }} />
              {/* Ayuda active */}
              <div className="flex items-center gap-3.5" style={{ padding: '14px 22px', background: 'rgba(11,33,80,0.07)', borderLeft: '4px solid #FA9223' }}>
                <Mascot size={28} handUp color="#0B2150" />
                <span className="font-brasica font-bold text-navy flex-1" style={{ fontSize: 17 }}>Ayuda</span>
                <div className="w-2 h-2 rounded-full bg-orange" />
              </div>
            </nav>
            <div style={{ padding: '16px 22px 22px', borderTop: '2px solid rgba(11,33,80,0.07)' }}>
              <Link href="/home" style={{ textDecoration: 'none' }}>
                <button className="w-full bg-orange text-white rounded-full font-grown font-bold flex items-center justify-center gap-2 transition hover:translate-y-0.5" style={{ padding: '15px 22px', fontSize: 15, border: 'none', cursor: 'pointer', boxShadow: '3px 3px 0px #0B2150' }}>
                  <ArrowLeft size={16} strokeWidth={2.5} />
                  Volver a Viajes
                </button>
              </Link>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(79,180,119,0.55); }
          70%  { box-shadow: 0 0 0 8px rgba(79,180,119,0); }
          100% { box-shadow: 0 0 0 0 rgba(79,180,119,0); }
        }
      `}</style>
    </div>
  )
}
