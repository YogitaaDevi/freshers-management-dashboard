import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AssessmentSubmissionInput, AssessmentSubmissionResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    // Verify admin access    
    const body: AssessmentSubmissionInput = await request.json()
    
    // Validate required fields
    if (!body.topic || !body.date || !body.employeeId || !body.parameters) {
      return NextResponse.json(
        { 
          error: 'Bad Request',
          message: 'Topic, date, employeeId, and parameters are required' 
        },
        { status: 400 }
      )
    }
    
    // Validate parameter scores (0-10 range)
    const { attitude, technicalSkill, communication, teamwork } = body.parameters
    if (attitude < 0 || attitude > 10 || technicalSkill < 0 || technicalSkill > 10 || 
        communication < 0 || communication > 10 || teamwork < 0 || teamwork > 10) {
      return NextResponse.json(
        { 
          error: 'Bad Request',
          message: 'All parameter scores must be between 0 and 10' 
        },
        { status: 400 }
      )
    }
    
    // Verify employee exists
    const employee = await prisma.employee.findUnique({
      where: { id: body.employeeId }
    })
    
    if (!employee) {
      return NextResponse.json(
        { 
          error: 'Not Found',
          message: 'Employee not found' 
        },
        { status: 404 }
      )
    }
    
    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create or update assessment
      let assessment
      if (body.assessmentId) {
        // Update existing assessment
        assessment = await tx.assessment.update({
          where: { id: body.assessmentId },
          data: {
            topic: body.topic,
            date: new Date(body.date)
          }
        })
      } else {
        // Create new assessment
        assessment = await tx.assessment.create({
          data: {
            topic: body.topic,
            date: new Date(body.date)
          }
        })
      }
      
      // 2. Create parameter record with scores
      const parameter = await tx.parameter.create({
        data: {
          attitude: body.parameters.attitude,
          technicalSkill: body.parameters.technicalSkill,
          communication: body.parameters.communication,
          teamwork: body.parameters.teamwork
        }
      })
      
      // 3. Calculate overall score (average of all parameters)
      const overallScore = (
        body.parameters.attitude + 
        body.parameters.technicalSkill + 
        body.parameters.communication + 
        body.parameters.teamwork
      ) / 4
      
      // 4. Create assessment result linking everything together
      const assessmentResult = await tx.assessmentResult.create({
        data: {
          employeeId: body.employeeId,
          assessmentId: assessment.id,
          parameterId: parameter.id,
          overallScore: Math.round(overallScore * 100) / 100 // Round to 2 decimal places
        }
      })
      
      // 5. Create employee-parameter relationship (if it doesn't exist)
      await tx.employeeParameter.upsert({
        where: {
          employeeId_parameterId: {
            employeeId: body.employeeId,
            parameterId: parameter.id
          }
        },
        update: {}, // No update needed if exists
        create: {
          employeeId: body.employeeId,
          parameterId: parameter.id
        }
      })
      
      return {
        assessment,
        parameter,
        assessmentResult
      }
    })
    
    // Return success response
    const response: AssessmentSubmissionResponse = {
      success: true,
      message: body.assessmentId ? 'Assessment updated successfully' : 'Assessment submitted successfully',
      data: result
    }
    
    return NextResponse.json(response, { status: 201 })
    
  } catch (error) {
    console.error('Assessment submission error:', error)
    
    // Handle specific Prisma errors
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { 
          error: 'Conflict',
          message: 'Assessment result already exists for this employee and assessment' 
        },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to submit assessment' 
      },
      { status: 500 }
    )
  }
} 