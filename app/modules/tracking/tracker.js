let controller = require("../controller/controller");
let contr_prefs = require("../controller/controller_pref");

//Camera/Library letiables
let webcam;
let imageData;
let brfManager;
let resolution;
let brfv4;

function startTrackFaces(_webcam, _imageData, _brfManager, _resolution, _brfv4) {
  webcam = _webcam;
  imageData = _imageData;
  brfManager = _brfManager;
  resolution = _resolution;
  brfv4 = _brfv4;
  trackFaces();
}

function trackFaces() {
  if (contr_prefs.getTrackBool()) {
    controller.addManualPoints(brfManager);
  }

  let imageDataCtx = imageData.getContext("2d");
  imageDataCtx.setTransform(-1.0, 0, 0, 1, resolution.width, 0); // mirrored for draw of video
  imageDataCtx.drawImage(webcam, 0, 0, resolution.width, resolution.height);
  imageDataCtx.setTransform(1.0, 0, 0, 1, 0, 0); // unmirrored for draw of results
  brfManager.update(imageDataCtx.getImageData(0, 0, resolution.width, resolution.height).data);

  if (contr_prefs.getTrackBool()) {
    controller.processFaces(brfManager, resolution, brfv4, imageDataCtx);
  }

  //Update
  requestAnimationFrame(trackFaces);
}

module.exports = { startTrackFaces};
