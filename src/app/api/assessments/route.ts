import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateAssessmentInput } from '@/types'

export async function GET() {
  try {
    const assessments = await prisma.assessment.findMany({
      orderBy: {
        date: 'desc'
      }
    })
    
    return NextResponse.json(assessments)
  } catch (error) {
    console.error('Error fetching assessments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch assessments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateAssessmentInput = await request.json()
    
    // Validate required fields
    if (!body.topic || !body.date) {
      return NextResponse.json(
        { error: 'Topic and date are required' },
        { status: 400 }
      )
    }
    
    // Create new assessment
    const assessment = await prisma.assessment.create({
      data: {
        topic: body.topic,
        date: new Date(body.date),
      }
    })
    
    return NextResponse.json(assessment, { status: 201 })
  } catch (error) {
    console.error('Error creating assessment:', error)
    return NextResponse.json(
      { error: 'Failed to create assessment' },
      { status: 500 }
    )
  }
} 