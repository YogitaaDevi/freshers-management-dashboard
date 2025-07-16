"use client";

import React, { useState, useEffect } from 'react';
import CreateAssessCard from './CreateAssessCard';
import GraphCard from './GraphCard';
import FreshersListCard from './FreshersListCard';
import AssessmentListCard from './AssessmentListCard';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-8">Dashboard</h1>
        <AssessmentListCard />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <CreateAssessCard />
          <GraphCard />
          <FreshersListCard />
        </div>
      </div>
    </div>
  );
}
