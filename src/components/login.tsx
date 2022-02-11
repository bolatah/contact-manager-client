import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";

import { UserService } from "../services/userService";
import useAuth from "../context/useAuth";

type StateType = {
  path: string;
};

const Login = () => {
  const navigate = useNavigate();
  const service = new UserService();
  const { login } = useAuth();
  const { state } = useLocation();

  const openToast = () => {
    toast.success("Your are logging in");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    let postFormData = {};
    formData.forEach((value, key) => {
      postFormData[key] = value;
    });
    console.log(postFormData);

    let res = await service.getUser(postFormData);
    console.log(res);
    console.log(res.headers);
    if (res.ok) {
      setTimeout(() => {
        login().then(() => {
          navigate((state as StateType)?.path || "/contactManagerApp");
        });
      }, 2000);
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
            id="Email"
            name="password"
            placeholder="password"
            maxRows="1"
            required
            sx={{ marginBottom: 3 }}
            autoComplete="off"
          />
          <span>
            <Button type="submit" onClick={openToast}>
              {" "}
              Login
            </Button>
          </span>
        </FormControl>
      </form>
      <ToastContainer position="top-left" autoClose={2000} />
    </>
  );
};
export default Login;
