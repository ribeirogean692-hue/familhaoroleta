import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Protect the admin panel
  if (request.nextUrl.pathname.startsWith('/painel')) {
    // For any path under /painel, except login page
    if (request.nextUrl.pathname !== '/painel/login') {
      const loggedIn = request.cookies.get('adminLoggedIn')
      
      // Debug log - this will only appear in Vercel logs
      console.log('Middleware check for pathname:', request.nextUrl.pathname)
      console.log('Cookie value:', loggedIn?.value)
      
      if (!loggedIn || loggedIn.value !== 'true') {
        const url = request.nextUrl.clone()
        url.pathname = '/painel/login'
        return NextResponse.redirect(url)
      }
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/painel/:path*',
}