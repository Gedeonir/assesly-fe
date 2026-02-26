import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import CreateAssessmentModal from "../../components/CreateAssessmentModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";
import Skeleton from "../../components/Skeleton";

export default function TeacherAssessments() {
  // Example assessment data
  const [assessments, setAssessments] = useState([]);
  const [res, setResponse] = useState({
    loading: false,
    error: null,
    success: null,
  });

  const navigate = useNavigate();
  const handleCreateAssessment = () => {
    // Logic to open modal or navigate to create assessment page
    navigate("/teacher/dashboard/assessments/new");
  };

  const handleEdit = (id) => {
    console.log("Edit assessment", id);
  };

  const handleDelete = (id) => {
    setAssessments(assessments.filter((a) => a.id !== id));
  };

  const { getAllAssessments } = useAuth();

  React.useEffect(() => {
    const fetchAssessments = async () => {
      setResponse({ ...res, loading: true });
      const response = await getAllAssessments();
      if (!response.error) {
        setAssessments(response);
        setResponse({ ...res, loading: false });
      } else {
        setResponse({ ...res, loading: false, error: res.error });
      }
    };
    fetchAssessments();
  }, [getAllAssessments]);

  console.log(assessments);
  

  return (
    <DashboardLayout>
      <div className="bg-card dark:bg-darkCard p-4 sm:p-6 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          <h3 className="text-xl font-bold text-textPrimary dark:text-darkTextPrimary">
            Assessments
          </h3>

          <button
            onClick={handleCreateAssessment}
            className="w-full sm:w-auto py-2 px-4 bg-primary hover:bg-primaryHover dark:bg-darkPrimary dark:hover:bg-darkPrimaryHover text-white rounded-lg shadow-md transition"
          >
            + Create Assessment
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {res.loading && <Skeleton width="100%" height="200px" />}
          {res.error && <p className="text-error">{res.error}</p>}
          <table className="w-full text-left border-collapse">
            {/* Desktop Header */}
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-border dark:border-darkBorder">
                <th className="p-3 text-textSecondary dark:text-darkTextSecondary">
                  Name
                </th>
                <th className="p-3 text-textSecondary dark:text-darkTextSecondary">
                  Class
                </th>
                 <th className="p-3 text-textSecondary dark:text-darkTextSecondary">
                  Start Date
                </th>
                <th className="p-3 text-textSecondary dark:text-darkTextSecondary">
                  Due Date
                </th>
                 <th className="p-3 text-textSecondary dark:text-darkTextSecondary">
                  Questions
                </th>
                <th className="p-3 text-textSecondary dark:text-darkTextSecondary">
                  Status
                </th>
                <th className="p-3 text-textSecondary dark:text-darkTextSecondary">
                  Total marks
                </th>
                <th className="p-3 text-textSecondary dark:text-darkTextSecondary">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {assessments.map((assessment) => (
                <tr
                  key={assessment._id}
                  className="border-b border-border dark:border-darkBorder 
                           block md:table-row 
                           mb-4 md:mb-0 
                           bg-gray-50 md:bg-transparent 
                           dark:bg-darkCard md:dark:bg-transparent 
                           rounded-xl md:rounded-none 
                           p-4 md:p-0"
                >
                  {/* Name */}
                  <td className="p-2 md:p-3 text-textPrimary dark:text-darkTextPrimary block md:table-cell">
                    <span className="md:hidden font-semibold">Name: </span>
                    <a href={`/teacher/dashboard/assessments/view?id=${assessment._id}`}>
                      {assessment.title}
                    </a>
                  </td>

                  {/* Class */}
                  <td className="p-2 md:p-3 text-textPrimary dark:text-darkTextPrimary block md:table-cell">
                    <span className="md:hidden font-semibold">Class: </span>
                    {assessment.class?assessment.class?.name:"N/A"}
                  </td>

                  {/* Due Date */}
                  <td className="p-2 md:p-3 text-textPrimary dark:text-darkTextPrimary block md:table-cell">
                    <span className="md:hidden font-semibold">Due Date: </span>
                    {assessment.dueDate? new Date(assessment.endDateTime).toLocaleString():"N/A"}
                  </td>

                  {/* Status */}
                  <td
                    className={`p-2 md:p-3 font-bold block md:table-cell text-xs ${
                      assessment.status === "Completed"
                        ? "text-success"
                        : assessment.status === "Pending"
                          ? "text-warning"
                          : "text-error"
                    }`}
                  >
                    <span className="md:hidden font-semibold text-textPrimary dark:text-darkTextPrimary">
                      Status:{" "}
                    </span>
                    {new Date(assessment.startDateTime) < new Date() ? "Upcoming" 
                    : 
                    "Active"}
                  </td>

                  {/* Avg Score */}
                  <td className="p-2 md:p-3 text-textPrimary dark:text-darkTextPrimary block md:table-cell">
                    <span className="md:hidden font-semibold">Avg Score: </span>
                    {assessment.avgScore > 0 ? `${assessment.avgScore}%` : "-"}
                  </td>

                  {/* Actions */}
                  <td className="p-2 md:p-3 flex flex-row sm:flex-row gap-4 md:table-cell">
                    <button
                      onClick={() => handleEdit(assessment._id)}
                      className="w-full sm:w-auto px-3 py-1 mr-2 bg-primaryHover dark:bg-darkPrimaryHover text-white rounded-md text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(assessment._id)}
                      className="w-full sm:w-auto px-3 py-1 bg-error text-white rounded-md text-sm"
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
