import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

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
        let postFormData = {};
        formData.forEach((value, key) => {
            postFormData[key] = value;
        });
        console.log(postFormData)

        let res = await service.getUser(postFormData);
        console.log(res);
        console.log(res.headers)
        if (res.ok) {
            login().then(() => {
                alert("You are logged in")
                navigate((state as StateType)?.path || "/contactManagerApp");
            })
        }
    };
    return (
        <><Typography variant="h6" align="center" sx={{ marginTop: "5rem" }}> Welcome to the "Contact-Manager". If you are not already registered please
            <Button component={Link} to="/register" style={{ textTransform: 'none', fontSize: '1.2rem' }}>register!</Button>
        </Typography>
            <form style={{ margin: "0 auto", width: "220px", marginTop: "100px" }} onSubmit={handleLogin}>

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
                        <Button type="submit" > Login</Button>
                    </span>
                </FormControl>
            </form></>


    );
};
export default Login;
