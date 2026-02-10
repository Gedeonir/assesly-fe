import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoutes";
import TeacherAssessments from "./pages/Teacher/TAssesments";

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
      
      <Route path="/teacher/dashboard/assessments" element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherAssessments />
          </ProtectedRoute>
        } />


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
