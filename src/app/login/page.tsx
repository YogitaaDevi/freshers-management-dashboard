'use client';

import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

// Dummy hashed password for 'madan@yopmail.com' (for example purposes only)
const DUMMY_HASHED_PASSWORD = '$2b$10$dummyhashedpasswordstring'; // Replace with your actual hash if needed

function hashPassword(password) {
  // Dummy hash function for demonstration (replace with real hash in production)
  // For now, just compare plain text for the dummy check
  return password;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? 'Logging in...' : 'Login'}
    </button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [formState, formAction] = useActionState(
    async (prevState, formData) => {
      const username = formData.get('username');
      const password = formData.get('password');
      // Dummy check for credentials
      if (
        username === 'madan@yopmail.com' &&
        hashPassword(password) === 'madan@123' // Replace with DUMMY_HASHED_PASSWORD for real hash check
      ) {
        // Redirect to dashboard
        router.push('/dashboard');
        return { error: null, success: true };
      }
      return { error: 'Invalid username or password.', success: false };
    },
    { error: null, success: false }
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 rounded-full p-3 mb-2 shadow-lg">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#2563EB" />
              <text x="50%" y="55%" textAnchor="middle" fill="white" fontSize="18" fontFamily="Arial" dy=".3em">FM</text>
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Fresher Management</h1>
          <p className="text-gray-500 mt-1 text-sm">Sign in to your dashboard</p>
        </div>
        <form
          className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100"
          action={formAction}
        >
          <div className="mb-5">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              autoComplete="username"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              autoComplete="current-password"
              required
            />
          </div>
          {formState.error && (
            <div className="mb-4 text-red-500 text-sm text-center font-medium bg-red-50 border border-red-200 rounded py-2">
              {formState.error}
            </div>
          )}
          <SubmitButton />
        </form>
        <div className="mt-8 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Fresher Management. All rights reserved.
        </div>
      </div>
    </div>
  );
} 