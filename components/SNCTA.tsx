'use client'

import Link from 'next/link'

export function SNCTA() {
  return (
    <section className="py-16 md:py-24 px-4 bg-cream">
      <div className="max-w-2xl mx-auto text-center">
        <div
          className="bg-white rounded-2xl p-10 md:p-14"
          style={{ border: '3px solid #0B2150', boxShadow: '8px 8px 0 #0B2150' }}
        >
          <h2
            className="font-brasica font-black text-navy mb-4 leading-tight"
            style={{ fontSize: 'clamp(30px, 5vw, 48px)' }}
          >
            Únete al viaje
          </h2>
          <p
            className="font-grown text-navy mb-8"
            style={{ fontSize: 18, opacity: 0.7, lineHeight: 1.6 }}
          >
            Haz que tus fotos valgan la pena.
          </p>

          <Link
            href="/tienda"
            className="inline-flex items-center justify-center font-brasica font-black text-white rounded-full px-8"
            style={{
              background: '#FA9223',
              height: 56,
              fontSize: 18,
              border: '2.5px solid #0B2150',
              boxShadow: '4px 4px 0 #0B2150',
              textDecoration: 'none',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translate(-2px,-2px)'
              el.style.boxShadow = '6px 6px 0 #0B2150'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translate(0,0)'
              el.style.boxShadow = '4px 4px 0 #0B2150'
            }}
          >
            Crear mi primer viaje →
          </Link>

          <p className="font-grown text-navy mt-5" style={{ fontSize: 13, opacity: 0.45 }}>
            Sin compromiso · Envío gratis en pedidos +15€
          </p>
        </div>
      </div>
    </section>
  )
}
