import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import PerformanceChart from "../../components/PerformanceChart";
import AssessmentTable from "../../components/AssessmentTable";
import DashboardLayout from "./DashboardLayout";

export default function TeacherDashboard() {
  return (
    <DashboardLayout>
      {/* Dashboard content */}
      <div className="space-y-6">
        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Total Students" value="120" color="primary" />
          <Card title="Pending Assessments" value="8" color="warning" />
          <Card title="Completed Assessments" value="45" color="success" />
          <Card title="Average Score" value="87%" color="primaryHover" />
        </div>

        {/* Performance chart */}
        <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-textPrimary dark:text-darkTextPrimary mb-4">
            Class Performance
          </h3>
          <PerformanceChart />
        </div>

        {/* Recent assessments table */}
        <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-textPrimary dark:text-darkTextPrimary mb-4">
            Recent Assessments
          </h3>
          <AssessmentTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
