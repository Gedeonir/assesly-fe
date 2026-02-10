import { useAuth } from "../context/UseAuth";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../utils/ThemeToggle";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    // redirect by role
    if (role === "teacher") navigate("/teacher");
    else navigate("/student");
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={() => handleLogin("teacher")}>Login as Teacher</button>
      <button onClick={() => handleLogin("student")}>Login as Student</button>

      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-bold text-blue-600">Assessly</h1>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Test Button
        </button>
      </div>

      <div className="min-h-screen bg-darkBackground flex items-center justify-center">
        <div className="bg-card dark:bg-darkCard p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold text-primary dark:text-darkPrimary mb-4">
            Welcome to Assessly
          </h1>
          <p className="text-textSecondary dark:text-darkTextSecondary mb-6">
            Daily assessments made simple.
          </p>
          <button className="bg-primary hover:bg-primaryHover dark:bg-darkPrimary dark:hover:bg-darkPrimaryHover text-white px-6 py-2 rounded">
            Get Started
          </button>
        </div>
      </div>

    </div>
  );
}

export default Login;
