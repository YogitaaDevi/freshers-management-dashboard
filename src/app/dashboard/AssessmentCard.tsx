'use client';

import React from 'react';
import { Assessment } from '@/types';

interface AssessmentCardProps {
  assessment: Assessment;
  onClick: () => void;
}

export default function AssessmentCard({ assessment, onClick }: AssessmentCardProps) {
  return (
    <div
      className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-700 p-6 cursor-pointer transition-all duration-300 flex flex-col gap-2 min-w-[220px] max-w-xs w-full backdrop-blur-sm hover:border-cyan-500/50"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for assessment: ${assessment.topic}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg">
          {assessment.topic.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-100 truncate">{assessment.topic}</h2>
          <p className="text-xs text-gray-400">{new Date(assessment.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex-1" />
      <div className="flex justify-end">
        <span className="text-cyan-400 text-xs font-medium hover:text-cyan-300 hover:underline transition-colors">View Details</span>
      </div>
    </div>
  );
} 