import { useReducer } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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
import AuthRoute from "./components/AuthRoute";

const App = () => {
  const [userState, userDispatch] = useReducer(UserReducer, initialUserState);
  return (
    <UserContextProvider value={{ userState, userDispatch }}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LaunchCard />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<LaunchCard />} />

          {/* Private Routes */}
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
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};
export default App;
