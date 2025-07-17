'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const GraphCard: React.FC = () => {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6 w-full max-w-xs min-w-[220px] flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm" onClick={() => router.push('/dashboard/employees')}>
      <div className="bg-gradient-to-r from-purple-500 to-cyan-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-3 text-2xl font-bold shadow-lg">
        {/* Graph Icon */}
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path d="M5 12h2v7H5v-7zm6-5h2v12h-2V7zm6 8h2v4h-2v-4z" fill="currentColor"/> 
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-purple-300 mb-1">Graph</h2>
      <p className="text-gray-300 text-sm text-center">View assessment trends and analytics.</p>
    </div>
  );
};

export default GraphCard; 