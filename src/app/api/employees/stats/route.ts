import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Employee } from '@/types'

export async function GET() {
  try {
    // Get all employees
    const employees = await prisma.employee.findMany()
    
    if (employees.length === 0) {
      return NextResponse.json({
        totalEmployees: 0,
        averageAttitude: 0,
        averageSmartness: 0,
        averageProductivity: 0,
        averageCommunication: 0,
        averageTeamwork: 0,
        topPerformers: []
      })
    }
    
    // Calculate averages
    const totalEmployees = employees.length
    const averageAttitude = Math.round(
      employees.reduce((sum: number, emp: Employee) => sum + emp.attitude, 0) / totalEmployees
    )
    const averageSmartness = Math.round(
      employees.reduce((sum: number, emp: Employee) => sum + emp.smartness, 0) / totalEmployees
    )
    const averageProductivity = Math.round(
      employees.reduce((sum: number, emp: Employee) => sum + emp.productivity, 0) / totalEmployees
    )
    const averageCommunication = Math.round(
      employees.reduce((sum: number, emp: Employee) => sum + emp.communication, 0) / totalEmployees
    )
    const averageTeamwork = Math.round(
      employees.reduce((sum: number, emp: Employee) => sum + emp.teamwork, 0) / totalEmployees
    )
    
    // Get top performers (employees with highest overall score)
    const topPerformers = employees
      .map((emp: Employee) => ({
        ...emp,
        overallScore: (emp.attitude + emp.smartness + emp.productivity + emp.communication + emp.teamwork) / 5
      }))
      .sort((a: Employee & { overallScore: number }, b: Employee & { overallScore: number }) => b.overallScore - a.overallScore)
      .slice(0, 5)
      .map(({ overallScore, ...emp }: Employee & { overallScore: number }) => emp)
    
    return NextResponse.json({
      totalEmployees,
      averageAttitude,
      averageSmartness,
      averageProductivity,
      averageCommunication,
      averageTeamwork,
      topPerformers
    })
  } catch (error) {
    console.error('Error fetching employee stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch employee statistics' },
      { status: 500 }
    )
  }
} 