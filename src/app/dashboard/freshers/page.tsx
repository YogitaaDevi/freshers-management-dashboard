'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';

interface Fresher {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

const fetchFreshers = async (token: string): Promise<Fresher[]> => {
  const res = await fetch('/api/employees', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await res.json();
  return data.filter((emp: Fresher) => !emp.isAdmin);
};

const createFresher = async (name: string, email: string, password: string) => {
  const token = Cookies.get("authToken");
  const res = await fetch('/api/employees', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, email, password, isAdmin: false }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to create fresher');
  }
  return res.json();
};

const updateFresher = async (id: string, name: string, email: string, password?: string) => {
  const token = Cookies.get("authToken");
  const body: any = { name, email };
  if (password) body.password = password;
  const res = await fetch(`/api/employees/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to update fresher');
  }
  return res.json();
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2);
}

const FreshersPage: React.FC = () => {
  const [freshers, setFreshers] = useState<Fresher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // Create form state
  const [showCreate, setShowCreate] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [createError, setCreateError] = useState<string | null>(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  // Edit state
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editError, setEditError] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  // Search/filter state
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      router.replace("/login");
      return;
    }
    
    fetchFreshers(token)
      .then(setFreshers)
      .catch(() => setError('Failed to fetch freshers'))
      .finally(() => setLoading(false));
  }, [router]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);
    setCreateSuccess(false);
    if (!createName.trim() || !createEmail.trim() || !createPassword.trim()) {
      setCreateError('All fields are required.');
      return;
    }
    setCreateLoading(true);
    try {
      await createFresher(createName, createEmail, createPassword);
      setCreateName('');
      setCreateEmail('');
      setCreatePassword('');
      setCreateSuccess(true);
      setShowCreate(false);
      // Refresh list
      setLoading(true);
      const token = Cookies.get("authToken");
      const freshers = await fetchFreshers(token!);
      setFreshers(freshers);
      setLoading(false);
    } catch (err: any) {
      setCreateError(err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  const startEdit = (fresher: Fresher) => {
    setEditId(fresher.id);
    setEditName(fresher.name);
    setEditEmail(fresher.email);
    setEditPassword('');
    setEditError(null);
    setEditSuccess(false);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName('');
    setEditEmail('');
    setEditPassword('');
    setEditError(null);
    setEditSuccess(false);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);
    setEditSuccess(false);
    if (!editName.trim() || !editEmail.trim()) {
      setEditError('Name and email are required.');
      return;
    }
    setEditLoading(true);
    try {
      await updateFresher(editId!, editName, editEmail, editPassword || undefined);
      setEditSuccess(true);
      setEditId(null);
      // Refresh list
      setLoading(true);
      const token = Cookies.get("authToken");
      const freshers = await fetchFreshers(token!);
      setFreshers(freshers);
      setLoading(false);
    } catch (err: any) {
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  // Filtered freshers based on search
  const filteredFreshers = useMemo(() => {
    if (!search.trim()) return freshers;
    const s = search.trim().toLowerCase();
    return freshers.filter(f =>
      f.name.toLowerCase().includes(s) || f.email.toLowerCase().includes(s)
    );
  }, [search, freshers]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10 px-2 md:px-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-tight">Freshers Management</h1>
              <div className="text-cyan-300 text-sm mt-1 font-medium">Total Freshers: {freshers.length}</div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                className="border-2 border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-800 text-gray-100 placeholder-gray-400 shadow-lg"
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button
                className={`flex items-center gap-2 font-semibold px-5 py-2 rounded-xl shadow-lg transition-all duration-150
                  ${showCreate
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white'}
                  ${showCreate ? 'ring-2 ring-red-400' : 'ring-2 ring-cyan-400'}`}
                onClick={() => setShowCreate((v) => !v)}
              >
                {showCreate ? '- Cancel' : '+ Add Fresher'}
              </button>
            </div>
          </div>
          {showCreate && (
            <form onSubmit={handleCreate} className="bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8 flex flex-col gap-5 border border-gray-700 animate-fade-in backdrop-blur-sm">
              <h2 className="text-xl font-bold text-cyan-300 mb-2">Create New Fresher</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="font-medium text-cyan-300">Name</label>
                  <input
                    type="text"
                    className="border-2 border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-700 text-gray-100 placeholder-gray-400"
                    value={createName}
                    onChange={e => setCreateName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="font-medium text-cyan-300">Email</label>
                  <input
                    type="email"
                    className="border-2 border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-700 text-gray-100 placeholder-gray-400"
                    value={createEmail}
                    onChange={e => setCreateEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="font-medium text-cyan-300">Password</label>
                  <input
                    type="password"
                    className="border-2 border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-700 text-gray-100 placeholder-gray-400"
                    value={createPassword}
                    onChange={e => setCreatePassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              {createError && <div className="text-red-400 text-sm">{createError}</div>}
              {createSuccess && <div className="text-green-400 text-sm">Fresher created successfully!</div>}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition-all duration-150 mt-2"
                  disabled={createLoading}
                >
                  {createLoading ? 'Creating...' : 'Create Fresher'}
                </button>
              </div>
            </form>
          )}
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 animate-fade-in backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-cyan-300">Existing Freshers</h2>
            </div>
            {loading ? (
              <div className="text-gray-400">Loading...</div>
            ) : error ? (
              <div className="text-red-400">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-cyan-300 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-cyan-300 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-cyan-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {filteredFreshers.length === 0 ? (
                      <tr><td colSpan={3} className="text-center py-6 text-gray-500">No freshers found.</td></tr>
                    ) : filteredFreshers.map((fresher) => (
                      <tr key={fresher.id} className={editId === fresher.id ? 'bg-gray-700/60 animate-pulse' : 'hover:bg-gray-700 transition'}>
                        {editId === fresher.id ? (
                          <>
                            <td className="px-6 py-3 align-middle">
                              <input
                                type="text"
                                className="border-2 border-gray-600 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-700 text-gray-100"
                                value={editName}
                                onChange={e => setEditName(e.target.value)}
                                required
                              />
                            </td>
                            <td className="px-6 py-3 align-middle">
                              <input
                                type="email"
                                className="border-2 border-gray-600 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-700 text-gray-100"
                                value={editEmail}
                                onChange={e => setEditEmail(e.target.value)}
                                required
                              />
                            </td>
                            <td className="px-6 py-3 align-middle flex gap-2 items-center">
                              <input
                                type="password"
                                className="border-2 border-gray-600 rounded-lg px-2 py-1 w-32 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-700 text-gray-100 placeholder-gray-400"
                                value={editPassword}
                                onChange={e => setEditPassword(e.target.value)}
                                placeholder="New password"
                              />
                              <button
                                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-4 py-1 rounded-lg text-sm font-semibold shadow-lg"
                                onClick={handleEdit}
                                disabled={editLoading}
                              >
                                {editLoading ? 'Saving...' : 'Save'}
                              </button>
                              <button
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white px-4 py-1 rounded-lg text-sm font-semibold shadow-lg"
                                onClick={cancelEdit}
                                type="button"
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-3 align-middle font-medium text-gray-100">{fresher.name}</td>
                            <td className="px-6 py-3 align-middle text-gray-300">{fresher.email}</td>
                            <td className="px-6 py-3 align-middle">
                              <button
                                className="text-cyan-400 hover:text-cyan-300 hover:underline text-sm font-semibold transition"
                                onClick={() => startEdit(fresher)}
                              >
                                Edit
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {editError && <div className="text-red-400 text-sm mt-4">{editError}</div>}
            {editSuccess && <div className="text-green-400 text-sm mt-4">Fresher updated successfully!</div>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FreshersPage; 