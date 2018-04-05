const preferences = require("../../preferences/preferences");
const constants = require("../../utils/constants/constants");
const MouseModes = constants.MouseModes;

global.track = true;

/////////////////////
// Setters
/////////////////////

//TODO: Do these get called from snowboy.js?????
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

const setTrackBool = (bool) => {
  track = bool;
  console.log("new bool: " + track);
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

const getTrackBool = () => {
  return global.track;
}

module.exports = { updatePreference,
                    enterMouseMode, enterScrollMode, enterDragMode, 
                    getMode,
                    setLeftClick, setRightClick,              
                    getLeftClick, getRightClick,
                    setTrackBool, 
                    getTrackBool };
