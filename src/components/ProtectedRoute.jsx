import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");

  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Si l'utilisateur n'a pas le bon rôle, rediriger vers l'accueil
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (e) {
    console.error("Invalid user JSON in localStorage");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
}
