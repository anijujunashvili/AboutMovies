import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const test = 1;
  if (!test) {
    return <Navigate to="/ka/login" />;
  }

  return children || <Outlet />;
};

export default AuthGuard;
