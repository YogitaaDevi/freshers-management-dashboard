'use client';

import React from 'react';

interface AssessmentRow {
  id: string;
  traineeName: string;
  java: number;
  springBoot: number;
  total: number;
  date: string;
  remarks: string;
}

const dummyRows: AssessmentRow[] = [
  {
    id: '1',
    traineeName: 'Aisha Khan',
    java: 85,
    springBoot: 90,
    total: 175,
    date: '2025-07-15',
    remarks: 'On Track',
  },
  {
    id: '2',
    traineeName: 'Rahul Sharma',
    java: 78,
    springBoot: 88,
    total: 166,
    date: '2025-07-15',
    remarks: 'Needs Improvement',
  },
  {
    id: '3',
    traineeName: 'Priya Patel',
    java: 92,
    springBoot: 95,
    total: 187,
    date: '2025-07-15',
    remarks: 'Excellent',
  },
];

export default function AssessmentTableCard() {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 w-full mb-8 overflow-x-auto backdrop-blur-sm">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">Assessment Results</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-3 py-2 text-left text-cyan-300">#</th>
            <th className="px-3 py-2 text-left text-cyan-300">Trainee Name</th>
            <th className="px-3 py-2 text-left text-cyan-300">Java</th>
            <th className="px-3 py-2 text-left text-cyan-300">Spring Boot</th>
            <th className="px-3 py-2 text-left text-cyan-300">Total</th>
            <th className="px-3 py-2 text-left text-cyan-300">Date</th>
            <th className="px-3 py-2 text-left text-cyan-300">Remarks</th>
            <th className="px-3 py-2 text-left text-cyan-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyRows.map((row, idx) => (
            <tr key={row.id} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700">
              <td className="px-3 py-2 font-medium text-gray-100">{idx + 1}</td>
              <td className="px-3 py-2 text-gray-100">{row.traineeName}</td>
              <td className="px-3 py-2 text-gray-300">{row.java}</td>
              <td className="px-3 py-2 text-gray-300">{row.springBoot}</td>
              <td className="px-3 py-2 text-cyan-400 font-bold">{row.total}</td>
              <td className="px-3 py-2 text-gray-300">{row.date}</td>
              <td className="px-3 py-2 text-gray-300">{row.remarks}</td>
              <td className="px-3 py-2 flex gap-2">
                <button className="text-cyan-400 hover:text-cyan-300 transition-colors" title="Edit">✏️</button>
                <button className="text-purple-400 hover:text-purple-300 transition-colors" title="View">🧾</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 