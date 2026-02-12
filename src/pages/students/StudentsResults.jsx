import { useLocation } from "react-router-dom";

export default function StudentResults() {
  const location = useLocation();
  const { score, total, answers, questions } = location.state || {};

  const percentage = total
    ? ((score / total) * 100).toFixed(0)
    : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Assessment Result
      </h1>

      <div className="bg-card dark:bg-darkCard p-6 rounded-xl shadow text-center">
        <p className="text-3xl font-bold text-primary">
          {score} / {total}
        </p>
        <p className="text-lg mt-2">{percentage}%</p>
      </div>

      {/* Review Section */}
      <div className="space-y-4">
        {questions?.map((q) => (
          <div
            key={q.id}
            className="bg-card dark:bg-darkCard p-4 rounded-lg shadow"
          >
            <p className="font-semibold">{q.question}</p>
            <p>
              Your Answer:{" "}
              <span
                className={
                  answers[q.id] === q.correctAnswer
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {answers[q.id] || "Not Answered"}
              </span>
            </p>
            <p>
              Correct Answer:{" "}
              <span className="text-green-600">
                {q.correctAnswer}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
