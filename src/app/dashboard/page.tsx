export default function DashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-blue-100 max-w-lg w-full text-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4">Welcome to the Dashboard</h1>
        <p className="text-gray-600">You have successfully logged in as <span className="font-semibold">Madan</span>.</p>
      </div>
    </div>
  );
} 