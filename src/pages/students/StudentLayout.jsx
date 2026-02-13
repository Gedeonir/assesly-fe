import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function StudentLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkStyle =
    "px-4 py-2 rounded-lg text-sm font-medium transition";

  const navLinks = [
    { to: "/student", label: "Dashboard", end: true },
    { to: "/student/classes", label: "Classes" },
    { to: "/student/assessments", label: "Assessments" },
    { to: "/student/results/history", label: "Results History" },
    { to: "/student/profile", label: "Profile" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-darkBackground">
      
      {/* ===== Top Navbar ===== */}
      <header className="bg-card dark:bg-darkCard shadow px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        
        <h1 className="text-lg sm:text-xl font-bold text-primary">
          Student Portal
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${navLinkStyle} ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-background dark:hover:bg-darkBackground"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* ===== Mobile Menu ===== */}
      {menuOpen && (
        <div className="md:hidden bg-card dark:bg-darkCard shadow-lg px-4 py-4 space-y-2">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block ${navLinkStyle} ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-background dark:hover:bg-darkBackground"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}

      {/* ===== Main Content ===== */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
