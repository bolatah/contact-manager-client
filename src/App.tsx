import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ContactForm } from "./pages/ContactForm";
import { ContactList } from "./pages/ContactList";
import ContactManagerApp from "./pages/ContactManagerApp";
import LaunchCard from "./pages/LaunchCard";
import Register from "./pages/Register";
import RequireAuth from "./components/RequireAuth";
// import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {/*  Public Routes */}
          <Route path="/" element={<LaunchCard />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}

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

          {/* catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
