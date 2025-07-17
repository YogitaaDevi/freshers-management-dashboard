import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt'

// Define public routes that don't require authentication
const publicRoutes = [
  '/api/auth/signin',
  '/api/auth/admin-login',
  '/api/signin',
  '/api/health',
  '/api/auth/verify',
  '/api/test-token',
  '/test',
  '/login',
  '/',
]

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/api/employees',
  '/api/assessment-form',
  '/api/parameters',
  '/api/assessment-results',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log('🔍 Middleware called for path:', pathname)

  // Check if it's a protected API route
  if (pathname.startsWith('/api/employees') || 
      pathname.startsWith('/api/assessments') || 
      pathname.startsWith('/api/parameters') || 
      pathname.startsWith('/api/assessment-results')) {
    
    console.log('🔐 Processing protected API route:', pathname)
    const authHeader = request.headers.get('authorization')
    console.log('🔑 Auth header present:', !!authHeader)

    // Check if Authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ No valid auth header found')
      return NextResponse.json(
        { 
          error: 'Unauthorized',
          message: 'Missing or invalid token' 
        },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    console.log('🎫 Token extracted, length:', token.length)

    try {
      // Verify JWT token
      const decoded = await verifyToken(token)
      console.log('✅ Token verified successfully:', decoded)
      
      // Add user info to headers for API routes to access
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', decoded.userId)
      requestHeaders.set('x-user-email', decoded.email)
      requestHeaders.set('x-user-is-admin', decoded.isAdmin.toString())
      requestHeaders.set('x-user-name', decoded.name)

      console.log('📋 Headers set, proceeding with request')
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      console.log('❌ Token verification failed:', error)
      return NextResponse.json(
        { 
          error: 'Unauthorized',
          message: 'Invalid or expired token' 
        },
        { status: 401 }
      )
    }
  }

  // Allow public routes without authentication
  const isPublicRoute = publicRoutes.some(route => {
    // For exact matches
    if (pathname === route) return true
    // For routes that should match subpaths (like /api/auth/*)
    if (route.startsWith('/api/auth/') && pathname.startsWith(route)) return true
    // For other public routes
    if (pathname.startsWith(route)) return true
    return false
  })
  
  console.log('🔍 Checking public routes:', { pathname, publicRoutes, isPublicRoute })
  
  if (isPublicRoute) {
    console.log('✅ Public route, allowing access')
    return NextResponse.next()
  }

  // Check if it's a protected route (more comprehensive matching)
  const isProtectedRoute = protectedRoutes.some(route => {
    // For exact matches
    if (pathname === route) return true
    // For API routes with parameters (like /api/employees/[id])
    if (route.startsWith('/api/') && pathname.startsWith(route)) return true
    // For dashboard routes
    if (route === '/dashboard' && pathname.startsWith('/dashboard')) return true
    return false
  })
  console.log('🛡️ Checking protected routes:', { pathname, protectedRoutes, isProtectedRoute })

  if (isProtectedRoute) {
    // For API routes, check Authorization header
    if (pathname.startsWith('/api/')) {
      console.log('🔐 Processing API route:', pathname)
      const authHeader = request.headers.get('authorization')
      console.log('🔑 Auth header present:', !!authHeader)

      // Check if Authorization header is present
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('❌ No valid auth header found')
        return NextResponse.json(
          { 
            error: 'Unauthorized',
            message: 'Missing or invalid token' 
          },
          { status: 401 }
        )
      }

      const token = authHeader.split(' ')[1]
      console.log('🎫 Token extracted, length:', token.length)

      try {
        // Verify JWT token
        const decoded = await verifyToken(token)
        console.log('✅ Token verified successfully:', decoded)
        
        // Add user info to headers for API routes to access
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-user-id', decoded.userId)
        requestHeaders.set('x-user-email', decoded.email)
        requestHeaders.set('x-user-is-admin', decoded.isAdmin.toString())
        requestHeaders.set('x-user-name', decoded.name)

        console.log('📋 Headers set, proceeding with request')
        console.log('📋 Headers set:', {
          'x-user-id': decoded.userId,
          'x-user-email': decoded.email,
          'x-user-is-admin': decoded.isAdmin.toString(),
          'x-user-name': decoded.name
        })

        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        })
      } catch (error) {
        console.log('❌ Token verification failed:', error)
        return NextResponse.json(
          { 
            error: 'Unauthorized',
            message: 'Invalid or expired token' 
          },
          { status: 401 }
        )
      }
    } else {
      // For non-API protected routes (like dashboard), redirect to login if no token
      // Note: We can't access rage in middleware, so we'll let the client-side handle this
      // The Layout component will handle the authentication check
      console.log('🌐 Non-API protected route, letting client handle auth')
      return NextResponse.next()
    }
  }

  // For non-protected routes, continue normally
  console.log('➡️ Non-protected route, allowing access')
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