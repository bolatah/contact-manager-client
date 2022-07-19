import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { ToastContainer } from "react-toastify";
import { showToast } from "repository/utils";
import userService from "../services/userService";
import React, { useContext, useEffect, useState } from "react";
import { UserContext, initialUserState } from "../context/userContext";
import { AxiosError } from "axios";

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
      let resp = await userService.LoginUser(
        postFormData.username,
        postFormData.password
      );
      if (resp) {
        userContext.userDispatch({
          type: "login",
          payload: {
            user: resp.data.user,
            accessToken: resp.data.accessToken,
          },
        });
        showToast("success", "You are logged in");
        setTimeout(() => {
          navigate("/contactManagerApp");
        }, 1000);
      }
    } catch (err) {
      const error = err as Error | AxiosError;
      console.log(error);
      showToast("error", error.message);
    }
  };
  const togglePersist = (props) => {
    userContext.userDispatch({
      type: "persist",
      payload: {
        ...props,
        persist: !userContext.userState.persist,
      },
    });
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
            <input
              type="checkbox"
              id="RememberMe"
              name="rememberMe"
              onChange={togglePersist}
              autoComplete="off"
            />
            <label htmlFor="RememberMe">Remember Me</label>
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
