import { User } from "../models/user";

const apiBaseUrl = `${process.env.REACT_APP_API}/users`;

export class UserService {
  saveUser = async (user: User): Promise<Response> => {
    return await fetch(`${apiBaseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  refreshToken = async (token) => {
    let res = await fetch(`${apiBaseUrl}/refresh`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(token),
    });
    let data = await res.json();
    console.log(data);
    localStorage.setItem("access-token", `${data.accessToken}`);
    // localStorage.setItem("refreshToken", `${data.refreshToken}`);
    return res;
  };

  getUser = async (user): Promise<Response> => {
    const res = await fetch(`${apiBaseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });
    if (res.ok) {
      res.json().then((data) => {
        localStorage.setItem("access-token", data.accessToken);
        localStorage.setItem("refresh-token", data.refreshToken);
      });
    } else {
      console.log("Authentication failed");
    }
    return res;
  };

  getUserList = async (): Promise<Response> => {
    return await fetch(apiBaseUrl);
  };

  deleteUserById = async (id: number): Promise<Response> => {
    return await fetch(apiBaseUrl + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });
  };
}
