import React from "react";

class Home extends React.Component{

  renderCameraFeed = () => <video id="_webcam" playsInline></video>;

  render(){
    return(
      <div>
        React woooo
        {this.renderCameraFeed()}
        <canvas id="_imageData"></canvas>
      </div>
    );
  }
}

export default Home;