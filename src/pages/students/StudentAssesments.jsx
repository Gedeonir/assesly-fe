import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Sample data
const assessments = [
  {
    id: 1,
    title: "Math Test 1",
    className: "Grade 9",
    dueDateTime: "2026-02-15T23:59",
    status: "pending",
  },
  {
    id: 2,
    title: "English Essay",
    className: "Grade 10",
    dueDateTime: "2026-02-10T23:59",
    status: "finished",
  },
  {
    id: 3,
    title: "Science Quiz",
    className: "Grade 9",
    dueDateTime: "2026-02-12T23:59",
    status: "pending",
  },
];

export default function StudentAssessments() {
  const [tab, setTab] = useState("pending");
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const navigate = useNavigate();

  const filtered = assessments
    .filter((a) => a.status === tab)
    .filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((a) =>
      filterClass ? a.className === filterClass : true
    );

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border dark:border-darkBorder">
        {["pending", "finished"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 font-semibold ${
              tab === t
                ? "border-b-2 border-primary text-primary"
                : "text-textSecondary dark:text-darkTextSecondary"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <input
          type="text"
          placeholder="Search assessments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg w-full md:w-1/2"
        />
        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="p-2 border rounded-lg w-full md:w-1/4"
        >
          <option value="">All Classes</option>
          <option value="Grade 9">Grade 9</option>
          <option value="Grade 10">Grade 10</option>
        </select>
      </div>

      {/* Assessment List */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.length === 0 && (
          <p className="text-textSecondary dark:text-darkTextSecondary col-span-full">
            No assessments found.
          </p>
        )}

        {filtered.map((a) => (
          <div
            key={a.id}
            className="bg-card dark:bg-darkCard p-4 rounded-xl shadow flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold">{a.title}</h3>
              <p className="text-textSecondary dark:text-darkTextSecondary">
                Class: {a.className}
              </p>
              <p className="text-textSecondary dark:text-darkTextSecondary">
                Due: {new Date(a.dueDateTime).toLocaleString()}
              </p>
            </div>
            <button
              className={`mt-4 px-4 py-2 rounded-lg text-white ${
                tab === "pending"
                  ? "bg-primary hover:bg-primaryHover"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={() =>
                tab === "pending" ? navigate(`/student/assessments/${a.id}/take`) : navigate(`/student/results/${a.id}`)
              }
            >
              {tab === "pending" ? "Take" : "View Results"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
