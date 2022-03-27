import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import { AuthProvider } from "./services/hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
