'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import AssessmentForm from '@/components/AssessmentForm'
import { EmployeeForFrontend } from '@/types'
import Cookies from 'js-cookie'
import CommonHeader from '@/components/CommonHeader'

export default function DashboardPage() {
  const [employees, setEmployees] = useState<EmployeeForFrontend[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const token = Cookies.get('authToken')
      if (!token) {
        setError('No authentication token found')
        setLoading(false)
        return
      }

      const response = await fetch('/api/employees/list', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setEmployees(data)
      } else {
        setError('Failed to fetch employees')
      }
    } catch (error) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl  mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading employees...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="bg-red-100 text-red-700 p-4 rounded-md max-w-md mx-auto">
              <p className="font-medium">Error: {error}</p>
              <button 
                onClick={fetchEmployees}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 mx-auto px-4 py-8">
        <CommonHeader title="Assessment Management" subtitle="Submit and manage fresher assessments" />
        <AssessmentForm employees={employees} />
      </div>
    </Layout>
  );
} 