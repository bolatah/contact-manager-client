import axiosPrivate from "../api/axiosPrivate";
import { useContext, useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import { UserContext } from "../context/userContext";
import userService from "services/userService";

export interface WithAxiosPrivateProps {
  children: React.ReactNode;
}

const WithAxiosPrivate = ({ children }: WithAxiosPrivateProps) => {
  const userContext = useContext(UserContext);
  const { accessToken } = userContext.userState;
  const refresh = useRefreshToken();
  console.log(`WithAxiosPrivate accessToken: ${accessToken}`);

  useEffect(() => {
    const requestIntercept: any = axiosPrivate.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        //config.withCredentials = true;
        if (!(config.headers as AxiosRequestHeaders)["Authorization"]) {
          (config.headers as AxiosRequestHeaders)[
            "Authorization"
          ] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    const responseIntercept: any = axiosPrivate.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const prevRequest = error?.config;
        console.log(`WithAxiosPrivate prevRequest: ${prevRequest}`);
        console.log(error.config);
        // const newAccessToken = await userService.HandleRefreshToken();
        // console.log(`WithAxiosPrivate newAccessToken: ${newAccessToken}`);
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          // the error due to the expiraton of access token is 403 and custom property on req is not set
          prevRequest.sent = true;

          // let accessToken = JSON.stringify(
          //   await userService.HandleRefreshToken()
          // );
          // userContext.userDispatch({
          //   type: "persist",
          //   payload: {
          //     user: userContext.userState.user,
          //     accessToken: accessToken,
          //     persist: true,
          //   },
          // });

          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return <>{children}</>;
};

export default WithAxiosPrivate;
