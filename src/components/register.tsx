import React from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { User } from "../models/user";
import useAuth from "../context/useAuth";
import { UserService } from "../services/userService";

type StateType = {
  path: string
}

const Register = () => {
  const navigate = useNavigate();
  const service = new UserService();
  const { login } = useAuth();
  const { state } = useLocation();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let postData = {};
    formData.forEach((value, key) => {
      postData[key] = value;
    });
    let res = await service.saveUser(postData as User);

    if (res.ok) {
      login().then(() => {
        navigate((state as StateType)?.path || "/login");
      });
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   const formData = new FormData(form);
  //   let postData = {};
  //   formData.forEach((value, key) => {
  //     postData[key] = value;
  //   });

  //   let req = await service.getUser(postData as User);
  //   if (req.ok) {
  //     login().then(() => {
  //       navigate((state as StateType)?.path || "/contactManagerApp");
  //     })
  //   }
  // };



  return (
    <form onSubmit={handleRegister} style={{ margin: "0 auto", width: "220px", marginTop: "100px" }}>
      <FormControl required >
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
        <span>
          <Button type="submit" >
            Register
          </Button>
          {/*  <Button type="submit" onSubmit={handleLogin} >
            login
          </Button> */}
        </span>
      </FormControl></form>

  );
};
export default Register;
