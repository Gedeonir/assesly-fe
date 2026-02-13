import React from "react";

function LogoutModal({setShowLogoutModal,handleLogout}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className="bg-white dark:bg-darkCard 
                p-6 rounded-xl shadow-xl 
                w-[90%] sm:w-96 space-y-4"
      >
        <h2 className="text-lg font-semibold">Confirm Logout</h2>
        <p className="text-textSecondary dark:text-darkTextSecondary">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowLogoutModal(false)}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
