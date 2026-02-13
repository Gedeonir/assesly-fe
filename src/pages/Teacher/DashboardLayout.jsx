import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);


  return (
    <div className="min-h-screen flex bg-background dark:bg-darkBackground">

      {/* ===== Sidebar ===== */}
      <div
        className={`
          fixed md:relative inset-y-0 left-0 z-40
          transition-all duration-300 ease-in-out
          ${!collapsed ? "w-0" : "w-64"}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          bg-card dark:bg-darkCard
        `}
      >
        <Sidebar
          role="teacher"
          collapsed={collapsed}
          toggleCollapse={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* ===== Overlay (Mobile) ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">

        {/* Navbar */}
        <div className="sticky top-0 z-20">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
