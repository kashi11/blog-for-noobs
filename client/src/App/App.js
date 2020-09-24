import React from "react";
import { Route, Switch } from "react-router-dom";
import "./stylesheets/App.css";
import Home from "./Components/Home";
import Post from "./Components/post/post";
import CreatePost from "./Components/createPost/createPost";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#c5003c",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#c5003c",
      contrastText: "#ffff",
    },
    error: { main: '#ae001a'  }
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        "&::placeholder": {
          color: "#c5003c",
        },
      },
      notchedOutline: {
        borderColor: "black",
      },
      
    },
  },
});
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  // componentDidMount() {
  //   fetch("http://localhost:9000/users")
  //       .then((response) => response.text())
  //       .then((response) => {this.setState({apiResponse:response})});
  // }
  render() {
    return (
      <main>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Createpost" component={CreatePost} />
            <Route path="/post/" component={Post}/>
          </Switch>
        </ThemeProvider>
      </main>
    );
  }
}

export default App;
