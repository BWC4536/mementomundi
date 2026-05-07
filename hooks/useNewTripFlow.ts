'use client'

import { useState } from 'react'

export type TripStep = 1 | 2 | 3

export interface TripFormData {
  qrCode: string
  tripName: string
  startDate: string   // ISO date string yyyy-mm-dd (native input)
  endDate: string
  destination: string
  tripType: 'solo' | 'couple' | 'group' | 'family'
  companions: string[]
  coverImageFile: File | null
  coverImagePreview: string | null
  isPublic: boolean
}

const EMPTY: TripFormData = {
  qrCode: '',
  tripName: '',
  startDate: '',
  endDate: '',
  destination: '',
  tripType: 'group',
  companions: [],
  coverImageFile: null,
  coverImagePreview: null,
  isPublic: true,
}

export function useNewTripFlow() {
  const [step, setStep] = useState<TripStep>(1)
  const [data, setData] = useState<TripFormData>(EMPTY)
  const [createdTripId, setCreatedTripId] = useState<string | null>(null)
  const [showMedal, setShowMedal] = useState(false)
  const [medalName, setMedalName] = useState('')

  const update = (patch: Partial<TripFormData>) =>
    setData((prev) => ({ ...prev, ...patch }))

  const next = () => setStep((s) => Math.min(s + 1, 3) as TripStep)
  const back = () => setStep((s) => Math.max(s - 1, 1) as TripStep)

  return {
    step, data, update, next, back,
    createdTripId, setCreatedTripId,
    showMedal, setShowMedal, medalName, setMedalName,
  }
}
