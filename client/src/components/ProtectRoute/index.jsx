import { Navigate, Outlet } from "react-router-dom";

export default function ProtectRoute({ isAllowed, redirectTo = "/landing", children }) {
  if (isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return children || <Outlet />;
}
