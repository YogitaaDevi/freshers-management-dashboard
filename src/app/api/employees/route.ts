import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateEmployeeInput } from '@/types'
import { hashPassword } from '@/lib/auth'

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

export async function POST(request: NextRequest) {
  try {
    const body: CreateEmployeeInput = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }
    
    // Check if email already exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { email: body.email }
    })
    
    if (existingEmployee) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }
    
    // Hash password
    const hashedPassword = await hashPassword(body.password)
    
    // Create new employee
    const employee = await prisma.employee.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        isAdmin: body.isAdmin || false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password for security
      }
    })
    
    return NextResponse.json(employee, { status: 201 })
  } catch (error) {
    console.error('Error creating employee:', error)
    return NextResponse.json(
      { error: 'Failed to create employee' },
      { status: 500 }
    )
  }
} 