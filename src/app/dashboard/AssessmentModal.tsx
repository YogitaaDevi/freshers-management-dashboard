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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-blue-700 mb-2">{assessment.topic}</h2>
        <p className="text-gray-500 mb-4">Date: {new Date(assessment.date).toLocaleDateString()}</p>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Assessment Results</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border rounded-lg">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-3 py-2 text-left">Employee ID</th>
                  <th className="px-3 py-2 text-left">Parameter ID</th>
                  <th className="px-3 py-2 text-left">Score</th>
                  <th className="px-3 py-2 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {results.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-4 text-gray-400">No results found.</td></tr>
                ) : results.map(result => (
                  <tr key={result.id} className="border-b last:border-b-0">
                    <td className="px-3 py-2">{result.employeeId}</td>
                    <td className="px-3 py-2">{result.parameterId}</td>
                    <td className="px-3 py-2">{result.overallScore}</td>
                    <td className="px-3 py-2">{new Date(result.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Employee Parameters</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border rounded-lg">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-3 py-2 text-left">Employee ID</th>
                  <th className="px-3 py-2 text-left">Parameter ID</th>
                  <th className="px-3 py-2 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {parameters.length === 0 ? (
                  <tr><td colSpan={3} className="text-center py-4 text-gray-400">No parameters found.</td></tr>
                ) : parameters.map(param => (
                  <tr key={param.id} className="border-b last:border-b-0">
                    <td className="px-3 py-2">{param.employeeId}</td>
                    <td className="px-3 py-2">{param.parameterId}</td>
                    <td className="px-3 py-2">{new Date(param.createdAt).toLocaleDateString()}</td>
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