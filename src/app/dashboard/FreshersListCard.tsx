'use client';

import React from "react";
import { useRouter } from "next/navigation";

const FreshersListCard: React.FC = () => {
  const router = useRouter();
  return (
    <div
      className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6 w-full max-w-xs min-w-[220px] flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
      tabIndex={0}
      role="button"
      aria-label="View Freshers"
      onClick={() => router.push('/dashboard/freshers')}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') router.push('/dashboard/freshers'); }}
    >
      <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-3 text-2xl font-bold shadow-lg">
        {/* User/Group Icon */}
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-cyan-300 mb-1">Freshers</h2>
      <p className="text-gray-300 text-sm text-center">View the list of all freshers and their details.</p>
    </div>
  );
};

export default FreshersListCard; 