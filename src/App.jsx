import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoutes";
import TeacherAssessments from "./pages/Teacher/TAssesments";
import CreateAssessment from "./pages/Teacher/CreateAssesment";
import AssessmentView from "./pages/Teacher/AssesmentView";
import Profile from "./pages/Teacher/TProfile";
import Classes from "./pages/Teacher/TClasses";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/teacher/dashboard/"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      >
        {/* <Route path="classes" element={<TeacherClasses />} /> */}
      </Route>

      <Route
        path="/teacher/dashboard/assessments"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherAssessments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/dashboard/assessments/new"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <CreateAssessment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/dashboard/assessments/view"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <AssessmentView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/dashboard/profile"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/dashboard/classes"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <Classes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
