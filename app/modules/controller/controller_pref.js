const preferences = require("../../utils/preferences/preferences");
const constants = require("../../utils/constants/constants");
const MouseModes = constants.MouseModes;

global.track = true;

/////////////////////
// Setters
/////////////////////

const updatePreference = (key, val) => {
    preferences.updatePreference(key, val);
}

const enterMouseMode = () => {
    updatePreference("mode", MouseModes.mouse);
}

const enterScrollMode = () => {
    updatePreference("mode", MouseModes.scroll);
}

const enterDragMode = () => {
    updatePreference("mode", MouseModes.drag);
}

const setLeftClick = (trigger) => {
    updatePreference("left-click", trigger);
}

const setRightClick = (trigger) => {
    updatePreference("right-click", trigger);
}

const setDoubleClick = (trigger) => {
    updatePreference("double-click", trigger);
}

const setTrackBool = (bool) => {
    track = bool;
}

const setSensitivity = (number) => {
    updatePreference("sensitivity", number);
}

/////////////////////
// Getters
/////////////////////

const getMode = () => {
    return preferences.getMode();
}

const getLeftClick = () => {
    return preferences.getLeftClick();
}

const getRightClick = () => {
    return preferences.getRightClick();
}

const getDoubleClick = () => {
    return preferences.getDoubleClick();
}

const getTrackBool = () => {
    return global.track;
}

module.exports = {
    updatePreference,
    enterMouseMode, enterScrollMode, enterDragMode,
    getMode,
    setLeftClick, setRightClick, setDoubleClick,
    getLeftClick, getRightClick, getDoubleClick,
    setTrackBool,
    getTrackBool,
    setSensitivity
};
