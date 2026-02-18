import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../../context/UseAuth";
import Skeleton from "../../components/Skeleton";
import { Trash2 } from "lucide-react";
import { log } from "firebase/firestore/pipelines";

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newClassName, setNewClassName] = useState("");

  const { getClasses, createClass, deleteClass } = useAuth();
  const handleGetClasses = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const classes = await getClasses();

      setClasses(classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const handleCreateClass = async () => {
    if (!newClassName) return;

    const result = await createClass(newClassName);
    if (result && !result.error) {
      handleGetClasses(false); // Refresh the list of classes without showing loading indicator
    }
  };

  const [deleteStatus, setDeleteStatus] = useState({
    loading: false,
    error: null,
    success: null,
  }); // Track delete status for each class

  const handleDeleteClass = async (classId, className) => {
    setDeleteStatus({ loading: true, error: null, success: null });
    const result = await deleteClass(classId);
    console.log(result);
    if (result && !result.error) {
      setDeleteStatus({
        loading: false,
        error: null,
        success: `Class "${className}" deleted successfully`,
      });
      handleGetClasses(false); // Refresh the list of classes without showing loading indicator
    } else {
      setDeleteStatus({
        loading: false,
        error: "Failed to delete class",
        success: null,
      });
    }
  };

  useEffect(() => {
    handleGetClasses();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-textPrimary dark:text-darkTextPrimary">
            My Classes
          </h1>
        </div>

        {/* Create Class Card */}
        <div className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow space-y-4">
          <h2 className="text-lg font-semibold">Create New Class</h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="col-span-4 w-full">
              <input
                type="text"
                placeholder="Class Name"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="p-2 w-full border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground"
              />
            </div>
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

          {deleteStatus.error && (
            <div className="col-span-full text-center text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900 rounded-lg py-2 px-4">
              {deleteStatus.error}
            </div>
          )}
          {deleteStatus.success && (
            <div className="col-span-full text-left rounded-lg py-2 px-4 bg-green-100 dark:bg-green-900 text-green-500 dark:text-green-400">
              {deleteStatus.success}
            </div>
          )}
          {loading && (
            <>
              <Skeleton width="100%" height="90px" />
              <Skeleton width="100%" height="90px" />
              <Skeleton width="100%" height="90px" />
            </>
          )}

          {classes.length === 0 && !loading && (
            <p className="text-left text-textSecondary dark:text-darkTextSecondary">
              No classes found. Create your first class!
            </p>
          )}

          {classes.length > 0 &&
            classes.map((cls) => (
              <div
                key={cls._id}
                className="bg-card dark:bg-darkCard p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-row justify-between"
              >
                <h3 className="text-lg font-semibold text-textPrimary dark:text-darkTextPrimary">
                  {cls.name}
                </h3>

                <button
                  onClick={() => handleDeleteClass(cls._id,cls.name)}
                  className="text-sm text-textSecondary dark:text-darkTextSecondary mt-2 cursor-pointer hover:text-primary dark:hover:text-darkPrimary transition"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
