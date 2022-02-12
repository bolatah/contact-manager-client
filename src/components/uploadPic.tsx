import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";

const Input = styled("input")({
  /*  display: 'none', */
  fontSize: "1.5rem",
});

const apiBaseUrl = `${process.env.REACT_APP_API}/contacts/upload`;

export default class UploadPic extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
    };
  }

  onChangeHandler = (event) => {
    const file = event.target.files[0];
    this.setState({
      selectedFile: file,
      loaded: 0,
    });
  };

  onClickHandler = () => {
    const data = new FormData();
    data.append("contactpicture", this.state.selectedFile);
    fetch(apiBaseUrl, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        res.json();
        toast.success("upload success");
      })
      .catch((err) => {
        console.log(err);
        toast.error("upload fail");
      });
  };

  render() {
    return (
      <>
        <Stack direction="row" alignItems="center" spacing={2}>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              name="contactpicture"
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.onChangeHandler}
              required
            />
          </label>
          <Button
            variant="contained"
            component="span"
            onClick={this.onClickHandler}
            sx={{ width: "13rem" }}
          >
            Upload an image
          </Button>
        </Stack>
        <ToastContainer position="bottom-left" autoClose={1000} />
      </>
    );
  }
}
