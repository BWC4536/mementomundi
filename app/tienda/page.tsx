'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Camera, Map, Sparkles, Stamp, ArrowRight, Plane, Heart } from 'lucide-react'
import { Navbar, type NavbarUser } from '@/components/Navbar'
import { createClient } from '@/lib/supabase/client'

const HeroScrollVideo = dynamic(
  () => import('@/components/tienda/HeroScrollVideo').then(mod => ({ default: mod.HeroScrollVideo })),
  { ssr: false }
)

// ─── Marquee ─────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ['Paris', 'Tokyo', 'Lisboa', 'Rio', 'Marrakech', 'New York', 'Bali', 'Cape Town', 'Reykjavík', 'Buenos Aires']
  const row = (
    <div className="flex items-center gap-10 px-6 font-display italic text-3xl md:text-4xl text-cream/90 whitespace-nowrap">
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-10">
          <span>{c}</span>
          <Plane className="h-5 w-5 -rotate-12 text-coral" />
        </span>
      ))}
    </div>
  )
  return (
    <div className="bg-teal-dark py-4 overflow-hidden border-y-4 border-navy">
      <div className="marquee">{row}{row}</div>
    </div>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />

      {/* decorative stickers */}
      <div
        className="absolute top-10 left-6 hidden md:block float-slow"
        style={{ ['--r' as string]: '-8deg' } as React.CSSProperties}
      >
        <div className="polaroid w-36 -rotate-6">
          <div className="h-28 w-full bg-gradient-to-br from-teal-light to-teal-dark rounded-sm" />
          <p className="font-display italic text-center mt-1 text-navy">Lisboa &apos;24</p>
        </div>
      </div>

      <div
        className="absolute bottom-12 left-16 hidden lg:block float-slow"
        style={{ ['--r' as string]: '12deg', animationDelay: '1s' } as React.CSSProperties}
      >
        <span className="inline-block bg-coral text-navy font-display font-black uppercase tracking-wider text-sm px-4 py-2 rounded-full sticker rotate-12">
          No Vacancy
        </span>
      </div>

      <div
        className="absolute top-24 right-10 hidden md:block float-slow"
        style={{ ['--r' as string]: '8deg', animationDelay: '0.6s' } as React.CSSProperties}
      >
        <span className="inline-block bg-orange text-cream font-display font-black uppercase text-xs px-3 py-1 rounded-sm sticker -rotate-6">
          Par avion ✈
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20 grid lg:grid-cols-12 gap-10 items-center relative">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 bg-cream border-2 border-navy/15 text-navy/80 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5 text-orange" /> Est. somewhere on the road
          </span>
          <h1 className="mt-5 font-display font-black text-teal-dark text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95]">
            Collect the world,
            <span className="block italic text-orange">one memory at a time.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy/75">
            Memento Mundi is a little studio for big wanderers — turn your trips into polaroid stacks,
            sticker walls, pinned maps and stories worth retelling.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#join"
              className="inline-flex items-center gap-2 bg-orange text-navy font-bold px-6 py-3.5 rounded-full shadow-[0_8px_0_-2px_#0B2130] hover:translate-y-0.5 hover:shadow-[0_4px_0_-2px_#0B2130] transition"
            >
              Start your album <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 text-navy font-semibold underline decoration-wavy decoration-teal-light underline-offset-4 hover:text-teal-dark"
            >
              See how it works
            </a>
          </div>
          <div className="mt-10 flex items-center gap-4 text-sm text-navy/60">
            <div className="flex -space-x-2">
              {['#FFB4AD', '#5CA4AA', '#FA9223', '#066F84'].map((c, i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-cream" style={{ background: c }} />
              ))}
            </div>
            <span>
              <strong className="text-navy">12,348</strong> wanderers already collecting
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative aspect-square max-w-md mx-auto">
            {/* Sun disc */}
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-orange to-coral shadow-[inset_0_-30px_60px_rgba(11,33,48,0.2)]" />
            {/* Pinned map vibe */}
            <div
              className="absolute inset-12 rounded-full border-[3px] border-dashed border-cream/70 animate-spin"
              style={{ animationDuration: '40s' }}
            />
            {/* Female character */}
            <img
              src="/character-female.png"
              alt="A wandering memento illustration"
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[78%] drop-shadow-[0_20px_25px_rgba(11,33,48,0.25)]"
            />
            {/* Polaroid pinned */}
            <div
              className="absolute -top-4 -right-4 polaroid w-40 rotate-12 float-slow"
              style={{ ['--r' as string]: '12deg' } as React.CSSProperties}
            >
              <div className="h-28 w-full bg-gradient-to-br from-teal-light to-teal-dark rounded-sm relative overflow-hidden">
                <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-orange" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-teal-dark" />
              </div>
              <p className="font-display italic text-center mt-1 text-navy text-sm">Greetings!</p>
              <span className="tape -top-2 left-1/2 -translate-x-1/2 -rotate-3" />
            </div>
            <Stamp className="absolute bottom-4 -left-4 h-20 w-20 text-teal-dark opacity-80 -rotate-12" />
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  )
}

// ─── Features ────────────────────────────────────────────────────────────────
function Features() {
  const items = [
    { icon: Camera, title: 'Polaroid Stacks', body: 'Drop your shots into curated, vintage-styled stacks that look like a real memory box.', color: 'bg-coral' },
    { icon: Map, title: 'Pinned Maps', body: 'Drop a pin for every city. Watch your personal world map fill up, trip after trip.', color: 'bg-teal-light' },
    { icon: Stamp, title: 'Sticker Walls', body: 'Earn travel stickers as you go — coffee in Roma, surf in Bali, sunsets in Santorini.', color: 'bg-orange' },
    { icon: Heart, title: 'Story Pages', body: "Write the side of the trip a photo can't. Little stories, big feelings, shared with friends.", color: 'bg-teal-dark text-cream' },
  ]
  return (
    <section id="features" className="py-24 relative bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p className="font-display italic text-orange text-xl">— The Studio</p>
            <h2 className="font-display font-black text-teal-dark text-4xl md:text-6xl mt-2 max-w-2xl">
              A little corner shop for your <span className="italic text-navy">wandering soul.</span>
            </h2>
          </div>
          <p className="max-w-sm text-navy/70">
            Four tools, one cozy studio. Made to feel like an old travel journal — only this one
            never runs out of pages.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <div
              key={i}
              className="group bg-card border-2 border-navy/15 rounded-2xl p-6 hover:-translate-y-1 hover:border-navy/40 transition shadow-[6px_6px_0_0_#0B2130]"
            >
              <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${it.color}`}>
                <it.icon className="h-6 w-6 text-navy" />
              </div>
              <h3 className="mt-5 font-display font-bold text-2xl text-navy">{it.title}</h3>
              <p className="mt-2 text-navy/70 text-sm leading-relaxed">{it.body}</p>
              <div className="mt-5 text-sm font-bold text-teal-dark inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Stories ─────────────────────────────────────────────────────────────────
function Stories() {
  const quotes = [
    { name: 'Ines & Jordi', trip: 'Lisboa → Marrakech', text: "It feels like the back of an old postcard, but on my phone. I haven't journaled this much in years.", color: 'bg-coral' },
    { name: 'Theo', trip: 'Hokkaido, winter', text: 'The sticker wall got me. I planned a whole detour just to unlock the ramen one.', color: 'bg-orange' },
    { name: 'Mara', trip: 'Patagonia loop', text: "Ten cities in, my pinned map looks like a tiny constellation. Best souvenir I've ever 'kept'.", color: 'bg-teal-light' },
  ]
  return (
    <section id="stories" className="py-24 bg-navy text-cream relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-20" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <p className="font-display italic text-coral text-xl">— Stories from the road</p>
            <h2 className="font-display font-black text-4xl md:text-6xl mt-2">
              Postcards from <span className="italic text-orange">people who keep going.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-cream/70">
            Real notes from real travelers using Memento Mundi to keep the magic of the road
            long after the tan has faded.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {quotes.map((q, i) => (
            <div
              key={i}
              className={`relative ${q.color} text-navy rounded-2xl p-7 border-2 border-navy shadow-[8px_8px_0_0_#0B2130] ${
                i === 1 ? 'md:translate-y-6 -rotate-1' : i === 2 ? 'rotate-1' : '-rotate-1'
              }`}
            >
              <span className="tape -top-3 left-8 -rotate-6 bg-cream/80" />
              <p className="font-display text-xl leading-snug">&ldquo;{q.text}&rdquo;</p>
              <div className="mt-6 pt-4 border-t border-navy/30 flex items-center justify-between text-sm">
                <strong>{q.name}</strong>
                <span className="italic">{q.trip}</span>
              </div>
            </div>
          ))}
          <img
            src="/character-male.png"
            alt="Traveler illustration"
            className="hidden lg:block absolute -bottom-32 -right-6 w-48 drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
function Gallery() {
  const tiles = [
    { c: 'from-teal-light to-teal-dark', label: 'Santorini, GR', rot: '-rotate-3' },
    { c: 'from-orange to-coral', label: 'Marrakech, MA', rot: 'rotate-2' },
    { c: 'from-coral to-orange', label: 'Tulum, MX', rot: '-rotate-2' },
    { c: 'from-teal-dark to-navy', label: 'Reykjavík, IS', rot: 'rotate-3' },
    { c: 'from-orange to-teal-light', label: 'Hanoi, VN', rot: '-rotate-1' },
  ]
  return (
    <section id="gallery" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-display italic text-orange text-xl">— Wanderwall</p>
          <h2 className="font-display font-black text-teal-dark text-4xl md:text-6xl mt-2">
            One wall. <span className="italic">A whole world.</span>
          </h2>
        </div>
        <div className="flex flex-wrap justify-center items-end gap-6">
          {tiles.map((t, i) => (
            <div key={i} className={`polaroid w-48 sm:w-56 ${t.rot} hover:rotate-0 hover:-translate-y-2 transition`}>
              <div className={`h-44 w-full bg-gradient-to-br ${t.c} rounded-sm`} />
              <p className="font-display italic text-center mt-2 text-navy">{t.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section id="join" className="relative py-28 overflow-hidden bg-teal-dark text-cream">
      <div className="absolute inset-0 grain opacity-25" />
      <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-orange/30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-coral/30 blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <img src="/memento-sticker.png" alt="Memento" className="mx-auto w-64 sm:w-80 md:w-96 sticker -rotate-2" />
        <p className="font-display italic text-coral text-2xl mt-4">…mundi.</p>
        <h2 className="font-display font-black text-4xl md:text-6xl mt-6">
          Start your album. <span className="italic text-orange">The world is waiting.</span>
        </h2>
        <p className="mt-5 max-w-xl mx-auto text-cream/80">
          Free to start. No camera roll left behind. Bring a friend — memories are better in pairs.
        </p>
        <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="flex-1 px-5 py-4 rounded-full bg-cream text-navy placeholder:text-navy/50 focus:outline-none focus:ring-4 focus:ring-orange/50"
          />
          <button
            type="submit"
            className="bg-orange text-navy font-bold px-6 py-4 rounded-full shadow-[0_8px_0_-2px_#0B2130] hover:translate-y-0.5 hover:shadow-[0_4px_0_-2px_#0B2130] transition inline-flex items-center justify-center gap-2"
          >
            Get my passport <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </div>
    </section>
  )
}

// ─── Página principal ───────────────────────────────────────────────────────
export default function TiendaPage() {
  const [navUser, setNavUser] = useState<NavbarUser | null>(null)

  useEffect(() => {
    let cancelled = false
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (cancelled) return
      if (!user) { setNavUser(null); return }
      const meta = user.user_metadata as Record<string, unknown> | null
      const metaName = typeof meta?.display_name === 'string' ? meta.display_name : ''
      const display = metaName || user.email?.split('@')[0] || 'Viajero'
      setNavUser({ displayName: display, initial: display[0]?.toUpperCase() || 'V' })
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user
      if (!user) { setNavUser(null); return }
      const meta = user.user_metadata as Record<string, unknown> | null
      const metaName = typeof meta?.display_name === 'string' ? meta.display_name : ''
      const display = metaName || user.email?.split('@')[0] || 'Viajero'
      setNavUser({ displayName: display, initial: display[0]?.toUpperCase() || 'V' })
    })
    return () => { cancelled = true; subscription.unsubscribe() }
  }, [])

  return (
    <main className="bg-cream text-navy">
      <Navbar user={navUser} />

      {/* HERO SCROLL-DRIVEN VIDEO — al inicio de la página */}
      <HeroScrollVideo />

      {/* Contenido original del index.tsx, adaptado a Next.js */}
      <Hero />
      <Features />
      <Stories />
      <Gallery />
      <CTA />
    </main>
  )
}
