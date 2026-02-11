import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

export default function Sidebar({ role }) {
  const teacherLinks = [
    { name: "Dashboard", href: "/teacher/dashboard/" },
    { name: "Classes", href: "/teacher/dashboard/classes" },
    { name: "Students", href: "#" },
    { name: "Assessments", href: "/teacher/dashboard/assessments" },
    { name: "Profile", href: "/teacher/dashboard/profile" },
    { name: "Logout", href: "#" },
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
    <aside className="w-64 bg-card dark:bg-darkCard py-6 hidden md:flex flex-col space-y-4">
      <h2 className="text-xl px-6 font-bold text-textSecondary dark:text-darkTextPrimary mb-6">
        Teacher Panel
      </h2>
      <ul className="space-y-4 pl-4">
        {links.map((link) => (
          <li className={`${location.pathname === link.href ? "bg-primary text-darkTextPrimary hover:text-darkTextPrimary shadow-lg shadow-primary/50" : "bg-card dark:bg-darkCard hover:text-textSecondary"} p-2 border-opacity-50  rounded-l-full px-4 transition`} key={link.name}>
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
    </aside>
  );
}
