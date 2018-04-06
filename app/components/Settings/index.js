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
    this.setState({sensitivityValue: newValue, isSettingsChanged: true})
  };

  onSaveClicked = () => {

  };

  renderSlider = () => (
    <div>
      <Slider/>
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
    (gesture, index) => <MenuItem value={gesture} primaryText={gesture}/>);

  renderSaveButton = () => (
    <div>
      <FlatButton label="Save" disabled={!this.state.didSettingChange && !this.isDropdownSettingValid()}/>
    </div>
  );

  //Options cannot share the same gestures

  renderErrorMessage = () => {
    return this.isDropdownSettingValid() ?
      <div/> : <Card><CardText>Options cannot share the same gestures</CardText></Card>
  };

  renderRightClick = () => (
    <div>
      <SelectField floatingLabelText="Right Click" value={this.state.rightClickValue}
                   onChange={(event, index, value) => this.setState({rightClickValue: value, didSettingChange: true})}>
        {console.log("right click value", this.state.rightClickValue)}
        {this.renderDropdownOptions()}
      </SelectField>
    </div>
  );

  renderLeftClick = () => (
    <div>
      <SelectField floatingLabelText="Left Click" value={this.state.leftClickValue}
                   onChange={(event, index, value) => this.setState({leftClickValue: value, didSettingChange: true})}>
        {console.log("left click value", this.state.leftClickValue)}
        {this.renderDropdownOptions()}
      </SelectField>
    </div>
  );

  renderDropDowns = () => (
    <div>
      <Card>
        <CardText>
          {this.renderSaveButton()}
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
    console.log("state", this.state);
    console.log(this.gesturesToArray(InputOptions));
    return this.renderNewSettings();
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
