let webcam = require("../app/modules/webcam/webcam");
let trackerSetup = require("../app/modules/tracking/setup");

webcam.startCamera();
webcam.onStreamDimensionsAvailable(trackerSetup.startTracker);
