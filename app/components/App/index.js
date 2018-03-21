import React from "react";
import Settings from "../Settings";

class Home extends React.Component {

  renderSettings = () => <Settings/>;

  render() {
    return (
      <div>
        FaceShift
        {this.renderSettings()}
      </div>
    );
  }
}

export default Home;
