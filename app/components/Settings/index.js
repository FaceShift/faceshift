import React from "react";

import DropDown from "../DropDown/index";
import Gestures from "../../utils/constants/Gestures";

class Settings extends React.Component {

  gesturesToArray = () => {
    const gestureArray = [];
    Object.keys(Gestures).forEach(
      gesture => {
        gestureArray.push(Gestures[gesture])
      }
    );
    return gestureArray;
  };

  renderRightMouseClickDropDown = () => <DropDown value={0} label="Right Mouse Click" options={this.gesturesToArray()}/>;

  renderLeftMouseClickDropDown = () => <DropDown value={1} label="Left Mouse Click" options={this.gesturesToArray()}/>;

  renderDoubleClickDropDown = () => <DropDown value={2} label="Double Click" options={this.gesturesToArray()}/>;

  render() {
    return (
      <div>
        {this.renderRightMouseClickDropDown()}
        {this.renderLeftMouseClickDropDown()}
        {this.renderDoubleClickDropDown()}
      </div>
    )
  }
}

export default Settings;
