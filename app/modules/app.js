let webcam = require("../app/modules/webcam/webcam");
let trackerSetup = require("../app/modules/tracking/setup");
let preferences = require("../app/preferences/preferences");
let voice = require("../app/modules/voice/voice");
let socket = require('../app/modules/socket');

let _onMessage = (message) => {
    switch (message) {
        case "train":
            console.log("Training!")
            //voice.trainVoiceModel();
            break;
        default:
            console.log("Uncaught message:", message);
            break;
    }
};

socket.createSocketServer(_onMessage);


preferences.loadPreferences();
webcam.startCamera();
webcam.onStreamDimensionsAvailable(trackerSetup.startTracker);
