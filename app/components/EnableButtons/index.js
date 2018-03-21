import React from "react";
import FlatButton from 'material-ui/FlatButton';

import MicOnIcon from "material-ui/svg-icons/av/mic";
import MicOffIcon from "material-ui/svg-icons/av/mic-off";

import WebcamOnIcon from "material-ui/svg-icons/av/videocam";
import WebcamOffIcon from "material-ui/svg-icons/av/videocam-off"

class EnableButtons extends React.Component{

  state = {
    isMicOn: true,
    isWebcamOn: true,
  };

  renderMicrophoneButton = () => (
    <FlatButton
      icon={this.state.isMicOn ? <MicOnIcon/> : <MicOffIcon/>}
      onClick={() => this.setState({ isMicOn: !this.state.isMicOn}) }
    />
  );

  renderCameraButton = () => (
    <FlatButton
      icon={this.state.isWebcamOn ? <WebcamOnIcon/> : <WebcamOffIcon/>}
      onClick={() => this.setState({ isWebcamOn: !this.state.isWebcamOn}) }
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
