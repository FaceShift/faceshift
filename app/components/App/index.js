import React from "react";
import Settings from "../Settings";
import EnableButtons from "../EnableButtons";
import Divider from 'material-ui/Divider';
import "./styles.css";

class Home extends React.Component {

  renderSettings = () => <Settings/>;

  renderMainButtons = () => <EnableButtons/>;

  render() {
    return (
      <div>
        <div className="mainButtonContainer">
          {this.renderMainButtons()}
        </div>
        <Divider/>
        {this.renderSettings()}
      </div>
    );
  }
}

export default Home;
