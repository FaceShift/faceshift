import React from "react";

import DropDown from "../DropDown/index";
import {Gestures} from "../../utils/constants/constants";
import BasicSlider from "../Slider";
import FlatButton from "material-ui/FlatButton";
import Divider from "material-ui/Divider";
import Slider from "material-ui/Slider";

import {Tabs, Tab} from "material-ui/Tabs";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";


import preferencesJSON from "../../utils/preferences/preferences.json";

class Settings extends React.Component {

  state = {
    sensitivityValue: 0.5,
    rightClickValue: 0,
    leftClickValue: 1,
    doubleClickValue: 2,
    didSettingChange: false,
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

  renderDropdownOptions = () => this.gesturesToArray().map(
    (gesture, index) => <MenuItem value={index} primaryText={gesture}/>
  );

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
        {this.renderDropdownOptions()}
      </SelectField>
    </div>
  );

  renderLeftClick = () => (
    <div>
      <SelectField floatingLabelText="Left Click" value={this.state.leftClickValue}
                   onChange={(event, index, value) => this.setState({leftClickValue: value, didSettingChange: true})}>
        {this.renderDropdownOptions()}
      </SelectField>
    </div>
  );

  renderDoubleClick = () => (
    <div>
      <SelectField floatingLabelText="Double Click" value={this.state.doubleClickValue}
                   onChange={(event, index, value) => this.setState({doubleClickValue: value, didSettingChange: true})}>
        {this.renderDropdownOptions()}
      </SelectField>
    </div>
  );

  re

  renderDropDowns = () => (
    <div>
      <Card>
        <CardText>
          {this.renderSaveButton()}
          {this.renderErrorMessage()}
          {this.renderRightClick()}
          {this.renderLeftClick()}
          {this.renderDoubleClick()}
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
          <div> Voice Model</div>
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
                                                   options={this.gesturesToArray()}
  />);

  renderLeftMouseClickDropDown = () => (<DropDown value={1} label="Left Mouse Click"
                                                  options={this.gesturesToArray()}
  />);

  renderDoubleClickDropDown = () => (<DropDown value={2} label="Double Click"
                                               options={this.gesturesToArray()}
  />);

  renderSensitivitySlider = () => <BasicSlider
    currentValue={this.state.sensitivityValue}
    onChange={this.onSensitivityChanged}/>;

  render() {
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
