export interface Employee {
  id: string
  employeeId: string
  name: string
  attitude: number
  smartness: number
  productivity: number
  communication: number
  teamwork: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateEmployeeInput {
  employeeId: string
  name: string
  attitude?: number
  smartness?: number
  productivity?: number
  communication?: number
  teamwork?: number
}

export interface UpdateEmployeeInput {
  name?: string
  attitude?: number
  smartness?: number
  productivity?: number
  communication?: number
  teamwork?: number
}

export interface EmployeeStats {
  totalEmployees: number
  averageAttitude: number
  averageSmartness: number
  averageProductivity: number
  averageCommunication: number
  averageTeamwork: number
  topPerformers: Employee[]
} 