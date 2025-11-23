// src/routes/PrivateRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "../auth";

export default function PrivateRoute() {
  const location = useLocation();
  const token = getToken();

  if (!token) {
    // send them to login, but save where they were trying to go
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
