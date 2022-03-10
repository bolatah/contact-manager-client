import React from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { ToastContainer } from "react-toastify";
import { User } from "../models/user";
import useAuth from "../context/useAuth";
import { UserService } from "../services/userService";
import { showToast } from "../repository/utils";

type StateType = {
  path: string;
};

const Register = () => {
  const navigate = useNavigate();
  const service = new UserService();
  const { login } = useAuth();
  const { state } = useLocation();

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const inputPassword = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const inputConfirmPassword = document.getElementById(
      "confirm-password"
    ) as HTMLInputElement;

    const formData = new FormData(e.currentTarget);
    let postData = {};
    formData.forEach((value, key) => {
      postData[key] = value;
    });
    let res = await service.saveUser(postData as User);

    if (inputPassword.value === inputConfirmPassword.value) {
      if (res.status === 201) {
        showToast("success", `${postData["username"]} is registered.`);
        setTimeout(() => {
          login();
          navigate((state as StateType)?.path || "/login");
        }, 2000);
      }
      showToast("error", `User already exists.`);
    } else {
      showToast("error", "password don't match");
    }
  };
  return (
    <>
      <form
        onSubmit={handleRegister}
        style={{ margin: "0 auto", width: "220px", marginTop: "100px" }}
      >
        <FormControl required>
          <TextField
            label="username"
            type="text"
            id="username"
            name="username"
            placeholder="Name"
            maxRows="1"
            required
            sx={{ marginBottom: 3 }}
          />
          <TextField
            label="email"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            maxRows="1"
            required
            sx={{ marginBottom: 3 }}
          />
          <TextField
            label="phone"
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone"
            maxRows="1"
            required
            sx={{ marginBottom: 3 }}
          />
          <TextField
            label="password"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            maxRows="1"
            required
            sx={{ marginBottom: 3 }}
          />
          <TextField
            label="confirm password"
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="confirm password"
            maxRows="1"
            required
            sx={{ marginBottom: 3 }}
          />
          <span>
            <Button type="submit" id="submit">
              Register
            </Button>
          </span>
        </FormControl>
      </form>
      <ToastContainer />
    </>
  );
};
export default Register;
