import { defaultAccessToken, defaultUser, IUser } from "../interfaces/user";
import { Dispatch, createContext, useEffect } from "react";
//import useRefreshToken from "hooks/useRefreshToken";
import userService from "services/userService";
export interface IUserState {
  user: IUser;
  accessToken: string;
  persist?: boolean;
}

export interface IUserActions {
  type: "login" | "logout" | "persist";
  payload: { user: IUser; accessToken: string; persist?: boolean };
}

export const initialUserState: IUserState = {
  user: defaultUser,
  accessToken: defaultAccessToken,
  persist: false,
};

export const UserReducer = (state: IUserState, action: IUserActions) => {
  //const refresh = useRefreshToken();
  let user = action.payload.user;
  let accessToken = action.payload.accessToken;
  let persist = action.payload.persist;

  switch (action.type) {
    case "login":
      return { user, accessToken };
    case "logout":
      return initialUserState;
    case "persist":
      localStorage.setItem("persist", persist ? "true" : "false");
      // refresh();
      return { user, accessToken, persist };
    default:
      return state;
  }
};

export interface IUserContextProps {
  userState: IUserState;
  userDispatch: Dispatch<IUserActions>;
}

export const UserContext = createContext<IUserContextProps>({
  userState: initialUserState,
  userDispatch: () => {},
});

export const UserContextConsumer = UserContext.Consumer;
export const UserContextProvider = UserContext.Provider;
