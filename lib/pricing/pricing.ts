export type PackType = 'basic' | 'custom'

export interface CalculatedPrice {
  totalCents: number
  totalEuros: number
  unitCents: number
  formatted: string
  unitFormatted: string
}

// Precios en céntimos de euro
const PRICE_TIERS: Record<PackType, Record<number, number>> = {
  basic:  { 10: 600,  20: 1000, 50: 1700, 100: 2500 },
  custom: { 10: 1000, 20: 1500, 50: 2000, 100: 3500 },
}

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t)
}

export function calculatePrice(quantity: number, type: PackType): CalculatedPrice {
  const tiers = PRICE_TIERS[type]
  const qty = Math.max(1, Math.floor(quantity))

  let totalCents: number

  if (qty <= 10) {
    totalCents = tiers[10]
  } else if (qty === 20) {
    totalCents = tiers[20]
  } else if (qty < 20) {
    // interpolación 10→20
    const t = (qty - 10) / (20 - 10)
    totalCents = lerp(tiers[10], tiers[20], t)
  } else if (qty === 50) {
    totalCents = tiers[50]
  } else if (qty < 50) {
    // interpolación 20→50
    const t = (qty - 20) / (50 - 20)
    totalCents = lerp(tiers[20], tiers[50], t)
  } else if (qty === 100) {
    totalCents = tiers[100]
  } else if (qty < 100) {
    // interpolación 50→100
    const t = (qty - 50) / (100 - 50)
    totalCents = lerp(tiers[50], tiers[100], t)
  } else {
    // > 100: ratio basado en precio de 100
    const ratioPerUnit = tiers[100] / 100
    totalCents = Math.round(qty * ratioPerUnit)
  }

  const unitCents = Math.round(totalCents / qty)

  const fmt = (cents: number) =>
    (cents / 100).toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 })

  return {
    totalCents,
    totalEuros: totalCents / 100,
    unitCents,
    formatted: fmt(totalCents),
    unitFormatted: fmt(unitCents),
  }
}

export const QUANTITY_PRESETS = [10, 20, 50] as const

export function getPriceLabel(type: PackType): string {
  return type === 'basic' ? 'Básico' : 'Personalizado'
}
