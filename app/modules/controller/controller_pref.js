const preferences = require("../../preferences/preferences");

const updatePreference = (key, val) => {
    preferences.updatePreference(key, val);
}

global.track = true;

//TODO: Do these get called from snowboy.js?????
const enterMouseMode = () => {
    updatePreference("mode", "mouse");
}

const enterScrollMode = () => {
    updatePreference("mode", "scroll");
}

const enterDragMode = () => {
    updatePreference("mode", "drag");
}

const getMode = () => {
    return preferences.getMode();
}

const getLeftClick = () => {
    return preferences.getLeftClick();
}

const getRightClick = () => {
    return preferences.getRightClick();
}

const setTrackBool = (bool) => {
    track = bool;
    console.log("new bool: " + track);
}

const getTrackBool = () => {
    return global.track;
}

module.exports = {
    enterMouseMode, enterScrollMode, enterDragMode,
    getMode, getLeftClick, getRightClick,
    setTrackBool, getTrackBool, track
};