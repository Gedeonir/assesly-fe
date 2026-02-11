import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";

export default function Classes() {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Grade 10 - A",
      subject: "Mathematics",
      students: 28,
    },
    {
      id: 2,
      name: "Grade 11 - B",
      subject: "Physics",
      students: 24,
    },
  ]);

  const [newClassName, setNewClassName] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const handleCreateClass = () => {
    if (!newClassName || !newSubject) return;

    const newClass = {
      id: Date.now(),
      name: newClassName,
      subject: newSubject,
      students: 0,
    };

    setClasses([...classes, newClass]);
    setNewClassName("");
    setNewSubject("");
  };

  return (
    <DashboardLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-textPrimary dark:text-darkTextPrimary">
          My Classes
        </h1>
      </div>

      {/* Create Class Card */}
      <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Create New Class</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Class Name"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            className="p-2 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground"
          />

          <input
            type="text"
            placeholder="Subject"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="p-2 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground"
          />

          <button
            onClick={handleCreateClass}
            className="bg-primary hover:bg-primaryHover dark:bg-darkPrimary dark:hover:bg-darkPrimaryHover text-white rounded-lg px-4 py-2 shadow transition"
          >
            Create
          </button>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-textPrimary dark:text-darkTextPrimary">
              {cls.name}
            </h3>
            <p className="text-textSecondary mt-1">
              Subject: {cls.subject}
            </p>
            <p className="text-textSecondary mt-1">
              Students: {cls.students}
            </p>
          </div>
        ))}
      </div>
    </div>
    </DashboardLayout>
  );
}
