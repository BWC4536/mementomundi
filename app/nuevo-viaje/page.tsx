'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, CheckCircle2, ArrowLeft } from 'lucide-react'
import { Mascot } from '@/components/Mascot'
import { StepIndicator } from '@/components/StepIndicator'
import { QRScanner } from '@/components/QRScanner'
import { TripForm } from '@/components/TripForm'
import { TripPreview } from '@/components/TripPreview'
import { MedalCelebrationModal } from '@/components/MedalCelebrationModal'
import { useNewTripFlow } from '@/hooks/useNewTripFlow'

// TODO: install @supabase/supabase-js and create lib/supabase/client.ts
// import { createClient } from '@/lib/supabase/client'

const STEP_TITLES: Record<number, string> = {
  1: 'Escanea tu llavero',
  2: 'Cuéntanos el viaje',
  3: '¡Todo listo!',
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
}

export default function NuevoViajePage() {
  const router = useRouter()
  const flow = useNewTripFlow()
  const [scannerOpen, setScannerOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = back

  function goNext() { setDirection(1); flow.next() }
  function goBack() { setDirection(-1); flow.back() }

  function handleQRSuccess(code: string) {
    flow.update({ qrCode: code })
    setScannerOpen(false)
    goNext()
  }

  async function handleConfirm() {
    if (submitting) return
    setSubmitting(true)
    try {
      // TODO: Replace with real Supabase insert once @supabase/supabase-js is installed
      // const supabase = createClient()
      // const { data: { user } } = await supabase.auth.getUser()
      //
      // let coverImageUrl = null
      // if (flow.data.coverImageFile) {
      //   const ext = flow.data.coverImageFile.name.split('.').pop()
      //   const path = `covers/${user.id}/${Date.now()}.${ext}`
      //   await supabase.storage.from('trip-covers').upload(path, flow.data.coverImageFile)
      //   const { data: urlData } = supabase.storage.from('trip-covers').getPublicUrl(path)
      //   coverImageUrl = urlData.publicUrl
      // }
      //
      // const { data: trip, error } = await supabase.from('trips').insert({
      //   user_id: user.id,
      //   name: flow.data.tripName,
      //   place: flow.data.destination,
      //   start_date: flow.data.startDate,
      //   end_date: flow.data.endDate,
      //   is_public: flow.data.isPublic,
      //   color: '#5CA4A4',
      //   emoji: '✈️',
      //   stickers_total: 50,
      // }).select().single()
      // if (error) throw error
      // flow.setCreatedTripId(trip.id)
      //
      // Medal check:
      // const country = flow.data.destination.split(',').slice(-1)[0]?.trim()
      // const { count } = await supabase.from('trips').select('*', { count: 'exact', head: true })
      //   .eq('user_id', user.id).ilike('place', `%${country}%`)
      // if (count === 1) {
      //   flow.setMedalName(`Medalla de ${country}`)
      //   flow.setShowMedal(true)
      // } else {
      //   router.push(`/viaje/${trip.id}`)
      // }

      // MOCK: simulate success
      await new Promise((r) => setTimeout(r, 1200))
      const mockId = 'mock-' + Date.now()
      flow.setCreatedTripId(mockId)

      // Simulate first-time destination → show medal 50% of the time in mock
      if (Math.random() > 0.5) {
        const country = flow.data.destination.split(',').slice(-1)[0]?.trim() || flow.data.destination
        flow.setMedalName(`Medalla de ${country}`)
        flow.setShowMedal(true)
      } else {
        router.push('/home')
      }
    } catch (err) {
      console.error('Error creating trip:', err)
      alert('Hubo un error al crear el viaje. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-cream"
        style={{ borderBottom: '1px solid rgba(11,33,80,0.08)' }}
      >
        <Link
          href="/home"
          className="inline-flex items-center gap-1.5 font-grown font-bold text-navy/55 text-sm
                     hover:text-navy transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          Cancelar
        </Link>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/MEMENTO_FRASE.svg" alt="Memento Mundi" className="h-8 object-contain" />
        <div className="w-20" />
      </div>

      {/* Main card */}
      <div className="max-w-md mx-auto px-4 pt-6 pb-24">
        <StepIndicator step={flow.step} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={flow.step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {/* ── STEP 1: QR ── */}
            {flow.step === 1 && (
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <Mascot size={100} handUp />
                </div>

                <h1 className="font-brasica font-black text-navy mb-2" style={{ fontSize: 'clamp(30px,7vw,48px)' }}>
                  {STEP_TITLES[1]}
                </h1>
                <p className="font-grown mb-8" style={{ fontSize: 16, color: '#5CA4A4', fontWeight: 600 }}>
                  Apunta la cámara al QR de tu pack
                </p>

                {/* Main CTA */}
                <button
                  onClick={() => setScannerOpen(true)}
                  className="relative inline-flex items-center gap-3 px-7 py-4 rounded-full
                             bg-orange text-navy font-display font-black text-lg
                             border-2 border-navy
                             shadow-[5px_5px_0_#0B2150]
                             transition hover:translate-y-0.5 hover:shadow-[3px_3px_0_#0B2150]"
                >
                  <Camera size={22} strokeWidth={2.5} />
                  Abrir cámara
                  {/* Peel corner */}
                  <span
                    className="absolute bottom-0 right-0 w-0 h-0"
                    style={{
                      borderStyle: 'solid',
                      borderWidth: '0 0 14px 14px',
                      borderColor: 'transparent transparent rgba(11,33,80,0.25) transparent',
                    }}
                    aria-hidden
                  />
                </button>

                {/* Already confirmed QR display */}
                {flow.data.qrCode && (
                  <div
                    className="mt-5 mx-auto max-w-xs px-4 py-3 rounded-2xl
                               flex items-center gap-2.5
                               border-2 border-teal-light
                               shadow-[4px_4px_0_#0B2130]"
                    style={{ background: '#D6ECEC' }}
                  >
                    <CheckCircle2 size={22} strokeWidth={2.25} color="#066F84" />
                    <div className="text-left flex-1">
                      <p className="font-grown font-bold text-navy text-sm">QR escaneado</p>
                      <p className="font-grown text-navy/55 text-[11px] truncate">
                        {flow.data.qrCode.slice(0, 20)}…
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={goNext}
                  disabled={!flow.data.qrCode}
                  className="mt-6 w-full py-3.5 rounded-full font-brasica font-bold text-white transition-opacity"
                  style={{
                    background: flow.data.qrCode ? '#0B2150' : 'rgba(11,33,80,0.25)',
                    fontSize: 16,
                    cursor: flow.data.qrCode ? 'pointer' : 'not-allowed',
                  }}
                >
                  Continuar →
                </button>

                <Link
                  href="/tienda"
                  className="block mt-5 font-grown text-navy text-opacity-45 hover:text-opacity-70 transition-opacity"
                  style={{ fontSize: 13 }}
                >
                  ¿No tienes pack aún? Compra uno aquí →
                </Link>
              </div>
            )}

            {/* ── STEP 2: FORM ── */}
            {flow.step === 2 && (
              <>
                <h2 className="font-brasica font-black text-navy mb-6 text-center" style={{ fontSize: 28 }}>
                  {STEP_TITLES[2]}
                </h2>
                <TripForm
                  data={flow.data}
                  update={flow.update}
                  onNext={goNext}
                  onBack={goBack}
                />
              </>
            )}

            {/* ── STEP 3: PREVIEW ── */}
            {flow.step === 3 && (
              <>
                <div className="text-center mb-6">
                  <h2 className="font-brasica font-black text-navy" style={{ fontSize: 'clamp(24px,5vw,36px)' }}>
                    Tu viaje está listo
                  </h2>
                  <p className="font-grown text-navy mt-1" style={{ fontSize: 15, opacity: 0.6 }}>
                    Empieza a pegar y escanea cada pegatina para añadir un recuerdo
                  </p>
                </div>
                <TripPreview
                  data={flow.data}
                  onConfirm={handleConfirm}
                  onBack={goBack}
                  loading={submitting}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* QR Scanner overlay */}
      {scannerOpen && (
        <QRScanner
          onSuccess={handleQRSuccess}
          onClose={() => setScannerOpen(false)}
        />
      )}

      {/* Medal celebration */}
      {flow.showMedal && (
        <MedalCelebrationModal
          monumentName={flow.medalName}
          onContinue={() => {
            flow.setShowMedal(false)
            router.push(flow.createdTripId ? `/viaje/${flow.createdTripId}` : '/home')
          }}
        />
      )}
    </div>
  )
}
