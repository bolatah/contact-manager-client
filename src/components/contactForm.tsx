import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import {handleFormSubmit} from "../services/postFormData";

export const ContactForm = () => {
  return (
    <Box component="form" /* noValidate  */  action="http://localhost:8000/api/contacts" method="POST" onSubmit={handleFormSubmit} >
      <FormControl fullWidth required >
        <TextField type="text" id="Name" name="name"  placeholder="Name" maxRows="1" required sx={{  marginBottom: 3 }} />
        <TextField type="email" id="Email" name="email" placeholder="Email" maxRows="1" required  sx={{  marginBottom: 3 }}/>
        <TextField type="message" id="Message" name="message" placeholder="Message" sx={{marginBottom: 3}} required multiline/>
        <Button type="submit" variant="outlined"> Submit</Button>
      </FormControl>
    </Box>
    );
};
 
