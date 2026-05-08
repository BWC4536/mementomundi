'use client'

import { useRouter } from 'next/navigation'
import type { Trip } from '@/types'

interface TripCardProps {
  trip: Trip
  index?: number
}

export function TripCard({ trip }: TripCardProps) {
  const router = useRouter()
  const progress = Math.round((trip.stickersUsed / trip.stickersTotal) * 100)

  return (
    <div
      onClick={() => router.push(`/viaje/${trip.id}`)}
      className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1"
      style={{
        border: `1.5px solid ${trip.color}30`,
        boxShadow: `0 2px 0 ${trip.color}`,
      }}
    >
      <div className="flex gap-0">
        {/* Color accent bar */}
        <div className="w-1 flex-shrink-0 rounded-l-2xl" style={{ background: trip.color }} />

        {/* Cover image */}
        {trip.coverImage ? (
          <div className="w-20 h-20 flex-shrink-0 self-center ml-3 rounded-xl overflow-hidden">
            <img
              src={trip.coverImage}
              alt={trip.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            className="w-20 h-20 flex-shrink-0 self-center ml-3 rounded-xl flex items-center justify-center text-3xl"
            style={{ background: `${trip.color}20` }}
          >
            <span className="text-3xl">🌍</span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 px-3.5 py-3.5 min-w-0">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <p className="font-bold text-navy text-sm leading-tight truncate" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {trip.name}
              </p>
              <p className="text-xs text-navy opacity-50 mt-0.5 truncate">{trip.place}</p>
            </div>
            {/* Arrow */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 opacity-30 group-hover:opacity-70 transition-opacity group-hover:translate-x-0.5 transition-transform">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="#0B2150" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Sticker progress */}
          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1" style={{ color: '#0B215070' }}>
              <span>{trip.stickersUsed} pegatinas</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: '#EAE7DA' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: '#FA9223' }}
              />
            </div>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {trip.participants.slice(0, 3).map((p, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-[9px] flex-shrink-0"
                  style={{
                    background: ['#5CA4A4', '#FA9223', '#FFB4AD', '#066FB4'][i % 4],
                    border: '1.5px solid white',
                    marginLeft: i > 0 ? -5 : 0,
                    zIndex: 4 - i,
                  }}
                >
                  {p[0].toUpperCase()}
                </div>
              ))}
            </div>
            <span className="text-[11px]" style={{ color: '#0B215060' }}>
              {trip.participants.join(', ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
