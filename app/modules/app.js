let webcam = require("../app/modules/webcam/webcam");
let trackerSetup = require("../app/modules/tracking/setup");
let preferences = require("../app/preferences/preferences")

preferences.loadPreferences();
webcam.startCamera();
webcam.onStreamDimensionsAvailable(trackerSetup.startTracker);
