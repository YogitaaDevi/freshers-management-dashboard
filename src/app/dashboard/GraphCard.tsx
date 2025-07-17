'use client';

import React from 'react';

const GraphCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-200 rounded-2xl shadow-md border border-blue-100 p-6 w-full max-w-xs min-w-[220px] flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition">
      <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-3 text-2xl font-bold shadow">
        {/* Graph Icon */}
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path d="M5 12h2v7H5v-7zm6-5h2v12h-2V7zm6 8h2v4h-2v-4z" fill="currentColor"/>
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-blue-700 mb-1">Graph</h2>
      <p className="text-gray-500 text-sm text-center">View assessment trends and analytics.</p>
    </div>
  );
};

export default GraphCard; 