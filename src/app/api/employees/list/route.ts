import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-utils'

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const employees = await prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true
      },
      orderBy: {
        name: 'asc'
      }
    })
    
    return NextResponse.json(employees)
  } catch (error) {
    console.error('Error fetching employees:', error)
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    )
  }
} 