'use client';

import React from 'react';
import AssessmentListCard from './AssessmentListCard';
import CreateAssessCard from './CreateAssessCard';
import GraphCard from './GraphCard';
import FreshersListCard from './FreshersListCard';

interface TableRow {
  trainee: string;
  scores: Record<string, number>;
  total: number;
  assignedBy: string;
}

function StatModal({ open, onClose, title, children }: { open: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-all">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold text-blue-800 mb-4">{title}</h3>
        <div className="max-h-[60vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function DashboardClient({ tableData, topics, results }: { tableData: TableRow[], topics: string[], results: any[] }) {
  const summaryStats = [
    { label: 'Total Trainees', value: tableData.length },
    { label: 'Topics', value: topics.length },
    { label: 'Assessments', value: results.length },
  ];
  const traineesList = tableData.map(t => t.trainee);
  const topicsList = topics;
  const assessmentsList = results.map(r => ({
    trainee: r.employee?.name,
    topic: r.assessment?.topic,
    date: r.assessment?.date ? new Date(r.assessment.date).toLocaleDateString() : '-',
    score: r.overallScore
  }));
  const [modal, setModal] = React.useState<null | 'trainees' | 'topics' | 'assessments'>(null);
  return (
    <>
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-1 tracking-tight">Welcome to the Dashboard</h2>
          <p className="text-gray-500 text-base md:text-lg">Track trainee progress, manage assessments, and view analytics at a glance.</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button
            className="bg-white rounded-xl shadow border border-blue-100 px-6 py-3 flex flex-col items-center min-w-[120px] hover:bg-blue-50 transition cursor-pointer"
            onClick={() => setModal('trainees')}
          >
            <span className="text-2xl font-bold text-blue-700">{tableData.length}</span>
            <span className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">Total Trainees</span>
          </button>
          <button
            className="bg-white rounded-xl shadow border border-blue-100 px-6 py-3 flex flex-col items-center min-w-[120px] hover:bg-blue-50 transition cursor-pointer"
            onClick={() => setModal('topics')}
          >
            <span className="text-2xl font-bold text-blue-700">{topics.length}</span>
            <span className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">Topics</span>
          </button>
          <button
            className="bg-white rounded-xl shadow border border-blue-100 px-6 py-3 flex flex-col items-center min-w-[120px] hover:bg-blue-50 transition cursor-pointer"
            onClick={() => setModal('assessments')}
          >
            <span className="text-2xl font-bold text-blue-700">{results.length}</span>
            <span className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">Assessments</span>
          </button>
        </div>
      </div>
      {/* Modals for details */}
      <StatModal open={modal === 'trainees'} onClose={() => setModal(null)} title="Trainees List">
        <ul className="divide-y divide-blue-50">
          {traineesList.map((name, idx) => (
            <li key={name + idx} className="py-2 px-1 text-blue-900 font-medium flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">{idx + 1}</span>
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </StatModal>
      <StatModal open={modal === 'topics'} onClose={() => setModal(null)} title="Assessment Topics">
        <ul className="divide-y divide-blue-50">
          {topicsList.map((topic, idx) => (
            <li key={topic + idx} className="py-2 px-1 text-blue-900 font-medium flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">{idx + 1}</span>
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </StatModal>
      <StatModal open={modal === 'assessments'} onClose={() => setModal(null)} title="Assessment Details">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-3 py-2 text-left font-semibold text-blue-700">Trainee</th>
                <th className="px-3 py-2 text-left font-semibold text-blue-700">Topic</th>
                <th className="px-3 py-2 text-left font-semibold text-blue-700">Date</th>
                <th className="px-3 py-2 text-left font-semibold text-blue-700">Score</th>
              </tr>
            </thead>
            <tbody>
              {assessmentsList.map((a, idx) => (
                <tr key={a.trainee + a.topic + idx} className="even:bg-blue-50/40">
                  <td className="px-3 py-2 text-blue-900">{a.trainee}</td>
                  <td className="px-3 py-2 text-blue-900">{a.topic}</td>
                  <td className="px-3 py-2 text-blue-900">{a.date}</td>
                  <td className="px-3 py-2 text-blue-900">{a.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StatModal>
    </>
  );
} 