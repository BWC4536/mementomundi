'use client'

import { motion } from 'framer-motion'
import type { TripFormData } from '@/hooks/useNewTripFlow'

const FALLING_STICKERS = [
  { emoji: '✈️', x: '10%',  delay: 0,    rot: -15 },
  { emoji: '📷', x: '25%',  delay: 0.3,  rot: 12 },
  { emoji: '🧳', x: '55%',  delay: 0.15, rot: -8 },
  { emoji: '🗺️', x: '72%',  delay: 0.45, rot: 20 },
  { emoji: '⭐', x: '88%',  delay: 0.6,  rot: -18 },
]

interface TripPreviewProps {
  data: TripFormData
  onConfirm: () => void
  onBack: () => void
  loading: boolean
}

function formatDateRange(start: string, end: string) {
  if (!start && !end) return ''
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }
  const s = start ? new Date(start + 'T12:00:00').toLocaleDateString('es-ES', opts) : '?'
  const e = end   ? new Date(end   + 'T12:00:00').toLocaleDateString('es-ES', opts) : '?'
  return `${s} → ${e}`
}

export function TripPreview({ data, onConfirm, onBack, loading }: TripPreviewProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Falling stickers animation */}
      <div className="relative w-full overflow-hidden" style={{ height: 80, pointerEvents: 'none' }}>
        {FALLING_STICKERS.map((s, i) => (
          <motion.span
            key={i}
            initial={{ y: -60, opacity: 0, rotate: s.rot }}
            animate={{ y: 0, opacity: 1, rotate: s.rot * 0.3 }}
            transition={{ type: 'spring', stiffness: 120, damping: 10, delay: s.delay }}
            className="absolute"
            style={{ left: s.x, top: 8, fontSize: 32 }}
          >
            {s.emoji}
          </motion.span>
        ))}
      </div>

      {/* Scrapbook mockup card */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 140 }}
        className="w-full rounded-2xl overflow-hidden mb-6"
        style={{ border: '2.5px solid #0B2150', boxShadow: '6px 6px 0 #0B2150', maxWidth: 360 }}
      >
        {/* Cover */}
        <div
          className="relative flex items-end"
          style={{
            height: 160,
            background: data.coverImagePreview
              ? `url(${data.coverImagePreview}) center/cover no-repeat`
              : 'linear-gradient(135deg, #5CA4A4 0%, #EAE7DA 100%)',
          }}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(11,33,80,0.55) 40%, transparent)' }}
          />
          {/* Washi tape title */}
          <div
            className="relative z-10 px-4 py-2 mx-4 mb-0 font-brasica font-black text-white"
            style={{
              background: '#FA9223',
              fontSize: 20,
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: 4,
              transform: 'rotate(-1.5deg)',
              boxShadow: '2px 2px 0 rgba(0,0,0,0.25)',
              maxWidth: '80%',
              marginBottom: -12,
            }}
          >
            {data.tripName || 'Mi Viaje'}
          </div>
        </div>

        {/* Details strip */}
        <div className="bg-white px-5 pt-5 pb-4 space-y-1.5">
          {data.destination && (
            <p className="font-grown text-navy font-semibold" style={{ fontSize: 14 }}>
              📍 {data.destination}
            </p>
          )}
          {(data.startDate || data.endDate) && (
            <p className="font-grown text-navy" style={{ fontSize: 13, opacity: 0.6 }}>
              🗓 {formatDateRange(data.startDate, data.endDate)}
            </p>
          )}
          <p className="font-grown text-navy italic" style={{ fontSize: 13, opacity: 0.45 }}>
            0 recuerdos (por ahora)
          </p>
        </div>
      </motion.div>

      {/* Summary info */}
      <div className="w-full space-y-2 mb-6 max-w-sm">
        <div className="flex justify-between py-2" style={{ borderBottom: '1px dashed rgba(11,33,80,0.15)' }}>
          <span className="font-grown text-navy" style={{ fontSize: 13, opacity: 0.55 }}>QR vinculado</span>
          <span className="font-grown font-bold text-teal-dark" style={{ fontSize: 13 }}>✓ Confirmado</span>
        </div>
        {data.companions.length > 0 && (
          <div className="flex justify-between py-2" style={{ borderBottom: '1px dashed rgba(11,33,80,0.15)' }}>
            <span className="font-grown text-navy" style={{ fontSize: 13, opacity: 0.55 }}>Compañeros</span>
            <span className="font-grown font-bold text-navy" style={{ fontSize: 13 }}>{data.companions.length} invitados</span>
          </div>
        )}
        <div className="flex justify-between py-2">
          <span className="font-grown text-navy" style={{ fontSize: 13, opacity: 0.55 }}>Visibilidad</span>
          <span className="font-grown font-bold text-navy" style={{ fontSize: 13 }}>
            {data.isPublic ? '🌍 Público' : '🔒 Privado'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={onConfirm}
          disabled={loading}
          className="w-full py-4 rounded-full font-brasica font-black text-white flex items-center justify-center gap-2 transition-opacity"
          style={{
            background: '#FA9223',
            border: '2.5px solid #0B2150',
            boxShadow: '4px 4px 0 #0B2150',
            fontSize: 17,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creando...
            </>
          ) : (
            '¡Crear mi scrapbook! →'
          )}
        </button>
        <button
          onClick={onBack}
          disabled={loading}
          className="w-full py-3 rounded-full font-grown font-bold text-navy"
          style={{ border: '2px solid rgba(11,33,80,0.2)', fontSize: 14 }}
        >
          ← Editar datos
        </button>
      </div>
    </div>
  )
}
