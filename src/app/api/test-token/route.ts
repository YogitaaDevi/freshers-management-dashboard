import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    console.log('Testing token:', token)
    
    const decoded = await verifyToken(token)
    
    return NextResponse.json({
      success: true,
      decoded,
      message: 'Token is valid'
    })
  } catch (error) {
    console.error('Token test error:', error)
    return NextResponse.json(
      { 
        error: 'Token verification failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 401 }
    )
  }
} 