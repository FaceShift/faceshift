import React from "react";

import DropDown from "../DropDown/index";
import Gestures from "../../utils/constants/Gestures";
import BasicSlider from "../Slider";

class Settings extends React.Component {

  state = {
    isDisabled: true,
  };

  gesturesToArray = () => {
    const gestureArray = [];
    Object.keys(Gestures).forEach(
      gesture => {
        gestureArray.push(Gestures[gesture])
      }
    );
    return gestureArray;
  };

  onSensitivityChanged = (newValue) => {
    console.log("New value is ", newValue)
  };

  renderRightMouseClickDropDown = () => (<DropDown value={0} label="Right Mouse Click"
                                                   options={this.gesturesToArray()}
                                                   disabled={this.state.isDisabled}/>);

  renderLeftMouseClickDropDown = () => (<DropDown value={1} label="Left Mouse Click"
                                                  options={this.gesturesToArray()}
                                                  disabled={this.state.isDisabled}/>);

  renderDoubleClickDropDown = () => (<DropDown value={2} label="Double Click"
                                               options={this.gesturesToArray()}
                                               disabled={this.state.isDisabled}/>);

  renderSensitivitySlider = () => <BasicSlider
    disabled={this.state.isDisabled}
    onChange={this.onSensitivityChanged}/>;

  render() {
    return (
      <div>
        {this.renderRightMouseClickDropDown()}
        {this.renderLeftMouseClickDropDown()}
        {this.renderDoubleClickDropDown()}
        {this.renderSensitivitySlider()}
      </div>
    )
  }
}

export default Settings;
