'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface User {
  name: string
  email: string
}

interface HeaderProps {
  user?: User
}

export default function Header({ user }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    // Clear token from rage
    Cookies.remove('authToken')
    // Redirect to login page
    router.push('/login')
  }

  return (
    <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 shadow-2xl border-b border-gray-700 backdrop-blur-sm relative z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                {/* Logo Icon */}
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center cursor-pointer shadow-lg hover:shadow-cyan-500/25 transition-all duration-300" onClick={() => router.push('/dashboard')}>
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                    />
                  </svg>
                </div>
                {/* Brand Name */}
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">FreshersHub</h1>
                  <p className="text-sm text-gray-300">Dashboard</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900"
            >
              {/* Profile Avatar */}
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-medium text-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              {/* Dropdown Arrow */}
              <svg
                className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${
                  isProfileOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-2xl py-1 z-[9999] border border-gray-700 backdrop-blur-sm">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm font-medium text-cyan-300">
                    {user?.name || 'User Name'}
                  </p>
                  <p className="text-sm text-gray-400 truncate">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors duration-150"
                  >
                    <svg
                      className="w-4 h-4 mr-3 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 