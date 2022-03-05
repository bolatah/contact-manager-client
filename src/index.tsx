import React from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ContactForm } from "./pages/ContactForm";
import { ContactList } from "./pages/ContactList";
import ContactManagerApp from "./pages/ContactManagerApp";
import LaunchCard from "./pages/LaunchCard";
import Register from "./pages/Register";
import useAuth, { AuthProvider } from "./context/useAuth";

require("dotenv").config();

function RequireAuth({ children }) {
  const { authed } = useAuth();
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LaunchCard />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/contactManagerApp"
            element={
              <RequireAuth>
                <ContactManagerApp />
              </RequireAuth>
            }
          />
          <Route
            path="/form"
            element={
              <RequireAuth>
                <ContactForm />
              </RequireAuth>
            }
          />
          <Route
            path="/list"
            element={
              <RequireAuth>
                <ContactList />
              </RequireAuth>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
