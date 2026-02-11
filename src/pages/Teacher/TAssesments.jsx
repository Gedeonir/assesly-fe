import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import CreateAssessmentModal from "../../components/CreateAssessmentModal";
import { useNavigate } from "react-router-dom";

export default function TeacherAssessments() {
  // Example assessment data
  const [assessments, setAssessments] = useState([
    {
      id: 1,
      name: "Math Test 1",
      class: "Grade 10",
      dueDate: "2026-02-12",
      status: "Pending",
      avgScore: 78,
    },
    {
      id: 2,
      name: "Science Quiz",
      class: "Grade 9",
      dueDate: "2026-02-10",
      status: "Completed",
      avgScore: 85,
    },
    {
      id: 3,
      name: "English Essay",
      class: "Grade 11",
      dueDate: "2026-02-15",
      status: "Pending",
      avgScore: 0,
    },
  ]);


const navigate=useNavigate();
  const handleCreateAssessment = () => {
    // Logic to open modal or navigate to create assessment page
    navigate('/teacher/dashboard/assessments/new');
  };

  const handleEdit = (id) => {
    console.log("Edit assessment", id);
  };

  const handleDelete = (id) => {
    setAssessments(assessments.filter((a) => a.id !== id));
  };

  return (
    <DashboardLayout>
  
        <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-textPrimary dark:text-darkTextPrimary">
              Assessments
            </h3>
            <button
              onClick={handleCreateAssessment}
              className="py-2 px-4 bg-primary hover:bg-primaryHover dark:bg-darkPrimary dark:hover:bg-darkPrimaryHover text-white rounded-lg shadow-md transition"
            >
              + Create Assessment
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border dark:border-darkBorder">
                  <th className="p-3 text-textSecondary dark:text-darkTextSecondary">
                    Name
                  </th>
                  <th className="p-3 text-textSecondary dark:text-darkTextSecondary">
                    Class
                  </th>
                  <th className="p-3 text-textSecondary dark:text-darkTextSecondary">
                    Due Date
                  </th>
                  <th className="p-3 text-textSecondary dark:text-darkTextSecondary">
                    Status
                  </th>
                  <th className="p-3 text-textSecondary dark:text-darkTextSecondary">
                    Avg Score
                  </th>
                  <th className="p-3 text-textSecondary dark:text-darkTextSecondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-border dark:border-darkBorder hover:bg-gray-50 dark:hover:bg-darkCard transition"
                  >
                    <td className="p-3 text-textPrimary dark:text-darkTextPrimary">
                      <a href={`/teacher/dashboard/assessments/view?id=${a.id}`}>
                        {a.name}
                      </a>
                    </td>
                    <td className="p-3 text-textPrimary dark:text-darkTextPrimary">
                      {a.class}
                    </td>
                    <td className="p-3 text-textPrimary dark:text-darkTextPrimary">
                      {a.dueDate}
                    </td>
                    <td
                      className={`p-3 font-bold ${
                        a.status === "Completed"
                          ? "text-success"
                          : a.status === "Pending"
                            ? "text-warning"
                            : "text-error"
                      }`}
                    >
                      {a.status}
                    </td>
                    <td className="p-3 text-textPrimary dark:text-darkTextPrimary">
                      {a.avgScore > 0 ? `${a.avgScore}%` : "-"}
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(a.id)}
                        className="px-2 py-1 bg-primaryHover dark:bg-darkPrimaryHover text-white rounded-md text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="px-2 py-1 bg-error text-white rounded-md text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

    </DashboardLayout>
  );
}
