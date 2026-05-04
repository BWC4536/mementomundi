'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    // Temp: redirect to /tienda (non-logged)
    // Later: check auth status with Supabase and redirect to /home if logueado
    router.push('/tienda')
  }, [router])

  return null
}
