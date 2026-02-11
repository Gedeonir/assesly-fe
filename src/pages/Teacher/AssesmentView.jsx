import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function AssessmentView() {
  const [activeTab, setActiveTab] = useState("questions");
  // Mock data (replace with real API later)
  const assessment = {
    title: "Math Quiz 1",
    className: "Grade 10",
    startDateTime: "2026-02-11T08:00",
    dueDateTime: "2026-02-12T12:00",
    questions: [
      {
        id: 1,
        text: "What is 2 + 2?",
        type: "mcq",
        options: ["3", "4", "5"],
        correctAnswer: 1,
        marks: 5,
        required: true,
      },
      {
        id: 2,
        text: "Explain Pythagoras theorem.",
        type: "short",
        marks: 10,
        required: false,
      },
    ],
    responses: [
      {
        id: 1,
        student: "John Doe",
        score: 12,
        submittedAt: "2026-02-11 09:30",
      },
      {
        id: 2,
        student: "Jane Smith",
        score: 15,
        submittedAt: "2026-02-11 10:10",
      },
    ],
  };

  const totalMarks = assessment.questions.reduce(
    (acc, q) => acc + (q.marks || 0),
    0,
  );

  const exportToExcel = () => {
    // Prepare data
    const data = assessment.responses.map((r) => ({
      Student: r.student,
      Score: r.score,
      "Total Marks": totalMarks,
      "Submitted At": r.submittedAt,
    }));

    // Convert to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, `${assessment.title}_Results.xlsx`);
  };

  return (
    <DashboardLayout>
      <div className="p-px">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-textPrimary dark:text-darkTextPrimary">
            {assessment.title}
          </h1>
          <p className="text-textSecondary dark:text-darkTextSecondary">
            {assessment.className} • Start: {assessment.startDateTime} • Due:{" "}
            {assessment.dueDateTime}
          </p>
          <p className="mt-2 font-semibold">Total Marks: {totalMarks}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border dark:border-darkBorder mb-6">
          <button
            onClick={() => setActiveTab("questions")}
            className={`px-4 py-2 ${
              activeTab === "questions"
                ? "border-b-2 border-primary text-primary"
                : "text-textSecondary"
            }`}
          >
            Questions
          </button>

          <button
            onClick={() => setActiveTab("responses")}
            className={`px-4 py-2 ${
              activeTab === "responses"
                ? "border-b-2 border-primary text-primary"
                : "text-textSecondary"
            }`}
          >
            Responses
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "questions" && (
          <div className="space-y-4">
            {assessment.questions.map((q, index) => (
              <div
                key={q.id}
                className="p-4 rounded-xl border border-border dark:border-darkBorder bg-card dark:bg-darkCard"
              >
                <h3 className="font-semibold mb-2">
                  {index + 1}. {q.text}
                </h3>

                <p className="text-sm text-textSecondary mb-2">
                  Type: {q.type} • Marks: {q.marks} •{" "}
                  {q.required ? "Required" : "Optional"}
                </p>

                {(q.type === "mcq" || q.type === "dropdown") && (
                  <ul className="list-disc pl-5">
                    {q.options.map((opt, i) => (
                      <li
                        key={i}
                        className={
                          q.correctAnswer === i
                            ? "text-green-600 font-semibold"
                            : ""
                        }
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "responses" && (
          <div>
            <button
              onClick={exportToExcel}
              className="mb-4 px-4 py-2 bg-success hover:bg-green-600 text-white rounded-lg shadow transition"
            >
              Export to Excel
            </button>

            <div className="overflow-x-auto">
              <table className="w-full border border-border dark:border-darkBorder rounded-lg">
                <thead className="bg-background dark:bg-darkBackground">
                  <tr>
                    <th className="p-3 text-left">Student</th>
                    <th className="p-3 text-left">Score</th>
                    <th className="p-3 text-left">Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {assessment.responses.map((r) => (
                    <tr
                      key={r.id}
                      className="border-t border-border dark:border-darkBorder"
                    >
                      <td className="p-3">{r.student}</td>
                      <td className="p-3 font-semibold">
                        {r.score} / {totalMarks}
                      </td>
                      <td className="p-3">{r.submittedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
