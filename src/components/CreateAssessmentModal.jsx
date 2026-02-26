import React, { useState } from "react";
import { useAuth } from "../context/UseAuth";
import { Trash2 } from "lucide-react";

export default function CreateAssessmentModal({ onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    className: "",
    startDateTime: "",
    dueDateTime: "",
    totalMarks: 0,
    duration: 0,
  });
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "",
      type: "short",
      options: [""],
      required: false,
      correctAnswer: null,
      marks: 2,
    },
  ]);

  const handleQuestionChange = (id, key, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [key]: value } : q)),
    );
  };

  const addOption = (id) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, options: [...q.options, ""] } : q,
      ),
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
      }),
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

  const [response, setResponse] = useState({
    success: null,
    error: null,
    loading: false,
  });

  const handleSave = () => {

    setResponse({ ...response, loading: true });

    const newAssessment = {
      title: formData.title,
      class: formData.className,
      startDateTime: formData.startDateTime,
      endDateTime: formData.dueDateTime,
      duration: formData.duration,
      totalMarks: questions.reduce(
        (total, q) => total + Number(q.marks || 0),
        0,
      ),
      questions,
    };

    if(!formData.title.trim()||!formData.className.trim()||!formData.startDateTime||!formData.dueDateTime){
      setResponse({
        ...response,
        loading: false,
        error: "Please fill in all required fields.",
      });

      setErrors({
        title: !formData.title.trim() ? "Title is required" : "",
        className: !formData.className.trim() ? "Class is required" : "",
        startDateTime: !formData.startDateTime ? "Start date is required" : "",
        dueDateTime: !formData.dueDateTime ? "Due date is required" : "",
        duration: !formData.duration ? "Duration is required" : "",
        question: questions.length === 0 ? "At least one question is required" : "",
      });
      return;
    }
    try {
      onSave(newAssessment);

      setResponse({
        ...response,
        loading: false,
        success: `Assessment "${formData.title}" created successfully!`,
      });

      setTimeout(() => {
        setResponse({ ...response, success: null });
      }, 3000);

      // Reset form
      setFormData({
        title: "",
        className: "",
        startDateTime: "",
        dueDateTime: "",
      });
      setQuestions([
        {
          id: 1,
          text: "",
          type: "short",
          options: [""],
          required: false,
          correctAnswer: null,
        },
      ]);
    } catch (error) {
      setResponse({
        ...response,
        loading: false,
        error: `Failed to create assessment "${formData.title}".`,
      });

      setTimeout(() => {
        setResponse({ ...response, error: null });
      }, 3000);
    }
  };

  const { getClasses } = useAuth();
  const [classes, setClasses] = useState([]);

  const handleGetClasses = async () => {
    // Replace with actual API call to fetch classes
    try {
      const classes = await getClasses();
      setClasses(classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const [errors, setErrors] = useState({});
  const validate = (name, value) => {
    let validated = true;
    let error = "";

    if (!value.trim()) {
      error = "This field is required";
      validated = false;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return validated;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validate(name, value); // 🔥 live validation
  };

  const [questionErrors, setQuestionErrors] = useState({});

  const validateQuestions = () => {
    let valid = true;
    questions.forEach((q) => {
      if (!q.text.trim()) {
        valid = false;
      }
    });
    setQuestionErrors(
      questions.reduce((acc, q) => {
        acc[q.id] = !q.text.trim() ? "Question text is required" : "";
        return acc;
      }, {}),
    );
    return valid;
  };

  React.useEffect(() => {
    handleGetClasses();
    validateQuestions();
  }, []);

  const getToday = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localToday = new Date(today.getTime() - offset * 60 * 1000);
  return localToday.toISOString().split("T")[0];
};


  const today = getToday();

  

  return (
    <div className="bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card dark:bg-darkCard rounded-2xl w-full p-6 shadow-lg overflow-y-auto max-h-[90vh]">
        <div className=" flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-textPrimary dark:text-darkTextPrimary mb-4">
            Create New Assessment
          </h2>
          <p className="text-sm text-textSecondary dark:text-darkTextSecondary mb-6">
            Marks:{" "}
            {questions.reduce((total, q) => total + Number(q.marks || 0), 0)}
          </p>
        </div>

        {response.success && (
          <div className="mb-4 text-green-600 font-semibold text-sm bg-green-100 p-2 rounded">
            {response.success}
          </div>
        )}
        {response.error && (
          <div className="mb-4 text-red-600 font-semibold text-sm bg-red-100 p-2 rounded">
            {response.error}
          </div>
        )}

        {/* ===== Settings Section ===== */}
        <div className="mb-6 border-b border-border dark:border-darkBorder pb-4">
          {errors.general && (
            <div className="mb-4 text-red-600 font-semibold">
              {errors.general}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-textSecondary dark:text-darkTextSecondary mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                name="title"
                onBlur={handleChange}
                onChange={handleChange}
                className={`w-full p-2 border  rounded-lg bg-background dark:bg-darkBackground text-textPrimary dark:text-darkTextPrimary ${errors.title ? "border-red-500" : "border-border dark:border-darkBorder"}`}
                placeholder="Assessment Title"
              />
            </div>

            {/* Class */}
            <div>
              <label className="block text-textSecondary dark:text-darkTextSecondary mb-1">
                Class
              </label>
              <select
                value={formData.className}
                name="className"
                onBlur={handleChange}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg bg-background dark:bg-darkBackground text-textPrimary dark:text-darkTextPrimary ${errors.className ? "border-red-500" : "border-border dark:border-darkBorder"}`}
              >
                <option value="">Select class</option>
                {classes?.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-textSecondary dark:text-darkTextSecondary mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={formData.duration}
                name="duration"
                onBlur={handleChange}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.duration ? "border-red-500" : "border-border dark:border-darkBorder"} rounded-lg bg-background dark:bg-darkBackground text-textPrimary dark:text-darkTextPrimary`}
                placeholder="Duration in minutes"
              />
            </div>

            {/* Start Date & Time */}
            <div>
              <label className="block text-textSecondary dark:text-darkTextSecondary mb-1">
                Start Date & Time
              </label>
              <input
                type="date"
                value={formData.startDateTime}
                min={new Date().toISOString().split("T")[0]}
                name="startDateTime"
                onBlur={handleChange}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.startDateTime ? "border-red-500" : "border-border dark:border-darkBorder"} rounded-lg bg-background dark:bg-darkBackground text-textPrimary dark:text-darkTextPrimary`}
              />
            </div>

            {/* Due Date & Time */}
            <div>
              <label className="block text-textSecondary dark:text-darkTextSecondary mb-1">
                Due Date & Time
              </label>
              <input
                type="date"
                value={formData.dueDateTime}
                name="dueDateTime"
                min={today}
                onBlur={handleChange}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.dueDateTime ? "border-red-500" : "border-border dark:border-darkBorder"} rounded-lg bg-background dark:bg-darkBackground text-textPrimary dark:text-darkTextPrimary`}
              />
            </div>
          </div>
        </div>

        {/* ===== Questions Section ===== */}
        <div className={`mb-6 ${errors.question ? "border-red-500" : "border-border dark:border-darkBorder"} border rounded-lg p-4`}>
          <h3 className="text-lg font-semibold text-textPrimary dark:text-darkTextPrimary mb-3">
            Questions
          </h3>
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="mb-4 border border-border dark:border-darkBorder p-3 rounded-xl bg-background dark:bg-darkBackground relative"
            >
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
                <input
                  type="number"
                  min="0"
                  value={q.marks}
                  onChange={(e) =>
                    handleQuestionChange(q.id, "marks", e.target.value)
                  }
                  placeholder="Marks"
                  className="w-20 p-1 border border-border dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground text-textPrimary dark:text-darkTextPrimary ml-auto"
                />

                {/* Remove Question Button */}
                {questions.length > 1 && (
                  <button
                    onClick={() => removeQuestion(q.id)}
                    className="text-textSecondary dark:text-darkTextSecondary cursor-pointer hover:text-primary dark:hover:text-darkPrimary transition p-2"
                    title="Remove Question"
                  >
                    <Trash2 size={18}/>
                  </button>
                )}
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
