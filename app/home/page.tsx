export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { Plus, HelpCircle, MapPin, ShoppingBag } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { TripCard } from '@/components/TripCard'
import { MotionSection } from '@/components/ui/MotionSection'
import { StickerBadge } from '@/components/ui/StickerBadge'
import type { Trip } from '@/types'

// ── Mock data (used when Supabase is not connected or user has no trips) ────
const MOCK_TRIPS: Trip[] = [
  {
    id: '1',
    name: 'Grecia 2025',
    place: 'Santorini, Grecia',
    emoji: '',
    color: '#5CA4A4',
    stickersUsed: 28,
    stickersTotal: 50,
    participants: ['Ana', 'Luis', 'Marta'],
    createdAt: '2025-03-01',
    coverImage: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=225&fit=crop',
  },
  {
    id: '2',
    name: 'Lisboa con todo',
    place: 'Lisboa, Portugal',
    emoji: '',
    color: '#FA9223',
    stickersUsed: 12,
    stickersTotal: 50,
    participants: ['Tú', 'Raquel'],
    createdAt: '2025-02-15',
    coverImage: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=225&fit=crop',
  },
  {
    id: '3',
    name: 'Tokyo dream',
    place: 'Tokyo, Japón',
    emoji: '',
    color: '#FFB4AD',
    stickersUsed: 5,
    stickersTotal: 50,
    participants: ['Tú'],
    createdAt: '2025-01-20',
    coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=225&fit=crop',
  },
]

// ── Data fetching ────────────────────────────────────────────────────────────
async function getTripsAndUser(): Promise<{
  trips: Trip[]
  userName: string
  userInitial: string
  userAvatar?: string
}> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return { trips: MOCK_TRIPS, userName: 'Ana García', userInitial: 'A' }
  }

  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { trips: MOCK_TRIPS, userName: 'Viajero', userInitial: 'V' }

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, avatar_url, username')
      .eq('id', user.id)
      .single()

    const userName = profile?.full_name ?? user.email?.split('@')[0] ?? 'Viajero'
    const userInitial = userName[0].toUpperCase()
    const userAvatar = profile?.avatar_url ?? undefined

    const { data: tripsData } = await supabase
      .from('trips')
      .select(`
        id,
        name,
        destination,
        cover_photo_url,
        created_at,
        trip_members!inner(user_id, status)
      `)
      .eq('trip_members.user_id', user.id)
      .eq('archived', false)
      .order('created_at', { ascending: false })
      .limit(20)

    if (!tripsData || tripsData.length === 0) {
      return { trips: [], userName, userInitial, userAvatar }
    }

    const trips: Trip[] = tripsData.map((t: {
      id: string
      name: string
      destination: string
      cover_photo_url: string | null
      created_at: string
    }, i: number) => ({
      id: t.id,
      name: t.name,
      place: t.destination,
      emoji: '',
      color: ['#5CA4A4', '#FA9223', '#FFB4AD', '#066FB4'][i % 4],
      stickersUsed: 0,
      stickersTotal: 50,
      participants: [userName],
      createdAt: t.created_at,
      coverImage: t.cover_photo_url ?? undefined,
    }))

    return { trips, userName, userInitial, userAvatar }
  } catch {
    return { trips: MOCK_TRIPS, userName: 'Ana García', userInitial: 'A' }
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const { trips, userName, userInitial, userAvatar } = await getTripsAndUser()
  const firstName = userName.split(' ')[0]

  return (
    <div className="min-h-screen bg-cream text-navy">
      <Navbar user={{ displayName: userName, initial: userInitial, avatarUrl: userAvatar }} />

      {/* Hero header */}
      <MotionSection className="relative overflow-hidden">
        <div className="grain absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-8 relative">
          <p className="font-display italic text-orange text-base sm:text-lg mb-2">
            — Bienvenido, {firstName}
          </p>
          <h1 className="font-display font-black text-teal-dark text-4xl sm:text-5xl md:text-6xl leading-[0.95]">
            Tus viajes,
            <span className="block italic text-navy">en una sola pared.</span>
          </h1>

          {/* Decorative sticker badge */}
          <div className="absolute top-8 right-6 hidden md:block float-slow"
               style={{ ['--r' as string]: '8deg' } as React.CSSProperties}>
            <StickerBadge color="orange" icon={MapPin} rotate={8}>
              {trips.length} {trips.length === 1 ? 'destino' : 'destinos'}
            </StickerBadge>
          </div>
        </div>
      </MotionSection>

      {/* Trip cards */}
      <MotionSection className="relative pb-28" delay={0.15}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4">
            <p className="font-grown text-xs font-bold uppercase tracking-[0.18em] text-navy/55">
              Mis viajes
            </p>
            <span className="font-grown text-xs font-bold uppercase tracking-[0.18em] text-navy/45">
              {trips.length} {trips.length === 1 ? 'viaje' : 'viajes'}
            </span>
          </div>

          {trips.length > 0 ? (
            <div className="flex flex-col gap-4">
              {trips.map((trip, i) => (
                <TripCard key={trip.id} trip={trip} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </MotionSection>

      {/* Floating actions */}
      <Link
        href="/ayuda"
        className="fixed bottom-7 left-4 z-10 flex flex-col items-center gap-1
                   transition-transform hover:-translate-y-0.5 active:scale-95"
        aria-label="Ir a ayuda"
      >
        <div className="w-12 h-12 rounded-full bg-cream border-2 border-navy
                        flex items-center justify-center shadow-[3px_3px_0_#0B2150]">
          <HelpCircle size={22} strokeWidth={2} color="#0B2150" />
        </div>
        <span className="font-grown text-[10px] font-bold uppercase tracking-wider text-navy/55">
          Ayuda
        </span>
      </Link>

      <Link
        href="/tienda"
        className="fixed bottom-7 right-4 z-10 inline-flex items-center gap-2 py-3 px-5 rounded-full
                   bg-orange text-navy font-bold text-sm
                   border-2 border-navy
                   shadow-[0_8px_0_-2px_#0B2130]
                   transition-all hover:translate-y-0.5 hover:shadow-[0_4px_0_-2px_#0B2130]
                   active:scale-[0.97]"
      >
        <Plus size={16} strokeWidth={2.5} />
        Nuevo viaje
      </Link>
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="relative w-48 h-56 mb-6">
        <Image
          src="/character-female.png"
          alt="Memento Mundi traveler"
          fill
          className="object-contain drop-shadow-[0_20px_25px_rgba(11,33,72,0.25)]"
        />
        <div
          className="absolute top-2 -right-2 float-slow"
          style={{ ['--r' as string]: '-10deg' } as React.CSSProperties}
        >
          <StickerBadge color="coral" icon={MapPin} rotate={-10} size="sm">
            ¡Vamos!
          </StickerBadge>
        </div>
      </div>

      <h2 className="font-display font-black text-navy text-2xl mb-2">
        Sin viajes <span className="italic text-orange">todavía</span>
      </h2>
      <p className="font-grown text-sm text-navy/55 mb-6 max-w-xs leading-relaxed">
        Coge unas pegatinas y crea tu primer viaje — las memorias buenas empiezan pequeñas.
      </p>

      <Link
        href="/tienda"
        className="inline-flex items-center gap-2 bg-orange text-navy font-bold px-6 py-3.5 rounded-full
                   border-2 border-navy
                   shadow-[0_8px_0_-2px_#0B2130]
                   transition hover:translate-y-0.5 hover:shadow-[0_4px_0_-2px_#0B2130]"
      >
        <ShoppingBag size={18} strokeWidth={2.25} />
        Comprar pegatinas
      </Link>
    </div>
  )
}
