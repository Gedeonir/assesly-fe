import React from "react";

export default function AssessmentTable() {
  const data = [
    { name: "Math Test 1", date: "2026-02-10", status: "Completed" },
    { name: "Science Quiz", date: "2026-02-09", status: "Pending" },
    { name: "English Essay", date: "2026-02-08", status: "Completed" },
  ];

  return (
    <table className="w-full table-auto text-left border-collapse">
      <thead>
        <tr className="border-b border-border dark:border-darkBorder">
          <th className="p-3 text-textSecondary dark:text-darkTextSecondary">Assessment</th>
          <th className="p-3 text-textSecondary dark:text-darkTextSecondary">Date</th>
          <th className="p-3 text-textSecondary dark:text-darkTextSecondary">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.name} className="border-b border-border dark:border-darkBorder">
            <td className="p-3 text-textPrimary dark:text-darkTextPrimary">{row.name}</td>
            <td className="p-3 text-textPrimary dark:text-darkTextPrimary">{row.date}</td>
            <td
              className={`p-3 font-bold ${
                row.status === "Completed"
                  ? "text-success"
                  : row.status === "Pending"
                  ? "text-warning"
                  : "text-error"
              }`}
            >
              {row.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
