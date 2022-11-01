import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { ToastContainer } from "react-toastify";
import { showToast } from "repository/utils";
import axiosPublic from "api/axiosPublic";
import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { AxiosError } from "axios";

const url = `${process.env.REACT_APP_URL}/users`;

const Login = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    let postFormData = {} as any;
    formData.forEach((value, key) => {
      postFormData[key] = value;
    });

    try {
      let resp = await axiosPublic.post(`${url}/login`, {
        username: postFormData.username,
        password: postFormData.password,
      });

      if (resp) {
        userContext.userDispatch({
          type: "login",
          payload: {
            username: resp.data.username,
            accessToken: resp.data.token,
            isLoggedIn: true,
          },
        });

        showToast("success", "You are logged in");
        setTimeout(() => {
          navigate("/contactManagerApp");
        }, 1000);
      }
    } catch (err) {
      const error = err as AxiosError;
      showToast("error", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <FormControl required>
          <TextField
            type="text"
            label="username"
            id="Username"
            name="username"
            placeholder="Name"
            maxRows="1"
            required
            sx={{ marginBottom: 3 }}
            autoComplete="off"
          />
          <TextField
            type="password"
            label="password"
            id="Password"
            name="password"
            placeholder="password"
            maxRows="1"
            required
            sx={{ marginBottom: 3 }}
            autoComplete="off"
          />{" "}
          <div>
            {/*  <input
              type="checkbox"
              id="RememberMe"
              name="rememberMe"
              onChange={togglePersist}
              autoComplete="off"
            />
            <label htmlFor="RememberMe">Remember Me</label> */}
          </div>
          <span>
            <Button type="submit">Login</Button>
          </span>
        </FormControl>
      </form>
      <ToastContainer />
    </>
  );
};
export default Login;
