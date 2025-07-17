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
  attitude: number | null
  technicalSkill: number | null
  communication: number | null
  teamwork: number | null
  createdAt: string
  updatedAt: string
}

export interface CreateParameterInput {
  attitude: number
  technicalSkill: number
  communication: number
  teamwork: number
}

export interface Assessment {
  id: string;
  topic: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssessmentInput {
  topic: string
  date: Date
}

export interface AssessmentResult {
  id: string;
  employeeId: string;
  assessmentId: string;
  parameterId: string;
  overallScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssessmentResultInput {
  employeeId: string
  assessmentId: string
  parameterId: string
  overallScore: number
}

export interface EmployeeParameter {
  id: string;
  employeeId: string;
  parameterId: string;
  createdAt: string;
}

export interface EmployeeStats {
  totalEmployees: number
  totalAssessments: number
  totalParameters: number
  averageScore: number
  topPerformers: Employee[]
}

// New interface for comprehensive assessment submission
export interface AssessmentSubmissionInput {
  assessmentId?: string  // Optional: if provided, update existing assessment
  topic: string
  date: Date
  employeeId: string
  parameters: {
    attitude: number
    technicalSkill: number
    communication: number
    teamwork: number
  }
}

export interface AssessmentSubmissionResponse {
  success: boolean
  message: string
  data: {
    assessment: Assessment
    parameter: Parameter
    assessmentResult: AssessmentResult
  }
}

// Frontend Employee interface (without sensitive data)
export interface EmployeeForFrontend {
  id: string
  name: string
  email: string
  isAdmin: boolean
}

// Enhanced Employee interface with assessments and parameters
export interface EmployeeWithDetails {
  id: string
  name: string
  email: string
  isAdmin: boolean
  createdAt: string
  updatedAt: string
  assessmentResults: {
    overallScore: number
  }[]
  parameters: Parameter[]
  assessment: Assessment[]
}