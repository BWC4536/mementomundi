import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Tipo de archivo no permitido. Usa PNG, JPG o SVG.' }, { status: 400 })
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'El archivo supera el tamaño máximo de 10MB.' }, { status: 400 })
    }

    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'png'
    const safeName = `${user.id}/${Date.now()}.${ext}`

    const { data, error } = await supabase.storage
      .from('custom-designs')
      .upload(safeName, file, { contentType: file.type, upsert: false })

    if (error) {
      console.error('Upload error:', error)
      return NextResponse.json({ error: `Error al subir: ${error.message}` }, { status: 500 })
    }

    if (!data?.path) {
      return NextResponse.json({ error: 'No se pudo obtener la ruta del archivo' }, { status: 500 })
    }

    const { data: urlData } = supabase.storage
      .from('custom-designs')
      .getPublicUrl(data.path)

    if (!urlData?.publicUrl) {
      return NextResponse.json({ error: 'No se pudo generar URL pública' }, { status: 500 })
    }

    return NextResponse.json({ url: urlData.publicUrl }, { status: 201 })
  } catch (err) {
    console.error('Upload route error:', err)
    return NextResponse.json({ error: 'Error interno al procesar la solicitud' }, { status: 500 })
  }
}
