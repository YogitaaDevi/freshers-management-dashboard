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
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Illustration Section */}
      {/* <div className="hidden md:flex flex-1 h-full">
        <img src="/login-page.png" alt="login page" className="w-full h-full object-cover" />
      </div> */}
      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 md:px-8 z-10">
        <div className="w-full max-w-md bg-gray-800/80 rounded-2xl shadow-2xl p-8 border border-gray-700 backdrop-blur-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
} 