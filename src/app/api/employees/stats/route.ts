import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get counts
    const totalEmployees = await prisma.employee.count()
    const totalAssessments = await prisma.assessment.count()
    const totalParameters = await prisma.parameter.count()
    
    // Get average score from assessment results
    const assessmentResults = await prisma.assessmentResult.findMany()
    const averageScore = assessmentResults.length > 0 
      ? Math.round(assessmentResults.reduce((sum: number, result: any) => sum + result.overallScore, 0) / assessmentResults.length * 10) / 10
      : 0
    
    // Get top performers (employees with highest average scores)
    const employeeScores = await prisma.assessmentResult.groupBy({
      by: ['employeeId'],
      _avg: {
        overallScore: true
      },
      _count: {
        overallScore: true
      }
    })
    
    const topPerformers = await Promise.all(
      employeeScores
        .sort((a: any, b: any) => (b._avg.overallScore || 0) - (a._avg.overallScore || 0))
        .slice(0, 5)
        .map(async (score: any) => {
          const employee = await prisma.employee.findUnique({
            where: { id: score.employeeId },
            select: {
              id: true,
              name: true,
              email: true,
              isAdmin: true,
              createdAt: true,
              updatedAt: true,
            }
          })
          return employee
        })
    )
    
    return NextResponse.json({
      totalEmployees,
      totalAssessments,
      totalParameters,
      averageScore,
      topPerformers: topPerformers.filter(Boolean)
    })
  } catch (error) {
    console.error('Error fetching employee stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch employee statistics' },
      { status: 500 }
    )
  }
} 