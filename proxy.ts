import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(_request: NextRequest) {
  // Placeholder: will integrate with Supabase auth
  // For now, just allow all routes
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
