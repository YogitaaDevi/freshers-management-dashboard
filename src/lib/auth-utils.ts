import { NextRequest } from 'next/server'
import { JWTPayload } from './jwt'

export function getCurrentUser(request: NextRequest): JWTPayload | null {
  try {
    const userId = request.headers.get('x-user-id')
    const email = request.headers.get('x-user-email')
    const isAdmin = request.headers.get('x-user-is-admin')
    const name = request.headers.get('x-user-name')

    if (!userId || !email || !isAdmin || !name) {
      return null
    }

    return {
      userId,
      email,
      isAdmin: isAdmin === 'true',
      name,
    }
  } catch (error) {
    return null
  }
}

export function requireAuth(request: NextRequest): JWTPayload {
  const user = getCurrentUser(request)
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}

export function requireAdmin(request: NextRequest): JWTPayload {
  const user = requireAuth(request)
  if (!user.isAdmin) {
    throw new Error('Admin access required')
  }
  return user
} 