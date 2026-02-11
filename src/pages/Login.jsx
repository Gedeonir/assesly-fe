import { useAuth } from "../context/UseAuth";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../utils/ThemeToggle";
import { useState } from "react";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (role) => {
    login(role);
    // redirect by role
    if (role === "teacher") navigate("/teacher/dashboard");
    else navigate("/student");
  };

  const handleGoogleLogin = () => {
    // Replace with Google OAuth login
    console.log("Login with Google");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background dark:bg-darkBackground">
      {/* Left side: Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-card dark:bg-darkCard p-8 rounded-2xl shadow-lg">
          <img
            src="/src/assets/AsseslyLogo.png"
            alt="Assessly Logo"
            className="w-32 h-12 mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold text-textPrimary dark:text-darkTextPrimary text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-textSecondary dark:text-darkTextSecondary text-center mb-6">
            Log in to continue managing daily assessments
          </p>

          {/* Form inputs */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-border dark:border-darkBorder bg-background dark:bg-darkCard text-textPrimary dark:text-darkTextPrimary focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-darkPrimary"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-border dark:border-darkBorder bg-background dark:bg-darkCard text-textPrimary dark:text-darkTextPrimary focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-darkPrimary"
            />
          </div>

          {/* Forgot password */}
          <div className="text-right mt-2">
            <button className="text-sm text-primary dark:text-darkPrimary hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Login button */}
          <button
            onClick={() => handleLogin("student")}
            className="w-full mt-4 py-3 bg-primary hover:bg-primaryHover dark:bg-darkPrimary dark:hover:bg-darkPrimaryHover text-white rounded-lg shadow-md transition"
          >
            Login
          </button>

          {/* Or divider */}
          <div className="flex items-center my-4">
            <hr className="flex-1 border-border dark:border-darkBorder" />
            <span className="mx-2 text-textSecondary dark:text-darkTextSecondary text-sm">
              OR
            </span>
            <hr className="flex-1 border-border dark:border-darkBorder" />
          </div>

          {/* Continue with Google */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 border border-border dark:border-darkBorder rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-darkCard transition"
          >
            <img
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>
      </div>

      {/* Right side: Illustration */}
      <div className="flex-1 hidden md:flex items-center justify-center p-8">
        <img
          src="/src/assets/AsseslyLogo.png"
          alt="Assessly Illustration"
          className="max-w-lg animate-fadeIn"
        />
      </div>
    </div>
  );
}

export default Login;
