let webcam = require("../app/modules/webcam/webcam");
let trackerSetup = require("../app/modules/tracking/setup");
let preferences = require("../app/utils/preferences/preferences");

let voice = require("../app/modules/voice/voice");
let socket = require('../app/modules/socket');

voice.start();

let onTraining = () => {
    voice.retrainVoiceModel();
};

let onMicStateChange = (micState) => {
    if (micState) {
        voice.start();
    } else {
        voice.stop();
    }
};

socket.createSocketServer(onTraining, onMicStateChange);


preferences.loadPreferences();
webcam.startCamera();
webcam.onStreamDimensionsAvailable(trackerSetup.startTracker);
