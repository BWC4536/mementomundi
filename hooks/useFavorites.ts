'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Favorite } from '@/types/store.types'
import type { PackType } from '@/lib/pricing/pricing'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(false)

  const fetch_ = useCallback(async () => {
    try {
      const res = await fetch('/api/favorites')
      if (!res.ok) return
      const data = await res.json()
      setFavorites(data.favorites ?? [])
    } catch { /* unauthenticated */ }
  }, [])

  useEffect(() => { fetch_() }, [fetch_])

  const isFavorite = useCallback(
    (packType: PackType) => favorites.some(f => f.pack_type === packType),
    [favorites],
  )

  const toggle = useCallback(async (packType: PackType) => {
    setLoading(true)
    try {
      if (isFavorite(packType)) {
        await fetch(`/api/favorites/${packType}`, { method: 'DELETE' })
      } else {
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pack_type: packType }),
        })
      }
      await fetch_()
    } finally {
      setLoading(false)
    }
  }, [isFavorite, fetch_])

  return { favorites, loading, isFavorite, toggle, refresh: fetch_ }
}
