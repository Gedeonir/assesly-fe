import { useState } from "react";

export default function StudentProfile() {
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@student.com",
    className: "Form 4",
    admissionNumber: "STU2024001",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setEditMode(false);
    // Later: send to backend
    console.log("Saved profile:", profile);
  };

  const handleLogout = () => {
    // Clear any auth/session info here
    console.log("User logged out");
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-card dark:bg-darkCard p-6 rounded-xl shadow flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-primary text-white flex items-center justify-center rounded-full text-2xl font-bold">
            {profile.firstName.charAt(0)}
            {profile.lastName.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-textSecondary">{profile.email}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryHover transition"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Academic Info */}
      <div className="bg-card dark:bg-darkCard p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Academic Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-textSecondary">First Name</label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-textSecondary">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-textSecondary">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-textSecondary">Class</label>
            <input
              type="text"
              name="className"
              value={profile.className}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-textSecondary">
              Admission Number
            </label>
            <input
              type="text"
              name="admissionNumber"
              value={profile.admissionNumber}
              disabled
              className="w-full p-2 border rounded-lg mt-1 bg-gray-100 dark:bg-gray-700"
            />
          </div>
        </div>

        {editMode && (
          <div className="pt-4">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-card dark:bg-darkCard p-4 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-primary">12</p>
          <p className="text-sm text-textSecondary">Assessments Taken</p>
        </div>

        <div className="bg-card dark:bg-darkCard p-4 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-green-500">85%</p>
          <p className="text-sm text-textSecondary">Average Score</p>
        </div>

        <div className="bg-card dark:bg-darkCard p-4 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-red-500">3</p>
          <p className="text-sm text-textSecondary">Pending Assessments</p>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-card dark:bg-darkCard p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Change Password</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="password"
            placeholder="Current Password"
            className="p-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="New Password"
            className="p-2 border rounded-lg"
          />
        </div>

        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primaryHover transition">
          Update Password
        </button>
      </div>
    </div>
  );
}
