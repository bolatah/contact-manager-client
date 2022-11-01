import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";

export interface IAuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute = (props: IAuthRouteProps) => {
  const userContext = useContext(UserContext);
  const location = useLocation();
  const { children } = props;
  return userContext.userState.accessToken !== "" ? (
    <>{children}</>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default AuthRoute;
