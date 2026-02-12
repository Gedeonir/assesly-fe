export default function Performance() {
  const data = [
    { title: "Algebra Test", score: 85 },
    { title: "Physics Quiz", score: 70 },
    { title: "Chemistry Exam", score: 92 },
  ];

  const average =
    data.reduce((acc, item) => acc + item.score, 0) /
    data.length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Performance Analytics
      </h1>

      {/* Average Card */}
      <div className="bg-card dark:bg-darkCard p-6 rounded-xl shadow text-center">
        <p className="text-textSecondary">Average Score</p>
        <p className="text-4xl font-bold text-primary mt-2">
          {average.toFixed(0)}%
        </p>
      </div>

      {/* Individual Performance */}
      <div className="bg-card dark:bg-darkCard p-6 rounded-xl shadow space-y-5">
        {data.map((item, index) => (
          <div key={index}>
            <p className="font-medium">{item.title}</p>
            <div className="w-full bg-background dark:bg-darkBackground rounded-full h-3 mt-2">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: `${item.score}%` }}
              />
            </div>
            <p className="text-sm mt-1">
              {item.score}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
