import React, { createContext, useState, useContext } from "react";

interface AuthContextInterface {
  authed: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  authed: false,
  login: () => false,
  logout: () => true,
});

function useAuth() {
  const [authed, setAuthed] = useState(false);

  return {
    authed,
    login() {
      return new Promise<void>((res) => {
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise<void>((res) => {
        setAuthed(false);
        res();
      });
    },
  };
}

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>;
};

export default function AuthConsumer() {
  return useContext(AuthContext);
}
