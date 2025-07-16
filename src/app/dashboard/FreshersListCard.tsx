import React from "react";

const FreshersListCard: React.FC = () => {
  return (
    <div
      className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 w-full max-w-xs min-w-[220px] flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition"
      tabIndex={0}
      role="button"
      aria-label="View Freshers"
    >
      <div className="bg-gradient-to-br from-blue-400 to-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center mb-3 text-2xl font-bold shadow">
        {/* User/Group Icon */}
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-blue-700 mb-1">Freshers</h2>
      <p className="text-gray-500 text-sm text-center">View the list of all freshers and their details.</p>
    </div>
  );
};

export default FreshersListCard; 