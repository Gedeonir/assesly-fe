import React, { use, useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import LogoutModal from "../../components/LogoutModal";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const navigate = useNavigate();

  const handlePasswordChange = (key, value) => {
    setPasswords({ ...passwords, [key]: value });
  };

  const handlePasswordUpdate = () => {
    if (passwords.newPass !== passwords.confirm) {
      alert("Passwords do not match");
      return;
    }

    console.log("Password updated");
  };

  const [user, setUser] = useState({
    name: "Mr. John Smith",
    email: "johnsmith@email.com",
    role: "Teacher",
    bio: "Mathematics teacher with 8 years of experience in secondary education.",
    avatar:
      "https://ui-avatars.com/api/?name=John+Smith&background=4f46e5&color=fff",
  });

  const [darkMode, setDarkMode] = useState(false);

  // Apply the dark class to <html> when darkMode is true
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Later connect to backend API
  };

  const handleLogout = () => {
    // Clear any auth/session info here
    console.log("User logged out");
    navigate("/"); // redirect to login page
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ===== Profile Header ===== */}
        <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-textPrimary dark:text-darkTextPrimary">
                {user.name}
              </h1>
              <p className="text-textSecondary dark:text-darkTextSecondary">
                {user.role}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="w-full md:w-auto px-4 py-2 bg-primary hover:bg-primaryHover dark:bg-darkPrimary dark:hover:bg-darkPrimaryHover text-white rounded-lg shadow transition"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* ===== Main Content ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ===== Personal Info ===== */}
          <div className="lg:col-span-2 bg-card dark:bg-darkCard p-6 rounded-2xl shadow space-y-4">
            <h2 className="text-xl font-semibold text-textPrimary dark:text-darkTextPrimary">
              Personal Information
            </h2>

            <div>
              <label className="block text-sm text-textSecondary dark:text-darkTextSecondary mb-1">
                Full Name
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={user.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full p-2 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground"
              />
            </div>

            <div>
              <label className="block text-sm text-textSecondary mb-1">
                Email
              </label>
              <input
                type="email"
                disabled={!isEditing}
                value={user.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full p-2 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground"
              />
            </div>

            <div>
              <label className="block text-sm text-textSecondary mb-1">
                Bio
              </label>
              <textarea
                disabled={!isEditing}
                value={user.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                rows={4}
                className="w-full p-2 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground"
              />
            </div>
          </div>

          {/* ===== Stats Section ===== */}
          <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow space-y-4">
            <h2 className="text-xl font-semibold text-textPrimary dark:text-darkTextPrimary">
              Statistics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <div className="p-3 rounded-lg bg-background dark:bg-darkBackground">
                <p className="text-sm text-textSecondary">
                  Assessments Created
                </p>
                <p className="text-lg font-bold text-primary">24</p>
              </div>

              <div className="p-3 rounded-lg bg-background dark:bg-darkBackground">
                <p className="text-sm text-textSecondary">Total Students</p>
                <p className="text-lg font-bold text-success">120</p>
              </div>

              <div className="p-3 rounded-lg bg-background dark:bg-darkBackground">
                <p className="text-sm text-textSecondary">Average Score</p>
                <p className="text-lg font-bold text-yellow-500">78%</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Change Password ===== */}
        <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow space-y-4">
          <h2 className="text-xl font-semibold text-textPrimary dark:text-darkTextPrimary">
            Change Password
          </h2>

          <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
            <div>
              <label className="block text-sm text-textSecondary mb-1">
                Current Password
              </label>
              <input
                type="password"
                onChange={(e) =>
                  handlePasswordChange("current", e.target.value)
                }
                className="w-full p-2 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground"
              />
            </div>

            <div>
              <label className="block text-sm text-textSecondary mb-1">
                New Password
              </label>
              <input
                type="password"
                onChange={(e) =>
                  handlePasswordChange("current", e.target.value)
                }
                className="w-full p-2 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground"
              />
            </div>

            <div>
              <label className="block text-sm text-textSecondary mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                onChange={(e) =>
                  handlePasswordChange("current", e.target.value)
                }
                className="w-full p-2 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground"
              />
            </div>

            <button className="w-full px-4 py-2 bg-primary hover:bg-primaryHover dark:bg-darkPrimary dark:hover:bg-darkPrimaryHover text-white rounded-lg shadow transition">
              Update Password
            </button>
          </div>
        </div>

        {/* ===== Settings Section ===== */}
        <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow space-y-4">
          <h2 className="text-xl font-semibold text-textPrimary dark:text-darkTextPrimary">
            Settings
          </h2>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textPrimary dark:text-darkTextPrimary font-medium">
                Dark Mode
              </p>
              <p className="text-sm text-textSecondary">
                Switch between light and dark theme
              </p>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                darkMode ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
                  darkMode ? "translate-x-7" : ""
                }`}
              />
            </button>
          </div>
        </div>
        {showLogoutModal && (
          <LogoutModal
            setShowLogoutModal={setShowLogoutModal}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
