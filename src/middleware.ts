import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Protect /analytics route
  if (request.nextUrl.pathname.startsWith('/analytics')) {
    // Check if user is authenticated
    const isAuthenticated = request.cookies.get('analytics_auth')?.value === 'true'

    // If not authenticated and not on login page, redirect to login
    if (!isAuthenticated && !request.nextUrl.pathname.includes('/login')) {
      return NextResponse.redirect(new URL('/analytics/login', request.url))
    }

    // If authenticated and on login page, redirect to dashboard
    if (isAuthenticated && request.nextUrl.pathname.includes('/login')) {
      return NextResponse.redirect(new URL('/analytics', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/analytics/:path*',
}
