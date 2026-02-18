import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";


export default function Navbar({ toggleCollapse, collapsed }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <nav className="w-full bg-card dark:bg-darkCard shadow-md px-6 py-2 flex items-center justify-between">
      {/* Left: App title */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-lg hover:bg-background dark:hover:bg-darkBackground text-textPrimary dark:text-darkTextPrimary"
        >
          {!collapsed && <Menu size={20} />}
        </button>
        <img
          src="/src/assets/AsseslyLogo.png"
          alt="Assessly Logo"
          className="w-32 h-16"
        />
      </div>

      {/* Right: User info */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
        <button className="relative text-textSecondary dark:text-darkTextSecondary hover:text-primary dark:hover:text-darkPrimary transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-error rounded-full"></span>
        </button>

        {/* Profile hover dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setOpenModal(true)}
          onMouseLeave={() => setOpenModal(!openModal)}
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/030/504/837/non_2x/avatar-account-flat-isolated-on-transparent-background-for-graphic-and-web-design-default-social-media-profile-photo-symbol-profile-and-people-silhouette-user-icon-vector.jpg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-border dark:border-darkBorder cursor-pointer"
          />

          {/* Dropdown */}
          {openModal && (
            <div className="absolute right-0 mt-2 w-48 bg-card dark:bg-darkCard shadow-lg rounded-lg transition-all duration-200 z-50">
              <div className="p-4 flex flex-col gap-2">
                <span className="font-medium text-textPrimary dark:text-darkTextPrimary">
                  John Doe
                </span>
                <span className="text-sm text-textSecondary dark:text-darkTextSecondary">
                  john.doe@example.com
                </span>
                <button className="mt-2 py-1 px-3 text-white bg-primary rounded-md hover:bg-primaryHover dark:bg-darkPrimary dark:hover:bg-darkPrimaryHover transition">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
