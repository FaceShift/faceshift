let webcam = require("./webcam/webcam");
let voice = require("./voice/voice")
let trackerSetup = require("./tracking/setup");

voice.test();

//webcam.startCamera();
webcam.onStreamDimensionsAvailable(trackerSetup.startTracker);