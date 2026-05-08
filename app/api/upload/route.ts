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

    // Determinar extensión del archivo
    let ext = 'png'
    if (file.name && file.name.includes('.')) {
      ext = file.name.split('.').pop()?.toLowerCase() ?? 'png'
    }

    const safeName = `${user.id}/${Date.now()}.${ext}`

    // Convert File to Buffer for Supabase
    const buffer = await file.arrayBuffer()

    const { data, error } = await supabase.storage
      .from('custom-stickers')
      .upload(safeName, buffer, { contentType: file.type, upsert: false })

    if (error) {
      console.error('Upload error details:', {
        message: error.message,
        status: error.status,
        path: safeName,
        bucket: 'custom-stickers'
      })
      return NextResponse.json({
        error: error.message || 'Error al subir el archivo a Storage. Verifica que el bucket exista.'
      }, { status: 500 })
    }

    if (!data?.path) {
      return NextResponse.json({ error: 'No se pudo obtener la ruta del archivo' }, { status: 500 })
    }

    // Generar URL firmada (signed URL) en lugar de URL pública
    // El bucket custom-stickers es privado, así que getPublicUrl no funciona
    const { data: signedData, error: signedError } = await supabase.storage
      .from('custom-stickers')
      .createSignedUrl(data.path, 3600) // URL válida por 1 hora

    if (signedError || !signedData?.signedUrl) {
      console.error('Signed URL error:', signedError)
      return NextResponse.json({ error: 'No se pudo generar URL del archivo' }, { status: 500 })
    }

    return NextResponse.json({ url: signedData.signedUrl }, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Upload route error:', message)
    return NextResponse.json({
      error: `Error: ${message}`
    }, { status: 500 })
  }
}
