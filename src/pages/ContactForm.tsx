import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { ToastContainer } from "react-toastify";

import { showToast } from "repository/utils";
import { AxiosError } from "axios";
import useAxiosPrivate from "api/axiosPrivate";
import { IContactFormData } from "interfaces/contact";

export const ContactForm = () => {
  const url = `${process.env.REACT_APP_URL}/contacts`;
  const navigate = useNavigate();
  const axiosInstance = useAxiosPrivate();

  const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      let resp = await axiosInstance.post(url, formData as IContactFormData);

      if (resp) {
        showToast("success", `Contact will be added.`);

        setTimeout(() => {
          navigate("/list");
        }, 2000);
      }
    } catch (err) {
      const error = err as AxiosError;
      showToast("error", error.message);
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
      <ToastContainer />
    </Box>
  );
};
