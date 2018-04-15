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
* double-click:
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

            jsonPreferences = {};
            jsonPreferences["mode"] = MouseModes.mouse;
            jsonPreferences["left-click"] = InputOptions.leftblink;
            jsonPreferences["right-click"] = InputOptions.rightblink;
            jsonPreferences["double-click"] = InputOptions.mouth;
            jsonPreferences["sensitivity"] = 0.5;

            return;
        }
        jsonPreferences = JSON.parse(data);
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
* double-click:
* "left-blink", ...
*
* sensitivity:
* 0 -> 1
*/
const updatePreference = (key, val) => {
    queue.push([key, val]);
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
    //Should really have checks here for everything, but its all being done in React
    // anyways, so this is pretty redundant
    if ((key == "left-click" && val == InputOptions.mouth && jsonPreferences["right-click"] == InputOptions.mouth) ||
        (key == "right-click" && val == InputOptions.mouth && jsonPreferences["left-click"] == InputOptions.mouth)) {
        console.log("Could not save user preferences!");
        updateNext();
    }

    let origVal = jsonPreferences[key];

    jsonPreferences[key] = val;
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

const getDoubleClick = () => {
    return jsonPreferences["double-click"]
};

const getSensitivity = () => {
    return jsonPreferences["sensitivity"];
}

module.exports = {loadPreferences, updatePreference, getMode, getLeftClick, getRightClick, getDoubleClick, getSensitivity};