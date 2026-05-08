export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { TripCard } from '@/components/TripCard'
import type { Trip } from '@/types'

// ── Mock data (used when Supabase is not connected yet) ──────────────────────
const MOCK_TRIPS: Trip[] = [
  {
    id: '1',
    name: 'Grecia 2025',
    place: 'Santorini, Grecia',
    emoji: '🏛️',
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
    emoji: '🌊',
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
    emoji: '🗼',
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
  // Only attempt Supabase fetch if env vars are present
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

    // Fetch profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, avatar_url, username')
      .eq('id', user.id)
      .single()

    const userName = profile?.full_name ?? user.email?.split('@')[0] ?? 'Viajero'
    const userInitial = userName[0].toUpperCase()
    const userAvatar = profile?.avatar_url ?? undefined

    // Fetch trips owned or joined by user
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
      return { trips: MOCK_TRIPS, userName, userInitial, userAvatar }
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
      emoji: '🌍',
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

  return (
    <div className="min-h-screen" style={{ background: '#EAE7DA' }}>
      <Navbar userName={userName} userInitial={userInitial} userAvatar={userAvatar} />

      {/* Content */}
      <div className="px-4 pt-2 pb-28">

        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.12em] opacity-45"
            style={{ color: '#0B2150', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Mis Viajes
          </p>
          <span
            className="text-[11px] font-bold uppercase tracking-[0.12em] opacity-40"
            style={{ color: '#0B2150', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {trips.length} {trips.length === 1 ? 'viaje' : 'viajes'}
          </span>
        </div>

        {/* Trip cards */}
        {trips.length > 0 ? (
          <div className="flex flex-col gap-3">
            {trips.map((trip, i) => (
              <TripCard key={trip.id} trip={trip} index={i} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Ayuda — bottom left */}
      <Link
        href="/ayuda"
        className="fixed bottom-7 left-4 z-10 flex flex-col items-center gap-1 transition-transform hover:-translate-y-0.5 active:scale-95"
        aria-label="Ir a ayuda"
      >
        <MascotSVG />
        <span
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: '#0B2150', opacity: 0.45, fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Ayuda
        </span>
      </Link>

      {/* + Nuevo Viaje — bottom right (goes to /tienda to buy sticker packs first) */}
      <Link
        href="/tienda"
        className="fixed bottom-7 right-4 z-10 flex items-center gap-2 py-3 px-5 rounded-full font-bold text-white text-sm shadow-lg transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-[0.97]"
        style={{
          background: '#FA9223',
          fontFamily: 'Space Grotesk, sans-serif',
          boxShadow: '0 4px 0 #c96f00, 0 8px 20px rgba(250,146,35,0.35)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Nuevo Viaje
      </Link>
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: 'rgba(11,33,80,0.05)' }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M6 12.5C6 10.57 7.57 9 9.5 9h17c1.93 0 3.5 1.57 3.5 3.5v2a3.5 3.5 0 0 0 0 7v2c0 1.93-1.57 3.5-3.5 3.5h-17C7.57 27 6 25.43 6 23.5v-2a3.5 3.5 0 0 0 0-7v-2Z" stroke="#0B2150" strokeWidth="1.5" strokeOpacity="0.35"/>
          <circle cx="18" cy="18" r="3" stroke="#FA9223" strokeWidth="1.5"/>
        </svg>
      </div>
      <p
        className="font-bold text-navy mb-2"
        style={{ fontFamily: 'Space Grotesk, sans-serif', opacity: 0.7 }}
      >
        Sin viajes todavía
      </p>
      <p
        className="text-sm mb-6 max-w-[200px]"
        style={{ color: '#0B2150', opacity: 0.45, fontFamily: 'Space Grotesk, sans-serif', lineHeight: '1.5' }}
      >
        Crea tu primer viaje y empieza a coleccionar memorias
      </p>
      <Link
        href="/tienda"
        className="flex items-center gap-2 py-2.5 px-5 rounded-full font-bold text-white text-sm transition-all hover:opacity-90"
        style={{ background: '#FA9223', fontFamily: 'Space Grotesk, sans-serif' }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M6.5 1v11M1 6.5h11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Comprar pegatinas
      </Link>
    </div>
  )
}

// ── Mascot SVG ────────────────────────────────────────────────────────────────
function MascotSVG() {
  return (
    <svg width="40" height="52" viewBox="0 0 100 130" fill="none">
      <rect x="38" y="72" width="12" height="35" rx="4" fill="#0B2150" />
      <rect x="52" y="72" width="12" height="35" rx="4" fill="#0B2150" />
      <ellipse cx="44" cy="109" rx="10" ry="5" fill="#0B2150" />
      <ellipse cx="58" cy="109" rx="10" ry="5" fill="#0B2150" />
      <circle cx="50" cy="42" r="32" fill="white" stroke="#0B2150" strokeWidth="3" />
      <path d="M72 16 L82 26 L72 26 Z" fill="#EAE7DA" stroke="#0B2150" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="42" cy="42" rx="3" ry="4" fill="#0B2150" />
      <path d="M50 41 Q54 38 58 41" stroke="#0B2150" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <line x1="50" y1="80" x2="20" y2="55" stroke="#0B2150" strokeWidth="3" strokeLinecap="round" />
      <circle cx="16" cy="52" r="5" fill="#0B2150" />
      <text x="2" y="40" fontSize="18" fill="#0B2150" fontWeight="bold">?</text>
    </svg>
  )
}
