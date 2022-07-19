import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
//import userService from "services/userService";
import useRefreshToken from "hooks/useRefreshToken";
// export interface IPersistLoginProps {
//   children: React.ReactNode;
// }

const PersistLogin = () => {
  const refresh = useRefreshToken();
  const userContext = useContext(UserContext);
  //const { children } = props;
  useEffect(() => {
    const persist = localStorage.getItem("persist");
    if (persist === "true") {
      userContext.userDispatch({
        type: "persist",
        payload: {
          ...userContext.userState,
          persist: true,
        },
      });
      refresh();
    }
  }, [refresh]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default PersistLogin;
