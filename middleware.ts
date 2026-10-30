import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Protect the admin panel
  if (request.nextUrl.pathname.startsWith('/painel') && request.nextUrl.pathname !== '/painel/login') {
    const loggedIn = request.cookies.get('adminLoggedIn')
    
    if (!loggedIn || loggedIn.value !== 'true') {
      const url = request.nextUrl.clone()
      url.pathname = '/painel/login'
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/painel/:path*',
}