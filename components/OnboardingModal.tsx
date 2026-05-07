'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mascot } from '@/components/Mascot'

const SLIDES = [
  {
    emoji: '📦',
    title: '1. Compra tu pack',
    description: 'Pegatinas personalizadas con tu QR único. Cada pack incluye tu llavero y acceso al scrapbook.',
  },
  {
    emoji: '📷',
    title: '2. Escanea tu QR',
    description: 'Activa tu pack y empieza tu primer viaje. Solo apunta la cámara al llavero.',
  },
  {
    emoji: '🗺️',
    title: '3. Vive tu scrapbook',
    description: 'Pega, escanea y crea recuerdos que duran para siempre. Comparte con quien quieras.',
  },
]

interface OnboardingModalProps {
  name: string
  onComplete: () => void
}

export function OnboardingModal({ name, onComplete }: OnboardingModalProps) {
  const [slide, setSlide] = useState(0)
  const [dir, setDir] = useState(1)

  function goNext() {
    if (slide < SLIDES.length - 1) {
      setDir(1)
      setSlide((s) => s + 1)
    } else {
      onComplete()
    }
  }

  function goTo(idx: number) {
    setDir(idx > slide ? 1 : -1)
    setSlide(idx)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0"
      style={{ background: 'rgba(11,33,80,0.7)', backdropFilter: 'blur(6px)' }}
    >
      <motion.div
        initial={{ y: 60, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        className="w-full max-w-sm bg-cream rounded-3xl overflow-hidden"
        style={{ border: '3px solid #0B2150', boxShadow: '8px 8px 0 #0B2150' }}
      >
        {/* Header with mascot */}
        <div
          className="flex flex-col items-center pt-8 pb-6 px-6 text-center"
          style={{ background: 'linear-gradient(160deg, #5CA4A4 0%, #EAE7DA 100%)' }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 }}
          >
            <Mascot size={90} wink />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="font-brasica font-black text-navy mt-4 leading-tight"
            style={{ fontSize: 24 }}
          >
            ¡Bienvenido/a{name ? `, ${name.split(' ')[0]}` : ''}!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-grown text-navy mt-1"
            style={{ fontSize: 14, opacity: 0.65 }}
          >
            Estás a solo 3 pasos de tu primer recuerdo
          </motion.p>
        </div>

        {/* Slides */}
        <div className="px-6 py-6 overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={slide}
              custom={dir}
              initial={{ x: dir * 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir * -40, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col items-center text-center"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'white', border: '2px solid #0B2150', boxShadow: '3px 3px 0 #0B2150', fontSize: 32 }}
              >
                {SLIDES[slide].emoji}
              </div>
              <h3 className="font-brasica font-black text-navy mb-2" style={{ fontSize: 20 }}>
                {SLIDES[slide].title}
              </h3>
              <p className="font-grown text-navy" style={{ fontSize: 14, opacity: 0.65, lineHeight: 1.6 }}>
                {SLIDES[slide].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-5 mb-5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === slide ? 20 : 8,
                  height: 8,
                  background: i === slide ? '#FA9223' : 'rgba(11,33,80,0.15)',
                }}
              />
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={goNext}
            className="relative w-full py-4 rounded-full font-brasica font-black text-white overflow-hidden"
            style={{
              background: '#FA9223',
              border: '2.5px solid #0B2150',
              boxShadow: '4px 4px 0 #0B2150',
              fontSize: 16,
            }}
          >
            {slide < SLIDES.length - 1 ? 'Siguiente →' : '¡Empezar! 🎉'}
            <span className="absolute bottom-0 right-0 w-0 h-0" style={{ borderStyle: 'solid', borderWidth: '0 0 12px 12px', borderColor: 'transparent transparent rgba(11,33,80,0.2) transparent' }} />
          </button>

          {slide < SLIDES.length - 1 && (
            <button
              onClick={onComplete}
              className="w-full py-2 mt-2 font-grown text-navy text-center"
              style={{ fontSize: 13, opacity: 0.4 }}
            >
              Saltar
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
