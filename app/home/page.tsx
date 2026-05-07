import { Navbar } from '@/components/Navbar'
import { TripCard } from '@/components/TripCard'
import type { Trip } from '@/types'

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
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-28">
        <p className="text-xs font-brasica font-bold text-navy text-opacity-50 uppercase tracking-widest mb-4">
          Mis Viajes
        </p>

        <div className="space-y-4.5">
          {MOCK_TRIPS.map((trip, i) => (
            <TripCard key={trip.id} trip={trip} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-7 right-4.5 z-10">
        <button className="btn-primary bg-orange text-white rounded-full py-3.5 px-5.5 font-bold text-base shadow-lg flex items-center gap-2">
          <span className="text-lg">+</span> Nuevo Viaje
        </button>
      </div>

      {/* Help mascot */}
      <div className="fixed bottom-7 left-3.5 z-10 flex flex-col items-center mascot-help">
        <svg width="44" height="57" viewBox="0 0 100 130" fill="none" className="w-11 h-14">
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
        <span className="text-xs font-bold text-navy text-opacity-45 tracking-wider mt-1">Ayuda</span>
      </div>
    </div>
  )
}
