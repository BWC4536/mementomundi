import { manifesto } from '@/lib/about-data'

export function SNManifesto() {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: '#EAE7DA' }}>
      {/* subtle paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")', opacity: 0.03 }}
      />

      <div className="relative max-w-2xl mx-auto">
        <p className="font-brasica font-bold text-orange uppercase tracking-widest text-xs mb-8">
          · Manifiesto ·
        </p>

        <div className="space-y-6">
          {manifesto.map((para, i) => (
            <p
              key={i}
              className="font-grown text-navy"
              style={{ fontSize: 18, lineHeight: 1.75, opacity: i === 0 ? 1 : 0.8 }}
            >
              {i === 0 ? <strong>{para}</strong> : para}
            </p>
          ))}
        </div>

        <div className="mt-10 h-0.5 w-16" style={{ background: '#FA9223' }} />
      </div>
    </section>
  )
}
