'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, MapPin } from 'lucide-react'
import type { Trip } from '@/types'

interface TripCardProps {
  trip: Trip
  index?: number
}

export function TripCard({ trip, index = 0 }: TripCardProps) {
  const router = useRouter()
  const progress = Math.round((trip.stickersUsed / trip.stickersTotal) * 100)

  // Tape rotation alternates so the row of cards feels hand-pinned, not robotic
  const tapeRotation = index % 2 === 0 ? -2 : 3

  return (
    <article
      onClick={() => router.push(`/viaje/${trip.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          router.push(`/viaje/${trip.id}`)
        }
      }}
      role="button"
      tabIndex={0}
      className="group relative bg-card border-2 border-navy/15 rounded-2xl overflow-hidden cursor-pointer
                 shadow-[6px_6px_0_0_#0B2130] transition-all duration-200
                 hover:-translate-y-1 hover:border-navy/40
                 focus:outline-none focus:ring-4 focus:ring-orange/40"
    >
      {/* Tape decoration */}
      <span
        className="tape absolute -top-2 left-1/2 -translate-x-1/2 z-10"
        style={{ transform: `translateX(-50%) rotate(${tapeRotation}deg)` }}
        aria-hidden
      />

      <div className="flex gap-0">
        {/* Color accent bar */}
        <div className="w-1.5 flex-shrink-0" style={{ background: trip.color }} aria-hidden />

        {/* Cover image area */}
        <div className="relative w-24 h-24 flex-shrink-0 self-center ml-3 rounded-xl overflow-hidden border border-navy/10">
          {trip.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={trip.coverImage}
              alt={trip.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${trip.color}40, ${trip.color}90)` }}
            >
              <MapPin size={28} strokeWidth={2.25} color="#0B2150" aria-hidden />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-3.5 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="min-w-0">
              <h3 className="font-display font-black text-navy text-lg leading-tight truncate">
                {trip.name}
              </h3>
              <p className="font-grown text-xs text-navy/55 mt-0.5 truncate italic">
                {trip.place}
              </p>
            </div>
            <ArrowRight
              size={18}
              strokeWidth={2.25}
              className="flex-shrink-0 mt-1 text-navy/35 transition-all
                         group-hover:text-navy group-hover:translate-x-0.5"
              aria-hidden
            />
          </div>

          {/* Sticker progress */}
          <div className="mb-2">
            <div className="flex justify-between text-[11px] font-grown font-bold uppercase tracking-wide text-navy/55 mb-1">
              <span>{trip.stickersUsed} pegatinas</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden bg-navy/10 border border-navy/15">
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${progress}%`, background: '#FA9223' }}
              />
            </div>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {trip.participants.slice(0, 3).map((p, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white font-display font-black text-[9px] flex-shrink-0"
                  style={{
                    background: ['#5CA4A4', '#FA9223', '#FFB4AD', '#066FB4'][i % 4],
                    border: '1.5px solid #EAE7DA',
                    marginLeft: i > 0 ? -5 : 0,
                    zIndex: 4 - i,
                  }}
                >
                  {p[0].toUpperCase()}
                </div>
              ))}
            </div>
            <span className="text-[11px] font-grown italic text-navy/55 truncate">
              {trip.participants.join(', ')}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
