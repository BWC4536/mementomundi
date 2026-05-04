import { Navbar } from '@/components/Navbar'

export default function ViajePage({ params }: { params: { id: string } }) {
  // Mock trip data
  const trip = {
    id: params.id,
    name: 'Grecia 2025',
    place: 'Santorini, Grecia',
    emoji: '🏛️',
    color: '#5CA4A4',
    stickersUsed: 28,
    stickersTotal: 50,
    participants: ['Ana', 'Luis', 'Marta'],
    createdAt: '2025-03-01',
    photos: [
      '📸 Atardecer en Oia',
      '📸 Calles de Fira',
      '📸 Playas de arena negra',
      '📸 Iglesia azul y blanca',
      '📸 Viñedos de Santorini',
      '📸 Vistas al Egeo',
    ],
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <div className="max-w-md mx-auto p-4 pb-20">
        {/* Cover */}
        <div
          className="w-full h-48 rounded-2xl flex items-center justify-center text-8xl shadow-card-soft mb-6"
          style={{ background: trip.color }}
        >
          {trip.emoji}
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-brasica text-3xl font-bold text-navy mb-2">{trip.name}</h1>
          <p className="text-navy text-opacity-60 mb-4">📍 {trip.place}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 text-center shadow-card-soft">
              <p className="text-xl font-bold text-orange">{trip.stickersUsed}</p>
              <p className="text-xs text-navy text-opacity-60">Pegatinas</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-card-soft">
              <p className="text-xl font-bold text-teal">{trip.participants.length}</p>
              <p className="text-xs text-navy text-opacity-60">Viajeros</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-card-soft">
              <p className="text-xl font-bold text-pink">{trip.stickersTotal - trip.stickersUsed}</p>
              <p className="text-xs text-navy text-opacity-60">Restantes</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-navy text-opacity-60 mb-2">
            <span>Progreso</span>
            <span>{Math.round((trip.stickersUsed / trip.stickersTotal) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-navy bg-opacity-10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange to-pink rounded-full transition-all"
              style={{ width: `${(trip.stickersUsed / trip.stickersTotal) * 100}%` }}
            />
          </div>
        </div>

        {/* Participants */}
        <div className="mb-8">
          <p className="text-sm font-bold text-navy mb-3">Viajeros</p>
          <div className="flex gap-2 flex-wrap">
            {trip.participants.map((p, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{
                  background: ['#5CA4A4', '#FA9223', '#FFB4AD', '#066FB4'][i % 4],
                  border: '2px solid white',
                }}
              >
                {p[0].toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        {/* Photos / Scrapbook */}
        <div className="mb-8">
          <p className="text-sm font-bold text-navy mb-3">Momentos capturados</p>
          <div className="grid grid-cols-2 gap-3">
            {trip.photos.map((photo, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-orange to-pink flex items-center justify-center text-center p-3 cursor-pointer hover:shadow-card-hover transition-shadow"
              >
                <div className="text-2xl">📷</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <button className="btn-primary w-full bg-orange text-white rounded-full py-3.5 px-6 font-bold text-base shadow-lg">
            Agregar pegatinas
          </button>
          <button className="btn-primary w-full bg-navy text-white rounded-full py-3.5 px-6 font-bold text-base shadow-lg">
            Compartir en RRSS
          </button>
        </div>
      </div>
    </div>
  )
}
