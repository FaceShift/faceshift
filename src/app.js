let webcam = require("./webcam/webcam");
let voice = require("./voice/voice2")
let trackerSetup = require("./tracking/setup");

voice.start();

//webcam.startCamera();
webcam.onStreamDimensionsAvailable(trackerSetup.startTracker);