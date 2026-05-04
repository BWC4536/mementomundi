import { Navbar } from '@/components/Navbar'

export default function StorePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Social icons (top-right) */}
      <div className="absolute top-20 right-4 flex gap-2 z-10">
        {/* Instagram */}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink via-orange to-orange flex items-center justify-center text-white font-bold text-sm hover:scale-110 transition-transform"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
          </svg>
        </a>

        {/* TikTok */}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center text-white font-bold text-sm hover:scale-110 transition-transform"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.82 2.82 0 1 1-5.63-2.82c.48.84 1.45 1.39 2.59 1.39a2.78 2.78 0 0 0 2.8-2.79V9.83a5.62 5.62 0 0 1-3.12 1.02 5.77 5.77 0 0 1-5.79-5.81 5.77 5.77 0 0 1 5.79-5.81 5.64 5.64 0 0 1 4.95 2.82v-3.35A9.46 9.46 0 0 0 6.5 0a9.41 9.41 0 0 0-9.4 9.4 9.41 9.41 0 0 0 9.4 9.4 9.39 9.39 0 0 0 8.16-4.53h-.01a6.18 6.18 0 0 0 .43-1.79c0-.14-.01-.28-.02-.41V6.69z" />
          </svg>
        </a>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 text-center">
        <div className="mb-8">
          <svg width="120" height="120" viewBox="0 0 100 130" fill="none" className="mx-auto mb-6">
            <rect x="38" y="72" width="12" height="35" rx="4" fill="#0B2150" />
            <rect x="52" y="72" width="12" height="35" rx="4" fill="#0B2150" />
            <ellipse cx="44" cy="109" rx="10" ry="5" fill="#0B2150" />
            <ellipse cx="58" cy="109" rx="10" ry="5" fill="#0B2150" />
            <circle cx="50" cy="42" r="32" fill="white" stroke="#0B2150" strokeWidth="3" />
            <path d="M72 16 L82 26 L72 26 Z" fill="#EAE7DA" stroke="#0B2150" strokeWidth="2" strokeLinejoin="round" />
            <ellipse cx="42" cy="42" rx="3" ry="4" fill="#0B2150" />
            <ellipse cx="58" cy="42" rx="3" ry="4" fill="#0B2150" />
          </svg>
        </div>

        <h1 className="font-brasica text-4xl font-bold text-navy mb-4">
          Compra Pegatinas
        </h1>
        <p className="text-navy text-opacity-60 text-lg mb-8 max-w-sm leading-relaxed">
          Elige tus pegatinas favoritas y empieza a dejar huella en el mundo.
        </p>

        <button className="btn-primary bg-orange text-white rounded-full py-4 px-8 font-bold text-lg shadow-lg">
          Explorar Tienda
        </button>

        <div className="mt-12 text-center">
          <p className="text-xs text-navy text-opacity-40 uppercase tracking-widest mb-4">
            Síguenos en redes
          </p>
          <div className="flex gap-4 justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink via-orange to-orange flex items-center justify-center text-white font-bold">
              f
            </div>
            <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white font-bold">
              🎵
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
