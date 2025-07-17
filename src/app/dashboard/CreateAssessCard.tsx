'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function CreateAssessCard() {
  const router = useRouter();
  return (
    <div
      className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6 w-full max-w-xs min-w-[220px] flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
      onClick={() => router.push('/dashboard/assessment-form')}
      tabIndex={0}
      role="button"
      aria-label="Create or Assess"
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') router.push('/dashboard/assessment-form'); }}
    >
      <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-3 text-2xl font-bold shadow-lg">
        +
      </div>
      <h2 className="text-lg font-semibold text-cyan-300 mb-1">Create / Assess</h2>
      <p className="text-gray-300 text-sm text-center">Start a new assessment or create a new one.</p>
    </div>
  );
} 