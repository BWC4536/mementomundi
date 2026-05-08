'use client'

import { useState, useEffect, useCallback } from 'react'
import type { CartItem, CartState } from '@/types/store.types'
import type { PackType } from '@/lib/pricing/pricing'

const EMPTY_STATE: CartState = {
  items: [],
  total: { totalCents: 0, formatted: '0,00 €', itemCount: 0 },
}

export function useCart() {
  const [state, setState] = useState<CartState>(EMPTY_STATE)
  const [loading, setLoading] = useState(false)

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch('/api/cart')
      if (!res.ok) return
      const data = await res.json()
      setState(data)
    } catch { /* unauthenticated */ }
  }, [])

  useEffect(() => { fetchCart() }, [fetchCart])

  const addItem = useCallback(async (
    packType: PackType,
    quantity: number,
    designId?: string,
    customFileUrl?: string,
  ) => {
    setLoading(true)
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pack_type: packType, quantity, design_id: designId, custom_file_url: customFileUrl }),
      })
      if (res.ok) await fetchCart()
      return res.ok
    } finally {
      setLoading(false)
    }
  }, [fetchCart])

  const updateItem = useCallback(async (itemId: string, quantity: number) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      })
      if (res.ok) await fetchCart()
      return res.ok
    } finally {
      setLoading(false)
    }
  }, [fetchCart])

  const removeItem = useCallback(async (itemId: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/cart/${itemId}`, { method: 'DELETE' })
      if (res.ok) await fetchCart()
      return res.ok
    } finally {
      setLoading(false)
    }
  }, [fetchCart])

  return { ...state, loading, addItem, updateItem, removeItem, refresh: fetchCart }
}
