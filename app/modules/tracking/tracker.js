let draw = require("./draw");
let mouse = require("../mouse/mouse");
let blink = require("./blink");

//Used in point tracking
let pointsToAdd = [];       //Used in tracking after face is lost
let lostFacePoints = [];    //Used in tracking after face is lost
let firstLoopNoFace = true; //Used in tracking after face is lost
let lastXYs = [];           //For tracking face move offsets
let prevWholeFace = [];     //Used to detect blinks/facial changes

let userBlinked = false; //Used to change line color

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
  //Add manual points to be tracked
  if (pointsToAdd.length > 0) {
    brfManager.reset();
    brfManager.addOpticalFlowPoints(pointsToAdd);
    pointsToAdd = [];
  }

  let imageDataCtx = imageData.getContext("2d");
  imageDataCtx.setTransform(-1.0, 0, 0, 1, resolution.width, 0); // mirrored for draw of video
  imageDataCtx.drawImage(webcam, 0, 0, resolution.width, resolution.height);
  imageDataCtx.setTransform(1.0, 0, 0, 1, 0, 0); // unmirrored for draw of results
  brfManager.update(imageDataCtx.getImageData(0, 0, resolution.width, resolution.height).data);

  let faces = brfManager.getFaces();
  let faceFound = false;
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    if (face.state === brfv4.BRFState.FACE_TRACKING_START ||
      face.state === brfv4.BRFState.FACE_TRACKING) {
      faceFound = true;

      //Check offsets
      let newXYs = [];
      newXYs.push([face.vertices[60], face.vertices[61]]); //Tip of nose
      newXYs.push([face.vertices[66], face.vertices[67]]); //Middle base of nose
      newXYs.push([face.vertices[78], face.vertices[79]]); //Inside of users right eye (eye on left of screen)
      newXYs.push([face.vertices[84], face.vertices[85]]); //Inside of users left eye (eye on right of screen)

      //Update lost face!
      lostFacePoints = newXYs;

      //If first time in here after no face was found, clear old array of lastXYs
      if (!firstLoopNoFace) {
        lastXYs = [];
      }
      firstLoopNoFace = true;

      //Click if user has blinked
      if (prevWholeFace != []) {
        blinkRet = blink.blinked(prevWholeFace, face.vertices);
        userBlinked = blinkRet.waitingForTimeout;
        if (blinkRet.left && blinkRet.right) {
          //Maybe do something when both eyes blink?
        }
        else if (blinkRet.left) {
          mouse.mouseLeftClick();
        }
        else if (blinkRet.right) {
          mouse.mouseRightClick();
        }
      }
      prevWholeFace = face.vertices.slice(); //Copys by value instead of by reference

      //Move the mouse!
      moveMouse(lastXYs, newXYs);

      //Set last face coords to current face coords
      lastXYs = newXYs;

      //Set stroke color based on whether or not user was blinking
      // yellow = blink, blue = normal (no blink)
      imageDataCtx.strokeStyle = userBlinked ? "#e6e600" /*yellow*/: "#00a0ff"; /*blue*/

      //Draw dots
      for (let k = 0; k < face.vertices.length; k += 2) {
        draw.drawPoint(imageDataCtx, face.vertices[k], face.vertices[k + 1], 2);
      }
      //Draw triangles connecting dots
      if (face.triangles.length >= 3) {
        for (let k = 0; k < face.triangles.length; k += 3) {
          let indices = [face.triangles[k], face.triangles[k + 1], face.triangles[k + 2]];
          let pts = [ {x:face.vertices[indices[0]*2], y:face.vertices[indices[0]*2 + 1]},
            {x:face.vertices[indices[1]*2], y:face.vertices[indices[1]*2 + 1]},
            {x:face.vertices[indices[2]*2], y:face.vertices[indices[2]*2 + 1]} ];
          draw.drawTriangle(imageDataCtx, pts);
        }
      }
    }
  }

  //If no faces were found, draw rectangles where brfv4 is trying to locate faces
  //Also, begin tracking lostFacePoints until a face is found again
  if (!faceFound) {
    //Get points being tracked
    let opticalPoints = brfManager.getOpticalFlowPoints();
    let states = brfManager.getOpticalFlowPointStates();

    // Draw points by state: green valid, red invalid
    for (i = 0; i < opticalPoints.length; i++) {
      if (states[i]) { //Valid
        imageDataCtx.strokeStyle = "#00ff00";
        draw.drawPoint(imageDataCtx, opticalPoints[i].x, opticalPoints[i].y, 3)
      } else { //Invalid (Should never happen because setOpticalFlowCheckPointsValidBeforeTracking is set to true)
        imageDataCtx.strokeStyle = "#ff0000";
        draw.drawPoint(imageDataCtx, opticalPoints[i].x, opticalPoints[i].y, 3)
      }
    }

    //Move mouse based on lostFacePoints movement

    //If this is the first time in this code block after brfv4 failed to find a face:
    if (firstLoopNoFace) {
      for (let i = 0; i < lostFacePoints.length; i++) {
        let pt = lostFacePoints[i];
        pointsToAdd.push(new brfv4.Point(pt[0], pt[1]));
      }
      firstLoopNoFace = false;
    }
    //If this code has already been run:
    else {
      lostFacePoints = [];
      for (let i = 0; i < opticalPoints.length; i++) {
        let pt = opticalPoints[i];
        lostFacePoints.push([pt.x, pt.y]);
      }
      moveMouse(lastXYs, lostFacePoints)
      lastXYs = lostFacePoints;
    }

    //Rectangles
    let rectangles = brfManager.getAllDetectedFaces();
    for (let i = 0; i < rectangles.length; i++) {
      rect = rectangles[i];
      draw.drawSquare(imageDataCtx, rect);
    }
    rectangles = brfManager.getMergedDetectedFaces();
    for (let i = 0; i < rectangles.length; i++) {
      rect = rectangles[i];
      draw.drawSquare(imageDataCtx, rect);
    }
  }

  //Update
  requestAnimationFrame(trackFaces);
}

/*function onClicked(event) {
  let x = event.pageX;
  let y = event.pageY;
  // Add 1 point:
  pointsToAdd.push(new brfv4.Point(x, y));
}*/

function moveMouse(xy1/*Prev*/, xy2/*New*/) {
  if (xy1.length > 0) {
    let xTotal = 0;
    let yTotal = 0;
    for (let j = 0; j < xy2.length; j++) {
      xTotal += xy2[j][0] - xy1[j][0];
      yTotal += xy2[j][1] - xy1[j][1];
    }
    xTotal /= xy2.length;
    yTotal /= xy2.length;

    let factor = 10;
    mouse.moveLeftRight(xTotal*factor);
    mouse.moveUpDown(yTotal*factor);
  }
}

module.exports = { startTrackFaces/*, onClicked*/ };
