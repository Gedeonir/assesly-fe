import React from "react";
import { NavLink } from "react-router-dom";

export default function StudentDashboard() {
  const stats = [
    { title: "Upcoming Assessments", value: 3 },
    { title: "Completed", value: 12 },
    { title: "Average Score", value: "82%" },
    { title: "My Classes", value: 4 },
  ];

  const navLinkStyle = "px-4 py-2 rounded-lg text-sm font-medium transition";

  const upcomingAssessments = [
    { id: 1, title: "Algebra Test", due: "Feb 20, 2026", subject: "Math" },
    { id: 2, title: "Physics Quiz", due: "Feb 22, 2026", subject: "Physics" },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-xl sm:text-2xl font-bold text-textPrimary dark:text-darkTextPrimary">
        Student Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-card dark:bg-darkCard p-5 rounded-2xl shadow hover:shadow-lg transition"
          >
            <p className="text-textSecondary text-sm">{stat.title}</p>
            <p className="text-2xl font-bold text-primary mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Assessments */}
      <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-6">Upcoming Assessments</h2>

        {upcomingAssessments.length === 0 ? (
          <p className="text-textSecondary">No upcoming assessments.</p>
        ) : (
          <div className="space-y-4">
            {upcomingAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl border border-border dark:border-darkBorder hover:bg-background dark:hover:bg-darkBackground transition"
              >
                {/* Left Content */}
                <div className="space-y-1">
                  <h3 className="font-semibold text-base sm:text-lg">
                    {assessment.title}
                  </h3>
                  <p className="text-sm text-textSecondary">
                    Subject: {assessment.subject}
                  </p>
                  <p className="text-sm text-textSecondary">
                    Due: {assessment.due}
                  </p>
                </div>

                {/* Button */}
                <div className="w-full md:w-auto">
                  <NavLink
                    to={`/student/assessments/${assessment.id}/take`}
                    className="block text-center px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primaryHover transition"
                  >
                    Take Assessment
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
