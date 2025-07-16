import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')

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

    // Verify JWT token
    const decoded = await verifyToken(token)
    
    // Return user information
    return NextResponse.json({
      success: true,
      userId: decoded.userId,
      name: decoded.name,
      email: decoded.email,
      isAdmin: decoded.isAdmin
    })

  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { 
        error: 'Unauthorized',
        message: 'Invalid or expired token' 
      },
      { status: 401 }
    )
  }
} 