import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../../context/UseAuth";
import Skeleton from "../../components/Skeleton";

export default function TeacherStudents() {
  const { getStudents, getClasses, assignStudentToClass } = useAuth();

  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const studentsRes = await getStudents();
      const classesRes = await getClasses();

      if (!studentsRes.error) setStudents(studentsRes);
      if (!classesRes.error) setClasses(classesRes);

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleAssign = async (studentId, classId) => {
    const res = await assignStudentToClass(studentId, classId);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const filteredStudents = students?.students?.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      selectedClass === "" ||
      student?.studentData?.class?._id === selectedClass;

    return matchesSearch && matchesClass;
  });

  return (
    <DashboardLayout>
      <div className="bg-card p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold mb-6">Manage Students</h3>

        {loading ? (
          <Skeleton width="100%" height="200px" />
        ) : (
          <div className="overflow-x-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-1/2 p-2 border rounded-lg"
              />

              {/* Filter by Class */}
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full md:w-1/3 p-2 border rounded-lg"
              >
                <option value="">All Classes</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>
            <table className="w-full text-left border-collapse">
              {/* Desktop Header */}
              <thead className="hidden md:table-header-group">
                <tr className="border-b">
                    <th className="p-3">SN</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Current Class</th>
                  <th className="p-3">Assign / Reassign</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents?.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-10 text-gray-500">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents?.map((student) => (
                    <tr
                      key={student._id}
                      className="
                  border-b
                  block md:table-row
                  mb-4 md:mb-0
                  bg-gray-50 md:bg-transparent
                  rounded-xl md:rounded-none
                  p-4 md:p-0
                "
                    >
                                              {/* Name */}
                      <td className="p-2 md:p-3 block md:table-cell">
                        <span className="md:hidden font-semibold">SN: </span>
                        {student?.studentData?.enrollmentNumber}
                      </td>
                      {/* Name */}
                      <td className="p-2 md:p-3 block md:table-cell">
                        <span className="md:hidden font-semibold">Name: </span>
                        {student.name}
                      </td>

                      {/* Email */}
                      <td className="p-2 md:p-3 block md:table-cell">
                        <span className="md:hidden font-semibold">Email: </span>
                        {student.email}
                      </td>

                      {/* Current Class */}
                      <td className="p-2 md:p-3 block md:table-cell">
                        <span className="md:hidden font-semibold">
                          Current Class:{" "}
                        </span>
                        {student?.studentData?.className?.name ||
                          "Not Assigned"}
                      </td>

                      {/* Assign */}
                      <td className="p-2 md:p-3 block md:table-cell">
                        <span className="md:hidden font-semibold">
                          Assign / Reassign:{" "}
                        </span>
                        <select
                          value={student?.studentData?.class?._id || ""}
                          onChange={(e) =>
                            handleAssign(student._id, e.target.value)
                          }
                          className="w-full md:w-auto border p-2 rounded-lg"
                        >
                          <option value="">Select Class</option>
                          {classes.map((cls) => (
                            <option key={cls._id} value={cls._id}>
                              {cls.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
