import { values } from '@/lib/about-data'

const ICONS: Record<string, React.ReactNode> = {
  hand: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FA9223" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
    </svg>
  ),
  scissors: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5CA4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  ),
  users: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0B2150" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  camera: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FA9223" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
    </svg>
  ),
}

export function SNValues() {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: '#EAE7DA' }}>
      <div className="max-w-4xl mx-auto">
        <p className="font-brasica font-bold text-orange uppercase tracking-widest text-xs mb-2 text-center">
          · Lo que creemos ·
        </p>
        <h2
          className="font-brasica font-black text-navy text-center mb-12"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}
        >
          Nuestros valores
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {values.map((v, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white p-5 rounded-xl"
              style={{
                border: '2px solid #0B2150',
                boxShadow: '4px 4px 0 #0B2150',
                transform: `rotate(${[-0.8, 0.6, -0.5, 0.9][i]}deg)`,
              }}
            >
              <div className="mt-0.5 flex-shrink-0">{ICONS[v.icon]}</div>
              <div>
                <p className="font-brasica font-bold text-navy mb-1" style={{ fontSize: 16 }}>{v.title}</p>
                <p className="font-grown text-navy" style={{ fontSize: 13, opacity: 0.68, lineHeight: 1.5 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
