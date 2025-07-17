'use client';

import React, { useEffect } from 'react';
import LoginForm from './LoginForm';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      router.replace('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Illustration Section */}
      <div className="hidden md:flex flex-1 h-full items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/60 via-white/60 to-blue-100/80 z-0" />
        <div className="relative z-10 flex flex-col items-center">
          {/* Modern Teamwork/Onboarding SVG Illustration */}
          <svg width="340" height="340" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="170" cy="170" r="170" fill="url(#paint0_linear)" />
            {/* Main person */}
            <ellipse cx="170" cy="180" rx="38" ry="50" fill="#3b82f6" fillOpacity="0.18" />
            <circle cx="170" cy="140" r="28" fill="#3b82f6" fillOpacity="0.25" />
            {/* Side persons */}
            <ellipse cx="110" cy="200" rx="22" ry="30" fill="#6366f1" fillOpacity="0.13" />
            <circle cx="110" cy="170" r="16" fill="#6366f1" fillOpacity="0.18" />
            <ellipse cx="230" cy="200" rx="22" ry="30" fill="#6366f1" fillOpacity="0.13" />
            <circle cx="230" cy="170" r="16" fill="#6366f1" fillOpacity="0.18" />
            {/* Desk/ground */}
            <ellipse cx="170" cy="250" rx="90" ry="18" fill="#e0e7ff" fillOpacity="0.5" />
            {/* Abstract folder/paper */}
            <rect x="145" y="210" width="50" height="18" rx="4" fill="#60a5fa" fillOpacity="0.18" />
            <rect x="155" y="215" width="30" height="6" rx="2" fill="#60a5fa" fillOpacity="0.28" />
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="340" y2="340" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60a5fa" />
                <stop offset="1" stopColor="#a5b4fc" />
              </linearGradient>
            </defs>
          </svg>
          <h2 className="mt-8 text-2xl font-bold text-blue-700 text-center">Fresher Management</h2>
          <p className="mt-2 text-blue-500 text-center max-w-xs">Welcome! Sign in to manage trainees, onboard new team members, and track progress with ease.</p>
        </div>
      </div>
      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 md:px-8 z-10">
        <div className="w-full max-w-md bg-white/80 rounded-2xl shadow-xl p-8 border border-blue-100 backdrop-blur-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
} 