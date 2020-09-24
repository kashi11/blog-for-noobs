import React from "react";
import "./content.css";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import {withRouter} from "react-router-dom";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      ditems:[],
      hasmore:true,
      skip: 0,
      limit: 10,
      data: this.props.xdata,
      username: this.props.xusername,
    };
    this.Card = this.Card.bind(this);
  }
  componentDidMount() {
    let data={
      skip: this.state.skip,
      limit: this.state.limit
    }
    axios
      .get(
        "http://localhost:9000/posts",{params:data}
      )
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((err) => console.log(err));
  }

  fetchItems=()=>{
    if(this.state.items.length%10!==0){
      this.setState({hasmore:false});
    }
    else{
      this.setState({ditems:this.state.items});
    }
    this.setState({skip:this.state.skip+this.state.limit});
    let data={
      skip: this.state.skip,
      limit: this.state.limit
    }
    axios
      .get(
        "http://localhost:9000/posts",{params:data}
      )
      .then((response) => {this.setState({ items: this.state.items.concat(response.data)});
        
    })
      .catch((err) => console.log(err));
  }
  linktopost=(ev)=>{
    let id=ev.target.id
    this.props.history.push("/post?id="+id);

  }
  render() {
    return (
      <div id="content">
        <div className="postContainer">
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchItems}
            hasMore={this.state.hasmore}
            loader={<h4>loading...</h4>}
            endMessage={<h4>The End</h4>}
          >
            {this.state.items.map((item) => (
              <this.Card key={item._id} class="card" xitem={item} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
  Card(props) {
    if (props.xitem.title !== "") {
      return (
        <div className={props.class}>
          <h3 className="pcon" id={props.xitem._id} onClick={this.linktopost}>{props.xitem.title}</h3>
          <p className="pcon">{props.xitem.content}</p>
          <div id="det">
            <span className="detail">{props.xitem.username}</span>
            <span className="detail">{props.xitem.date}</span>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
export default withRouter(Content);
