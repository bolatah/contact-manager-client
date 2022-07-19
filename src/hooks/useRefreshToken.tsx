import axiosPublic from "../api/axiosPublic";
import { useContext } from "react";
import { UserContext } from "context/userContext";
import userService from "services/userService";

const useRefreshToken = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const refresh = async () => {
    const resp = await userService.HandleRefreshToken();
    if (resp) {
      userDispatch({
        type: "persist",
        payload: {
          user: resp.data.user,
          accessToken: resp.data.accessToken,
          persist: true,
        },
      });
      return resp.data.accessToken;
    }
  };
  return refresh;
};

export default useRefreshToken;
