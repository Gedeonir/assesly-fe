import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import PerformanceChart from "../../components/PerformanceChart";
import AssessmentTable from "../../components/AssessmentTable";

export default function DashboardLayout({children}) {
  return (
    <div className="min-h-screen max-h-screen overflow-hidden flex bg-background dark:bg-darkBackground">
      {/* Sidebar */}
      <Sidebar role="teacher" />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen max-h-screen overflow-y-auto">
        {/* Navbar */}
        <div className="sticky top-0 z-10"><Navbar /></div>
        <div className="p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
