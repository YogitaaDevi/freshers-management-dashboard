'use client';

import React from 'react';
import { Assessment, AssessmentResult, EmployeeParameter } from '@/types';

interface AssessmentModalProps {
  assessment: Assessment;
  results: AssessmentResult[];
  parameters: EmployeeParameter[];
  onClose: () => void;
}

export default function AssessmentModal({ assessment, results, parameters, onClose }: AssessmentModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-fade-in border border-gray-700">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 text-2xl font-bold focus:outline-none transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">{assessment.topic}</h2>
        <p className="text-gray-300 mb-4">Date: {new Date(assessment.date).toLocaleDateString()}</p>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-cyan-300 mb-2">Assessment Results</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-600 rounded-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-3 py-2 text-left text-cyan-300">Employee ID</th>
                  <th className="px-3 py-2 text-left text-cyan-300">Parameter ID</th>
                  <th className="px-3 py-2 text-left text-cyan-300">Score</th>
                  <th className="px-3 py-2 text-left text-cyan-300">Created At</th>
                </tr>
              </thead>
              <tbody>
                {results.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-4 text-gray-400">No results found.</td></tr>
                ) : results.map(result => (
                  <tr key={result.id} className="border-b border-gray-600 last:border-b-0">
                    <td className="px-3 py-2 text-gray-100">{result.employeeId}</td>
                    <td className="px-3 py-2 text-gray-300">{result.parameterId}</td>
                    <td className="px-3 py-2 text-cyan-400 font-bold">{result.overallScore}</td>
                    <td className="px-3 py-2 text-gray-300">{new Date(result.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-cyan-300 mb-2">Employee Parameters</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-600 rounded-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-3 py-2 text-left text-cyan-300">Employee ID</th>
                  <th className="px-3 py-2 text-left text-cyan-300">Parameter ID</th>
                  <th className="px-3 py-2 text-left text-cyan-300">Created At</th>
                </tr>
              </thead>
              <tbody>
                {parameters.length === 0 ? (
                  <tr><td colSpan={3} className="text-center py-4 text-gray-400">No parameters found.</td></tr>
                ) : parameters.map(param => (
                  <tr key={param.id} className="border-b border-gray-600 last:border-b-0">
                    <td className="px-3 py-2 text-gray-100">{param.employeeId}</td>
                    <td className="px-3 py-2 text-gray-300">{param.parameterId}</td>
                    <td className="px-3 py-2 text-gray-300">{new Date(param.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 