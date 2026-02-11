import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Mr. John Smith",
    email: "johnsmith@email.com",
    role: "Teacher",
    bio: "Mathematics teacher with 8 years of experience in secondary education.",
    avatar:
      "https://ui-avatars.com/api/?name=John+Smith&background=4f46e5&color=fff",
  });

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Later connect to backend API
  };

  return (
    <DashboardLayout>
    <div className="p-6 space-y-6">
      {/* ===== Profile Header ===== */}
      <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow flex flex-col md:flex-row items-center justify-between">
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

        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="mt-4 md:mt-0 px-4 py-2 bg-primary hover:bg-primaryHover dark:bg-darkPrimary dark:hover:bg-darkPrimaryHover text-white rounded-lg shadow transition"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      {/* ===== Main Content ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ===== Personal Info ===== */}
        <div className="lg:col-span-2 bg-card dark:bg-darkCard p-6 rounded-2xl shadow space-y-4">
          <h2 className="text-xl font-semibold text-textPrimary dark:text-darkTextPrimary">
            Personal Information
          </h2>

          {/* Name */}
          <div>
            <label className="block text-sm text-textSecondary mb-1">
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

          {/* Email */}
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

          {/* Bio */}
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

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-background dark:bg-darkBackground">
              <p className="text-sm text-textSecondary">Assessments Created</p>
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
    </div>
    </DashboardLayout>
  );
}
