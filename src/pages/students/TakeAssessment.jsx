import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TakeAssessment() {
  const navigate = useNavigate();

  const baseAssessment = {
    title: "Algebra Test",
    duration: 120,
    questions: [
      {
        id: 1,
        type: "mcq",
        question: "What is 2 + 2?",
        options: ["3", "4", "5"],
        correctAnswer: "4",
        marks: 5,
      },
      {
        id: 2,
        type: "dropdown",
        question: "Capital of France?",
        options: ["London", "Paris", "Berlin"],
        correctAnswer: "Paris",
        marks: 5,
      },
      {
        id: 3,
        type: "short",
        question: "Solve: 5 x 3",
        correctAnswer: "15",
        marks: 10,
      },
    ],
  };

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(baseAssessment.duration);
  const [showFullscreenModal, setShowFullscreenModal] = useState(false);
  const [violations, setViolations] = useState(0);

  // Start Assessment
  const handleStart = () => {
    const shuffledQuestions = shuffleArray(baseAssessment.questions).map(
      (q) => {
        if (q.type === "mcq" || q.type === "dropdown") {
          return {
            ...q,
            options: shuffleArray(q.options),
          };
        }
        return q;
      },
    );

    setQuestions(shuffledQuestions);
    setStarted(true);
    enterFullscreen();
  };

  // Fullscreen
  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  // Timer
  useEffect(() => {
    if (!started) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, started]);

  // Anti cheat
  useEffect(() => {
    if (!started) return;

    const block = (e) => e.preventDefault();
    const handleKey = (e) => {
      if (e.ctrlKey && ["c", "v", "x"].includes(e.key)) {
        e.preventDefault();
      }
    };

    document.addEventListener("copy", block);
    document.addEventListener("paste", block);
    document.addEventListener("cut", block);
    document.addEventListener("contextmenu", block);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("copy", block);
      document.removeEventListener("paste", block);
      document.removeEventListener("cut", block);
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("keydown", handleKey);
    };
  }, [started]);

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = () => {
    let score = 0;
    let total = 0;

    questions.forEach((q) => {
      total += q.marks;
      if (answers[q.id] === q.correctAnswer) {
        score += q.marks;
      }
    });

    // Exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error("Error exiting fullscreen:", err);
      });
    }

    navigate("/student/results/1", {
      state: { score, total, answers, questions },
    });
  };

  const scrollToQuestion = (id) => {
    const element = document.getElementById(`question-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFullscreenExit = () => {
    setViolations((prev) => {
      const newCount = prev + 1;

      if (newCount > 3) {
        handleSubmit();
      }

      return newCount;
    });
  };

  useEffect(() => {
    if (!started) return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        handleFullscreenExit();
        setShowFullscreenModal(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [started]);

  const handleReturnToFullscreen = () => {
    enterFullscreen();
    setShowFullscreenModal(false);
  };

  const handleForceSubmit = () => {
    handleSubmit();
  };

  // START MODAL
  if (!started) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="bg-card dark:bg-darkCard p-8 rounded-xl shadow max-w-md text-center space-y-4">
          <h2 className="text-xl font-bold">Ready to Start?</h2>
          <p className="text-textSecondary">This assessment will:</p>

          <ul className="text-sm text-left space-y-1">
            <li>🔒 Enter fullscreen mode</li>
            <li>🚫 Disable copy & paste</li>
            <li>⏳ Start timer immediately</li>
            <li>⚠ Auto-submit when time ends</li>
            <li>⚠ Auto-submit when fullscreen is exited more than 3 times</li>
          </ul>

          <button
            onClick={handleStart}
            className="bg-primary text-white px-6 py-2 rounded-lg mt-4 hover:bg-primaryHover transition"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 select-none">
      {/* Question Status Panel */}
      <div className="w-48 bg-card dark:bg-darkCard p-4 rounded-xl shadow h-fit sticky top-6">
        <h3 className="font-semibold mb-3">Questions</h3>

        <div className="grid grid-cols-4 gap-2">
          {questions.map((q, index) => {
            const isAnswered = answers[q.id];

            return (
              <button
                key={q.id}
                onClick={() => scrollToQuestion(q.id)}
                className={`w-8 h-8 text-sm rounded-full font-medium transition
                ${
                  isAnswered
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }
              `}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-xs space-y-1">
          <p>
            <span className="text-green-500">●</span> Answered
          </p>
          <p>
            <span className="text-red-500">●</span> Not Answered
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{baseAssessment.title}</h1>
        <div className="bg-red-500 text-white px-4 py-2 rounded-lg">
          ⏳ {timeLeft}s
        </div>
      </div>

      {questions.map((q) => (
        <div
          id={`question-${q.id}`}
          key={q.id}
          className="bg-card dark:bg-darkCard p-6 rounded-xl shadow space-y-4"
        >
          <h3 className="font-semibold">
            {q.question} ({q.marks} marks)
          </h3>

          {q.type === "mcq" &&
            q.options.map((opt, i) => (
              <label key={i} className="block">
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  className="mr-2 border-gray-300 text-primary focus:ring-primary"
                />
                {opt}
              </label>
            ))}

          {q.type === "dropdown" && (
            <select
              onChange={(e) => handleChange(q.id, e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="">Select</option>
              {q.options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {q.type === "short" && (
            <input
              type="text"
              onChange={(e) => handleChange(q.id, e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primaryHover transition"
      >
        Submit
      </button>

      {showFullscreenModal && (
        <div className="fixed inset-0  bg-black/70 flex items-center justify-center z-50 bg-background dark:bg-darkBackground">
          <div className="bg-white dark:bg-darkCard p-8 rounded-xl shadow-xl max-w-md text-center space-y-4">
            <h2 className="text-xl font-bold text-red-500">
              Fullscreen Required
            </h2>

            <p>
              You exited fullscreen mode.
              <br />
              Violations: {violations}
            </p>

            <p className="text-sm text-textSecondary">
              You must remain in fullscreen during the assessment.
            </p>

            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={handleReturnToFullscreen}
                className="bg-primary text-white px-4 py-2 rounded-lg"
              >
                Return to Fullscreen
              </button>

              <button
                onClick={handleForceSubmit}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Submit Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
