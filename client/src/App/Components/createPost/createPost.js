import React from "react";
import { TextField, TextareaAutosize, Button } from "@material-ui/core";
import "./createPost.css";
import { withStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import Axios from "axios";
window.Swal = Swal;
const styles = {
  root: {
    width: "40%",
    display: "block",
  },
  input: {
    width: 500,
    color: "white",
  },
  label: {
    color: "#c5003c",
  },
};
class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    if (typeof this.props.location.sData !== "undefined") {
      this.state = {
        data: this.props.location.sData,
        title: "",
        content: "",
        titleError: false,
        contentError: false,
        path: "/",
        taclass: "textarea1",
      };
    } else {
      this.state = {
        data: "",
        title: "",
        content: "",
        titleError: false,
        contentError: false,
        path: "/",
        taclass: "textarea1",
      };
    }
    this.ErrorMessage = this.ErrorMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  render() {
    const { classes } = this.props;
    return (
      <div id="createPost">
        <h1 id="blogname">Blog for Noobs</h1>
        <div id="createpostcontainer">
          <h1>Create Post</h1>
          <div>
            <TextField
              autoComplete="off"
              type="text"
              name="title"
              placeholder="Title"
              error={this.state.titleError}
              helperText={
                this.state.titleError ? "Please enter title of your post" : ""
              }
              variant="outlined"
              onChange={(ev) => {
                this.handleChange(ev);
              }}
              // onChange={ev=>this.handleOnChange(ev)}
              InputProps={{ className: classes.input }}
            />
          </div>
          <div id="taDiv">
            <TextareaAutosize
              name="content"
              rowsMin={10}
              className={this.state.taclass}
              onChange={(ev) => {
                this.handleChange(ev);
              }}
              placeholder="Content"
            ></TextareaAutosize>
            <this.ErrorMessage />
          </div>
          <div id="link2">
            <Button
              onClick={this.onSubmit}
              variant="contained"
              color="secondary"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    );
  }
  ErrorMessage() {
    if (!this.state.contentError) {
      return <div></div>;
    } else {
      return (
        <div id="error">
          <p>Please enter some content</p>
        </div>
      );
    }
  }
  onSubmit(ev) {
    if (this.state.data === "") {
      ev.preventDefault();
      Swal.fire({
        title: "Error!",
        html:
          "If you want to post please login first</br>" +
          'If you want to login click on this <a \'<a href="//localhost:3000">link</a>',
        icon: "error",
        background: "#212121",
        confirmButtonColor: "#c5003c",
      });
    } else {
      if (this.state.title === "" || this.state.content === "") {
        if (this.state.title === "") {
          ev.preventDefault();
          this.setState({ titleError: true });
        }
        if (this.state.content === "") {
          ev.preventDefault();
          this.setState({ contentError: true });
          this.setState({ taclass: "textareaError" });
        }
      } else {
        let data = {
          title: this.state.title,
          content: this.state.content,
          username: this.state.data.xusername,
          date: new Date().toUTCString(),
        };
        Axios.post("http://localhost:9000/posts", data)
          .then((response) => {
            this.props.history.push({
              pathname: this.state.path,
              data: {
                title: this.state.title,
                content: this.state.content,
                date: new Date().toUTCString(),
              },
              sidedata: this.state.data,
            })
            console.log(response);
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Server is down please try again later.Thank you!",
              icon: "error",
              background: "#212121",
              confirmButtonColor: "#c5003c",
            });
          });
      }
    }
  }
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
    if (ev.target.value === "") {
      this.setState({ [ev.target.name + "Error"]: true });
      if (ev.target.name === "content") {
        this.setState({ taclass: "textareaError" });
      }
    } else {
      this.setState({
        [ev.target.name + "Error"]: false,
        taclass: "textarea1",
      });
    }
  }
}
export default withStyles(styles)(CreatePost);
