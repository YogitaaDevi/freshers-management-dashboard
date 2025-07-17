"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Employee {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
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
    if (isAuthenticated) {
      fetchEmployees();
    }
  }, [isAuthenticated]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("authToken");
      if (!token) {
        router.replace("/login");
        setIsAuthChecked(true);
        setIsAuthenticated(false);
      }
      const response = await fetch("/api/employees", {
        headers: {
            'Authorization': `Bearer ${token}`
          }
      });
      
      if (!response.ok) {
        setError("Failed to fetch employees");
        return;
      }

      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError("Failed to fetch employees");
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

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
          <div className="max-w-6xl mx-auto">
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
          <div className="max-w-6xl mx-auto">
            <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Employees
            </h1>
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
            >
              Back to Dashboard
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-700 backdrop-blur-sm hover:border-cyan-500/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-100">
                    {employee.name}
                  </h3>
                  {employee.isAdmin && (
                    <span className="bg-purple-900/50 text-purple-300 text-xs font-medium px-2.5 py-0.5 rounded border border-purple-700">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-gray-300 mb-4">{employee.email}</p>
                <p className="text-sm text-gray-400 mb-4">
                  {/* Joined: {new Date(employee.createdAt).toLocaleDateString()} */}
                </p>
                <Link
                  href={`/dashboard/employees/${employee.id}`}
                  className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 w-full text-center"
                >
                  View Analytics
                </Link>
              </div>
            ))}
          </div>

          {employees.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No employees found.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 