import { NextRequest, NextResponse } from 'next/server'

// TODO: install @supabase/supabase-js and @supabase/ssr, then replace this handler:
// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'
//
// export async function GET(request: NextRequest) {
//   const url = new URL(request.url)
//   const { origin } = url
//   const searchParams = url.searchParams          // URL.searchParams is sync (not Next.js searchParams)
//   const code = searchParams.get('code')
//   const next = searchParams.get('next') ?? '/perfil'
//
//   if (code) {
//     const cookieStore = await cookies()           // Next.js 16: cookies() is async
//     const supabase = createServerClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       { cookies: { getAll: () => cookieStore.getAll(), setAll: (c) => c.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
//     )
//     const { error } = await supabase.auth.exchangeCodeForSession(code)
//     if (!error) return NextResponse.redirect(`${origin}${next}`)
//   }
//
//   return NextResponse.redirect(`${origin}/login?error=oauth`)
// }

export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url)
  // Placeholder: redirect to perfil until Supabase is wired up
  return NextResponse.redirect(`${origin}/perfil`)
}
