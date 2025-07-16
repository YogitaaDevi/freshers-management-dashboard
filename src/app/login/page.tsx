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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <LoginForm />
    </div>
  );
} 