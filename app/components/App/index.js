import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import DropDown from "../DropDown/index";

class Home extends React.Component{

  render(){
    return(
      <div>
        FaceShift
        <input type="number" />
        <RaisedButton label="Click me"/>
        <DropDown />
      </div>
    );
  }
}

export default Home;
