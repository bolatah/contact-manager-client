import Box from "@mui/material/Box";
import React from 'react';
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { User } from "../models/user";
import { UserService } from "../services/userService";
import useAuth from "../context/useAuth";

type StateType = {
    path: string
}

const Login = () => {
    const navigate = useNavigate();
    const service = new UserService();
    const { login } = useAuth();
    const { state } = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        let postData = {};
        formData.forEach((value, key) => {
            postData[key] = value;
        });
        let req = await service.getUser(postData as User);
        if (req.ok) {
            login().then(() => {
                navigate((state as StateType)?.path || "/contactManagerApp");
            })
        }
    };
    return (
        <form>  <FormControl required>
            <TextField
                type="text"
                label="username"
                id="Username"
                name="username"
                placeholder="Name"
                maxRows="1"
                required
                sx={{ marginBottom: 3 }}
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
            />
            <span>
                {/*   <Button type="submit"> Login</Button> */}
                <Button type="submit" onClick={handleLogin} > Login</Button>
            </span>
        </FormControl></form>

    );
};
export default Login;
