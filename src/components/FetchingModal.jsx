import { LoaderCircle,ShieldAlert } from "lucide-react";
import React from "react";

const FetchingModal = ({ status, handleRefetch }) => {
  return (
    <div className="absolute inset-0 bg-card bg-opacity-60 flex items-center justify-center z-10 rounded-2xl">
      {status === "fetching" && (
        <div className="text-secondary text-sm bg-card py-6 rounded flex items-center gap-2 justify-center shadow-lg">
          <LoaderCircle size={24} className="animate-spin" />
          Fetching assessment data.....
        </div>
      )}
      {status === "error" && (
        <div className="text-secondary text-sm bg-card py-6 px-4 w-full md:w-1/3 rounded flex items-center gap-2 justify-center shadow-lg">
          <ShieldAlert size={100}/>
          <div className="w-full">
            <p className="font-semibold text-sm">Error fetching data</p>
            <p className="text-xs">Please try again later.</p>
            <button onClick={handleRefetch} className="mt-4 px-4 py-2 bg-primary hover:bg-primaryHover dark:bg-darkPrimary dark:hover:bg-darkPrimaryHover text-white rounded-lg shadow-md transition">
                Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchingModal;
