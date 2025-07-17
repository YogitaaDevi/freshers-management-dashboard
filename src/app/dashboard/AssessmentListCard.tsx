'use client';

import React, { useState } from "react";

interface AssessmentListCardProps {
  results: Array<{
    trainee: string;
    scores: Record<string, number>;
    total: number;
    assignedBy: string;
  }>;
  topics: string[];
}

const AssessmentListCard: React.FC<AssessmentListCardProps> = ({ results, topics }) => {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const sortedResults = [...results].sort((a, b) =>
    sortOrder === 'desc' ? b.total - a.total : a.total - b.total
  );

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-5xl mx-auto mb-8 border-2 border-gray-700 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="block text-sm font-semibold text-cyan-300">Leadership Board</span>
        <button
          onClick={handleSortToggle}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-600 bg-gray-700 hover:bg-gray-600 text-cyan-300 text-xs font-semibold shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Toggle sort order"
        >
          <svg
            className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? '' : 'rotate-180'}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
          {sortOrder === 'desc' ? 'Highest First' : 'Lowest First'}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider">Trainee</th>
              {topics.map((topic) => (
                <th key={topic} className="px-4 py-2 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider">{topic}</th>
              ))}
              <th className="px-4 py-2 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider">Total</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider">Assigned By</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {sortedResults.length === 0 ? (
              <tr><td colSpan={topics.length + 3} className="text-center py-4 text-gray-400">No assessment results found.</td></tr>
            ) : sortedResults.map((row, idx) => (
              <tr key={row.trainee + idx} className="hover:bg-gray-700 transition-colors">
                <td className="px-4 py-2 text-sm text-gray-100 font-medium">{row.trainee}</td>
                {topics.map((topic) => (
                  <td key={topic} className="px-4 py-2 text-sm text-gray-300">{row.scores[topic] !== undefined ? row.scores[topic] : '-'}</td>
                ))}
                <td className="px-4 py-2 text-sm text-cyan-400 font-bold">{row.total}</td>
                <td className="px-4 py-2 text-sm text-gray-300">{row.assignedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssessmentListCard; 