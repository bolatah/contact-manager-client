import { defaultAccessToken } from "../interfaces/user";
import { Dispatch, createContext } from "react";

interface ILoginState {
  username: string;
  accessToken: string;
  isLoggedIn: boolean;
  // persist?: boolean;
}

interface ILoginAction {
  type: "login" | "logout";
  payload: { username: string; accessToken: string; isLoggedIn: boolean };
}

interface IUserContext {
  userState: ILoginState;
  userDispatch: Dispatch<ILoginAction>;
}

export const initialUserState: ILoginState = {
  username: "",
  accessToken: defaultAccessToken,
  isLoggedIn: false,
};

export const UserReducer = (state: ILoginState, action: ILoginAction) => {
  let { username, accessToken, isLoggedIn } = action.payload;

  switch (action.type) {
    case "login":
      return { username, accessToken, isLoggedIn };
    case "logout":
      return initialUserState;
    default:
      return state;
  }
};

export const UserContext = createContext<IUserContext>({
  userState: initialUserState,
  userDispatch: () => {},
});

export const UserContextConsumer = UserContext.Consumer;
export const UserContextProvider = UserContext.Provider;
