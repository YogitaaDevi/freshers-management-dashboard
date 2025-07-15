import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateEmployeeInput } from '@/types'

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: {
        createdAt: 'desc'
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
    if (!body.employeeId || !body.name) {
      return NextResponse.json(
        { error: 'Employee ID and name are required' },
        { status: 400 }
      )
    }
    
    // Check if employee ID already exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { employeeId: body.employeeId }
    })
    
    if (existingEmployee) {
      return NextResponse.json(
        { error: 'Employee ID already exists' },
        { status: 409 }
      )
    }
    
    // Create new employee
    const employee = await prisma.employee.create({
      data: {
        employeeId: body.employeeId,
        name: body.name,
        attitude: body.attitude || 0,
        smartness: body.smartness || 0,
        productivity: body.productivity || 0,
        communication: body.communication || 0,
        teamwork: body.teamwork || 0,
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