import React, { useState } from "react";

export default function CreateAssessmentModal({ onSave }) {
  const [title, setTitle] = useState("");
  const [className, setClassName] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [dueDateTime, setDueDateTime] = useState("");
  const [questions, setQuestions] = useState([
    { id: 1, text: "", type: "short", options: [""], required: false, correctAnswer: null },
  ]);

  const handleQuestionChange = (id, key, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [key]: value } : q))
    );
  };

  const addOption = (id) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const handleOptionChange = (qId, index, value) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === qId) {
          const newOptions = [...q.options];
          newOptions[index] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        text: "",
        type: "short",
        options: [""],
        required: false,
        correctAnswer: null,
      },
    ]);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const handleSave = () => {
    const newAssessment = { title, className, startDateTime, dueDateTime, questions };
    onSave(newAssessment);

    // Reset form
    setTitle("");
    setClassName("");
    setStartDateTime("");
    setDueDateTime("");
    setQuestions([{ id: 1, text: "", type: "short", options: [""], required: false, correctAnswer: null }]);
  };

  return (
    <div className="bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card dark:bg-darkCard rounded-2xl w-full p-6 shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-textPrimary dark:text-darkTextPrimary mb-4">
          Create New Assessment
        </h2>

        {/* ===== Settings Section ===== */}
        <div className="mb-6 border-b border-border dark:border-darkBorder pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-textSecondary dark:text-darkTextSecondary mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground text-textPrimary dark:text-darkTextPrimary"
                placeholder="Assessment Title"
              />
            </div>

            {/* Class */}
            <div>
              <label className="block text-textSecondary dark:text-darkTextSecondary mb-1">
                Class
              </label>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full p-2 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground text-textPrimary dark:text-darkTextPrimary"
              >
                <option value="">Select class</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
              </select>
            </div>

            {/* Start Date & Time */}
            <div>
              <label className="block text-textSecondary dark:text-darkTextSecondary mb-1">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                className="w-full p-2 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground text-textPrimary dark:text-darkTextPrimary"
              />
            </div>

            {/* Due Date & Time */}
            <div>
              <label className="block text-textSecondary dark:text-darkTextSecondary mb-1">
                Due Date & Time
              </label>
              <input
                type="datetime-local"
                value={dueDateTime}
                onChange={(e) => setDueDateTime(e.target.value)}
                className="w-full p-2 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground text-textPrimary dark:text-darkTextPrimary"
              />
            </div>
          </div>
        </div>

        {/* ===== Questions Section ===== */}
        <div>
          <h3 className="text-lg font-semibold text-textPrimary dark:text-darkTextPrimary mb-3">
            Questions
          </h3>
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="mb-4 border border-border dark:border-darkBorder p-3 rounded-xl bg-background dark:bg-darkBackground relative"
            >
              {/* Remove Question Button */}
              {questions.length > 1 && (
                <button
                  onClick={() => removeQuestion(q.id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-700 font-bold"
                  title="Remove Question"
                >
                  ×
                </button>
              )}

              {/* Question Text */}
              <div className="mb-2">
                <input
                  type="text"
                  value={q.text}
                  onChange={(e) =>
                    handleQuestionChange(q.id, "text", e.target.value)
                  }
                  placeholder={`Question ${index + 1}`}
                  className="w-full p-2 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground text-textPrimary dark:text-darkTextPrimary"
                />
              </div>

              {/* Question Type & Required */}
              <div className="flex items-center gap-2 mb-2">
                <label className="text-textSecondary dark:text-darkTextSecondary">
                  Type:
                </label>
                <select
                  value={q.type}
                  onChange={(e) =>
                    handleQuestionChange(q.id, "type", e.target.value)
                  }
                  className="p-1 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground text-textPrimary dark:text-darkTextPrimary"
                >
                  <option value="short">Short Answer</option>
                  <option value="mcq">Multiple Choice</option>
                  <option value="dropdown">Dropdown</option>
                </select>

                <label className="flex items-center gap-1 ml-4">
                  <input
                    type="checkbox"
                    checked={q.required}
                    onChange={(e) =>
                      handleQuestionChange(q.id, "required", e.target.checked)
                    }
                  />
                  Required
                </label>
              </div>

              {/* Options for MCQ/Dropdown */}
              {(q.type === "mcq" || q.type === "dropdown") && (
                <div className="mb-2">
                  {q.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1">
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(q.id, i, e.target.value)
                        }
                        placeholder={`Option ${i + 1}`}
                        className="flex-1 p-2 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground text-textPrimary dark:text-darkTextPrimary"
                      />

                      {/* Correct Answer Selector */}
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`correct-${q.id}`}
                          checked={q.correctAnswer === i}
                          onChange={() =>
                            handleQuestionChange(q.id, "correctAnswer", i)
                          }
                        />
                        Correct
                      </label>
                    </div>
                  ))}

                  <button
                    onClick={() => addOption(q.id)}
                    className="mt-1 px-2 py-1 bg-primary hover:bg-primaryHover dark:bg-darkPrimary dark:hover:bg-darkPrimaryHover text-white rounded-md shadow transition"
                  >
                    + Add Option
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add new question button */}
          <button
            onClick={addQuestion}
            className="px-3 py-2 bg-success hover:bg-green-600 text-white rounded-lg shadow transition"
          >
            + Add Question
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-4 py-2 bg-border dark:bg-darkBorder text-textSecondary dark:text-darkTextSecondary rounded-lg"
            onClick={() => console.log("Cancel clicked")}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary hover:bg-primaryHover dark:bg-darkPrimary dark:hover:bg-darkPrimaryHover text-white rounded-lg shadow transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
