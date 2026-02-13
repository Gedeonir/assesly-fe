import { useState } from "react";
import { NavLink } from "react-router-dom";
import jsPDF from "jspdf";

export default function StudentResultsHistory() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortNewest, setSortNewest] = useState(true);

  const results = [
    { id: 1, title: "Algebra Test", score: 18, total: 20, date: "2026-02-10" },
    { id: 2, title: "Physics Quiz", score: 14, total: 20, date: "2026-02-08" },
    { id: 3, title: "Chemistry Exam", score: 9, total: 20, date: "2026-02-01" },
  ];

  const getPercentage = (r) => ((r.score / r.total) * 100).toFixed(0);

  const getGrade = (percentage) => {
    if (percentage >= 90) return "A";
    if (percentage >= 80) return "B";
    if (percentage >= 70) return "C";
    if (percentage >= 60) return "D";
    return "F";
  };

  const filteredResults = results
    .filter((r) => {
      const percentage = getPercentage(r);
      if (filter === "pass") return percentage >= 50;
      if (filter === "fail") return percentage < 50;
      return true;
    })
    .filter((r) =>
      r.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortNewest
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Student Results", 10, 10);

    filteredResults.forEach((r, index) => {
      const percentage = getPercentage(r);
      doc.text(
        `${r.title} - ${r.score}/${r.total} (${percentage}%)`,
        10,
        20 + index * 10
      );
    });

    doc.save("results.pdf");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-xl sm:text-2xl font-bold">My Results</h1>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <input
          type="text"
          placeholder="Search assessment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg w-full md:w-1/3"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              filter === "all" ? "bg-primary text-white" : "border"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pass")}
            className={`px-4 py-2 rounded-lg ${
              filter === "pass" ? "bg-green-500 text-white" : "border"
            }`}
          >
            Pass
          </button>
          <button
            onClick={() => setFilter("fail")}
            className={`px-4 py-2 rounded-lg ${
              filter === "fail" ? "bg-red-500 text-white" : "border"
            }`}
          >
            Fail
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSortNewest(!sortNewest)}
            className="px-4 py-2 border rounded-lg"
          >
            Sort: {sortNewest ? "Newest" : "Oldest"}
          </button>

          <button
            onClick={exportToPDF}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredResults.map((result) => {
          const percentage = getPercentage(result);
          const grade = getGrade(percentage);

          return (
            <div
              key={result.id}
              className="bg-card dark:bg-darkCard p-4 rounded-xl shadow space-y-3"
            >
              <div className="flex justify-between items-center">
                <NavLink
                  to={`/student/results/${result.id}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {result.title}
                </NavLink>

                <span className="px-3 py-1 rounded-full bg-gray-200 text-sm font-bold">
                  {grade}
                </span>
              </div>

              <p>
                Score: {result.score} / {result.total} ({percentage}%)
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    percentage >= 50 ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <p className="text-sm text-textSecondary">
                {new Date(result.date).toDateString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
