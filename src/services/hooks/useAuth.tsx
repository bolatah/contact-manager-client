import { useState, useEffect, createContext, useContext } from "react";

import { User } from "../../models/user";

interface AuthContextInterface {
  authed: boolean;

  login: () => void;
  logout: () => void;
}

export const authContext = createContext<AuthContextInterface>({
  authed: false,
  login: () => false,
  logout: () => true,
});

const useAuth = () => {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState<User>({ accessToken: "" });

  useEffect(() => {
    if (authed) {
      setUser((user) => ({
        ...user,
        accessToken: `${localStorage.getItem("access-token")}`,
      }));
    }
  }, [authed]);

  return {
    authed,
    login() {
      return new Promise<void>((res) => {
        setAuthed(true);
        console.log(authed, user);
        res();
      });
    },

    logout() {
      return new Promise<void>((res) => {
        setAuthed(false);
        localStorage.removeItem("access-token");
        res();
      });
    },
  };
};

export function AuthProvider({ children }) {
  const auth = useAuth();
  return <authContext.Provider value={auth}> {children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}
