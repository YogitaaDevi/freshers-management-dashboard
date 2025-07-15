export interface Employee {
  id: string
  name: string
  email: string
  password: string
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateEmployeeInput {
  name: string
  email: string
  password: string
  isAdmin?: boolean
}

export interface UpdateEmployeeInput {
  name?: string
  email?: string
  password?: string
  isAdmin?: boolean
}

export interface Parameter {
  id: string
  attitude: boolean
  technicalSkill: boolean
  communication: boolean
  teamwork: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateParameterInput {
  attitude?: boolean
  technicalSkill?: boolean
  communication?: boolean
  teamwork?: boolean
}

export interface Assessment {
  id: string
  topic: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

export interface CreateAssessmentInput {
  topic: string
  date: Date
}

export interface AssessmentResult {
  id: string
  employeeId: string
  assessmentId: string
  parameterId: string
  overallScore: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateAssessmentResultInput {
  employeeId: string
  assessmentId: string
  parameterId: string
  overallScore: number
}

export interface EmployeeParameter {
  id: string
  employeeId: string
  parameterId: string
  createdAt: Date
}

export interface EmployeeStats {
  totalEmployees: number
  totalAssessments: number
  totalParameters: number
  averageScore: number
  topPerformers: Employee[]
} 