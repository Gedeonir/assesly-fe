export default function StudentResultsHistory() {
  const results = [
    {
      id: 1,
      title: "Algebra Test",
      score: 18,
      total: 20,
      date: "Feb 10, 2026",
    },
    {
      id: 2,
      title: "Physics Quiz",
      score: 14,
      total: 20,
      date: "Feb 08, 2026",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Results</h1>

      <div className="bg-card dark:bg-darkCard rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-background dark:bg-darkBackground">
            <tr>
              <th className="p-4">Assessment</th>
              <th className="p-4">Score</th>
              <th className="p-4">Percentage</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {results.map((result) => {
              const percentage = (
                (result.score / result.total) *
                100
              ).toFixed(0);

              return (
                <tr
                  key={result.id}
                  className="border-t border-border dark:border-darkBorder"
                >
                  <td className="p-4"><a href={`/student/results/${result.id}`}>{result.title}</a></td>
                  <td className="p-4">
                    {result.score} / {result.total}
                  </td>
                  <td
                    className={`p-4 font-semibold ${
                      percentage >= 50
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {percentage}%
                  </td>
                  <td className="p-4">{result.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
