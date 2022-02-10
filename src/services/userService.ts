import { User } from "../models/user";

const apiBaseUrl = `${process.env.REACT_APP_API}/users`;

export class UserService {

  saveUser = async (user: User) : Promise<Response> => {
    return await fetch(`${apiBaseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
       "Accept": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  getUser = async (user) : Promise<Response> => {
    
    const res = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
         "Accept": "application/json",

        },
        body: JSON.stringify({ 
          username: user.username,
         password :user.password,
        }
          ),
      })
        if(res.ok) { 
          res.json()
          .then((user)=>{
            const nowTime = Date.now()
            window.localStorage.setItem("x-access-token", user.token)
            window.localStorage.setItem(
              "x-access-token-expiration",
            `${nowTime} * 60 * 60 * 1000`
            )
          })
        }
        else {console.log("Authentication failed")}
    ; return res
  }
 

  // updateUser = async (id: number, user: User): Promise<Response> => {
  //   return await fetch(apiBaseUrl + "/" + id, {
  //     method: "PUT",
  //     headers: {
  //       "Content-type": "application/json",
  //      "Accept": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   });
  // };

  getUserList = async (): Promise<Response> => {
    return await fetch(apiBaseUrl);
  };

  deleteUserById = async (id: number): Promise<Response> => {
    return await fetch(apiBaseUrl + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
       "Accept": "application/json",
      },
    });
  };
}
