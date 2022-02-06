import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import { Contact } from "../models/contact";
import { ContactService } from "../services/contactService";

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
    let req = await service.saveContact(postData as Contact);

    if (req.ok) {
      navigate("/list");
    }
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit} style={{ margin: "0 auto", width: "220px", marginTop: "100px" }}>
      <FormControl required >
        <TextField type="text" id="Name" name="name" placeholder="Name" maxRows="1" required sx={{ marginBottom: 3 }} />
        <TextField type="email" id="Email" name="email" placeholder="Email" maxRows="1" required sx={{ marginBottom: 3 }} />
        <TextField type="message" id="Message" name="message" placeholder="Message" sx={{ marginBottom: 3 }} required multiline />
        <Button type="submit" variant="outlined"> Submit</Button>
      </FormControl>
    </Box>
  );
};

