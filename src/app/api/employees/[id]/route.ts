import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UpdateEmployeeInput, EmployeeWithDetails } from '@/types'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: params.id },
      include: {
        employeeParameters: {
          include: {
            parameter: true
          }
        },
        assessmentResults: {
          include: {
            assessment: true,
            parameter: true
          }
        }
      }
    })
    
    if (!employee) {
      return NextResponse.json(
        { error: 'Employee not exist' },
        { status: 404 }
      )
    }
    
    // Transform the data to exclude password and structure it better
    const { password, employeeParameters, assessmentResults, ...employeeData } = employee
    
    // Extract unique parameters (handle empty arrays)
    const parameters = employeeParameters?.map(ep => ({
      ...ep.parameter,
      createdAt: ep.parameter.createdAt.toISOString(),
      updatedAt: ep.parameter.updatedAt.toISOString()
    })) || []
    
    // Extract assessment results with overall scores (handle empty arrays)
    const assessmentResultsData = assessmentResults?.map(ar => ({
      overallScore: ar.overallScore
    })) || []
    
    // Extract unique assessments (handle empty arrays)
    const assessments = assessmentResults?.map(ar => ({
      ...ar.assessment,
      date: ar.assessment.date.toISOString(),
      createdAt: ar.assessment.createdAt.toISOString(),
      updatedAt: ar.assessment.updatedAt.toISOString()
    })) || []
    
    const response: EmployeeWithDetails = {
      ...employeeData,
      createdAt: employeeData.createdAt.toISOString(),
      updatedAt: employeeData.updatedAt.toISOString(),
      assessmentResults: assessmentResultsData,
      parameters: parameters,
      assessment: assessments
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching employee:', error)
    return NextResponse.json(
      { error: 'Failed to fetch employee' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateEmployeeInput = await request.json()
    
    const employee = await prisma.employee.update({
      where: { id: params.id },
      data: body
    })
    
    return NextResponse.json(employee)
  } catch (error) {
    console.error('Error updating employee:', error)
    return NextResponse.json(
      { error: 'Failed to update employee' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.employee.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ message: 'Employee deleted successfully' })
  } catch (error) {
    console.error('Error deleting employee:', error)
    return NextResponse.json(
      { error: 'Failed to delete employee' },
      { status: 500 }
    )
  }
} 