import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Feb 1", avgScore: 78 },
  { date: "Feb 3", avgScore: 82 },
  { date: "Feb 5", avgScore: 85 },
  { date: "Feb 7", avgScore: 88 },
];

export default function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#475569" />
        <YAxis stroke="#475569" />
        <Tooltip />
        <Line type="monotone" dataKey="avgScore" stroke="#2563EB" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
