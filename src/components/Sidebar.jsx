import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

export default function Sidebar({ role, collapsed, toggleCollapse }) {
  const teacherLinks = [
    { name: "Dashboard", href: "/teacher/dashboard/" },
    { name: "Classes", href: "/teacher/dashboard/classes" },
    { name: "Students", href: "#" },
    { name: "Assessments", href: "/teacher/dashboard/assessments" },
    { name: "Profile", href: "/teacher/dashboard/profile" },
  ];

  const links = role === "teacher" ? teacherLinks : [];
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = (role) => {
    logout(role);
    // redirect by role
    navigate("/");
  };

  return (
    <div className="h-full flex flex-col justify-between fixed">
      {/* Top */}
      <div className="space-y-12">
        <div className="flex items-center justify-center px-4 py-4">
          {collapsed && (
            <h2 className="text-lg font-bold text-primary">Teacher Panel</h2>
          )}

          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg hover:bg-background dark:hover:bg-darkBackground"
          >
            {!collapsed ? "»" : "«"}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="space-y-6">
        {collapsed &&
          <ul className="space-y-4 pl-4">
            {links.map((link) => (
              <li
                className={`${location.pathname === link.href ? "bg-primary text-darkTextPrimary hover:text-darkTextPrimary shadow-lg shadow-primary/50" : "bg-card dark:bg-darkCard hover:text-textSecondary"} p-2 border-opacity-50  rounded-l-full px-4 transition relative`}
                key={link.name}
              >
                <a
                  key={link.name}
                  href={link.href}
                  className="px-6 dark:text-darkTextSecondary dark:hover:text-darkPrimary transition w-full block rounded-l-full"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
  }
        </nav>
      </div>

      {/* Bottom */}
      {collapsed && (
        <div className="p-4 text-xs text-textSecondary">
          © 2026 School System
        </div>
      )}
    </div>
  );
}
