import React from "react";

import DropDown from "../DropDown/index";
import {Gestures} from "../../utils/constants/constants";
import BasicSlider from "../Slider";
import FlatButton from "material-ui/FlatButton";

class Settings extends React.Component {

  state = {
    isDisabled: true,
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
    this.setState({ sensitivityValue: newValue})
  };

  renderSettingsButton = () => (
    <FlatButton onClick={() => this.setState({isDisabled: !this.state.isDisabled})}
                label={this.state.isDisabled ? "Edit" : "Save"}/>
  );

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
    currentValue={this.state.sensitivityValue}
    disabled={this.state.isDisabled}
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
