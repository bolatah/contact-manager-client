
import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  /*   border: 2px solid ${props => props.theme.darkCerulean};
    border-radius: 25px; */
    min-height: 40vh;
    padding: 2rem;
    
`

const Input = styled.input`
    width: 100%;
    height: 50px;
    margin: 10px 0px;
    padding: 10px;
    border-radius: 5px;
    font-size: large;
    &:focus {
    outline-color: ${props => props.theme.lightBlu};
    }
`

const Message = styled.textarea`
    width: 100%;
    height: 50px;
    margin: 10px 0px;
    margin-bottom: 0px;
    padding: 10px;
    border-radius: 5px;
    font-size: large;
    height: 150px;
    &:focus {
    outline-color: ${props => props.theme.lightBlu};
    }
`

// Read the values of all the form fields with FormData
async function handleFormSubmit (e) { 
    e.preventDefault();
    const form = e.currentTarget;
    const url = form.action
    alert("The message was submitted");

    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson ({url, formData});
        console.log(responseData );
    }catch (err) {
        console.log(err);
    }
};

// Format the data as JSON and POST it to a URL with a fetch function
async function postFormDataAsJson({url, formData}){
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: formDataJsonString,
    };
    const response = await fetch(url, fetchOptions);

    if (!response.ok){
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
};

function Contact() {

    return (
    
        <Box> 
            <form  onSubmit={handleFormSubmit} id="contact_form" action="http://localhost:8000/api/contacts" method="post">
            <input type="hidden" name="form_tools_form_id" value="5" />
                <div class="form_field">
                    <div class="form_input">
                        <Input type="text" id="Name" name="name" placeholder="*Name" minLength="2" maxLength="50"required/>
                    </div>
                </div>

                <div class="form_field">
                    <div class="form_input">
                        <Input type="email" id="Email" name="email" placeholder="*Email" minLength="5" maxLength="100" required/>
                    </div>
                </div>

                <div class="form_field">
                    <div class="form_input">
                        <Message id="Message" name="message" rows="6" minLength="5" maxLength="3000" placeholder="*Message" required></Message>
                    </div>
                </div>

                <div class="form_field">
                    <button type="submit" className="btn" style={{backgroundColor:'#F8A3BA'}}> Submit</button>
                </div>
            </form>
        </Box>
    
    );
}
export default Contact;
