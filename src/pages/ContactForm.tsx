import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { ToastContainer } from "react-toastify";
 
import { ContactService } from "../services/contactService";
import { showToast } from "repository/utils";

export const ContactForm = () => {
  const navigate = useNavigate();
  const service = new ContactService();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form); 
    let res = await service.saveContact(formData);
    try {
      if (res.ok) {
        showToast("success", `Contact will be added.`);
        setTimeout(() => {
          navigate("/list");
        }, 2000);
      }
    } catch {
      showToast("error", `Contact can't be added.`);
    }
  };

  return (
    <Box
      component="form"
      encType="multipart/form-data"
      onSubmit={handleFormSubmit}
      style={{ margin: "0 auto", width: "500px", marginTop: "100px" }}
    >
      <FormControl required>
        <TextField
          type="text"
          id="Name"
          name="name"
          label="Name"
          placeholder="Name"
          maxRows="1"
          required
          sx={{ marginBottom: 3 }}
        />
        <TextField
          type="email"
          id="Email"
          name="email"
          label="Email"
          placeholder="Email"
          maxRows="1"
          required
          sx={{ marginBottom: 3 }}
        />
        <TextField
          type="tel"
          id="phone"
          name="phone"
          label="phone"
          placeholder="phone"
          maxRows="1"
          required
          sx={{ marginBottom: 3 }}
        />
        <TextField
          type="file"
          id="File"
          name="file"
          // label="Image"
          maxRows="1"
          required
          sx={{ marginBottom: 3 }}
        />
        <TextField
          type="message"
          id="Message"
          name="message"
          label="Message"
          placeholder="Message"
          sx={{ marginBottom: 3 }}
          required
          multiline
        />

        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </FormControl>
      <ToastContainer position="bottom-left" autoClose={2000} />
    </Box>
  );
};
