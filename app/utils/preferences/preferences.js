const fs = require('fs');
const constants = require("../constants/constants");
const MouseModes = constants.MouseModes;
const InputOptions = constants.InputOptions;
/*
* mode:
* "mouse", "scroll", "drag"
* 
* left-click:
* "left-blink", "right-blink", "mouth"
*
* right-click:
* "left-blink", "right-blink", "mouth"
*
* sensitivity:
* 0 -> 1
*/
global.jsonPreferences = {}; //Will hold all preferences as a json object

let writeInProgress = false;
let queue = [];

const loadPreferences = () => {
  fs.readFile('./app/utils/preferences/preferences.json', (err, data) => {
    if (err) {
      console.log("Could not load user preferences!");
      console.log(err);
      //If error reading preferences from json, assume defaults
      
      /*mode = "mouse";
      leftClick = "left-blink";
      rightClick = "right-blink";*/

      jsonPreferences = {};
      jsonPreferences["mode"] = MouseModes.mouse;
      jsonPreferences["left-click"] = InputOptions.leftblink;
      jsonPreferences["right-click"] = InputOptions.rightblink;
      jsonPreferences["sensitivity"] = 0.5;

      return;
    }
    jsonPreferences = JSON.parse(data);
    /*mode = jsonPreferences["mode"];
    leftClick = jsonPreferences["left-click"];
    rightClick = jsonPreferences["right-click"];*/
  });
}

/*
* Valid keys and values for each key are:
* mode:
* "mouse", "scroll", "drag"
* 
* left-click:
* "left-blink", ...
*
* right-click:
* "right-blink", ...
*
* sensitivity:
* 0 -> 1
*/
const updatePreference = (key, val) => {
  queue.push([key,val]);
  updateNext();
}

const updateNext = () => {
  if (writeInProgress || queue.length == 0)
    return;

  writeInProgress = true;  
  let keyVal = queue.shift();
  let key = keyVal[0];
  let val = keyVal[1];

  //Make sure not to illegally set click method (both click methods may not be mouth):
  if ((key=="left-click" && val==InputOptions.mouth && jsonPreferences["right-click"]==InputOptions.mouth) ||
      (key=="right-click" && val==InputOptions.mouth && jsonPreferences["left-click"]==InputOptions.mouth)) {
    console.log("Could not save user preferences!");
    updateNext();
  }

//  console.log("jsonPreferences before origVal", jsonPreferences);

  let origVal = jsonPreferences[key];

  //console.log("stringify", JSON.stringify(jsonPreferences));
  jsonPreferences[key] = val;
  //console.log("stringify", JSON.stringify(jsonPreferences));
  //debugger;
  fs.writeFile('./app/utils/preferences/preferences.json', JSON.stringify(jsonPreferences), (err) => {
    writeInProgress = false;
    if (err) {
      console.log("Could not save user preferences!");
      console.log(err);
      jsonPreferences[key] = origVal;
    }
    //if (key=="mode" && val!="drag") //Check only after mode has actually been switched
      //mouse.toggleBtnUpDwn("up"); //Whenever mode switches away from drag mode, make sure mouse goes up.
    updateNext();
  });
}

const getMode = () => {
  return jsonPreferences['mode'];
}

const getLeftClick = () => {
  return jsonPreferences["left-click"];
}

const getRightClick = () => {
  return jsonPreferences["right-click"];
}

const getSensitivity = () => {
  return jsonPreferences["sensitivity"];
}

module.exports = { loadPreferences, updatePreference, getMode, getLeftClick, getRightClick, getSensitivity };