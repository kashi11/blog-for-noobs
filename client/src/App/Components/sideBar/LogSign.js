import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./logSign.css";
import { withStyles } from "@material-ui/core/styles";
import Axios from "axios";
const styles = {
  input: { color: "white" },
  label: { color: "#c5003c" },
};

class LogSign extends React.Component {
  constructor(props) {
    super(props);
    if (props.keyprop === 1) {
      this.state = {
        keys: props.keyprop,
        value: "Login",
        show: false,
        username: "",
        pass: "",
        usernameError: false,
        passError: false,
        logged: false,
        peMessage: "",
        ueMessage: "",
      };
    } else {
      this.state = {
        keys: props.keyprop,
        value: "Signup",
        show: false,
        username: "",
        pass: "",
        usernameError: false,
        passError: false,
        logged: false,
        peMessage: "",
        ueMessage: "",
      };
    }

    this.ChangeElement = this.ChangeElement.bind(this);
    this.login = this.login.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.cancel = this.cancel.bind(this);
    this.passValidation = this.passValidation.bind(this);
    this.userValidation = this.userValidation.bind(this);
  }
  passValidation(pas) {
    if (pas === "") {
      this.setState({
        peMessage: "Please Enter Password",
        passError: true,
      });
    } else if (pas.length < 8 || pas.length > 14) {
      this.setState({
        peMessage: "Your password must be 8-15 charcters long",
        passError: true,
      });
    } else {
      this.setState({
        passError: false,
        peMessage: "",
      });
    }
  }
  userValidation(user) {
    if (user === "") {
      this.setState({
        usernameError: true,
        ueMessage: "Please Enter Username",
      });
    } else {
      this.setState({
        usernameError: false,
        ueMessage: "",
      });
    }
  }
  render() {
    return <this.ChangeElement />;
  }
  login() {
    if (
      this.state.passError ||
      this.state.usernameError ||
      this.state.username === "" ||
      this.state.pass === ""
    ) {
      if (this.state.pass === "") {
        this.setState({ peMessage: "Please Enter Password", passError: true });
      }
      if (this.state.username === "") {
        this.setState({
          usernameError: true,
          ueMessage: "Please Enter Username",
        });
      }
    } else {

      //login
      if (this.state.keys === 1) {
        let data = {
          username: this.state.username,
          password: this.state.pass
        };
        Axios.get("http://localhost:9000/users",{params:data})
        .then((response) => {
          console.log(response.data);  
          if(response.data==="fail"){
            this.setState({
              usernameError: true,
              ueMessage: "Incorrect username or password",
              passError: true,
              peMessage: "Incorrect username or password"
            });
          }
          else{
            this.setState({ show: true, logged: true }, function () {
              this.props.sendLogged(this.state.logged);
              this.props.obusername(this.state.username);
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      //Signup
      else {
        let data = {
          username: this.state.username,
          password: this.state.pass
        };
        Axios.post("http://localhost:9000/users",data)
        .then((response)=> {
          if(response.data==="fail"){
            this.setState({
              usernameError: true,
              ueMessage: "Username already exists",
            });
          }
          else{
            this.setState({ show: true, logged: true }, function () {
              this.props.sendLogged(this.state.logged);
              this.props.obusername(this.state.username);
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      
    }
  }
  cancel() {
    this.props.showstate(false);
  }

  handleOnChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
    if (ev.target.name === "pass") {
      this.passValidation(ev.target.value);
    } else {
      this.userValidation(ev.target.value);
    }
  }

  ChangeElement(evt) {
    const { classes } = this.props;
    return (
      <div className="LogSign">
        <form>
          <div className="LogSign">
            <TextField
              autoComplete="off"
              required
              variant="outlined"
              type="text"
              name="username"
              label="Username"
              error={this.state.usernameError}
              onChange={(ev) => this.handleOnChange(ev)}
              helperText={this.state.ueMessage}
              InputLabelProps={{ className: classes.label }}
              InputProps={{ className: classes.input }}
              color="primary"
            />
          </div>
          <div className="LogSign">
            <TextField
              autoComplete="off"
              required
              variant="outlined"
              name="pass"
              type="password"
              error={this.state.passError}
              onChange={(ev) => this.handleOnChange(ev)}
              helperText={this.state.peMessage}
              label="Password"
              InputLabelProps={{ className: classes.label }}
              InputProps={{ className: classes.input }}
              color="primary"
            />
          </div>
          <div className="LogSignB">
            <Button variant="contained" color="secondary" onClick={this.login}>
              {this.state.value}
            </Button>
          </div>
          <div className="LogSignB">
            <Button variant="contained" color="secondary" onClick={this.cancel}>
              cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
export default withStyles(styles)(LogSign);
