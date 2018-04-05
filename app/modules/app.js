let webcam = require("../app/modules/webcam/webcam");
let trackerSetup = require("../app/modules/tracking/setup");
let preferences = require("../app/preferences/preferences");
let voice = require("../app/modules/voice/voice");
let socket = require('../app/modules/socket');

let onTraining = () => {
    voice.trainVoiceModel();
};

socket.createSocketServer(onTraining);


preferences.loadPreferences();
webcam.startCamera();
webcam.onStreamDimensionsAvailable(trackerSetup.startTracker);
