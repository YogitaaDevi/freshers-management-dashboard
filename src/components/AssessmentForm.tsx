'use client'

import React, { useState } from 'react'
import { EmployeeForFrontend } from '@/types'
import Cookies from 'js-cookie'

interface AssessmentFormData {
  assessmentId?: string
  topic: string
  date: string
  employeeId: string
  parameters: {
    attitude: number
    technicalSkill: number
    communication: number
    teamwork: number
  }
}

interface AssessmentFormProps {
  employees: EmployeeForFrontend[]
}

export default function AssessmentForm({ employees }: AssessmentFormProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  const [formData, setFormData] = useState<AssessmentFormData>({
    topic: '',
    date: new Date().toISOString().split('T')[0],
    employeeId: '',
    parameters: {
      attitude: 5,
      technicalSkill: 5,
      communication: 5,
      teamwork: 5
    }
  })

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('parameters.')) {
      const paramField = field.split('.')[1]
      setFormData(prev => ({
        ...prev,
        parameters: {
          ...prev.parameters,
          [paramField]: parseInt(value) || 0
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const token = Cookies.get('authToken')
      const response = await fetch('/api/assessments/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString()
        })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message })
        // Reset form
        setFormData({
          topic: '',
          date: new Date().toISOString().split('T')[0],
          employeeId: '',
          parameters: {
            attitude: 5,
            technicalSkill: 5,
            communication: 5,
            teamwork: 5
          }
        })
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to submit assessment' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error occurred' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit Assessment</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Assessment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assessment Topic *
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => handleInputChange('topic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assessment Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Employee Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employee *
          </label>
          <select
            value={formData.employeeId}
            onChange={(e) => handleInputChange('employeeId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select an employee</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>
                {employee.name} ({employee.email})
              </option>
            ))}
          </select>
        </div>

        {/* Parameters */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Assessment Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formData.parameters).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} *
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={value}
                  onChange={(e) => handleInputChange(`parameters.${key}`, e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span className="font-medium">{value}/10</span>
                  <span>10</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Score Display */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Overall Score</h4>
          <div className="text-2xl font-bold text-blue-600">
            {((formData.parameters.attitude + formData.parameters.technicalSkill + 
               formData.parameters.communication + formData.parameters.teamwork) / 4).toFixed(1)}/10
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Assessment'}
        </button>
      </form>
    </div>
  )
} 