import React from "react";

import DropDown from "../DropDown/index";
import { Gestures } from "../../utils/constants/constants";
import BasicSlider from "../Slider";
import FlatButton from "material-ui/FlatButton";
import Divider from 'material-ui/Divider';

class Settings extends React.Component {

  state = {
    sensitivityValue: 0.5,
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
    this.setState({sensitivityValue: newValue, isSettingsChanged: true})
  };

  onSaveClicked = () => {

  };

  renderSettingsButton = () => (
    <div>
      Click to save your new changes
      <FlatButton label="Save"/>
    </div>
  );

  renderRightMouseClickDropDown = () => (<DropDown value={0} label="Right Mouse Click"
                                                   options={this.gesturesToArray()}
  />);

  renderLeftMouseClickDropDown = () => (<DropDown value={1} label="Left Mouse Click"
                                                  options={this.gesturesToArray()}
  />);

  renderDoubleClickDropDown = () => (<DropDown value={2} label="Double Click"
                                               options={this.gesturesToArray()}
  />);

  renderSensitivitySlider = () => <BasicSlider
    currentValue={this.state.sensitivityValue}
    onChange={this.onSensitivityChanged}/>;

  render() {
    return (
      <div>
        {this.renderSettingsButton()}
        {this.renderRightMouseClickDropDown()}
        {this.renderLeftMouseClickDropDown()}
        {this.renderDoubleClickDropDown()}
        {this.renderSensitivitySlider()}
      </div>
    )
  }
}

export default Settings;
