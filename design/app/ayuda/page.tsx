import { Navbar } from '@/components/Navbar'

export default function AyudaPage() {
  const faqs = [
    {
      q: '¿Cómo uso MementoMundi?',
      a: 'Crea un viaje, compra pegatinas y colecciona momentos. Cada pegatina cuenta tu historia.',
    },
    {
      q: '¿Dónde puedo comprar pegatinas?',
      a: 'Accede a la Tienda desde el menú y elige entre nuestras colecciones exclusivas.',
    },
    {
      q: '¿Cómo comparto mis viajes?',
      a: 'En la sección RRSS puedes compartir tus scrapbooks y conectar con otros viajeros.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Las pegatinas varían según la colección. Consulta la tienda para más detalles.',
    },
    {
      q: '¿Cómo contacto soporte?',
      a: 'Escríbenos a soporte@mementomundi.com o usa el chat de ayuda en la app.',
    },
  ]

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Content */}
      <div className="max-w-md mx-auto p-4 pb-20">
        <div className="text-center mb-8">
          <svg width="80" height="104" viewBox="0 0 100 130" fill="none" className="mx-auto mb-4">
            <rect x="38" y="72" width="12" height="35" rx="4" fill="#0B2150" />
            <rect x="52" y="72" width="12" height="35" rx="4" fill="#0B2150" />
            <ellipse cx="44" cy="109" rx="10" ry="5" fill="#0B2150" />
            <ellipse cx="58" cy="109" rx="10" ry="5" fill="#0B2150" />
            <circle cx="50" cy="42" r="32" fill="white" stroke="#0B2150" strokeWidth="3" />
            <path d="M72 16 L82 26 L72 26 Z" fill="#EAE7DA" stroke="#0B2150" strokeWidth="2" />
            <ellipse cx="42" cy="42" rx="3" ry="4" fill="#0B2150" />
            <path d="M50 41 Q54 38 58 41" stroke="#0B2150" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <line x1="50" y1="80" x2="20" y2="55" stroke="#0B2150" strokeWidth="3" strokeLinecap="round" />
            <circle cx="16" cy="52" r="5" fill="#0B2150" />
            <text x="2" y="40" fontSize="18" fill="#0B2150" fontWeight="bold">?</text>
          </svg>
          <h1 className="font-brasica text-3xl font-bold text-navy mb-2">Centro de Ayuda</h1>
          <p className="text-navy text-opacity-60">Resolvemos tus dudas en segundos</p>
        </div>

        {/* FAQs */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-xl p-4 cursor-pointer shadow-card-soft hover:shadow-card-hover transition-shadow"
            >
              <summary className="font-brasica font-bold text-navy text-sm flex items-center justify-between">
                {faq.q}
                <span className="text-lg group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-sm text-navy text-opacity-70 mt-3 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-10 p-4 bg-orange bg-opacity-10 border-l-4 border-orange rounded-lg">
          <p className="text-sm text-navy font-bold mb-2">¿No encuentras lo que buscas?</p>
          <p className="text-xs text-navy text-opacity-70 mb-3">
            Contacta con nuestro equipo de soporte
          </p>
          <button className="btn-primary bg-orange text-white rounded-lg py-2 px-4 font-bold text-sm w-full">
            Abrir chat de soporte
          </button>
        </div>
      </div>
    </div>
  )
}
