let draw = require("./draw");
let mouse = require("../peripheral/mouse");

//Used in point tracking
var pointsToAdd = [];
var numTrackedPoints = 0;

var webcam;
var imageData;
var brfManager;
var resolution;
var brfv4;

//For tracking face move offsets
var lastXYs = [];

function startTrackFaces(_webcam, _imageData, _brfManager, _resolution, _brfv4) {
  webcam = _webcam;
  imageData = _imageData;
  brfManager = _brfManager;
  resolution = _resolution;
  brfv4 = _brfv4;
  trackFaces();
}

function trackFaces() {
  //Add points to be tracked
  if (pointsToAdd.length > 0) {
    brfManager.addOpticalFlowPoints(pointsToAdd);
    pointsToAdd.length = 0;
  }

  var imageDataCtx = imageData.getContext("2d");
  imageDataCtx.setTransform(-1.0, 0, 0, 1, resolution.width, 0); // mirrored for draw of video
  imageDataCtx.drawImage(webcam, 0, 0, resolution.width, resolution.height);
  imageDataCtx.setTransform(1.0, 0, 0, 1, 0, 0); // unmirrored for draw of results
  brfManager.update(imageDataCtx.getImageData(0, 0, resolution.width, resolution.height).data);

  var faces = brfManager.getFaces();
  var faceFound = false;
  for (var i = 0; i < faces.length; i++) {
    var face = faces[i];
    if (face.state === brfv4.BRFState.FACE_TRACKING_START ||
      face.state === brfv4.BRFState.FACE_TRACKING) {
      faceFound = true;
      imageDataCtx.strokeStyle = "#00a0ff";
      
      //Check offsets
      var newXYs = [];
      newXYs.push([face.vertices[60], face.vertices[61]]); //Tip of nose
      newXYs.push([face.vertices[66], face.vertices[67]]); //Middle base of nose
      newXYs.push([face.vertices[78], face.vertices[79]]); //Inside of users right eye (eye on left of screen)
      newXYs.push([face.vertices[84], face.vertices[85]]); //Inside of users left eye (eye on right of screen)
      if (lastXYs.length > 0) {
        var xTotal = 0;
        var yTotal = 0;
        for (var j = 0; j < newXYs.length; j++) {
          xTotal += newXYs[j][0] - lastXYs[j][0];
          yTotal += newXYs[j][1] - lastXYs[j][1];
        }
        xTotal /= newXYs.length;
        yTotal /= newXYs.length;

        mouse.moveLeftRight(xTotal*10);
        mouse.moveUpDown(yTotal*10);
      }
      lastXYs = newXYs;

      //Draw dots
      for (var k = 0; k < face.vertices.length; k += 2) {
        draw.drawPoint(imageDataCtx, face.vertices[k], face.vertices[k + 1], 2);
      }
      //Draw triangles connecting dots
      if (face.triangles.length >= 3) {
        for (var k = 0; k < face.triangles.length; k += 3) {
          var indices = [face.triangles[k], face.triangles[k + 1], face.triangles[k + 2]];
          var pts = [ {x:face.vertices[indices[0]*2], y:face.vertices[indices[0]*2 + 1]}, 
                      {x:face.vertices[indices[1]*2], y:face.vertices[indices[1]*2 + 1]}, 
                      {x:face.vertices[indices[2]*2], y:face.vertices[indices[2]*2 + 1]} ];
          draw.drawTriangle(imageDataCtx, pts);
        }
      }
    }
  }
  //If no faces were found, draw rectangles where brfv4 is trying to locate faces
  if (!faceFound) {
    var rectangles = brfManager.getAllDetectedFaces();
    for (var i = 0; i < rectangles.length; i++) {
      rect = rectangles[i];
      draw.drawSquare(imageDataCtx, rect);
    }
    rectangles = brfManager.getMergedDetectedFaces();
    for (var i = 0; i < rectangles.length; i++) {
      rect = rectangles[i];
      draw.drawSquare(imageDataCtx, rect);
    }
  }

  //Get points being tracked
  var points = brfManager.getOpticalFlowPoints();
  var states = brfManager.getOpticalFlowPointStates();

  // Draw points by state: green valid, red invalid
  for (i = 0; i < points.length; i++) {
    if (states[i]) { //Valid
      imageDataCtx.strokeStyle = "#00ff00";
      draw.drawPoint(imageDataCtx, points[i].x, points[i].y, 3)
    } else { //Invalid
      imageDataCtx.strokeStyle = "#ff0000";
      draw.drawPoint(imageDataCtx, points[i].x, points[i].y, 3)
    }
  }

  if (points.length !== numTrackedPoints) {
    numTrackedPoints = points.length;
  }

  requestAnimationFrame(trackFaces);
}

function onClicked(event) {
  var x = event.pageX;
  var y = event.pageY;

  // Add 1 point:
  pointsToAdd.push(new brfv4.Point(x, y));

  //Add 100 points
  /*var w = 60.0;
  var step = 6.0;
  var xStart = x - w * 0.5;
  var xEnd = x + w * 0.5;
  var yStart = y - w * 0.5;
  var yEnd = y + w * 0.5;
  var dy = yStart;
  var dx = xStart;

  for(; dy < yEnd; dy += step) {
      for(dx = xStart; dx < xEnd; dx += step) {
          pointsToAdd.push(new brfv4.Point(dx, dy));
      }
  }*/
}

module.exports = { startTrackFaces, onClicked };