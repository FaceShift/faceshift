import React from "react";
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import MicOnIcon from "material-ui/svg-icons/av/mic";
import MicOffIcon from "material-ui/svg-icons/av/mic-off";
import WebcamOnIcon from "material-ui/svg-icons/av/videocam";
import WebcamOffIcon from "material-ui/svg-icons/av/videocam-off"
import RadioButtons from "../RadioButtons";

import { Modes, MouseModes } from "../../utils/constants/constants";
import "./styles.css"; 

import webcam from "../../modules/webcam/webcam";

import * as controller from "../../modules/controller/controller_pref";

class EnableButtons extends React.Component{

  state = {
    isMicOn: true,
    isWebcamOn: true,
  };

  onCameraButtonClicked = () => {
    this.setState({ isWebcamOn: !this.state.isWebcamOn});
    controller.setTrackBool(!this.state.isWebcamOn);
  };


  onMicrophoneButtonClicked = () => {
    this.setState({ isMicOn: !this.state.isMicOn});
  };

  renderMicrophoneButton = () => (
    <FlatButton
      icon={this.state.isMicOn ? <MicOnIcon/> : <MicOffIcon/>}
      onClick={this.onMicrophoneButtonClicked}
    />
  );

  renderCameraButton = () => (
    <FlatButton
      icon={this.state.isWebcamOn ? <WebcamOnIcon/> : <WebcamOffIcon/>}
      onClick={this.onCameraButtonClicked}
    />
  );

  onRadioButtonClick = (value) => {
    console.log("Switched mode to ", value);
    switch (value){
      case MouseModes.drag:
        controller.enterDragMode();
        break;
      case MouseModes.mouse:
        controller.enterMouseMode();
        break;
      case MouseModes.scroll:
        controller.enterScrollMode();
        break;
      default:
        break;
    }
  };

  renderMouseModeButton = () => (
    <RadioButtons options={Modes} name="Mouse Modes" onClick={this.onRadioButtonClick}/>
  );

  render(){
    return(
      <div className="container">
        <div className="toggleButton">
          <div>
            {this.renderMicrophoneButton()}
          </div>
          <div>
            {this.renderCameraButton()}
          </div>
        </div>
        <div>
          <div style={{ width: 200}}>
            {this.renderMouseModeButton()}
          </div>
        </div>
      </div>
    )
  }
}

export default EnableButtons;
