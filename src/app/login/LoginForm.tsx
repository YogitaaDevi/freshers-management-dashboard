'use client';

import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { getUserCredentials } from '@/utils/auth.action';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:from-cyan-400 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? 'Logging in...' : 'Login'}
    </button>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const [formState, formAction] = useActionState(
    async (prevState, formData) => {
      const email = formData.get('username');
      const password = formData.get('password');
      if (!email || !password) {
        return { error: 'Email and password are required.', success: false };
      }
      const result = await getUserCredentials(email, password);
      if (result.success) {
        router.push('/dashboard');
        return { error: null, success: true };
      }
      return { error: result.message || 'Invalid credentials', success: false };
    },
    { error: null, success: false }
  );

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full p-3 mb-2 shadow-lg">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="url(#gradient)" />
            <text x="50%" y="55%" textAnchor="middle" fill="white" fontSize="18" fontFamily="Arial" dy=".3em">FM</text>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-tight">FreshersHub</h1>
        <p className="text-gray-300 mt-1 text-sm">Sign in to your dashboard</p>
      </div>
      <form
        className="bg-gray-700 p-8 rounded-2xl shadow-2xl border border-gray-600"
        action={formAction}
      >
        <div className="mb-5">
          <label htmlFor="username" className="block text-cyan-300 font-medium mb-2">
            Email
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-800 text-gray-100 placeholder-gray-400 transition"
            autoComplete="username"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-cyan-300 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-800 text-gray-100 placeholder-gray-400 transition"
            autoComplete="current-password"
            required
          />
        </div>
        {formState.error && (
          <div className="mb-4 text-red-400 text-sm text-center font-medium bg-red-900/30 border border-red-700 rounded py-2">
            {formState.error}
          </div>
        )}
        <SubmitButton />
      </form>
      <div className="mt-8 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Fresher Management. All rights reserved.
      </div>
    </div>
  );
} 