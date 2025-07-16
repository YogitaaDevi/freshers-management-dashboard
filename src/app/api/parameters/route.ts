import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateParameterInput } from '@/types'

export async function GET() {
  try {
    const parameters = await prisma.parameter.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(parameters, { status: 200 })
  } catch (error) {
    console.error('Error fetching parameters:', error)
    return NextResponse.json(
      { error: 'Failed to fetch parameters' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Creating parameter')
    const body: CreateParameterInput = await request.json()
    
    // Validate that all required fields are present
    if (body.attitude === undefined || body.technicalSkill === undefined || 
        body.communication === undefined || body.teamwork === undefined) {
      return NextResponse.json(
        { 
          error: 'Bad Request',
          message: 'All fields (attitude, technicalSkill, communication, teamwork) are required' 
        },
        { status: 400 }
      )
    }
    
    // Validate that all scores are numbers between 0-10
    const { attitude, technicalSkill, communication, teamwork } = body
    
    if (!Number.isInteger(attitude) || attitude < 0 || attitude > 10) {
      return NextResponse.json(
        { 
          error: 'Bad Request',
          message: 'Attitude must be a number between 0 and 10' 
        },
        { status: 400 }
      )
    }
    
    if (!Number.isInteger(technicalSkill) || technicalSkill < 0 || technicalSkill > 10) {
      return NextResponse.json(
        { 
          error: 'Bad Request',
          message: 'TechnicalSkill must be a number between 0 and 10' 
        },
        { status: 400 }
      )
    }
    
    if (!Number.isInteger(communication) || communication < 0 || communication > 10) {
      return NextResponse.json(
        { 
          error: 'Bad Request',
          message: 'Communication must be a number between 0 and 10' 
        },
        { status: 400 }
      )
    }
    
    if (!Number.isInteger(teamwork) || teamwork < 0 || teamwork > 10) {
      return NextResponse.json(
        { 
          error: 'Bad Request',
          message: 'Teamwork must be a number between 0 and 10' 
        },
        { status: 400 }
      )
    }
    
    // Create new parameter
    const parameter = await prisma.parameter.create({
      data: {
        attitude,
        technicalSkill,
        communication,
        teamwork,
      }
    })
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Successfully created',
      // data: parameter
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating parameter:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to create parameter' 
      },
      { status: 500 }
    )
  }
}