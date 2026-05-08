import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { calculatePrice } from '@/lib/pricing/pricing'
import type { PackType } from '@/types/store.types'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: items, error } = await supabase
    .from('cart_items')
    .select('*, design:sticker_designs(id,name,image_url)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const totalCents = (items ?? []).reduce((sum, item) => {
    const price = calculatePrice(item.quantity, item.pack_type as PackType)
    return sum + price.totalCents
  }, 0)

  return NextResponse.json({
    items: items ?? [],
    total: {
      totalCents,
      formatted: (totalCents / 100).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }),
      itemCount: (items ?? []).length,
    },
  })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { pack_type, quantity, design_id, custom_file_url } = body

  if (!pack_type || !['basic', 'custom'].includes(pack_type)) {
    return NextResponse.json({ error: 'Invalid pack_type' }, { status: 400 })
  }
  if (!quantity || quantity < 1) {
    return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('cart_items')
    .insert({
      user_id: user.id,
      pack_type,
      quantity,
      design_id: design_id ?? null,
      custom_file_url: custom_file_url ?? null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
