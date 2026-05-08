'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Mascot } from '@/components/Mascot'
import { useCart } from '@/hooks/useCart'
import { useFavorites } from '@/hooks/useFavorites'
import { calculatePrice, QUANTITY_PRESETS } from '@/lib/pricing/pricing'
import { handleSignOutAction } from './actions'
import type { PackType } from '@/lib/pricing/pricing'
import type { StoreDesign } from '@/types/store.types'

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Pack {
  id: PackType
  name: string
  tagline: string
  description: string
  bullets: string[]
  accent: string
  accentLight: string
  imgBg: string
}

const PACKS: Pack[] = [
  {
    id: 'basic',
    name: 'Pack Básico',
    tagline: 'Diseños ya listos',
    description: 'Elige entre nuestra colección de diseños exclusivos ilustrados a mano. Listos para pegar y escanear desde el primer momento.',
    bullets: ['Diseños exclusivos de artistas', 'QR vinculado a tu viaje', 'Laminado impermeable', 'Envío incluido en 3-5 días'],
    accent: '#0EA5E9',
    accentLight: '#E0F2FE',
    imgBg: '#F0F9FF',
  },
  {
    id: 'custom',
    name: 'Pack Personalizado',
    tagline: 'Tu diseño, tu historia',
    description: 'Sube tu propia imagen y la convertimos en pegatinas físicas con QR. Fotos, ilustraciones, logos — lo que quieras.',
    bullets: ['Sube PNG, JPG o SVG', 'Producción en 2-3 días extra', 'QR vinculado a tu viaje', 'Resolución mínima 300dpi recomendada'],
    accent: '#EA580C',
    accentLight: '#FFF7ED',
    imgBg: '#FFF7ED',
  },
]

// ─── Fotos de showcase por pack (viajes) ─────────────────────────────────────

const PACK_PHOTOS: Record<PackType, string[]> = {
  basic: [
    'https://picsum.photos/seed/travel-rome/600/400',
    'https://picsum.photos/seed/travel-paris/600/400',
    'https://picsum.photos/seed/travel-tokyo/600/400',
    'https://picsum.photos/seed/travel-beach/600/400',
  ],
  custom: [
    'https://picsum.photos/seed/custom-photo1/600/400',
    'https://picsum.photos/seed/custom-photo2/600/400',
    'https://picsum.photos/seed/custom-photo3/600/400',
    'https://picsum.photos/seed/custom-photo4/600/400',
  ],
}

// ─── Animación pegatina ───────────────────────────────────────────────────────

function StickerPeelingHero() {
  const [phase, setPhase] = useState<'idle' | 'peeling' | 'logo'>('idle')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('peeling'), 800)
    const t2 = setTimeout(() => setPhase('logo'), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="relative flex items-center justify-center" style={{ width: 260, height: 260, perspective: 1200 }}>
      {/* Sombra en el suelo */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 180, height: 24, bottom: -10, left: '50%', x: '-50%', background: 'rgba(0,0,0,0.35)', filter: 'blur(14px)' }}
        animate={phase === 'peeling' ? { scaleX: 1.4, opacity: 0.15 } : phase === 'logo' ? { opacity: 0 } : { scaleX: 1, opacity: 0.35 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />

      {/* Pegatina */}
      <AnimatePresence>
        {phase !== 'logo' && (
          <motion.div
            key="sticker"
            className="absolute flex items-center justify-center rounded-3xl overflow-hidden"
            style={{
              width: 180, height: 180,
              background: 'linear-gradient(135deg, #EAE7DA 0%, #D4CFC0 100%)',
              border: '3px solid rgba(11,33,80,0.18)',
              transformStyle: 'preserve-3d',
              transformOrigin: 'top center',
              boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
            }}
            initial={{ rotateX: 0, rotateZ: -4, y: 0, scale: 1, opacity: 1 }}
            animate={phase === 'peeling'
              ? { rotateX: [0, 25, 55, 80], rotateZ: [-4, -8, -15, -22], y: [0, -20, -55, -100], scale: [1, 1.04, 1.08, 0.9], opacity: [1, 1, 0.9, 0] }
              : { rotateX: 0, rotateZ: -4, y: 0 }
            }
            transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94], times: [0, 0.3, 0.65, 1] }}
            exit={{ opacity: 0 }}
          >
            {/* Detalle interior de la pegatina */}
            <div className="relative w-full h-full flex flex-col items-center justify-center gap-2 p-4">
              {/* Línea decorativa tipo QR */}
              <div style={{ width: 56, height: 56, border: '3px solid rgba(11,33,80,0.25)', borderRadius: 8, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 3, padding: 6 }}>
                {[...Array(9)].map((_, i) => (
                  <div key={i} style={{ borderRadius: 2, background: i === 4 ? 'transparent' : 'rgba(11,33,80,0.35)' }} />
                ))}
              </div>
              <div style={{ width: 80, height: 3, background: 'rgba(11,33,80,0.15)', borderRadius: 99 }} />
              <div style={{ width: 56, height: 3, background: 'rgba(11,33,80,0.1)', borderRadius: 99 }} />
            </div>

            {/* Reborde brillante de peeling */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 40%)' }}
              animate={phase === 'peeling' ? { opacity: [0, 1, 0.5] } : { opacity: 0 }}
              transition={{ duration: 1.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo MEMENTO aparece */}
      <AnimatePresence>
        {phase === 'logo' && (
          <motion.div
            key="logo"
            className="absolute flex items-center justify-center"
            initial={{ scale: 0.7, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <img
              src="/MEMENTO_FRASE.svg"
              alt="Memento Mundi"
              style={{ width: 220, filter: 'brightness(0) invert(1)', userSelect: 'none' }}
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Modal de pack ────────────────────────────────────────────────────────────

interface PackModalProps {
  pack: Pack
  quantity: number
  onClose: () => void
  onAddToCart: (designId?: string, fileUrl?: string) => Promise<void>
  isFav: boolean
  onToggleFav: () => void
  designs: StoreDesign[]
  loadingCart: boolean
  loadingFav: boolean
}

function PackModal({ pack, quantity, onClose, onAddToCart, isFav, onToggleFav, designs, loadingCart, loadingFav }: PackModalProps) {
  const [selectedDesign, setSelectedDesign] = useState<string | undefined>(undefined)
  const [photoIdx, setPhotoIdx] = useState(0)
  const [customFile, setCustomFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadUrl, setUploadUrl] = useState<string | null>(null)
  const [stickerShape, setStickerShape] = useState<'redonda' | 'cuadrada'>('redonda')
  const fileRef = useRef<HTMLInputElement>(null)
  const photos = PACK_PHOTOS[pack.id]
  const price = calculatePrice(quantity, pack.id)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Solo se permiten PNG, JPG/JPEG o SVG')
      return
    }

    // Validar tamaño
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('El archivo supera el límite de 10MB')
      return
    }

    setCustomFile(file)
    setUploadError(null)
    setUploading(true)

    try {
      const fd = new FormData()
      // Si el archivo no tiene nombre válido (ej: blob de cámara), asignar uno
      const fileName = file.name || `photo.${file.type === 'image/jpeg' ? 'jpg' : file.type === 'image/png' ? 'png' : 'svg'}`
      const namedFile = new File([file], fileName, { type: file.type })
      fd.append('file', namedFile)

      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Error en la respuesta del servidor')
      if (!data.url) throw new Error('No se recibió URL del archivo')

      setUploadUrl(data.url)
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Error al subir el archivo'
      console.error('Upload error:', errorMsg)
      setUploadError(errorMsg)
    } finally {
      setUploading(false)
    }
  }

  const canAdd = pack.id === 'basic' ? !!selectedDesign : !!uploadUrl

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgba(11,33,80,0.6)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full sm:max-w-lg max-h-[92svh] flex flex-col overflow-hidden"
        style={{ background: '#EAE7DA', borderRadius: '24px 24px 0 0', boxShadow: '0 -8px 48px rgba(11,33,80,0.2)' }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div style={{ width: 40, height: 4, background: 'rgba(11,33,80,0.18)', borderRadius: 99 }} />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-5 pb-3 flex-shrink-0">
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: pack.accent, fontFamily: 'Space Grotesk, sans-serif' }}>
              {pack.tagline}
            </p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 900, color: '#0B2150', lineHeight: 1.1 }}>
              {pack.name}
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {/* Favorito */}
            <button
              onClick={onToggleFav}
              disabled={loadingFav}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90"
              style={{ background: isFav ? pack.accentLight : 'rgba(11,33,80,0.07)', border: isFav ? `1.5px solid ${pack.accent}` : 'none' }}
              aria-label="Favorito"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill={isFav ? pack.accent : 'none'} stroke={isFav ? pack.accent : '#0B2150'} strokeWidth="1.5">
                <path d="M8 13.5S1.5 9.5 1.5 5A3.5 3.5 0 0 1 8 2.6 3.5 3.5 0 0 1 14.5 5c0 4.5-6.5 8.5-6.5 8.5Z"/>
              </svg>
            </button>
            {/* Cerrar */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-navy/10 active:scale-95"
              style={{ background: 'rgba(11,33,80,0.07)' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="#0B2150" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll de fotos */}
        <div className="relative flex-shrink-0" style={{ height: 180 }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={photoIdx}
              src={photos[photoIdx]}
              alt={`Foto ${photoIdx + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>
          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {photos.map((_, i) => (
              <button key={i} onClick={() => setPhotoIdx(i)} className="rounded-full transition-all"
                style={{ width: i === photoIdx ? 20 : 6, height: 6, background: i === photoIdx ? 'white' : 'rgba(255,255,255,0.5)' }}
              />
            ))}
          </div>
          {/* Flechas */}
          {photoIdx > 0 && (
            <button onClick={() => setPhotoIdx(i => i - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.85)' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="#0B2150" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          )}
          {photoIdx < photos.length - 1 && (
            <button onClick={() => setPhotoIdx(i => i + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.85)' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="#0B2150" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          )}
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {/* Descripción */}
          <p style={{ fontSize: 14, color: '#0B2150', opacity: 0.65, lineHeight: 1.6 }}>{pack.description}</p>

          {/* Bullets */}
          <ul className="flex flex-col gap-1.5">
            {pack.bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: pack.accentLight }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke={pack.accent} strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <span style={{ fontSize: 13, color: '#0B2150', opacity: 0.75 }}>{b}</span>
              </li>
            ))}
          </ul>

          {/* Galería de diseños (pack básico) */}
          {pack.id === 'basic' && (
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#0B2150', opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                Elige un diseño
              </p>
              {designs.length === 0 ? (
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-xl animate-pulse" style={{ background: 'rgba(11,33,80,0.08)' }} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {designs.map(d => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDesign(d.id)}
                      className="aspect-square rounded-xl overflow-hidden transition-all relative"
                      style={{
                        border: selectedDesign === d.id ? `2.5px solid ${pack.accent}` : '2px solid transparent',
                        boxShadow: selectedDesign === d.id ? `0 0 0 1px ${pack.accent}20` : 'none',
                        outline: 'none',
                      }}
                    >
                      <img src={d.image_url} alt={d.name} className="w-full h-full object-cover" />
                      {selectedDesign === d.id && (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ background: `${pack.accent}25` }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke={pack.accent} strokeWidth="2.2" strokeLinecap="round"/></svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Upload diseño (pack personalizado) */}
          {pack.id === 'custom' && (
            <div className="flex flex-col gap-3">
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#0B2150', opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Sube tu diseño
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full flex flex-col items-center justify-center gap-2 rounded-2xl transition-all"
                  style={{
                    padding: '20px 16px',
                    border: uploadUrl ? `2px solid ${pack.accent}` : '2px dashed rgba(11,33,80,0.2)',
                    background: uploadUrl ? pack.accentLight : 'rgba(11,33,80,0.03)',
                    cursor: 'pointer',
                  }}
                >
                  {uploadUrl ? (
                    <>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 11l5 5 9-9" stroke={pack.accent} strokeWidth="2.2" strokeLinecap="round"/></svg>
                      <span style={{ fontSize: 13, fontWeight: 700, color: pack.accent }}>{customFile?.name ?? 'Archivo subido'}</span>
                      <span style={{ fontSize: 11, color: pack.accent, opacity: 0.7 }}>Toca para cambiar</span>
                    </>
                  ) : uploading ? (
                    <>
                      <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${pack.accent} transparent transparent` }} />
                      <span style={{ fontSize: 13, color: '#0B2150', opacity: 0.5 }}>Subiendo...</span>
                    </>
                  ) : (
                    <>
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 20V8M9 13l5-5 5 5" stroke="rgba(11,33,80,0.3)" strokeWidth="1.8" strokeLinecap="round"/><rect x="4" y="22" width="20" height="2" rx="1" fill="rgba(11,33,80,0.15)"/></svg>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#0B2150', opacity: 0.55 }}>Toca para subir tu imagen</span>
                      <span style={{ fontSize: 11, color: '#0B2150', opacity: 0.35 }}>PNG, JPG o SVG · máx 10MB</span>
                    </>
                  )}
                </button>
                {uploadError && (
                  <p style={{ fontSize: 12, color: '#DC2626', marginTop: 6 }}>{uploadError}</p>
                )}
              </div>

              {/* Selector de forma */}
              {uploadUrl && (
                <div className="flex flex-col gap-2.5">
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#0B2150', opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Forma de pegatina
                  </p>
                  <div className="flex gap-2.5">
                    {['redonda', 'cuadrada'].map(shape => (
                      <button
                        key={shape}
                        onClick={() => setStickerShape(shape as 'redonda' | 'cuadrada')}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl transition-all py-3"
                        style={{
                          background: stickerShape === shape ? pack.accent : 'rgba(11,33,80,0.07)',
                          border: `1.5px solid ${stickerShape === shape ? pack.accent : 'transparent'}`,
                        }}
                      >
                        {shape === 'redonda' ? (
                          <>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: stickerShape === shape ? 'white' : '#0B2150', opacity: stickerShape === shape ? 1 : 0.5 }} />
                            <span style={{ fontSize: 13, fontWeight: 600, color: stickerShape === shape ? 'white' : '#0B2150', fontFamily: 'Space Grotesk, sans-serif' }}>Redonda</span>
                          </>
                        ) : (
                          <>
                            <div style={{ width: 12, height: 12, borderRadius: 3, background: stickerShape === shape ? 'white' : '#0B2150', opacity: stickerShape === shape ? 1 : 0.5 }} />
                            <span style={{ fontSize: 13, fontWeight: 600, color: stickerShape === shape ? 'white' : '#0B2150', fontFamily: 'Space Grotesk, sans-serif' }}>Cuadrada</span>
                          </>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Preview de pegatina */}
                  <div className="flex flex-col items-center justify-center gap-2.5 rounded-2xl p-4" style={{ background: 'rgba(11,33,80,0.03)', border: '1px solid rgba(11,33,80,0.07)' }}>
                    <p style={{ fontSize: 11, color: '#0B2150', opacity: 0.4, fontWeight: 600 }}>Vista previa</p>
                    <div style={{
                      width: 120,
                      height: 120,
                      borderRadius: stickerShape === 'redonda' ? '50%' : '12px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      border: `2px solid ${pack.accent}`,
                      background: 'white',
                    }}>
                      <img
                        src={uploadUrl}
                        alt="Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Precio resumen */}
          <div className="flex items-center justify-between rounded-2xl px-4 py-3" style={{ background: 'white', border: '1.5px solid rgba(11,33,80,0.07)' }}>
            <div>
              <p style={{ fontSize: 11, color: '#0B2150', opacity: 0.4, fontWeight: 600 }}>{quantity} pegatinas</p>
              <p style={{ fontSize: 11, color: '#0B2150', opacity: 0.4 }}>{price.unitFormatted}/ud</p>
            </div>
            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 900, color: pack.accent }}>{price.formatted}</p>
          </div>
        </div>

        {/* CTA fijo */}
        <div className="px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-3 flex-shrink-0 flex gap-3" style={{ borderTop: '1px solid rgba(11,33,80,0.07)', background: '#EAE7DA' }}>
          <button
            onClick={() => onAddToCart(selectedDesign, uploadUrl ?? undefined)}
            disabled={loadingCart || !canAdd}
            className="flex-1 flex items-center justify-center gap-2 rounded-full font-bold transition-all active:scale-[0.98]"
            style={{
              padding: '15px 20px',
              background: canAdd ? pack.accent : 'rgba(11,33,80,0.12)',
              color: canAdd ? 'white' : 'rgba(11,33,80,0.35)',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 15,
              cursor: canAdd ? 'pointer' : 'default',
              boxShadow: canAdd ? `3px 3px 0 #0B2150` : 'none',
              border: 'none',
            }}
          >
            {loadingCart ? (
              <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 1h3l1.6 8a1 1 0 0 0 1 .8h6.8a1 1 0 0 0 1-.78L15.5 4H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="6.5" cy="15" r="1.2" fill="currentColor"/><circle cx="13" cy="15" r="1.2" fill="currentColor"/></svg>
                {canAdd ? 'Añadir al carrito' : pack.id === 'basic' ? 'Elige un diseño' : 'Sube tu diseño'}
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function TiendaPage() {
  const { total, items: cartItems, addItem, loading: cartLoading } = useCart()
  const { isFavorite, toggle: toggleFav, favorites, loading: favLoading } = useFavorites()
  const [quantity, setQuantity] = useState(20)
  const [customQty, setCustomQty] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [openModal, setOpenModal] = useState<PackType | null>(null)
  const [designs, setDesigns] = useState<StoreDesign[]>([])
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [addedFeedback, setAddedFeedback] = useState<PackType | null>(null)
  const heroRef = useRef<HTMLElement>(null)

  // Fetch designs for basic pack
  useEffect(() => {
    fetch('/api/designs').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.designs) setDesigns(d.designs)
    }).catch(() => {})
  }, [])

  // Scroll listener for nav
  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current
      if (!hero) return
      setScrolled(hero.getBoundingClientRect().bottom <= 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Computed quantity
  const effectiveQty = showCustomInput
    ? (parseInt(customQty) || 0)
    : quantity

  const handleAddToCart = useCallback(async (designId?: string, fileUrl?: string) => {
    const pack = openModal
    if (!pack || effectiveQty < 1) return
    const ok = await addItem(pack, effectiveQty, designId, fileUrl)
    if (ok) {
      setOpenModal(null)
      setAddedFeedback(pack)
      setTimeout(() => setAddedFeedback(null), 2200)
    }
  }, [openModal, effectiveQty, addItem])

  const handleSignOut = () => {
    handleSignOutAction()
  }

  const openPack = openModal ? PACKS.find(p => p.id === openModal) : null

  return (
    <>
      <style>{`
        @keyframes float0{0%,100%{transform:rotate(-14deg) translateY(0)}50%{transform:rotate(-14deg) translateY(-10px)}}
        @keyframes float1{0%,100%{transform:rotate(8deg) translateY(0)}50%{transform:rotate(8deg) translateY(-14px)}}
        @keyframes float2{0%,100%{transform:rotate(-6deg) translateY(0)}50%{transform:rotate(-6deg) translateY(-8px)}}
        @keyframes float3{0%,100%{transform:rotate(11deg) translateY(0)}50%{transform:rotate(11deg) translateY(-12px)}}
        @keyframes bounceHint{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(6px)}}
      `}</style>

      {/* ── FIXED NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
        style={{
          padding: '12px clamp(14px, 4vw, 24px)',
          background: scrolled ? 'rgba(234,231,218,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          boxShadow: scrolled ? '0 2px 16px rgba(11,33,80,0.08)' : 'none',
        }}
      >
        {/* Hamburger */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col gap-[5px] p-1.5 rounded-lg"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Abrir menú"
        >
          {[0, 1, 2].map(i => (
            <div key={i} className="w-5 h-0.5 rounded-full transition-colors duration-300"
              style={{ background: scrolled ? '#0B2150' : '#EAE7DA' }} />
          ))}
        </button>

        {/* Logo */}
        <img
          src="/MEMENTO_FRASE.svg"
          alt="Memento Mundi"
          className="h-7 object-contain transition-all duration-300"
          style={{ maxWidth: '38vw', filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
        />

        {/* Avatar + dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="relative w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white transition-all hover:scale-105 active:scale-95 focus:outline-none"
              style={{ background: '#066FB4' }}
              aria-label="Menú de perfil"
            >
              <span style={{ fontFamily: 'Space Grotesk, sans-serif' }}>A</span>
              {total.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                  style={{ background: '#FA9223', minWidth: 16, height: 16, padding: '0 4px' }}>
                  {total.itemCount}
                </span>
              )}
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              sideOffset={8} align="end"
              className="z-50 min-w-[192px] rounded-2xl overflow-hidden"
              style={{ background: '#EAE7DA', border: '1.5px solid rgba(11,33,80,0.1)', boxShadow: '0 8px 32px rgba(11,33,80,0.18)' }}
            >
              <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(11,33,80,0.07)' }}>
                <p className="font-bold text-sm" style={{ color: '#0B2150', fontFamily: 'Space Grotesk, sans-serif' }}>Mi cuenta</p>
              </div>

              {[
                { label: 'Mi Perfil', href: '/perfil', icon: <UserSVG /> },
                { label: 'Medallas', href: '/perfil?tab=medallas', icon: <MedalSVG /> },
                {
                  label: 'Carrito',
                  href: '/tienda',
                  icon: <CartSVG />,
                  badge: total.itemCount > 0 ? total.itemCount : undefined,
                },
                {
                  label: 'Favoritos',
                  href: '/tienda',
                  icon: <HeartSVG />,
                  badge: favorites.length > 0 ? favorites.length : undefined,
                },
                { label: 'Ayuda', href: '/ayuda', icon: <HelpSVG /> },
              ].map(item => (
                <DropdownMenu.Item key={item.label} asChild>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm outline-none cursor-pointer transition-colors hover:bg-navy/5"
                    style={{ color: '#0B2150', fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {item.icon}
                    <span className="flex-1">{item.label}</span>
                    {'badge' in item && item.badge !== undefined && (
                      <span className="text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                        style={{ background: '#FA9223', minWidth: 16, height: 16, padding: '0 4px' }}>
                        {item.badge}
                      </span>
                    )}
                  </a>
                </DropdownMenu.Item>
              ))}

              <DropdownMenu.Separator style={{ height: 1, background: 'rgba(11,33,80,0.07)', margin: '2px 0' }} />

              <DropdownMenu.Item asChild>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm outline-none cursor-pointer transition-colors hover:bg-red-50"
                  style={{ color: '#DC2626', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  <LogoutSVG />
                  Cerrar sesión
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </nav>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ minHeight: '100svh', background: '#0B2150' }}
      >
        {/* Dot pattern */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        {/* SVG stickers flotantes */}
        {[
          { left: '8%', top: '22%', anim: 'float0', delay: '0s', size: 48, content: <StickerDot color="#0EA5E9" /> },
          { left: '82%', top: '18%', anim: 'float1', delay: '0.4s', size: 40, content: <StickerDot color="#EA580C" /> },
          { left: '76%', top: '68%', anim: 'float2', delay: '0.8s', size: 44, content: <StickerDot color="#38BDF8" /> },
          { left: '10%', top: '68%', anim: 'float3', delay: '1.2s', size: 38, content: <StickerDot color="#FA9223" /> },
        ].map((s, i) => (
          <div key={i} className="absolute pointer-events-none select-none"
            style={{ left: s.left, top: s.top, width: s.size, height: s.size, opacity: 0.55, animation: `${s.anim} ${3 + i * 0.5}s ease-in-out infinite`, animationDelay: s.delay }}>
            {s.content}
          </div>
        ))}

        {/* Animación pegatina */}
        <div className="relative z-10 flex flex-col items-center gap-5">
          <StickerPeelingHero />
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(11px, 2vw, 14px)', fontWeight: 600, color: 'rgba(234,231,218,0.45)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            Tu tienda de recuerdos
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute flex flex-col items-center gap-1.5" style={{ bottom: 28, left: '50%', animation: 'bounceHint 2s ease-in-out infinite', color: '#EAE7DA', opacity: 0.3, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Descubrir</span>
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
            <path d="M7 2v12M2 9l5 6 5-6" stroke="#EAE7DA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ── PACKS + SELECTOR ── */}
      <section className="flex flex-col items-center bg-cream" style={{ padding: 'clamp(48px,8vw,80px) clamp(16px,5vw,48px) 160px', gap: 'clamp(24px,4vw,36px)' }}>

        {/* Título */}
        <div className="text-center">
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0B2150', opacity: 0.4, marginBottom: 6 }}>
            Elige tu pack
          </p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px,4vw,34px)', fontWeight: 900, color: '#0B2150', lineHeight: 1.1 }}>
            Lleva tus recuerdos contigo
          </h2>
        </div>

        {/* Selector de cantidad */}
        <div className="w-full max-w-xl flex flex-col gap-3">
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 700, color: '#0B2150', opacity: 0.45, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ¿Cuántas pegatinas necesitas?
          </p>
          <div className="flex gap-2.5 flex-wrap">
            {QUANTITY_PRESETS.map(q => (
              <button
                key={q}
                onClick={() => { setQuantity(q); setShowCustomInput(false) }}
                className="rounded-2xl font-bold transition-all active:scale-95"
                style={{
                  padding: '10px 20px',
                  background: (!showCustomInput && quantity === q) ? '#0B2150' : 'white',
                  color: (!showCustomInput && quantity === q) ? '#EAE7DA' : '#0B2150',
                  border: `2px solid ${(!showCustomInput && quantity === q) ? '#0B2150' : 'rgba(11,33,80,0.12)'}`,
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 15,
                  cursor: 'pointer',
                  boxShadow: (!showCustomInput && quantity === q) ? '3px 3px 0 rgba(11,33,80,0.2)' : 'none',
                }}
              >
                {q}
              </button>
            ))}
            <button
              onClick={() => setShowCustomInput(true)}
              className="rounded-2xl font-bold transition-all active:scale-95"
              style={{
                padding: '10px 20px',
                background: showCustomInput ? '#0B2150' : 'white',
                color: showCustomInput ? '#EAE7DA' : '#0B2150',
                border: `2px solid ${showCustomInput ? '#0B2150' : 'rgba(11,33,80,0.12)'}`,
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 15,
                cursor: 'pointer',
                boxShadow: showCustomInput ? '3px 3px 0 rgba(11,33,80,0.2)' : 'none',
              }}
            >
              Otra cantidad
            </button>
          </div>
          <AnimatePresence>
            {showCustomInput && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <input
                  type="number"
                  min={1}
                  placeholder="Ej: 75"
                  value={customQty}
                  onChange={e => setCustomQty(e.target.value)}
                  className="w-full rounded-2xl font-bold text-lg transition-all outline-none"
                  style={{
                    padding: '12px 18px',
                    border: '2px solid rgba(11,33,80,0.18)',
                    background: 'white',
                    color: '#0B2150',
                    fontFamily: 'Space Grotesk, sans-serif',
                    marginTop: 4,
                  }}
                  autoFocus
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cards de packs — layout vertical */}
        <div className="w-full max-w-xl flex flex-col gap-5">
          {PACKS.map(pack => {
            const price = effectiveQty > 0 ? calculatePrice(effectiveQty, pack.id) : null
            const fav = isFavorite(pack.id)

            return (
              <motion.div
                key={pack.id}
                layoutId={`pack-${pack.id}`}
                whileHover={{ y: -3, boxShadow: `0 12px 36px rgba(11,33,80,0.14), 6px 6px 0 ${pack.accent}` }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpenModal(pack.id)}
                className="relative cursor-pointer rounded-3xl overflow-hidden flex flex-col"
                style={{
                  background: 'white',
                  border: `2px solid rgba(11,33,80,0.07)`,
                  boxShadow: '0 4px 20px rgba(11,33,80,0.08)',
                  transition: 'box-shadow 0.2s ease',
                }}
              >
                {/* Imagen / preview superior */}
                <div className="relative flex items-center justify-center overflow-hidden" style={{ height: 160, background: pack.imgBg }}>
                  <img
                    src={PACK_PHOTOS[pack.id][0]}
                    alt={pack.name}
                    className="w-full h-full object-cover opacity-70"
                  />
                  {/* Overlay gradiente */}
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 30%, ${pack.imgBg} 100%)` }} />

                  {/* Badge */}
                  <div className="absolute top-3.5 left-3.5 text-white rounded-full"
                    style={{ background: pack.accent, padding: '3px 12px', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif', boxShadow: '2px 2px 0 rgba(11,33,80,0.2)' }}>
                    {pack.tagline}
                  </div>

                  {/* Favorito mini button */}
                  <button
                    onClick={e => { e.stopPropagation(); toggleFav(pack.id) }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90"
                    style={{ background: fav ? pack.accent : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill={fav ? 'white' : 'none'} stroke={fav ? 'white' : '#0B2150'} strokeWidth="1.5">
                      <path d="M7 12S1 8 1 4.5a3 3 0 0 1 6-0.38A3 3 0 0 1 13 4.5C13 8 7 12 7 12Z"/>
                    </svg>
                  </button>
                </div>

                {/* Contenido */}
                <div className="flex flex-col gap-2.5 p-5">
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 900, color: '#0B2150' }}>{pack.name}</h3>
                  <p style={{ fontSize: 13, color: '#0B2150', opacity: 0.55, lineHeight: 1.5 }}>{pack.description}</p>

                  <div className="flex items-center justify-between mt-1">
                    <div>
                      {price && effectiveQty > 0 ? (
                        <>
                          <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 900, color: pack.accent, lineHeight: 1 }}>{price.formatted}</p>
                          <p style={{ fontSize: 11, color: '#0B2150', opacity: 0.4, fontFamily: 'Space Grotesk, sans-serif' }}>{price.unitFormatted}/ud · {effectiveQty} uds</p>
                        </>
                      ) : (
                        <p style={{ fontSize: 14, color: '#0B2150', opacity: 0.35, fontFamily: 'Space Grotesk, sans-serif' }}>Selecciona una cantidad</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full px-3 py-2"
                      style={{ background: pack.accentLight, color: pack.accent, fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 700 }}>
                      Ver pack
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── MASCOTA FIJA ── */}
      <a
        href="/ayuda"
        className="fixed z-20 flex flex-col items-center gap-1"
        style={{ bottom: 90, left: 14 }}
      >
        <Mascot size={42} handUp color="#0B2150" />
        <span style={{ fontSize: 9, fontWeight: 700, color: '#0B2150', opacity: 0.45, letterSpacing: '0.06em', fontFamily: 'Space Grotesk, sans-serif' }}>Ayuda</span>
      </a>

      {/* ── TOAST: añadido al carrito ── */}
      <AnimatePresence>
        {addedFeedback && (
          <motion.div
            className="fixed z-[70] left-1/2 rounded-2xl flex items-center gap-2.5 shadow-xl"
            style={{ bottom: 100, x: '-50%', background: '#0B2150', color: '#EAE7DA', padding: '12px 20px', fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, fontWeight: 600 }}
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="#4ADE80" strokeWidth="2.2" strokeLinecap="round"/></svg>
            Añadido al carrito
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CART BAR FIJA ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center"
        style={{ padding: '12px clamp(14px,5vw,32px) max(16px,env(safe-area-inset-bottom))', background: 'rgba(234,231,218,0.97)', backdropFilter: 'blur(16px)', borderTop: '1.5px solid rgba(11,33,80,0.08)' }}
      >
        <button
          disabled={cartItems.length === 0}
          className="flex-1 max-w-lg mx-auto flex items-center justify-center gap-2.5 rounded-full font-bold transition-all duration-150 active:scale-[0.98]"
          style={{
            padding: '15px 24px',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(14px,2.5vw,16px)',
            fontWeight: 700,
            background: cartItems.length > 0 ? '#FA9223' : 'rgba(11,33,80,0.12)',
            color: cartItems.length > 0 ? 'white' : 'rgba(11,33,80,0.35)',
            border: 'none',
            cursor: cartItems.length > 0 ? 'pointer' : 'default',
            boxShadow: cartItems.length > 0 ? '3px 3px 0px #0B2150' : 'none',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1h3l1.6 8a1 1 0 0 0 1 .8h6.8a1 1 0 0 0 1-.78L15.5 4H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="6.5" cy="15" r="1.2" fill="currentColor"/>
            <circle cx="13" cy="15" r="1.2" fill="currentColor"/>
          </svg>
          {cartItems.length > 0
            ? `Ir al checkout · ${total.formatted}`
            : 'Selecciona un pack para continuar'}
        </button>
      </div>

      {/* ── DRAWER ── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div onClick={() => setDrawerOpen(false)} className="absolute inset-0" style={{ background: 'rgba(11,33,80,0.4)', backdropFilter: 'blur(2px)' }} />
            <motion.div
              className="relative flex flex-col shadow-2xl"
              style={{ width: 'min(82%, 300px)', background: '#EAE7DA', backgroundImage: 'radial-gradient(circle, #0B215010 1px, transparent 1px)', backgroundSize: '18px 18px', borderRadius: '0 24px 24px 0' }}
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            >
              <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid rgba(11,33,80,0.08)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: '#066FB4', fontFamily: 'Space Grotesk, sans-serif' }}>A</div>
                  <div>
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#0B2150', fontSize: 14 }}>Mi cuenta</p>
                    <p style={{ fontSize: 11, color: '#0B2150', opacity: 0.4 }}>Viajero Mundi</p>
                  </div>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-navy/10 transition-all">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="#0B2150" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-2">
                {[
                  { label: 'Viajes', href: '/home' },
                  { label: 'RRSS', href: '/rrss' },
                  { label: 'Tienda', href: '/tienda', active: true },
                  { label: 'Mi Perfil', href: '/perfil' },
                  { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
                  { label: 'Ayuda', href: '/ayuda' },
                ].map((item, i) => (
                  <a key={i} href={item.href} style={{ textDecoration: 'none' }}>
                    <div className="flex items-center gap-3 px-5 py-3 transition-colors"
                      style={{ background: item.active ? 'rgba(11,33,80,0.06)' : 'transparent', borderLeft: item.active ? '3px solid #FA9223' : '3px solid transparent' }}>
                      <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: item.active ? 700 : 500, fontSize: 15, color: '#0B2150', opacity: item.active ? 1 : 0.65 }}>
                        {item.label}
                      </span>
                      {item.active && <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#FA9223' }} />}
                    </div>
                  </a>
                ))}
              </nav>

              <div className="p-5" style={{ borderTop: '1px solid rgba(11,33,80,0.08)' }}>
                <p style={{ fontSize: 11, color: '#0B2150', opacity: 0.3, textAlign: 'center', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, letterSpacing: '0.06em' }}>
                  MEMENTO MUNDI © 2025
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {openModal && openPack && (
          <PackModal
            key={openModal}
            pack={openPack}
            quantity={effectiveQty > 0 ? effectiveQty : 20}
            onClose={() => setOpenModal(null)}
            onAddToCart={handleAddToCart}
            isFav={isFavorite(openModal)}
            onToggleFav={() => toggleFav(openModal)}
            designs={designs}
            loadingCart={cartLoading}
            loadingFav={favLoading}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Micro-SVG helpers ────────────────────────────────────────────────────────

function StickerDot({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="24" cy="24" r="22" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="2"/>
      <circle cx="24" cy="24" r="10" fill={color} fillOpacity="0.4"/>
      <circle cx="24" cy="24" r="4" fill={color}/>
    </svg>
  )
}

function UserSVG() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1.5 13c0-3 2.46-4.5 5.5-4.5s5.5 1.5 5.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
}
function MedalSVG() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="9" r="4" stroke="currentColor" strokeWidth="1.3"/><path d="M4.5 1.5h5L8 5.5H6L4.5 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
}
function CartSVG() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1h2l1.5 7.5a1 1 0 0 0 1 .7h5a1 1 0 0 0 1-.76L13 4H4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="5.5" cy="12" r="1" fill="currentColor"/><circle cx="10.5" cy="12" r="1" fill="currentColor"/></svg>
}
function HeartSVG() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 12S1 8 1 4.5a3 3 0 0 1 6-.38A3 3 0 0 1 13 4.5C13 8 7 12 7 12Z" stroke="currentColor" strokeWidth="1.3"/></svg>
}
function HelpSVG() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M5.5 5.5a1.5 1.5 0 0 1 3 .5c0 1-1.5 1.5-1.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="7" cy="10.5" r=".75" fill="currentColor"/></svg>
}
function LogoutSVG() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.5M9 9.5l2.5-2.5L9 4.5M11.5 7H5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
