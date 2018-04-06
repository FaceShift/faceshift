let tracker = require("./tracker");

const webcam = document.getElementById("_webcam"); // our webcam video
const imageData = document.getElementById("_imageData"); // image data for BRFv4
let brfManager = null;
let resolution = null;
let brfv4 = null;

function startTracker() {
    waitForSDK();
}

function waitForSDK() {
    if (brfv4 === null) {
        brfv4 = {
            locateFile: function () {
                return "../lib/BRFv4/libs/brf_asmjs/BRFv4_JS_trial.js.mem"
            }
        };
        initializeBRF(brfv4);
    }
    if (brfv4.sdkReady) {
        initSDK();
    } else {
        setTimeout(waitForSDK, 100);
    }
}

function initSDK() {
    // Resize the canvas to match the webcam video size.
    imageData.width = webcam.videoWidth;
    imageData.height = webcam.videoHeight;
    resolution = new brfv4.Rectangle(0, 0, imageData.width, imageData.height);
    brfManager = new brfv4.BRFManager();
    brfManager.init(resolution, resolution, "com.FaceShift.App");

    //To enable and set up point tracking
    brfManager.setMode(brfv4.BRFMode.FACE_TRACKING);
    brfManager.setOpticalFlowParams(21, 4, 50, 0.00005);
    brfManager.setOpticalFlowCheckPointsValidBeforeTracking(true);
    imageData.mouseEnabled = true;

    tracker.startTrackFaces(webcam, imageData, brfManager, resolution, brfv4);
}

module.exports = {startTracker};
