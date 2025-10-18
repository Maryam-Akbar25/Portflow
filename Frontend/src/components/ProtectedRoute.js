import { Navigate } from "react-router-dom";
import { usePortflowUIController } from "context";

function ProtectedRoute({ children, requiredRole }) {
  const [controller] = usePortflowUIController();
  const { user } = controller;

  // If no user is logged in, redirect to sign-in
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  // If user doesn't have the required role, redirect to dashboard
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
