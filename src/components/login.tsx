import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { ToastContainer } from "react-toastify";

import { UserService } from "../services/userService";
import useAuth from "../context/useAuth";
import { showToast } from "../repository/utils";
// import { User } from "../models/user";

type StateType = {
  path: string;
};

const Login = () => {
  const navigate = useNavigate();
  const service = new UserService();
  const { login } = useAuth();
  const { state } = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    let postFormData = {};
    formData.forEach((value, key) => {
      postFormData[key] = value;
    });

    await service.getUser(postFormData);
    // let tokenAuth = await service.refreshToken(localStorage);

    showToast("success", "You are logged in");
    setTimeout(() => {
      login();
      navigate((state as StateType)?.path || "/contactManagerApp");
    }, 2000);
    // } else {
    //   showToast("error", "Login failed");
    // }
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
            id="Email"
            name="password"
            placeholder="password"
            maxRows="1"
            required
            sx={{ marginBottom: 3 }}
            autoComplete="off"
          />
          <span>
            <Button
              type="submit"
              /*   onClick={() => {
                showToast("success", "You are logged in");
              }} */
            >
              Login
            </Button>
          </span>
        </FormControl>
      </form>
      <ToastContainer />
    </>
  );
};
export default Login;
