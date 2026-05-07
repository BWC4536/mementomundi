'use client'

import { motion } from 'framer-motion'
import type { Trip } from '@/types'

interface TripCardProps {
  trip: Trip
  index?: number
}

export function TripCard({ trip, index = 0 }: TripCardProps) {
  const rotation = index % 2 === 0 ? -0.8 : 0.6

  return (
    <motion.div
      initial={{ rotate: rotation }}
      whileHover={{ y: -4, rotate: 0 }}
      transition={{ duration: 0.2 }}
      className="card-trip relative bg-white rounded-2xl px-4 py-4 overflow-visible cursor-pointer"
      style={{
        paddingTop: 22,
        border: `2px solid ${trip.color}`,
        boxShadow: `4px 4px 0px ${trip.color}`,
      }}
    >
      {/* Peel corner (top-right) */}
      <div className="absolute top-0 right-0 w-11 h-11 pointer-events-none z-20">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <defs>
            <filter id={`peel-${trip.id}`} x="-30%" y="-30%" width="180%" height="180%">
              <feDropShadow dx="-2" dy="2" stdDeviation="2.5" floodColor="rgba(0,0,0,0.28)" />
            </filter>
            <linearGradient id={`grad-${trip.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8f5ee" />
              <stop offset="60%" stopColor="#EAE7DA" />
              <stop offset="100%" stopColor="#d8d4c6" />
            </linearGradient>
          </defs>
          <ellipse cx="27.28" cy="16.72" rx="14.08" ry="7.92" fill="rgba(0,0,0,0.13)" />
          <path d="M44 0 L44 36.08 L7.92 0 Z" fill={`${trip.color}18`} />
          <path d="M44 0 L44 34.32 Q38.72 22 9.68 0 Z" fill={`url(#grad-${trip.id})`} filter={`url(#peel-${trip.id})`} />
          <path d="M9.68 0 Q26.4 11 44 34.32" stroke={trip.color} strokeWidth="0.8" strokeDasharray="3 2" opacity="0.35" fill="none" />
          <path d="M42.24 0 L44 0 L44 13.2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: trip.color }}
        >
          {trip.emoji}
        </div>
        <div className="flex-1">
          <p className="font-brasica font-bold text-base text-navy mb-0.5">{trip.name}</p>
          <p className="text-xs text-navy opacity-55">📍 {trip.place}</p>
        </div>
      </div>

      {/* Sticker bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-navy opacity-60 mb-1">
          <span>{trip.stickersUsed} puestas</span>
          <span>{trip.stickersTotal - trip.stickersUsed} restantes</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#EAE7DA' }}>
          <div
            className="h-full rounded-full bg-orange transition-all"
            style={{ width: `${(trip.stickersUsed / trip.stickersTotal) * 100}%` }}
          />
        </div>
      </div>

      {/* Participants */}
      <div className="flex items-center mt-2.5">
        {trip.participants.map((p, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
            style={{
              background: ['#5CA4A4', '#FA9223', '#FFB4AD', '#066FB4'][i % 4],
              border: '2px solid white',
              marginLeft: i > 0 ? -8 : 0,
            }}
          >
            {p[0].toUpperCase()}
          </div>
        ))}
        <span className="ml-2.5 text-xs text-navy opacity-50">{trip.participants.join(', ')}</span>
      </div>
    </motion.div>
  )
}
