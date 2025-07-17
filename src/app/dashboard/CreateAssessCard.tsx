'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function CreateAssessCard() {
  const router = useRouter();
  return (
    <div
      className="bg-gradient-to-br from-blue-100 via-white to-blue-200 rounded-2xl shadow-md border border-blue-100 p-6 w-full max-w-xs min-w-[220px] flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition"
      onClick={() => router.push('/dashboard/assessment-form')}
      tabIndex={0}
      role="button"
      aria-label="Create or Assess"
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') router.push('/dashboard/assessment-form'); }}
    >
      <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-3 text-2xl font-bold shadow">
        +
      </div>
      <h2 className="text-lg font-semibold text-blue-700 mb-1">Create / Assess</h2>
      <p className="text-gray-500 text-sm text-center">Start a new assessment or create a new one.</p>
    </div>
  );
} 