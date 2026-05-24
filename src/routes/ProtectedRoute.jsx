import { Navigate, Outlet, useLocation } from "react-router-dom";
import { canAccessPanel, canAccessRoute } from "../config/adminPermissions";
import { getToken, getUserFromToken, normalizeUser } from "../utils/authStorage";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ adminOnly = false }) => {
  const location = useLocation();
  const { user } = useAuth();
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const role = user?.role || normalizeUser(getUserFromToken())?.role;

  if (!canAccessPanel(role)) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && role !== "admin") {
    return <Navigate to="/admin/unauthorized" replace />;
  }

  if (!canAccessRoute(role, location.pathname)) {
    return <Navigate to="/admin/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
