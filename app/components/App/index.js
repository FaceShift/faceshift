import React from "react";
import Settings from "../Settings";
import EnableButtons from "../EnableButtons";

class Home extends React.Component {

  renderSettings = () => <Settings/>;

  renderMainButtons = () => <EnableButtons/>

  render() {
    return (
      <div>
        {this.renderMainButtons()}
        {this.renderSettings()}
      </div>
    );
  }
}

export default Home;
