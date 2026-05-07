'use client'

import { useRef, useState } from 'react'
import type { TripFormData } from '@/hooks/useNewTripFlow'
import { validateTripForm, hasErrors } from '@/schemas/trip.schema'

const TRIP_TYPES = [
  { value: 'solo' as const,   label: 'Solo',    emoji: '🧍' },
  { value: 'couple' as const, label: 'Pareja',  emoji: '👫' },
  { value: 'group' as const,  label: 'Grupo',   emoji: '👥' },
  { value: 'family' as const, label: 'Familia', emoji: '👨‍👩‍👧' },
]

const DESTINATION_SUGGESTIONS = [
  'Tokyo, Japón', 'París, Francia', 'Roma, Italia', 'Lisboa, Portugal',
  'Bali, Indonesia', 'Nueva York, EEUU', 'Bangkok, Tailandia', 'Barcelona, España',
  'Santorini, Grecia', 'Dubái, EAU', 'Ámsterdam, Países Bajos', 'Marrakech, Marruecos',
]

interface TripFormProps {
  data: TripFormData
  update: (patch: Partial<TripFormData>) => void
  onNext: () => void
  onBack: () => void
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-xs mt-1 font-grown" style={{ color: '#DC2626' }}>{msg}</p>
}

const inputBase = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 12,
  background: 'white',
  fontFamily: 'Nunito, sans-serif',
  fontSize: 15,
  color: '#0B2150',
  outline: 'none',
  transition: 'border-color 0.2s',
}

export function TripForm({ data, update, onNext, onBack }: TripFormProps) {
  const [errors, setErrors] = useState<ReturnType<typeof validateTripForm>>({})
  const [destFocus, setDestFocus] = useState(false)
  const [newCompanion, setNewCompanion] = useState('')
  const imgInputRef = useRef<HTMLInputElement>(null)

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      update({ coverImageFile: file, coverImagePreview: ev.target?.result as string })
    }
    reader.readAsDataURL(file)
  }

  function addCompanion() {
    const trimmed = newCompanion.trim()
    if (!trimmed) return
    update({ companions: [...data.companions, trimmed] })
    setNewCompanion('')
  }

  function removeCompanion(idx: number) {
    update({ companions: data.companions.filter((_, i) => i !== idx) })
  }

  function handleSubmit() {
    const errs = validateTripForm(data)
    setErrors(errs)
    if (!hasErrors(errs)) onNext()
  }

  const filteredSuggestions = data.destination.length >= 2
    ? DESTINATION_SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(data.destination.toLowerCase())
      ).slice(0, 5)
    : []

  return (
    <div className="space-y-5">

      {/* 1. Trip name */}
      <div>
        <label className="block font-grown font-bold text-navy mb-1.5" style={{ fontSize: 13, opacity: 0.8 }}>
          Nombre del viaje *
        </label>
        <input
          type="text"
          value={data.tripName}
          onChange={(e) => { update({ tripName: e.target.value }); if (errors.tripName) setErrors(p => ({...p, tripName: undefined})) }}
          placeholder="Ej: Grecia 2025 🏛️"
          maxLength={50}
          style={{ ...inputBase, border: `2px solid ${errors.tripName ? '#DC2626' : 'rgba(11,33,80,0.12)'}` }}
        />
        <FieldError msg={errors.tripName} />
      </div>

      {/* 2. Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-grown font-bold text-navy mb-1.5" style={{ fontSize: 13, opacity: 0.8 }}>
            Inicio *
          </label>
          <input
            type="date"
            value={data.startDate}
            onChange={(e) => { update({ startDate: e.target.value }); if (errors.startDate) setErrors(p => ({...p, startDate: undefined})) }}
            style={{ ...inputBase, border: `2px solid ${errors.startDate ? '#DC2626' : 'rgba(11,33,80,0.12)'}` }}
          />
          <FieldError msg={errors.startDate} />
        </div>
        <div>
          <label className="block font-grown font-bold text-navy mb-1.5" style={{ fontSize: 13, opacity: 0.8 }}>
            Fin *
          </label>
          <input
            type="date"
            value={data.endDate}
            min={data.startDate || undefined}
            onChange={(e) => { update({ endDate: e.target.value }); if (errors.endDate) setErrors(p => ({...p, endDate: undefined})) }}
            style={{ ...inputBase, border: `2px solid ${errors.endDate ? '#DC2626' : 'rgba(11,33,80,0.12)'}` }}
          />
          <FieldError msg={errors.endDate} />
        </div>
      </div>

      {/* 3. Destination */}
      <div className="relative">
        <label className="block font-grown font-bold text-navy mb-1.5" style={{ fontSize: 13, opacity: 0.8 }}>
          Destino principal *
        </label>
        <input
          type="text"
          value={data.destination}
          onChange={(e) => { update({ destination: e.target.value }); if (errors.destination) setErrors(p => ({...p, destination: undefined})) }}
          onFocus={() => setDestFocus(true)}
          onBlur={() => setTimeout(() => setDestFocus(false), 150)}
          placeholder="Ej: Tokyo, Japón"
          style={{ ...inputBase, border: `2px solid ${errors.destination ? '#DC2626' : 'rgba(11,33,80,0.12)'}` }}
        />
        <FieldError msg={errors.destination} />
        {destFocus && filteredSuggestions.length > 0 && (
          <ul
            className="absolute z-20 w-full mt-1 bg-white rounded-xl overflow-hidden"
            style={{ border: '2px solid rgba(11,33,80,0.12)', boxShadow: '0 8px 24px rgba(11,33,80,0.1)' }}
          >
            {filteredSuggestions.map((s) => (
              <li
                key={s}
                className="px-4 py-2.5 font-grown text-navy cursor-pointer hover:bg-cream"
                style={{ fontSize: 14 }}
                onMouseDown={() => { update({ destination: s }); setDestFocus(false) }}
              >
                📍 {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 4. Trip type */}
      <div>
        <label className="block font-grown font-bold text-navy mb-2" style={{ fontSize: 13, opacity: 0.8 }}>
          Tipo de viaje
        </label>
        <div className="grid grid-cols-4 gap-2">
          {TRIP_TYPES.map((t) => {
            const active = data.tripType === t.value
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => update({ tripType: t.value })}
                className="flex flex-col items-center gap-1 py-3 rounded-xl font-grown text-xs font-bold transition-all duration-200"
                style={{
                  background: active ? '#FA9223' : 'white',
                  color: active ? 'white' : 'rgba(11,33,80,0.6)',
                  border: `2px solid ${active ? '#FA9223' : 'rgba(11,33,80,0.12)'}`,
                  boxShadow: active ? '3px 3px 0 #0B2150' : 'none',
                }}
              >
                <span style={{ fontSize: 22 }}>{t.emoji}</span>
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* 5. Cover image */}
      <div>
        <label className="block font-grown font-bold text-navy mb-2" style={{ fontSize: 13, opacity: 0.8 }}>
          Foto de portada (opcional)
        </label>
        <div
          className="relative w-full rounded-xl overflow-hidden cursor-pointer flex items-center justify-center"
          style={{
            height: 130,
            border: '2px dashed rgba(11,33,80,0.2)',
            background: data.coverImagePreview ? 'transparent' : '#F5F2E8',
          }}
          onClick={() => imgInputRef.current?.click()}
        >
          {data.coverImagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.coverImagePreview} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center">
              <span style={{ fontSize: 32 }}>🖼️</span>
              <p className="font-grown text-navy mt-1" style={{ fontSize: 13, opacity: 0.5 }}>
                Toca para añadir foto
              </p>
            </div>
          )}
          {data.coverImagePreview && (
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(11,33,80,0.45)' }}
            >
              <span className="text-white font-grown font-bold text-sm">Cambiar foto</span>
            </div>
          )}
        </div>
        <input
          ref={imgInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImage}
        />
      </div>

      {/* 6. Companions */}
      <div>
        <label className="block font-grown font-bold text-navy mb-2" style={{ fontSize: 13, opacity: 0.8 }}>
          Compañeros de viaje (opcional)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCompanion}
            onChange={(e) => setNewCompanion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCompanion())}
            placeholder="email@ejemplo.com"
            style={{ ...inputBase, flex: 1, border: '2px solid rgba(11,33,80,0.12)' }}
          />
          <button
            type="button"
            onClick={addCompanion}
            className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0"
            style={{ background: '#5CA4A4', border: '2px solid #0B2150', boxShadow: '2px 2px 0 #0B2150' }}
          >
            +
          </button>
        </div>
        {data.companions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {data.companions.map((c, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full font-grown text-sm font-semibold"
                style={{ background: '#D6ECEC', color: '#0B2150', fontSize: 13 }}
              >
                {c}
                <button onClick={() => removeCompanion(i)} className="opacity-50 hover:opacity-100 font-bold">×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 7. Privacy */}
      <div
        className="flex items-center justify-between p-4 rounded-xl"
        style={{ background: 'white', border: '2px solid rgba(11,33,80,0.1)' }}
      >
        <div>
          <p className="font-grown font-bold text-navy" style={{ fontSize: 14 }}>¿Viaje público?</p>
          <p className="font-grown text-navy" style={{ fontSize: 12, opacity: 0.5 }}>
            Otros usuarios podrán ver tu scrapbook
          </p>
        </div>
        <button
          type="button"
          onClick={() => update({ isPublic: !data.isPublic })}
          className="relative w-12 h-6 rounded-full transition-colors duration-200"
          style={{ background: data.isPublic ? '#FA9223' : 'rgba(11,33,80,0.15)' }}
        >
          <span
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200"
            style={{ transform: data.isPublic ? 'translateX(26px)' : 'translateX(2px)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
          />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3.5 rounded-full font-brasica font-bold text-navy"
          style={{ border: '2px solid rgba(11,33,80,0.2)', fontSize: 15 }}
        >
          ← Atrás
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-2 flex-1 py-3.5 rounded-full font-brasica font-bold text-white"
          style={{ background: '#FA9223', border: '2px solid #0B2150', boxShadow: '3px 3px 0 #0B2150', fontSize: 15 }}
        >
          Siguiente →
        </button>
      </div>
    </div>
  )
}
