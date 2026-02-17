import React from "react";

export default function Card({ title, value, color }) {
  const colors = {
    primary: "bg-primary text-white",
    primaryHover: "bg-primaryHover text-white",
    success: "bg-success text-white",
    warning: "bg-warning text-white",
    error: "bg-error text-white",
  };

  return (
    // <div
    //   className={`p-6 rounded-2xl shadow-lg ${colors[color] || "bg-primary text-white"}`}
    // >
    //   <p className="text-sm">{title}</p>
    //   <h2 className="text-2xl font-bold mt-2">{value}</h2>
    // </div>

    <div className="bg-card dark:bg-darkCard rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="text-sm text-textSecondary mt-2">+12% from last month</p>
    </div>
  );
}
