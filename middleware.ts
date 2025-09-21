import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/cadastro-cliente', '/cadastro-prestador', '/dashboard-publico']
  
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Skip middleware for API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Check if user is authenticated for protected routes
  if (!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/prestador') || pathname.startsWith('/cliente'))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}