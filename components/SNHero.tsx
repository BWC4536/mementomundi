import Image from 'next/image'

export function SNHero() {
  return (
    <section className="relative bg-cream overflow-hidden py-20 md:py-32 flex flex-col items-center text-center px-4">
      {/* Left mascot */}
      <div
        className="absolute left-0 bottom-0 pointer-events-none select-none hidden sm:block"
        style={{ width: 160, height: 200 }}
      >
        <Image
          src="/IMG_1447removebgpreview.png"
          alt="Mascot left"
          fill
          className="object-contain object-bottom"
        />
      </div>

      {/* Right mascot */}
      <div
        className="absolute right-0 bottom-0 pointer-events-none select-none hidden sm:block"
        style={{ width: 160, height: 200 }}
      >
        <Image
          src="/IMG_1448removebgpreview.png"
          alt="Mascot right"
          fill
          className="object-contain object-bottom"
        />
      </div>

      {/* Mobile mascots row */}
      <div className="flex sm:hidden justify-between w-full mb-6 px-2">
        <div style={{ width: 80, height: 100, position: 'relative' }}>
          <Image src="/IMG_1447removebgpreview.png" alt="Mascot left" fill className="object-contain" />
        </div>
        <div style={{ width: 80, height: 100, position: 'relative' }}>
          <Image src="/IMG_1448removebgpreview.png" alt="Mascot right" fill className="object-contain" />
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="font-brasica font-bold text-orange uppercase tracking-widest text-sm mb-3">
          · Quiénes somos ·
        </p>
        <h1
          className="font-brasica font-black text-navy leading-none mb-6"
          style={{ fontSize: 'clamp(42px, 8vw, 80px)' }}
        >
          Memento Mundi
        </h1>
        <p
          className="font-grown text-navy"
          style={{ fontSize: 'clamp(16px, 2vw, 20px)', opacity: 0.75, lineHeight: 1.6, maxWidth: 560 }}
        >
          Recuerda que el mundo es finito. Y los viajes con tu gente, también.
        </p>
      </div>
    </section>
  )
}
