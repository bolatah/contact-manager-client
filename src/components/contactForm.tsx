import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";

import { Contact } from "../models/contact";
import { ContactService } from "../services/contactService";
import UploadPic from "./uploadPic";

export const ContactForm = () => {
  const navigate = useNavigate();
  const service = new ContactService();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    let postData = {};
    formData.forEach((value, key) => {
      postData[key] = value;
    });
    let res = await service.saveContact(postData as Contact);
    console.log(postData);
    if (res.ok) {
      toast.success(`${Object.values(postData)[0]} will be added.`);
      setTimeout(() => {
        navigate("/list");
      }, 2000);
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
          type="message"
          id="Message"
          name="message"
          label="Message"
          placeholder="Message"
          sx={{ marginBottom: 3 }}
          required
          multiline
        />
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ marginBottom: 3 }}
        >
          <UploadPic />{" "}
        </Stack>
        <Button
          type="submit"
          variant="outlined"
          /*  onClick={() => {
            toast.success(`${} will be added.`);
          }} */
        >
          {" "}
          Submit
        </Button>
      </FormControl>
      <ToastContainer position="bottom-left" autoClose={2000} />
    </Box>
  );
};
