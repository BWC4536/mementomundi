export type PackType = 'basic' | 'custom'

export interface StoreDesign {
  id: string
  name: string
  image_url: string
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  pack_type: PackType
  quantity: number
  design_id: string | null
  custom_file_url: string | null
  created_at: string
  updated_at: string
}

export interface Favorite {
  id: string
  user_id: string
  pack_type: PackType
  created_at: string
}

export interface CartState {
  items: CartItem[]
  total: CalculatedCartTotal
}

export interface CalculatedCartTotal {
  totalCents: number
  formatted: string
  itemCount: number
}
