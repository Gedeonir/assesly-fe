import { Outlet, NavLink } from "react-router-dom";

export default function StudentLayout() {
  const navLinkStyle =
    "px-4 py-2 rounded-lg text-sm font-medium transition";

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-darkBackground">
      
      {/* ===== Top Navbar ===== */}
      <header className="bg-card dark:bg-darkCard shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">
          Student Portal
        </h1>

        <nav className="flex items-center gap-4">
          <NavLink
            to="/student"
            end
            className={({ isActive }) =>
              `${navLinkStyle} ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-background dark:hover:bg-darkBackground"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/student/classes"
            className={({ isActive }) =>
              `${navLinkStyle} ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-background dark:hover:bg-darkBackground"
              }`
            }
          >
            Classes
          </NavLink>

          <NavLink
            to="/student/assessments"
            className={({ isActive }) =>
              `${navLinkStyle} ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-background dark:hover:bg-darkBackground"
              }`
            }
          >
            Assessments
          </NavLink>

          <NavLink
            to="/student/results"
            className={({ isActive }) =>
              `${navLinkStyle} ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-background dark:hover:bg-darkBackground"
              }`
            }
          >
            Results
          </NavLink>

          <NavLink
            to="/student/profile"
            className={({ isActive }) =>
              `${navLinkStyle} ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-background dark:hover:bg-darkBackground"
              }`
            }
          >
            Profile
          </NavLink>
        </nav>
      </header>

      {/* ===== Main Content ===== */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
