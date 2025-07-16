'use client';

import React from 'react';

export default function GraphCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 w-full max-w-xs min-w-[220px] flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition">
      <div className="bg-gradient-to-br from-blue-400 to-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center mb-3 text-2xl font-bold shadow">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M5 12v7M9 8v11M13 16v3M17 4v15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
      <h2 className="text-lg font-semibold text-blue-700 mb-1">View Scores</h2>
      <p className="text-gray-500 text-sm text-center">Graphically view the scores of all students.</p>
    </div>
  );
} 