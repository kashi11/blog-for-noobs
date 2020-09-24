import React from "react";
import './sidebar.css';
import LogSign from './LogSign'
import { Button } from "@material-ui/core";
import {Link} from 'react-router-dom';
import Swal from "sweetalert2"
window.Swal = Swal;
class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false, key: 0,
      islog:props.sislog, username:props.susername,
      blogclass:"blog1"
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.getlogData = this.getlogData.bind(this);
    this.getshow = this.getshow.bind(this);
    this.post=this.post.bind(this);
    this.ChangeElement=this.ChangeElement.bind(this);
    this.getusername=this.getusername.bind(this);
    this.logout = this.logout.bind(this);
  }

  // componentDidMount() {
  //   fetch("http://localhost:9000/users")
  //       .then((response) => response.text())
  //       .then((response) => {this.setState({apiResponse:response})});
  // }
  render() {
    return (
      <div className="sideBar">
        <img src={require('./index.png')} alt="avatar logo"></img>

        <div id="logsign">
          <this.ChangeElement/>
        </div>
        <h2 className={!this.state.show?"blog1":"blog2"}>Blog for Noobs</h2>
        <div id="link">
          <Link to={{
            pathname:"/createPost",
            sData:{xusername:this.state.username,xislog:this.state.islog}
          }}>
            <Button color="secondary" variant="contained" onClick={this.post} >Post</Button>
          </Link>
        </div>
      </div>



    );
  }
  post(ev){
      
    if(this.state.islog){

    }
    else{
      ev.preventDefault();
      Swal.fire({title:'Error!', text:'If you want to post please login first',icon:'error',
        background:"#212121",
        confirmButtonColor:'#c5003c'
    });
    }
  }
  logout(){
    this.setState({islog:false,username:"",show:false});
  }
  getshow(show){
    this.setState({show:false});
  }

  login(props) {
    this.setState({ show: true, key: 1 });

  }
  signup(props) {
    this.setState({ show: true, key: 2 });
  }
  getlogData(data) {
    this.setState({islog:true});
  }
  getusername(username){
    this.setState({username:username,show:false});
  }
  ChangeElement(props) {

    if (this.state.show&&!this.state.islog) {
      return (<LogSign 
        keyprop={this.state.key} 
        sendLogged={this.getlogData} 
        showstate={this.getshow}
        obusername={this.getusername}
        />)
    }
    else if(this.state.islog){
      return(
        <div >
          <h3 id="afterlogin">{this.state.username}</h3>
          <div id="logout">
            <Button color="secondary" variant="text" onClick={this.logout} >logout</Button>
          </div>
        </div>
      );
    }
    else {
      return (
        <ul>
          <li className="Login" onClick={this.login}>Login?</li>or
          <li onClick={this.signup}>Signup</li>
        </ul>
      );
    }
  }

}

export default Sidebar;
