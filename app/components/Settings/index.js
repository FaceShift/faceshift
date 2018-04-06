import React from "react";

import DropDown from "../DropDown/index";
import {Gestures, InputOptions} from "../../utils/constants/constants";
import BasicSlider from "../Slider";
import FlatButton from "material-ui/FlatButton";
import Slider from "material-ui/Slider";

import {Tabs, Tab} from "material-ui/Tabs";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import {Card, CardText} from "material-ui/Card";

import preferencesJSON from "../../utils/preferences/preferences.json";
import controller from "../../modules/controller/controller_pref";

let io = require('socket.io-client')
let socket = io("http://localhost:6767");

class Settings extends React.Component {

  state = {
    didSettingChange: false,
  };

  componentWillMount() {

    const preferences = JSON.parse(preferencesJSON);
    const rightClickValue = preferences["right-click"];
    const leftClickValue = preferences["left-click"];
    const sensitivity = preferences["sensitivity"];

    this.setState({
      sensitivityValue: sensitivity,
      rightClickValue: rightClickValue,
      leftClickValue: leftClickValue,
      doubleClickValue: 2,
    })
  }

  gesturesToArray = (gestures) => {
    const gestureArray = [];
    Object.keys(gestures).forEach(
      gesture => {
        gestureArray.push(gestures[gesture])
      }
    );
    return gestureArray;
  };

  onSensitivityChanged = (newValue) => {
    controller.setSensitivity(newValue);
    this.setState({sensitivityValue: newValue, isSettingsChanged: true})
  };

  renderSlider = () => (
    <div>
      <Slider defaultValue={this.state.sensitivityValue} onChange={(event, newValue) => this.onSensitivityChanged(newValue)}/>
    </div>
  );

  /*******************************************************************************
   * START OF THE NEW SETTINGS PAGE
   *******************************************************************************/

    // If any of the 3 dropdown settings has the same selection, it is invalid
  isDropdownSettingValid = () => {
    const allSettings = [this.state.rightClickValue, this.state.doubleClickValue, this.state.leftClickValue];
    return new Set(allSettings).size === allSettings.length;
  };

  renderDropdownOptions = () => this.gesturesToArray(InputOptions).map(
    (gesture) => <MenuItem key={`${gesture}${new Date()}`}value={gesture} primaryText={gesture}/>);


  //Options cannot share the same gestures

  renderErrorMessage = () => {
    return this.isDropdownSettingValid() ?
      <div/> : <Card><CardText>Options cannot share the same gestures</CardText></Card>
  };

  onRightClickChange = (event, index, value) => {
    this.setState({rightClickValue: value, didSettingsChange: true}, () => {
      this.isDropdownSettingValid() ? controller.setRightClick(value) : ""
    });
  };

  onLeftClickChange = (event, index, value) => {
    this.setState({leftClickValue: value, didSettingsChange: true}, () => {
        this.isDropdownSettingValid() ? controller.setLeftClick(value) : ""

    });
  };


  renderRightClick = () => (
    <div>
      <SelectField floatingLabelText="Right Click" value={this.state.rightClickValue}
                   onChange={this.onRightClickChange}>
        {this.renderDropdownOptions()}
      </SelectField>
    </div>
  );

  renderLeftClick = () => (
    <div>
      <SelectField floatingLabelText="Left Click" value={this.state.leftClickValue}
                   onChange={this.onLeftClickChange}>
        {this.renderDropdownOptions()}
      </SelectField>
    </div>
  );

  renderDropDowns = () => (
    <div>
      <Card>
        <CardText>
          {this.renderErrorMessage()}
          {this.renderRightClick()}
          {this.renderLeftClick()}
          {this.renderSlider()}
        </CardText>
      </Card>
    </div>
  );

  renderTrainVoiceModel = () => (
    <div>
      <Card>
        <CardText>
          Train voice model
        </CardText>
      </Card>
    </div>
  );

  renderNewSettings = () => (
    <div>
      <Tabs>
        <Tab label="Settings">
          <div>
            {this.renderDropDowns()}
          </div>
        </Tab>

        <Tab label="Voice Models">
          {this.renderTrainVoiceModel()}
        </Tab>
      </Tabs>
    </div>
  );

  /*******************************************************************************
   * END OF THE NEW SETTINGS PAGE
   *******************************************************************************/

  renderSettingsButton = () => (
    <div>
      Click to save your new changes
      <FlatButton label="Save"/>
    </div>
  );

  renderRightMouseClickDropDown = () => (<DropDown value={0} label="Right Mouse Click"
                                                   options={this.gesturesToArray(Gestures)}
  />);

  renderLeftMouseClickDropDown = () => (<DropDown value={1} label="Left Mouse Click"
                                                  options={this.gesturesToArray(Gestures)}
  />);

  renderDoubleClickDropDown = () => (<DropDown value={2} label="Double Click"
                                               options={this.gesturesToArray(Gestures)}/>);

  renderSensitivitySlider = () => <BasicSlider
    currentValue={this.state.sensitivityValue}
    onChange={this.onSensitivityChanged}/>;


  render() {
    return this.renderNewSettings();
  }
}

export default Settings;
