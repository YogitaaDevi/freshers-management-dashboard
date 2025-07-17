import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateAssessmentResultInput } from '@/types'

export async function GET() {
  try {
    const assessmentResults = await prisma.assessmentResult.findMany({
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        assessment: {
          select: {
            id: true,
            topic: true,
            date: true,
          }
        },
        parameter: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(assessmentResults)
  } catch (error) {
    console.error('Error fetching assessment results:', error)
    return NextResponse.json(
      { error: 'Failed to fetch assessment results' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateAssessmentResultInput = await request.json()
    
    // Validate required fields
    if (!body.employeeId || !body.assessmentId || !body.parameterId || body.overallScore === undefined) {
      return NextResponse.json(
        { error: 'Employee ID, assessment ID, parameter ID, and overall score are required' },
        { status: 400 }
      )
    }
    
    // Check if result already exists
    const existingResult = await prisma.assessmentResult.findUnique({
      where: {
        employeeId_assessmentId_parameterId: {
          employeeId: body.employeeId,
          assessmentId: body.assessmentId,
          parameterId: body.parameterId,
        }
      }
    })
    
    if (existingResult) {
      return NextResponse.json(
        { error: 'Assessment result already exists for this employee, assessment, and parameter combination' },
        { status: 409 }
      )
    }
    
    // Create new assessment result
    const assessmentResult = await prisma.assessmentResult.create({
      data: {
        employeeId: body.employeeId,
        assessmentId: body.assessmentId,
        parameterId: body.parameterId,
        overallScore: body.overallScore,
      },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        assessment: {
          select: {
            id: true,
            topic: true,
            date: true,
          }
        },
        parameter: true,
      }
    })
    
    return NextResponse.json(assessmentResult, { status: 201 })
  } catch (error) {
    console.error('Error creating assessment result:', error)
    return NextResponse.json(
      { error: 'Failed to create assessment result' },
      { status: 500 }
    )
  }
} 