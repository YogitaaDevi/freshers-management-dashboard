'use client';

import React from "react";

const dummyAssessments = [
  {
    id: 1,
    trainee: "Aarav Sharma",
    java: 85,
    springboot: 78,
    hibernate: 80,
    jdbc: 75,
    total: 318,
    assignedBy: "Mentor A",
  },
  {
    id: 2,
    trainee: "Priya Singh",
    java: 90,
    springboot: 82,
    hibernate: 88,
    jdbc: 80,
    total: 340,
    assignedBy: "Mentor B",
  },
  {
    id: 3,
    trainee: "Rahul Verma",
    java: 70,
    springboot: 65,
    hibernate: 72,
    jdbc: 68,
    total: 275,
    assignedBy: "Mentor A",
  },
  {
    id: 4,
    trainee: "Sneha Patel",
    java: 95,
    springboot: 90,
    hibernate: 92,
    jdbc: 88,
    total: 365,
    assignedBy: "Mentor C",
  },
];

const AssessmentListCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-5xl mx-auto mb-8 border-2 border-blue-200">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Leadership Board</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Trainee</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Java</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Spring Boot</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Hibernate</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">JDBC</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Total</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Assigned By</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-50">
            {dummyAssessments.map((assessment) => (
              <tr key={assessment.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-4 py-2 text-sm text-blue-900 font-medium">{assessment.trainee}</td>
                <td className="px-4 py-2 text-sm text-blue-900">{assessment.java}</td>
                <td className="px-4 py-2 text-sm text-blue-900">{assessment.springboot}</td>
                <td className="px-4 py-2 text-sm text-blue-900">{assessment.hibernate}</td>
                <td className="px-4 py-2 text-sm text-blue-900">{assessment.jdbc}</td>
                <td className="px-4 py-2 text-sm text-blue-900 font-bold">{assessment.total}</td>
                <td className="px-4 py-2 text-sm text-blue-900">{assessment.assignedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssessmentListCard; 