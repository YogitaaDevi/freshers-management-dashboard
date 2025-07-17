'use client';

import React, { useState, useEffect, useMemo } from 'react';

interface Fresher {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

const fetchFreshers = async (): Promise<Fresher[]> => {
  const res = await fetch('/api/employees');
  const data = await res.json();
  return data.filter((emp: Fresher) => !emp.isAdmin);
};

const createFresher = async (name: string, email: string, password: string) => {
  const res = await fetch('/api/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, isAdmin: false }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to create fresher');
  }
  return res.json();
};

const updateFresher = async (id: string, name: string, email: string, password?: string) => {
  const body: any = { name, email };
  if (password) body.password = password;
  const res = await fetch(`/api/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
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
    fetchFreshers()
      .then(setFreshers)
      .catch(() => setError('Failed to fetch freshers'))
      .finally(() => setLoading(false));
  }, []);

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
      const freshers = await fetchFreshers();
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
      const freshers = await fetchFreshers();
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-2 md:px-0">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-800 tracking-tight">Freshers Management</h1>
            <div className="text-blue-600 text-sm mt-1 font-medium">Total Freshers: {freshers.length}</div>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              className="border-2 border-blue-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm"
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              className={`flex items-center gap-2 font-semibold px-5 py-2 rounded-xl shadow transition-all duration-150
                ${showCreate
                  ? 'bg-gradient-to-r from-red-800 to-red-700 hover:from-red-600 hover:to-red-800 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white'}
                ${showCreate ? 'ring-2 ring-red-300' : 'ring-2 ring-blue-300'}`}
              onClick={() => setShowCreate((v) => !v)}
            >
              {showCreate ? '- Cancel' : '+ Add Fresher'}
            </button>
          </div>
        </div>
        {showCreate && (
          <form onSubmit={handleCreate} className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex flex-col gap-5 border border-blue-100 animate-fade-in">
            <h2 className="text-xl font-bold text-blue-700 mb-2">Create New Fresher</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-medium text-blue-700">Name</label>
                <input
                  type="text"
                  className="border-2 border-blue-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={createName}
                  onChange={e => setCreateName(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-medium text-blue-700">Email</label>
                <input
                  type="email"
                  className="border-2 border-blue-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={createEmail}
                  onChange={e => setCreateEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-medium text-blue-700">Password</label>
                <input
                  type="password"
                  className="border-2 border-blue-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={createPassword}
                  onChange={e => setCreatePassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {createError && <div className="text-red-500 text-sm">{createError}</div>}
            {createSuccess && <div className="text-green-600 text-sm">Fresher created successfully!</div>}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-xl shadow transition-all duration-150 mt-2"
                disabled={createLoading}
              >
                {createLoading ? 'Creating...' : 'Create Fresher'}
              </button>
            </div>
          </form>
        )}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-blue-700">Existing Freshers</h2>
          </div>
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-50">
                  {filteredFreshers.length === 0 ? (
                    <tr><td colSpan={3} className="text-center py-6 text-gray-400">No freshers found.</td></tr>
                  ) : filteredFreshers.map((fresher) => (
                    <tr key={fresher.id} className={editId === fresher.id ? 'bg-blue-50/60 animate-pulse' : 'hover:bg-blue-50 transition'}>
                      {editId === fresher.id ? (
                        <>
                          <td className="px-6 py-3 align-middle">
                            <input
                              type="text"
                              className="border-2 border-blue-200 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                              value={editName}
                              onChange={e => setEditName(e.target.value)}
                              required
                            />
                          </td>
                          <td className="px-6 py-3 align-middle">
                            <input
                              type="email"
                              className="border-2 border-blue-200 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                              value={editEmail}
                              onChange={e => setEditEmail(e.target.value)}
                              required
                            />
                          </td>
                          <td className="px-6 py-3 align-middle flex gap-2 items-center">
                            <input
                              type="password"
                              className="border-2 border-blue-200 rounded-lg px-2 py-1 w-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
                              value={editPassword}
                              onChange={e => setEditPassword(e.target.value)}
                              placeholder="New password"
                            />
                            <button
                              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-4 py-1 rounded-lg text-sm font-semibold shadow"
                              onClick={handleEdit}
                              disabled={editLoading}
                            >
                              {editLoading ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-4 py-1 rounded-lg text-sm font-semibold shadow"
                              onClick={cancelEdit}
                              type="button"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-3 align-middle font-medium text-blue-900">{fresher.name}</td>
                          <td className="px-6 py-3 align-middle text-blue-900">{fresher.email}</td>
                          <td className="px-6 py-3 align-middle">
                            <button
                              className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-semibold transition"
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
          {editError && <div className="text-red-500 text-sm mt-4">{editError}</div>}
          {editSuccess && <div className="text-green-600 text-sm mt-4">Fresher updated successfully!</div>}
        </div>
      </div>
    </div>
  );
};

export default FreshersPage; 