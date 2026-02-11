import React from "react";

export default function StudentDashboard() {
  const stats = [
    { title: "Upcoming Assessments", value: 3 },
    { title: "Completed", value: 12 },
    { title: "Average Score", value: "82%" },
    { title: "My Classes", value: 4 },
  ];

  const upcomingAssessments = [
    { id: 1, title: "Algebra Test", due: "Feb 20, 2026", subject: "Math" },
    { id: 2, title: "Physics Quiz", due: "Feb 22, 2026", subject: "Physics" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-textPrimary dark:text-darkTextPrimary">
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
            <p className="text-2xl font-bold text-primary mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Upcoming Assessments */}
      <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Upcoming Assessments
        </h2>

        {upcomingAssessments.length === 0 ? (
          <p className="text-textSecondary">No upcoming assessments.</p>
        ) : (
          <div className="space-y-4">
            {upcomingAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="p-4 rounded-xl border border-border dark:border-darkBorder hover:bg-background dark:hover:bg-darkBackground transition"
              >
                <h3 className="font-semibold">
                  {assessment.title}
                </h3>
                <p className="text-sm text-textSecondary">
                  Subject: {assessment.subject}
                </p>
                <p className="text-sm text-textSecondary">
                  Due: {assessment.due}
                </p>

                <button className="mt-3 px-4 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primaryHover transition">
                  Start Assessment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
