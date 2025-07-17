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
      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
    >
      Logout
    </button>
  );
} 