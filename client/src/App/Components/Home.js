import React from 'react';
import Sidebar from './sideBar/Sidebar'
import Content from "./content/content"
class Home extends React.Component{
    constructor(props){
        super(props);
        
        if(typeof(this.props.location.data)!=="undefined"){
            console.log(this.props.location.sidedata);
            this.state={
                data:props.location.data,
                username:props.location.sidedata.xusername,
                islog:props.location.sidedata.xislog}
        }
       else{
        this.state={
            data:{title:"",content:""},
            username:"",
            islog:false
       }
        };
        
    
    }
    render(){
        
        return(
            
            <div className="App">
              <Sidebar sislog={this.state.islog} susername={this.state.username}/>
              <Content xdata={this.state.data} xusername={this.state.username}/>
            </div>
        );
    }

}
export default Home;