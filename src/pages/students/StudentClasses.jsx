import { useNavigate } from "react-router-dom";

export default function StudentClasses() {
  const navigate = useNavigate();

  const classes = [
    {
      id: 1,
      name: "Grade 10 - A",
      subject: "Mathematics",
      teacher: "Mr. John Smith",
      assessments: 5,
    },
    {
      id: 2,
      name: "Grade 11 - B",
      subject: "Physics",
      teacher: "Mrs. Adams",
      assessments: 3,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Classes</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="bg-card dark:bg-darkCard p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{cls.name}</h3>
            <p className="text-textSecondary mt-1">
              Subject: {cls.subject}
            </p>
            <p className="text-textSecondary">
              Teacher: {cls.teacher}
            </p>
            <p className="text-textSecondary">
              Assessments: {cls.assessments}
            </p>

            <button
              onClick={() =>
                navigate(`/student/classes/${cls.id}`)
              }
              className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primaryHover transition"
            >
              View Class
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
