// jimport { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../services/hooks/useAuth";

function RequireAuth({ children }) {
  const { authed } = useAuth();

  // return user.accessToken === `${localStorage.getItem("aceess-token")}` ? (
  return authed ? children : <Navigate to="/" />;
}

export default RequireAuth;
