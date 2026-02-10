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
    <div
      className={`p-6 rounded-2xl shadow-lg ${colors[color] || "bg-primary text-white"}`}
    >
      <p className="text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}
