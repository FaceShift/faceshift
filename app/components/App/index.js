import React from "react";
import RaisedButton from "material-ui/RaisedButton";

import DropDown from "../DropDown/index";
import Gestures from "../../config/constants/Gestures";

class Home extends React.Component {

  gesturesToArray = () => {
    const gestureArray = [];
    Object.keys(Gestures).forEach(
      gesture => {
        gestureArray.push([Gestures[gesture]])
      }
    );
    return gestureArray;
  };

  renderRightMouseClickDropDown = () => <DropDown options={this.gesturesToArray()}/>;

  renderLeftMouseClickDropDown = () =>  <DropDown options={this.gesturesToArray()}/>;

  renderDoubleClickDropDown = () => <DropDown options={this.gesturesToArray()}/>;

  render() {
    return (
      <div>
        FaceShift
      </div>
    );
  }
}

export default Home;
