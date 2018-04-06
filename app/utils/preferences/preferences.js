let mouse = require("../modules/mouse/mouse");
const fs = require("fs");

/*
* mode:
* "mouse", "scroll", "drag"
*
* left-click:
* "left-blink", "mouth"
*
* right-click:
* "right-blink", "mouth"
*/
let jsonPreferences = {}; //Will hold all preferences as a json object

writeInProgress = false;
queue = [];

function loadPreferences() {
    fs.readFile("./app/preferences/preferences.json", (err, data) => {
        if (err) {
            console.log("Could not load user preferences!");
            console.log(err);
            //If error reading preferences from json, assume defaults
            mode = "mouse";
            leftClick = "left-blink";
            rightClick = "right-blink";
            return;
        }
        jsonPreferences = JSON.parse(data);
        mode = jsonPreferences["mode"];
        leftClick = jsonPreferences["left-click"];
        rightClick = jsonPreferences["right-click"];
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
*/
function updatePreference(key, val) {
    queue.push([key, val]);
    updateNext();
}

function updateNext() {
    if (writeInProgress || queue.length === 0)
        return;

    writeInProgress = true;
    keyVal = queue.shift();
    key = keyVal[0];
    val = keyVal[1];

    //Make sure not to illegally set click method (both click methods may not be mouth):
    if ((key === "left-click" && val === "mouth" && jsonPreferences["right-click"] === "mouth") ||
        (key === "right-click" && val === "mouth" && jsonPreferences["left-click"] === "mouth")) {
        console.log("Could not save user preferences!");
        updateNext();
    }

    let origVal = jsonPreferences[key];
    jsonPreferences[key] = val;
    fs.writeFile("./app/preferences/preferences.json", JSON.stringify(jsonPreferences), (err) => {
        writeInProgress = false;
        if (err) {
            console.log("Could not save user preferences!");
            console.log(err);
            jsonPreferences[key] = origVal;
        }
        if (key === "mode" && val !== "drag") //Check only after mode has actually been switched
            mouse.toggleBtnUpDwn("up"); //Whenever mode switches away from drag mode, make sure mouse goes up.
        updateNext();
    });
}

function getMode() {
    return jsonPreferences["mode"];
}

function getLeftClick() {
    return jsonPreferences["left-click"];
}

function getRightClick() {
    return jsonPreferences["right-click"];
}

module.exports = {loadPreferences, updatePreference, getMode, getLeftClick, getRightClick};
