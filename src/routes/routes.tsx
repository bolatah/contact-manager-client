import { Navigate } from "react-router";
import {  Routes, Route } from "react-router-dom";
import { ContactForm } from "../components/contactForm";
import {ContactList} from "../components/contactList";

export const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/form" element={<ContactForm />} />
        <Route path="/list" element={<ContactList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes> 
  );
};
