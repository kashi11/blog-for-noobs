import React from "react";
import querryString from "query-string";
import axios from "axios";
import { Container } from "@material-ui/core";
class Post extends React.Component {
  constructor(props) {
    super(props);
    const query = querryString.parse(this.props.location.search);
    this.state = { qdata: query, item: {} };
  }
  componentDidMount() {
    axios
      .get("http://localhost:9000/posts/id", { params: this.state.qdata })
      .then((res) => {
        console.log(res.data[0]);
        this.setState({ item: res.data[0] });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    console.log(this.state.item);
    return (
      <Container style={{fontSize:"1.2rem",backgroundColor:"darkslategray"}} id="pcontainer">
        <h2>{this.state.item.title}</h2>
        <p>{this.state.item.content}</p>
        
      </Container>
    );
  }
}
export default Post;
