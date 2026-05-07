import { milestones } from '@/lib/about-data'
import Image from 'next/image'

export function SNTimeline() {
  return (
    <section className="py-16 md:py-24 px-4 bg-cream">
      <div className="max-w-3xl mx-auto">
        <p className="font-brasica font-bold text-orange uppercase tracking-widest text-xs mb-2 text-center">
          · Build in Public ·
        </p>
        <h2
          className="font-brasica font-black text-navy text-center mb-14"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}
        >
          El viaje hasta aquí
        </h2>

        <div className="relative">
          {/* Vertical line — center desktop, left mobile */}
          <div
            className="absolute top-0 bottom-0 w-0.5"
            style={{
              background: '#5CA4A4',
              left: '16px',
            }}
          />
          <div
            className="absolute top-0 bottom-0 w-0.5 hidden md:block"
            style={{
              background: '#5CA4A4',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />

          <div className="space-y-10 md:space-y-0">
            {milestones.map((m, i) => {
              const isRight = i % 2 === 0
              return (
                <div key={i} className="relative flex md:block">
                  {/* Mobile layout */}
                  <div className="md:hidden pl-10 pb-10">
                    {/* Circle on line */}
                    <div
                      className="absolute left-3 top-1 w-3 h-3 rounded-full border-2 z-10"
                      style={{
                        borderColor: '#5CA4A4',
                        background: m.done ? '#FA9223' : '#EAE7DA',
                        transform: 'translateX(-50%)',
                        left: '16px',
                      }}
                    />
                    {/* Card */}
                    <div
                      className="bg-white rounded-xl p-4"
                      style={{
                        border: '2px solid #0B2150',
                        boxShadow: '3px 3px 0 #0B2150',
                        transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
                      }}
                    >
                      <p className="font-brasica font-bold text-orange mb-1" style={{ fontSize: 13 }}>
                        {m.date}
                      </p>
                      <p className="font-brasica font-bold text-navy mb-1" style={{ fontSize: 18 }}>
                        {m.title}
                      </p>
                      <p className="font-grown text-navy" style={{ fontSize: 14, opacity: 0.7 }}>
                        {m.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div
                    className="hidden md:flex mb-12"
                    style={{ justifyContent: isRight ? 'flex-start' : 'flex-end' }}
                  >
                    {/* Circle */}
                    <div
                      className="absolute w-3 h-3 rounded-full border-2 z-10"
                      style={{
                        borderColor: '#5CA4A4',
                        background: m.done ? '#FA9223' : '#EAE7DA',
                        left: '50%',
                        top: '8px',
                        transform: 'translateX(-50%)',
                      }}
                    />

                    {/* Card — half width, offset to correct side */}
                    <div
                      className="w-5/12 bg-white rounded-xl p-5"
                      style={{
                        border: '2px solid #0B2150',
                        boxShadow: '4px 4px 0 #0B2150',
                        transform: `rotate(${isRight ? -1.2 : 1.2}deg)`,
                        marginLeft: isRight ? '54%' : undefined,
                        marginRight: isRight ? undefined : '54%',
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="font-brasica font-bold text-orange mb-1" style={{ fontSize: 13 }}>
                            {m.date}
                          </p>
                          <p className="font-brasica font-bold text-navy mb-1" style={{ fontSize: 19 }}>
                            {m.title}
                          </p>
                          <p className="font-grown text-navy" style={{ fontSize: 14, opacity: 0.7 }}>
                            {m.description}
                          </p>
                        </div>
                        {m.image && (
                          <div
                            className="w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden"
                            style={{ border: '2px solid #0B2150' }}
                          >
                            <Image src={m.image} alt={m.title} width={80} height={80} className="object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
