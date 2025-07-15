import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt'

// Define public routes that don't require authentication
const publicRoutes = [
  '/api/auth/signin',
  '/api/auth/admin-login',
  '/api/signin',
  '/api/health',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes without authentication
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check if it's an API route that needs authentication
  if (pathname.startsWith('/api/')) {
    const authHeader = request.headers.get('authorization')

    // Check if Authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { 
          error: 'Unauthorized',
          message: 'Missing or invalid token' 
        },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]

    try {
      // Verify JWT token
      const decoded = verifyToken(token)
      
      // Add user info to headers for API routes to access
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', decoded.userId)
      requestHeaders.set('x-user-email', decoded.email)
      requestHeaders.set('x-user-is-admin', decoded.isAdmin.toString())
      requestHeaders.set('x-user-name', decoded.name)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      return NextResponse.json(
        { 
          error: 'Unauthorized',
          message: 'Invalid or expired token' 
        },
        { status: 401 }
      )
    }
  }

  // For non-API routes, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 