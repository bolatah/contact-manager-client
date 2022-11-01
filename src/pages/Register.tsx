import { AxiosError } from "axios";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { ToastContainer } from "react-toastify";
import { IUser } from "../interfaces/user";
import { showToast } from "../repository/utils";
import axiosPublic from "../api/axiosPublic";

const url = `${process.env.REACT_APP_URL}/users`;

type StateType = {
  path: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    let postData = {} as any;
    formData.forEach((value, key) => {
      postData[key] = value;
    });

    if (postData.confirmPassword !== postData.password) {
      showToast("error", "password don't match");
    }
    try {
      let resp = await axiosPublic.post(`${url}/register`, postData as IUser);
      if (resp.status === 200) {
        showToast("success", `${postData["username"]} is registered.`);
        setTimeout(() => {
          navigate((state as StateType)?.path || "/login");
        }, 2000);
      } else {
        showToast("error", "username already exists");
      }
    } catch (err) {
      const error = err as Error | AxiosError;
      showToast("error", error.message);
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
            name="confirmPassword"
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
