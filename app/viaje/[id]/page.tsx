import { Landmark, MapPin, Camera, Plus, Share2 } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { MotionSection } from '@/components/ui/MotionSection'
import { StickerBadge } from '@/components/ui/StickerBadge'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ViajePage({ params }: PageProps) {
  const { id } = await params

  // Mock trip data (TODO: fetch real data from Supabase using id)
  const trip = {
    id,
    name: 'Grecia 2025',
    place: 'Santorini, Grecia',
    color: '#5CA4A4',
    stickersUsed: 28,
    stickersTotal: 50,
    participants: ['Ana', 'Luis', 'Marta'],
    createdAt: '2025-03-01',
    photos: [
      'Atardecer en Oia',
      'Calles de Fira',
      'Playas de arena negra',
      'Iglesia azul y blanca',
      'Viñedos de Santorini',
      'Vistas al Egeo',
    ],
  }

  const progress = Math.round((trip.stickersUsed / trip.stickersTotal) * 100)
  const photoRotations = [-3, 2, -1, 3, -2, 1]

  return (
    <div className="min-h-screen bg-cream text-navy">
      <Navbar user={{ displayName: 'Ana García', initial: 'A' }} />

      {/* Cover hero */}
      <MotionSection className="relative overflow-hidden">
        <div className="grain absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
        <div className="max-w-md mx-auto px-4 pt-6 pb-4">
          <div
            className="relative w-full h-52 rounded-2xl overflow-hidden border-2 border-navy
                       shadow-[8px_8px_0_0_#0B2130]"
            style={{
              background: `linear-gradient(135deg, ${trip.color}, ${trip.color}cc, #066F84)`,
            }}
          >
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 grain opacity-30 pointer-events-none" aria-hidden />

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-cream/90 rounded-full p-6 border-2 border-navy
                              shadow-[4px_4px_0_#0B2130]">
                <Landmark size={48} strokeWidth={2} color="#0B2150" />
              </div>
            </div>

            {/* Floating sticker */}
            <div
              className="absolute top-4 right-4 float-slow"
              style={{ ['--r' as string]: '8deg' } as React.CSSProperties}
            >
              <StickerBadge color="orange" rotate={8} size="sm">
                {trip.stickersUsed}/{trip.stickersTotal}
              </StickerBadge>
            </div>
          </div>
        </div>

        {/* Title + place */}
        <div className="max-w-md mx-auto px-6 pb-6">
          <h1 className="font-display font-black text-navy text-4xl leading-tight mb-1">
            {trip.name.split(' ')[0]}
            <span className="block italic text-orange">
              {trip.name.split(' ').slice(1).join(' ')}
            </span>
          </h1>
          <p className="font-grown text-sm text-navy/65 inline-flex items-center gap-1.5 mt-1">
            <MapPin size={14} strokeWidth={2.25} />
            {trip.place}
          </p>
        </div>
      </MotionSection>

      {/* Stats */}
      <MotionSection className="px-4 pb-6" delay={0.1}>
        <div className="max-w-md mx-auto grid grid-cols-3 gap-3">
          {[
            { value: trip.stickersUsed, label: 'Pegatinas', color: 'text-orange' },
            { value: trip.participants.length, label: 'Viajeros', color: 'text-teal-dark' },
            { value: trip.stickersTotal - trip.stickersUsed, label: 'Restantes', color: 'text-coral' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-card border-2 border-navy/15 rounded-2xl p-3.5 text-center
                         shadow-[6px_6px_0_0_#0B2130]
                         transition hover:-translate-y-1"
            >
              <p className={`font-display font-black text-3xl leading-none mb-1 ${stat.color}`}>
                {stat.value}
              </p>
              <p className="font-grown text-[10px] font-bold uppercase tracking-wider text-navy/55">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </MotionSection>

      {/* Progress */}
      <MotionSection className="px-6 pb-6" delay={0.15}>
        <div className="max-w-md mx-auto">
          <div className="flex justify-between font-grown text-xs font-bold uppercase tracking-wide text-navy/55 mb-2">
            <span>Progreso</span>
            <span className="text-orange">{progress}%</span>
          </div>
          <div className="h-3 rounded-full bg-navy/10 border border-navy/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange to-coral transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </MotionSection>

      {/* Participants */}
      <MotionSection className="px-6 pb-6" delay={0.2}>
        <div className="max-w-md mx-auto">
          <p className="font-grown text-xs font-bold uppercase tracking-[0.18em] text-navy/55 mb-3">
            Viajeros
          </p>
          <div className="flex gap-2 flex-wrap">
            {trip.participants.map((p, i) => (
              <div
                key={i}
                className="w-11 h-11 rounded-full flex items-center justify-center
                           text-white font-display font-black text-base
                           border-2 border-navy"
                style={{
                  background: ['#5CA4A4', '#FA9223', '#FFB4AD', '#066FB4'][i % 4],
                  boxShadow: '3px 3px 0 #0B2130',
                }}
                title={p}
              >
                {p[0].toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Photos / Scrapbook */}
      <MotionSection className="px-4 pb-8" delay={0.25}>
        <div className="max-w-md mx-auto">
          <p className="font-grown text-xs font-bold uppercase tracking-[0.18em] text-navy/55 mb-4 px-2">
            Momentos capturados
          </p>
          <div className="grid grid-cols-2 gap-4 px-2">
            {trip.photos.map((caption, i) => (
              <div
                key={i}
                className="polaroid w-full transition cursor-pointer
                           hover:-translate-y-2 hover:rotate-0"
                style={{ transform: `rotate(${photoRotations[i % photoRotations.length]}deg)` }}
              >
                <div className="relative aspect-square w-full bg-gradient-to-br from-orange to-coral rounded-sm overflow-hidden">
                  <div className="absolute inset-0 grain opacity-40" aria-hidden />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera size={32} strokeWidth={1.75} color="#0B2150" className="opacity-80" />
                  </div>
                </div>
                <p className="font-display italic text-center mt-2 text-navy text-sm">
                  {caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* CTAs */}
      <MotionSection className="px-6 pb-24" delay={0.3}>
        <div className="max-w-md mx-auto space-y-3">
          <button
            className="w-full inline-flex items-center justify-center gap-2
                       bg-orange text-navy font-bold px-6 py-3.5 rounded-full
                       border-2 border-navy
                       shadow-[0_8px_0_-2px_#0B2130]
                       transition hover:translate-y-0.5 hover:shadow-[0_4px_0_-2px_#0B2130]"
          >
            <Plus size={18} strokeWidth={2.5} />
            Agregar pegatinas
          </button>
          <button
            className="w-full inline-flex items-center justify-center gap-2
                       bg-navy text-cream font-bold px-6 py-3.5 rounded-full
                       border-2 border-navy
                       shadow-[0_8px_0_-2px_#FA9223]
                       transition hover:translate-y-0.5 hover:shadow-[0_4px_0_-2px_#FA9223]"
          >
            <Share2 size={18} strokeWidth={2.25} />
            Compartir en RRSS
          </button>
        </div>
      </MotionSection>
    </div>
  )
}
