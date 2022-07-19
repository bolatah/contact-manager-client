import React, { useContext, useEffect, useReducer, useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import {
  initialUserState,
  UserContextProvider,
  UserReducer,
} from "./context/userContext";
import { ContactForm } from "./pages/ContactForm";
import { ContactList } from "./pages/ContactList";
import ContactManagerApp from "./pages/ContactManagerApp";
import LaunchCard from "./pages/LaunchCard";
import Register from "./pages/Register";
import PersistLogin from "./components/PersistLogin";
import AuthRoute from "./components/AuthRoute";
import Test from "pages/Test";
import WithAxiosPrivate from "hooks/useAxiosPrivate";

const App = () => {
  const [userState, userDispatch] = React.useReducer(
    UserReducer,
    initialUserState
  );

  return (
    <UserContextProvider value={{ userState, userDispatch }}>
      <WithAxiosPrivate>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LaunchCard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<LaunchCard />} />

            {/* Private Routes */}
            <Route element={<PersistLogin />}>
              <Route
                path="/contactManagerApp"
                element={
                  <AuthRoute>
                    <ContactManagerApp />
                  </AuthRoute>
                }
              />

              <Route
                path="/form"
                element={
                  <AuthRoute>
                    <ContactForm />
                  </AuthRoute>
                }
              />

              <Route
                path="/list"
                element={
                  <AuthRoute>
                    <ContactList />
                  </AuthRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </WithAxiosPrivate>
    </UserContextProvider>
  );
};
export default App;
