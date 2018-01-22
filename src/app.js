let webcam = require("./webcam/webcam");
let trackerSetup = require("./tracking/setup");

webcam.startCamera();
webcam.onStreamDimensionsAvailable(trackerSetup.startTracker);
