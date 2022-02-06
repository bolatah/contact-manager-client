import { User } from "../models/user";

const apiBaseUrl = `${process.env.REACT_APP_API}/users`;

export class UserService {

  saveUser = async (user: User) : Promise<Response> => {
    return await fetch(apiBaseUrl, {
      method: "POST",
     /*  credentials: 'include', */
      headers: {
        "Content-type": "application/json",
       "Accept": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  getUser = async (user: User) : Promise<Response> => {
    return await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
         "Accept": "application/json",
        },
        body: JSON.stringify(user),
      });
    };
 

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
