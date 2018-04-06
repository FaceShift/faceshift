let webcam = require("../app/modules/webcam/webcam");
let trackerSetup = require("../app/modules/tracking/setup");
let preferences = require("../app/preferences/preferences");

// Voice
let voice = require("../app/modules/voice/voice");
let socket = require('../app/modules/socket');

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

voice.setMessageCallback(socket.sendMessage);
voice.start();
socket.createSocketServer(onTraining, onMicStateChange, voice.getLastMessage());

preferences.loadPreferences();
webcam.startCamera();
webcam.onStreamDimensionsAvailable(trackerSetup.startTracker);
