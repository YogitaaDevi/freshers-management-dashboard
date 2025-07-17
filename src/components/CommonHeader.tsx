import React from "react";

interface CommonHeaderProps {
  title: string;
  subtitle?: string;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({ title, subtitle }) => (
  <div className="text-center mb-8">
    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{title}</h1>
    {subtitle && <p className="text-gray-600">{subtitle}</p>}
  </div>
);

export default CommonHeader; 