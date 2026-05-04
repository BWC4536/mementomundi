import { Navbar } from '@/components/Navbar'

export default function NuevoViajePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <div className="max-w-md mx-auto p-4 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✈️</div>
          <h1 className="font-brasica text-3xl font-bold text-navy mb-2">Nuevo Viaje</h1>
          <p className="text-navy text-opacity-60">Crea un viaje y empieza a coleccionar pegatinas</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Trip Name */}
          <div>
            <label className="block text-sm font-bold text-navy mb-2">Nombre del viaje</label>
            <input
              type="text"
              placeholder="Ej: Grecia 2025"
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-navy border-opacity-10 focus:border-orange focus:outline-none text-navy placeholder-navy placeholder-opacity-40"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-bold text-navy mb-2">Ubicación principal</label>
            <input
              type="text"
              placeholder="Ej: Santorini, Grecia"
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-navy border-opacity-10 focus:border-orange focus:outline-none text-navy placeholder-navy placeholder-opacity-40"
            />
          </div>

          {/* Emoji */}
          <div>
            <label className="block text-sm font-bold text-navy mb-2">Emoji del viaje</label>
            <div className="grid grid-cols-6 gap-2">
              {['🏛️', '🌊', '🗼', '🏔️', '🏜️', '🌴'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className="w-full aspect-square rounded-lg bg-white border-2 border-navy border-opacity-20 flex items-center justify-center text-2xl hover:border-orange transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Stickers */}
          <div>
            <label className="block text-sm font-bold text-navy mb-2">Paquete de pegatinas</label>
            <div className="space-y-2">
              {[
                { name: 'Starter', count: 20, price: 9.99 },
                { name: 'Explorer', count: 50, price: 19.99 },
                { name: 'Collector', count: 100, price: 34.99 },
              ].map((pkg) => (
                <label
                  key={pkg.name}
                  className="flex items-center p-3 rounded-lg bg-white border-2 border-navy border-opacity-10 cursor-pointer hover:border-orange transition-colors"
                >
                  <input type="radio" name="package" className="w-4 h-4" />
                  <div className="flex-1 ml-3">
                    <p className="font-bold text-navy">{pkg.name}</p>
                    <p className="text-xs text-navy text-opacity-60">{pkg.count} pegatinas</p>
                  </div>
                  <p className="font-bold text-orange">${pkg.price}</p>
                </label>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="btn-primary w-full bg-orange text-white rounded-full py-4 px-6 font-bold text-base shadow-lg mt-8"
          >
            Crear Viaje
          </button>
        </form>
      </div>
    </div>
  )
}
