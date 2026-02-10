import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user } = useAuth();

  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but role not allowed
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
