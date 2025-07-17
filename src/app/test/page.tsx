'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'

export default function TestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testToken = async () => {
    setLoading(true)
    try {
      const token = Cookies.get('authToken')
      if (!token) {
        setResult({ error: 'No token found in Cookie' })
        return
      }

      const response = await fetch('/api/test-token', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Network error', details: error })
    } finally {
      setLoading(false)
    }
  }

  const testEmployees = async () => {
    setLoading(true)
    try {
      const token = Cookies.get('authToken')
      if (!token) {
        setResult({ error: 'No token found in rage' })
        return
      }

      const response = await fetch('/api/employees/list', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      setResult({ status: response.status, data })
    } catch (error) {
      setResult({ error: 'Network error', details: error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <button 
            onClick={testToken}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Test Token
          </button>
          <button 
            onClick={testEmployees}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Test Employees API
          </button>
        </div>

        {loading && <div>Loading...</div>}

        {result && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
} 