import React from "react";

interface CommonHeaderProps {
  title: string;
  subtitle?: string;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({ title, subtitle }) => (
  <div className="text-center mb-8">
    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">{title}</h1>
    {subtitle && <p className="text-gray-300">{subtitle}</p>}
  </div>
);

export default CommonHeader; 