"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import Layout from "@/components/Layout";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EmployeeData {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  assessmentResults: {
    overallScore: number;
  }[];
  parameters: {
    id: string;
    attitude: number;
    technicalSkill: number;
    communication: number;
    teamwork: number;
    createdAt: string;
    updatedAt: string;
  }[];
  assessment: {
    id: string;
    topic: string;
    date: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

interface ChartDataPoint {
  month: string;
  value: number;
}

export default function EmployeeAnalyticsPage() {
  const params = useParams();
  const employeeId = params.id as string;
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    if (employeeId && isAuthenticated) {
      fetchEmployeeData();
    }
  }, [employeeId, isAuthenticated]);

  const fetchEmployeeData = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("authToken");
      if (!token) {
        router.replace("/login");
        setIsAuthChecked(true);
        setIsAuthenticated(false);
      }
      const response = await fetch(`/api/employees/${employeeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("Employee not found");
        } else {
          setError("Failed to fetch employee data");
        }
        return;
      }

      const data = await response.json();
      setEmployeeData(data);
    } catch (err) {
      setError("Failed to fetch employee data");
      console.error("Error fetching employee data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Process data for charts
  const processChartData = (parameterType: 'attitude' | 'technicalSkill' | 'communication' | 'teamwork' | 'overall'): ChartDataPoint[] => {
    if (!employeeData) return [];

    const dataPoints: ChartDataPoint[] = [];

    // Sort assessments by date
    const sortedAssessments = [...employeeData.assessment].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    sortedAssessments.forEach((assessment, index) => {
      const date = new Date(assessment.date);
      const month = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });

      if (parameterType === 'overall') {
        // For overall score, use assessmentResults
        if (employeeData.assessmentResults[index]) {
          dataPoints.push({
            month,
            value: employeeData.assessmentResults[index].overallScore
          });
        }
      } else {
        // For individual parameters, use parameters data
        if (employeeData.parameters[index]) {
          dataPoints.push({
            month,
            value: employeeData.parameters[index][parameterType]
          });
        }
      }
    });

    return dataPoints;
  };

  // Create chart configuration
  const createChartConfig = (
    data: ChartDataPoint[],
    label: string,
    color: string
  ) => ({
    data: {
      labels: data.map(d => d.month),
      datasets: [
        {
          label,
          data: data.map(d => d.value),
          borderColor: color,
          backgroundColor: color + '20',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: color,
          pointBorderColor: '#1f2937',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            color: '#d1d5db'
          }
        },
        title: {
          display: true,
          text: `${label} Progress`,
          font: {
            size: 16,
            weight: 'bold' as const,
          },
          color: '#06b6d4'
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
          ticks: {
            stepSize: 1,
            color: '#d1d5db'
          },
          title: {
            display: true,
            text: 'Score (0-10)',
            color: '#d1d5db'
          },
          grid: {
            color: '#374151'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Month',
            color: '#d1d5db'
          },
          ticks: {
            color: '#d1d5db'
          },
          grid: {
            color: '#374151'
          }
        },
      },
    },
  });

  // Create bar chart for overall performance
  const createOverallChartConfig = (data: ChartDataPoint[]) => ({
    data: {
      labels: data.map(d => d.month),
      datasets: [
        {
          label: 'Overall Score',
          data: data.map(d => d.value),
          backgroundColor: 'rgba(6, 182, 212, 0.8)',
          borderColor: 'rgba(6, 182, 212, 1)',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            color: '#d1d5db'
          }
        },
        title: {
          display: true,
          text: 'Overall Performance',
          font: {
            size: 16,
            weight: 'bold' as const,
          },
          color: '#06b6d4'
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
          ticks: {
            stepSize: 1,
            color: '#d1d5db'
          },
          title: {
            display: true,
            text: 'Score (0-10)',
            color: '#d1d5db'
          },
          grid: {
            color: '#374151'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Month',
            color: '#d1d5db'
          },
          ticks: {
            color: '#d1d5db'
          },
          grid: {
            color: '#374151'
          }
        },
      },
    },
  });

  if (!isAuthChecked) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!employeeData) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-400 px-4 py-3 rounded">
              No employee data available
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Prepare chart data
  const attitudeData = processChartData('attitude');
  const technicalSkillData = processChartData('technicalSkill');
  const communicationData = processChartData('communication');
  const teamworkData = processChartData('teamwork');
  const overallData = processChartData('overall');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Employee Analytics
            </h1>
            <div className="bg-gray-800 rounded-lg shadow-2xl p-6 border border-gray-700 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-gray-100 mb-2">
                {employeeData.name}
              </h2>
              <p className="text-gray-300 mb-1">{employeeData.email}</p>
              <p className="text-sm text-gray-400">
                Employee since {new Date(employeeData.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Overall Performance Chart */}
          <div className="mb-8">
            <div className="bg-gray-800 rounded-lg shadow-2xl p-6 border border-gray-700 backdrop-blur-sm">
              <div className="h-80">
                <Bar {...createOverallChartConfig(overallData)} />
              </div>
            </div>
          </div>

          {/* Individual Parameter Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Attitude Chart */}
            <div className="bg-gray-800 rounded-lg shadow-2xl p-6 border border-gray-700 backdrop-blur-sm">
              <div className="h-80">
                <Line {...createChartConfig(attitudeData, 'Attitude', '#FF6384')} />
              </div>
            </div>

            {/* Technical Skill Chart */}
            <div className="bg-gray-800 rounded-lg shadow-2xl p-6 border border-gray-700 backdrop-blur-sm">
              <div className="h-80">
                <Line {...createChartConfig(technicalSkillData, 'Technical Skill', '#36A2EB')} />
              </div>
            </div>

            {/* Communication Chart */}
            <div className="bg-gray-800 rounded-lg shadow-2xl p-6 border border-gray-700 backdrop-blur-sm">
              <div className="h-80">
                <Line {...createChartConfig(communicationData, 'Communication', '#FFCE56')} />
              </div>
            </div>

            {/* Teamwork Chart */}
            <div className="bg-gray-800 rounded-lg shadow-2xl p-6 border border-gray-700 backdrop-blur-sm">
              <div className="h-80">
                <Line {...createChartConfig(teamworkData, 'Teamwork', '#4BC0C0')} />
              </div>
            </div>
          </div>

          {/* Assessment History */}
          <div className="mt-8">
            <div className="bg-gray-800 rounded-lg shadow-2xl p-6 border border-gray-700 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-cyan-300 mb-4">
                Assessment History
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                        Topic
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                        Overall Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {employeeData.assessment.map((assessment, index) => (
                      <tr key={assessment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                          {assessment.topic}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(assessment.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-400 font-bold">
                          {employeeData.assessmentResults[index]?.overallScore || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
