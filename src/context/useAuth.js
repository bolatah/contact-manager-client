import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

function useAuth() {
  const [authed, setAuthed] = useState(false);

  return {
    authed,
    login() {
      return new Promise((res) => {
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
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
