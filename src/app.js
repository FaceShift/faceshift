let webcam = require("./webcam/webcam");
let voice = require("./voice/voice")
let trackerSetup = require("./tracking/setup");

webcam.startCamera();
webcam.onStreamDimensionsAvailable(trackerSetup.startTracker);

voice.start();
