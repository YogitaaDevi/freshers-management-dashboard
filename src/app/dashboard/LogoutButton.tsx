'use client';

import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove('authToken');
    Cookies.remove('isAdmin');
    router.push('/login');
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      Logout
    </button>
  );
} 