let waitingForTimeout = false;
let timeOut = -1;

function blinked(v1, v2, checkL, checkR) {
  //Values to be returned
  let leftBlinkOccurred = false;
  let rightBlinkOccurred = false;

  //Avoid too many blinks
  if (waitingForTimeout) {
    return {
      left: leftBlinkOccurred,
      right: rightBlinkOccurred,
      waitingForTimeout: waitingForTimeout
    };
  }

  let i, l, yLE, yRE;

  //Check for left blink
  for(i = 36, l = 41, yLE = 0; i <= l; i++) {
    yLE += Math.abs(v2[i * 2 + 1] - v1[i * 2 + 1]);
  }
  yLE /= 6;

  //Check for right blink
  for(i = 42, l = 47, yRE = 0; i <= l; i++) {
    yRE += Math.abs(v2[i * 2 + 1] - v1[i * 2 + 1]);
  }
  yRE /= 6;

  //Compare to overall movement of face (by using bridge-of-nose points)
  let yN = 0;
  yN += v2[27 * 2 + 1] - v1[27 * 2 + 1];
  yN += v2[28 * 2 + 1] - v1[28 * 2 + 1];
  yN += v2[29 * 2 + 1] - v1[29 * 2 + 1];
  yN += v2[30 * 2 + 1] - v1[30 * 2 + 1];
  yN /= 4;

  let leftBlinkRatio = Math.abs(yLE / yN);
  let rightBlinkRatio = Math.abs(yRE / yN);
  let ratioLimit = 10; //Ratio must be atleast this to be considered a blink
  let pxLimit = 1;   //Avg pixel movement must be atleast this to be considered a blink
  leftBlinkOccurred = leftBlinkRatio > ratioLimit && yLE > pxLimit;
  rightBlinkOccurred = rightBlinkRatio > ratioLimit && yRE > pxLimit;

  //If only one eye was detected to have blinked:
  if(leftBlinkOccurred ^ rightBlinkOccurred) {
    /*
     * Here we test for false positive winks. i.e. both eyes were blinked,
     * but the program only registered one eye to have blinked.
     *
     * Case 1:
     * If the ratio of eye to face movement for one eye is close
     * (within 50%) to the ratio of eye to face movement for the other
     * eye, it is safe to assume they both blinked. OR if one eye is seen
     * to have blinked, and the other eye that has not been detected as
     * blinking is atleast 0.75&ratioLimit, it is safe to assume that both
     * eyes blinked
     *
     * Case 2:
     * If both eyes surpassed the ratio, but one of them didn't meet the
     * total-average-movement limit defined in pxLimit, then we check to see if
     * either the total movements of both eyes are within pxLimit/2 of eachother
     * OR that the eye with the smaller total-average-movement moved atleast
     * 0.75*pxLimit. If either of these conditions are met, it is safe to assume
     * that both eyes blinked.
     *
     ********************************
     *
     * This method for detecting blinks still produces some false positives, but
     * it is surprisingly accurate given its simplicity.
     */
    /*if (Math.abs(leftBlinkRatio - rightBlinkRatio) < (ratioLimit/2)) { //Case 1 (OLD)
      leftBlinkOccurred = rightBlinkOccurred = true;
    }*/
    if (Math.max(leftBlinkRatio, rightBlinkRatio)/Math.min(leftBlinkRatio, rightBlinkRatio) < /*2*/1.75 ||
      Math.min(leftBlinkRatio, rightBlinkRatio) > 0.75*ratioLimit) { //Case 1
      leftBlinkOccurred = rightBlinkOccurred = true;
    }
    else if ((leftBlinkRatio > ratioLimit && rightBlinkRatio > ratioLimit) &&
      (Math.abs(yLE - yRE) < (pxLimit/2) || Math.min(yLE, yRE) > 0.75*pxLimit)) { //Case 2
      leftBlinkOccurred = rightBlinkOccurred = true;
    }
    else { //Only one eye blinked
      //Log for testing purposes
      /*console.log("L-Ratio: " + leftBlinkRatio.toFixed(2) +
        "\nR-Ratio: " + rightBlinkRatio.toFixed(2) +
        "\nLeft: " + yLE.toFixed(2) +
        "\nRight: " + yRE.toFixed(2) +
        "\nNose: " + yN.toFixed(2));*/
      if ((checkL && leftBlinkOccurred) || (checkR && rightBlinkOccurred))
        blinkOccurred();
    }
  }

  return {
    left: leftBlinkOccurred,
    right: rightBlinkOccurred,
    waitingForTimeout: waitingForTimeout
  };
}

//When a blink occurs, set a timeout so a blink can not trigger
// an event for 200ms
function blinkOccurred() {
  waitingForTimeout = true;

  if(timeOut > -1) { // Shouldn't ever happen
    clearTimeout(timeOut);
  }
  timeOut = setTimeout(resetTimeout, 250); //Allow max of 4 clicks a second
}

//Reset the timeout that blocks blinks from being detected
function resetTimeout() {
  waitingForTimeout = false;
}

module.exports = { blinked };
