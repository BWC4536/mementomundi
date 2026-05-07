import type { TripFormData } from '@/hooks/useNewTripFlow'

export interface ValidationErrors {
  tripName?: string
  startDate?: string
  endDate?: string
  destination?: string
  tripType?: string
}

export function validateTripForm(data: TripFormData): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!data.tripName || data.tripName.trim().length < 3) {
    errors.tripName = 'El nombre debe tener al menos 3 caracteres'
  } else if (data.tripName.trim().length > 50) {
    errors.tripName = 'El nombre no puede superar 50 caracteres'
  }

  if (!data.startDate) {
    errors.startDate = 'Elige una fecha de inicio'
  }

  if (!data.endDate) {
    errors.endDate = 'Elige una fecha de fin'
  } else if (data.startDate && data.endDate <= data.startDate) {
    errors.endDate = 'La fecha de fin debe ser posterior al inicio'
  }

  if (!data.destination || data.destination.trim().length < 2) {
    errors.destination = 'Escribe el destino principal'
  }

  return errors
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0
}

export function isValidPackQR(value: string): boolean {
  // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  // Also accept mm:UUID format (Memento Mundi pack identifier)
  const mmRegex = /^mm:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(value) || mmRegex.test(value)
}
