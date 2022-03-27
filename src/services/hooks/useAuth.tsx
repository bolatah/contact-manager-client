import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "services/userService";

import { User } from "../../models/user";

interface AuthContextInterface {
  authed: boolean;

  login: (username:string, password:string) => void;
  logout: () => void;
}

export const authContext = createContext<AuthContextInterface>({
  authed: false,
  login: (username:string, password:string) => false,
  logout: () => true,
});

const useAuth = () => {

  const navigate = useNavigate()
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState<User>({} any);

/*
  .then((response) => {
    localStorage.setItem("access-token", `${response.data.accessToken}`);
  })
*/
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
    login: async(username:string, password:string) =>  {
 //  navigate((state as StateType)?.path || "/contactManagerApp");
      const resp =  await userService.loginUser(username, password);

      if(resp.ok){

        const respData = resp.json() as any;
        localStorage.setItem("access-token", `${respData.accessToken}`);
        setUser(respData)
        navigate("/contactManagerApp");
      }else{

      }
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
