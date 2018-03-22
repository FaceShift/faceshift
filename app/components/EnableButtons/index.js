import React from "react";
import FlatButton from 'material-ui/FlatButton';

import MicOnIcon from "material-ui/svg-icons/av/mic";
import MicOffIcon from "material-ui/svg-icons/av/mic-off";

import WebcamOnIcon from "material-ui/svg-icons/av/videocam";
import WebcamOffIcon from "material-ui/svg-icons/av/videocam-off"

import webcam from "../../modules/webcam/webcam";

class EnableButtons extends React.Component{

  state = {
    isMicOn: true,
    isWebcamOn: true,
  };

  onCameraButtonClicked = () => {
    (this.state.isWebcamOn) ? webcam.stopCamera() : webcam.startCamera();
    this.setState({ isWebcamOn: !this.state.isWebcamOn});
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

  render(){
    return(
      <div>
        {this.renderMicrophoneButton()}
        {this.renderCameraButton()}
      </div>
    )
  }
}

export default EnableButtons;
