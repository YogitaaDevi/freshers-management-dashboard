"use client";

import React, { useState, useEffect } from "react";
import AssessmentCard from "./AssessmentCard";
import AssessmentModal from "./AssessmentModal";
import { Assessment, AssessmentResult, EmployeeParameter } from "@/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

// Dummy data for demonstration
const dummyAssessments: Assessment[] = [
  {
    id: "1",
    topic: "Technical Skills",
    date: "2024-07-01",
    createdAt: "2024-07-01",
    updatedAt: "2024-07-01",
  },
  {
    id: "2",
    topic: "Communication",
    date: "2024-07-02",
    createdAt: "2024-07-02",
    updatedAt: "2024-07-02",
  },
  {
    id: "3",
    topic: "Teamwork",
    date: "2024-07-03",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
  },
];

const dummyResults: AssessmentResult[] = [
  {
    id: "r1",
    employeeId: "E001",
    assessmentId: "1",
    parameterId: "P001",
    overallScore: 85,
    createdAt: "2024-07-01",
    updatedAt: "2024-07-01",
  },
  {
    id: "r2",
    employeeId: "E002",
    assessmentId: "1",
    parameterId: "P002",
    overallScore: 90,
    createdAt: "2024-07-01",
    updatedAt: "2024-07-01",
  },
];

const dummyParameters: EmployeeParameter[] = [
  {
    id: "ep1",
    employeeId: "E001",
    parameterId: "P001",
    createdAt: "2024-07-01",
  },
  {
    id: "ep2",
    employeeId: "E002",
    parameterId: "P002",
    createdAt: "2024-07-01",
  },
];

export default function DashboardPage() {
  const [selected, setSelected] = useState<Assessment | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      router.replace("/login");
      setIsAuthChecked(true);
      setIsAuthenticated(false);
    } else {
      setIsAuthChecked(true);
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthChecked) {
    // Optionally, show a loader here
    return null;
  }
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-blue-700">
              Assessments
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {dummyAssessments.map((assessment) => (
              <AssessmentCard
                key={assessment.id}
                assessment={assessment}
                onClick={() => setSelected(assessment)}
              />
            ))}
          </div>
        </div>
        {selected && (
          <AssessmentModal
            assessment={selected}
            results={dummyResults.filter((r) => r.assessmentId === selected.id)}
            parameters={dummyParameters}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </Layout>
  );
}
