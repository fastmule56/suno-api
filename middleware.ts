import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const auth = request.headers.get('authorization')
  const expected = `Bearer ${process.env.API_AUTH_TOKEN}`

  if (!process.env.API_AUTH_TOKEN || auth !== expected) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}
