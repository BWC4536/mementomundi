export function SNPhilosophy() {
  return (
    <section className="py-16 md:py-24 px-4 bg-cream">
      <div className="max-w-4xl mx-auto">
        <p className="font-brasica font-bold text-orange uppercase tracking-widest text-xs mb-2 text-center">
          · El nombre ·
        </p>
        <h2
          className="font-brasica font-black text-navy text-center mb-12"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}
        >
          Dos palabras. Una filosofía.
        </h2>

        <div className="flex flex-col md:flex-row gap-4 md:gap-0 rounded-2xl overflow-hidden" style={{ border: '2px solid #0B2150', boxShadow: '6px 6px 0 #0B2150' }}>
          {/* Memento Mori */}
          <div
            className="flex-1 p-8 md:p-10"
            style={{ background: 'rgba(11,33,80,0.06)', borderRight: '1px solid rgba(11,33,80,0.12)' }}
          >
            <div className="mb-5">
              {/* Hourglass SVG */}
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <rect x="8" y="6" width="28" height="4" rx="2" fill="#0B2150" opacity="0.8"/>
                <rect x="8" y="34" width="28" height="4" rx="2" fill="#0B2150" opacity="0.8"/>
                <path d="M10 10 L22 24 L34 10Z" fill="#0B2150" opacity="0.15"/>
                <path d="M10 34 L22 24 L34 34Z" fill="#FA9223" opacity="0.6"/>
                <circle cx="22" cy="24" r="2" fill="#FA9223"/>
              </svg>
            </div>
            <h3 className="font-brasica font-black text-navy mb-4" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
              Memento Mori
            </h3>
            <p className="font-grown text-navy" style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.75 }}>
              "Recuerda que morirás." La filosofía estoica que nos recuerda que el tiempo es limitado. No para deprimirnos, sino para que vivamos con intensidad y no desperdiciemos ni un solo momento con la gente que queremos.
            </p>
          </div>

          {/* Memento Mundi */}
          <div
            className="flex-1 p-8 md:p-10"
            style={{ background: 'rgba(92,164,164,0.10)' }}
          >
            <div className="mb-5">
              {/* Globe SVG */}
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="16" stroke="#5CA4A4" strokeWidth="2.5" fill="rgba(92,164,164,0.12)"/>
                <ellipse cx="22" cy="22" rx="7" ry="16" stroke="#5CA4A4" strokeWidth="2" fill="none"/>
                <line x1="6" y1="22" x2="38" y2="22" stroke="#5CA4A4" strokeWidth="2"/>
                <line x1="8" y1="14" x2="36" y2="14" stroke="#5CA4A4" strokeWidth="1.5" opacity="0.5"/>
                <line x1="8" y1="30" x2="36" y2="30" stroke="#5CA4A4" strokeWidth="1.5" opacity="0.5"/>
              </svg>
            </div>
            <h3 className="font-brasica font-black text-navy mb-4" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
              Memento Mundi
            </h3>
            <p className="font-grown text-navy" style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.75 }}>
              "Recuerda el mundo." El mundo sí es grande, infinito de experiencias, lleno de lugares por descubrir y personas por conocer. La amistad y los viajes compartidos son de las pocas cosas que se hacen más grandes al recordarlas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
