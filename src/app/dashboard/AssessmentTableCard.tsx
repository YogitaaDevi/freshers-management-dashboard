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
    <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 w-full mb-8 overflow-x-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Assessment Results</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-3 py-2 text-left">#</th>
            <th className="px-3 py-2 text-left">Trainee Name</th>
            <th className="px-3 py-2 text-left">Java</th>
            <th className="px-3 py-2 text-left">Spring Boot</th>
            <th className="px-3 py-2 text-left">Total</th>
            <th className="px-3 py-2 text-left">Date</th>
            <th className="px-3 py-2 text-left">Remarks</th>
            <th className="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyRows.map((row, idx) => (
            <tr key={row.id} className="border-b last:border-b-0 hover:bg-blue-50">
              <td className="px-3 py-2 font-medium">{idx + 1}</td>
              <td className="px-3 py-2">{row.traineeName}</td>
              <td className="px-3 py-2">{row.java}</td>
              <td className="px-3 py-2">{row.springBoot}</td>
              <td className="px-3 py-2">{row.total}</td>
              <td className="px-3 py-2">{row.date}</td>
              <td className="px-3 py-2">{row.remarks}</td>
              <td className="px-3 py-2 flex gap-2">
                <button className="text-blue-600 hover:text-blue-800" title="Edit">✏️</button>
                <button className="text-blue-600 hover:text-blue-800" title="View">🧾</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 