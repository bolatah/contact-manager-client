import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import Login from "../components/Login";
import useRefreshToken from "hooks/useRefreshToken";
import userService from "services/userService";

const imageURL = process.env.REACT_APP_IMAGE_URL;

export default function LaunchCard() {
  const refresh = useRefreshToken();
  const test = async () => {
    let resp = await userService.HandleTest();
    if (resp) {
      console.log(resp);
    }
  };

  return (
    <Card /* sx={{ maxWidth: 345 }} */>
      <CardMedia component="img" height="140" image={imageURL} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Contact Manager
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome to the "Contact-Manager". If you are not already registered
          please
          <Button
            component={Link}
            to="/register"
            style={{ textTransform: "none", fontSize: "1.2rem" }}
          >
            register!
          </Button>
        </Typography>
      </CardContent>
      <CardActions>
        <Login />
        <br />
        <Button
          onClick={() => refresh()}
          style={{ textTransform: "none", fontSize: "1.2rem" }}
        >
          Refresh
        </Button>
        <br />
        <Button
          onClick={test}
          style={{ textTransform: "none", fontSize: "1.2rem" }}
        >
          Test
        </Button>
      </CardActions>
    </Card>
  );
}
