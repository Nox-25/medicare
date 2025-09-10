import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

type Props = {
  allowedRoles?: Array<"admin" | "doctor" | "patient">;
  redirectTo?: string;
};

const ProtectedRoute = ({ allowedRoles, redirectTo = "/login" }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;



