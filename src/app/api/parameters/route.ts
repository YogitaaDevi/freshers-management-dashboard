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
    
    return NextResponse.json(parameters)
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
    const body: CreateParameterInput = await request.json()
    
    // Create new parameter
    const parameter = await prisma.parameter.create({
      data: {
        attitude: body.attitude ?? true,
        technicalSkill: body.technicalSkill ?? true,
        communication: body.communication ?? true,
        teamwork: body.teamwork ?? false,
      }
    })
    
    return NextResponse.json(parameter, { status: 201 })
  } catch (error) {
    console.error('Error creating parameter:', error)
    return NextResponse.json(
      { error: 'Failed to create parameter' },
      { status: 500 }
    )
  }
} 