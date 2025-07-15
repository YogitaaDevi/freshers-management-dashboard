import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateToken } from '@/lib/jwt'
import { verifyPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Condition 1: Check if email and password are present
    if (!email || !password) {
      return NextResponse.json(
        { 
          error: 'Unauthorized',
          message: 'Email and password are required' 
        },
        { status: 401 }
      )
    }

    // Find user by email
    const user = await prisma.employee.findUnique({
      where: { email }
    })

    // If user doesn't exist, return unauthorized
    if (!user) {
      return NextResponse.json(
        { 
          error: 'Unauthorized',
          message: 'Invalid email or password' 
        },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { 
          error: 'Unauthorized',
          message: 'Invalid email or password' 
        },
        { status: 401 }
      )
    }

    // Condition 2: Check if user is admin
    if (!user.isAdmin) {
      return NextResponse.json(
        { 
          error: 'Unauthorized',
          message: 'Admin access required' 
        },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      name: user.name,
    })

    // Return success response with token
    return NextResponse.json({
      success: true,
      message: 'Successfully logged in',
      token,
    }, { status: 200 })

  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Something went wrong' 
      },
      { status: 500 }
    )
  }
} 