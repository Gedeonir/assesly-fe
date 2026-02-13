import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../../components/LogoutModal";

export default function StudentProfile() {
  const [editMode, setEditMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
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
    navigate("/"); // redirect to login page
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div
        className="bg-card dark:bg-darkCard p-6 rounded-xl shadow 
                flex flex-col md:flex-row md:items-center md:justify-between 
                gap-6"
      >
        {/* Left */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="w-20 h-20 bg-primary text-white flex items-center justify-center rounded-full text-2xl font-bold">
            {profile.firstName.charAt(0)}
            {profile.lastName.charAt(0)}
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-sm sm:text-base text-textSecondary">
              {profile.email}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => setEditMode(!editMode)}
            className="w-full sm:w-auto bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryHover transition"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Academic Info */}
      <div className="bg-card dark:bg-darkCard p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Academic Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primaryHover transition">
          Update Password
        </button>
      </div>

      {showLogoutModal && (
        <LogoutModal
        setShowLogoutModal={setShowLogoutModal}
        handleLogout={handleLogout}/>
        
      )}
    </div>
  );
}
