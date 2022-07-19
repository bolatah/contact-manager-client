import React, { useContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export interface IAuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute = (props: IAuthRouteProps) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { children } = props;
  return userContext.userState?.accessToken !== "" ? (
    <>{children}</>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default AuthRoute;
