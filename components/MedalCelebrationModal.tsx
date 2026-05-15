'use client'

import { motion } from 'framer-motion'
import { Award, Sparkles } from 'lucide-react'

interface MedalCelebrationModalProps {
  monumentName: string
  onContinue: () => void
}

const CONFETTI_PIECES = Array.from({ length: 12 }, (_, i) => ({
  x: `${(i * 8) + Math.random() * 6}%`,
  color: ['#FA9223','#5CA4A4','#FFB4AD','#0B2150','#EAE7DA'][i % 5],
  delay: i * 0.05,
  rot: Math.random() * 360,
}))

export function MedalCelebrationModal({ monumentName, onContinue }: MedalCelebrationModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0"
      style={{ background: 'rgba(11,33,80,0.65)', backdropFilter: 'blur(6px)' }}
    >
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {CONFETTI_PIECES.map((c, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0, rotate: c.rot }}
            animate={{ y: '110vh', opacity: [0, 1, 1, 0], rotate: c.rot + 360 }}
            transition={{ duration: 2.5 + i * 0.1, delay: c.delay, ease: 'easeIn' }}
            className="absolute top-0 w-3 h-3 rounded-sm"
            style={{ left: c.x, background: c.color }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
        className="relative w-full max-w-sm bg-cream rounded-3xl p-8 text-center"
        style={{ border: '3px solid #0B2150', boxShadow: '8px 8px 0 #0B2150' }}
      >
        {/* Medal */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.3 }}
          className="mx-auto mb-5 flex items-center justify-center"
          style={{ width: 96, height: 96 }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #FA9223 0%, #FFB4AD 100%)',
              border: '4px solid #0B2150',
              boxShadow: '4px 4px 0 #0B2150',
            }}
          >
            <Award size={44} strokeWidth={2} color="#0B2150" aria-hidden />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-brasica font-bold text-orange uppercase tracking-widest mb-2"
          style={{ fontSize: 12 }}
        >
          · Nueva medalla desbloqueada ·
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-brasica font-black text-navy mb-3"
          style={{ fontSize: 'clamp(22px, 5vw, 30px)', lineHeight: 1.2 }}
        >
          {monumentName}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="font-grown text-navy mb-6"
          style={{ fontSize: 14, opacity: 0.65, lineHeight: 1.6 }}
        >
          ¡Primer viaje a este destino registrado! Cada país nuevo suma una medalla a tu colección.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          onClick={onContinue}
          className="w-full py-4 rounded-full font-display font-black text-white inline-flex items-center justify-center gap-2 cursor-pointer transition hover:translate-y-0.5"
          style={{ background: '#FA9223', border: '2.5px solid #0B2150', boxShadow: '4px 4px 0 #0B2150', fontSize: 16 }}
        >
          ¡Ver mi scrapbook!
          <Sparkles size={18} strokeWidth={2.25} />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
