let waitingForTimeout = false;
let timeOut = -1;

function mouthOpened(v) {
  //Values to be returned
  let mouthOpenOccurred = false;

  //Avoid too many clicks
  if (waitingForTimeout) {
    return {
      mouth: mouthOpenOccurred,
      percentOpen: 0,
      waitingForTimeout: waitingForTimeout
    };
  }

  /////////////////////////////////////////////////////////////////////////////
  //Mouth-Open Detection - Or: How wide open is the mouth?
  let p0x, p0y, p1x, p1y;

  //Left eye inner corner
  p0x = v[39*2];
  p0y = v[39*2 + 1];
  //Right eye inner corner
  p1x = v[42*2];
  p1y = v[42*2 + 1];

  let eyeDist = Math.sqrt((p0x - p1x)*(p0x - p1x) + (p0y - p1y)*(p0y - p1y));

  //Mouth upper lip lower section, middle
  p0x = v[62*2];
  p0y = v[62*2 + 1];
  //Mouth lower lip upper section, middle
  p1x = v[66*2];
  p1y = v[66*2 + 1];

  let mouthDist = Math.sqrt((p0x - p1x)*(p0x - p1x) + (p0y - p1y)*(p0y - p1y));
  let yawnFactor = mouthDist / eyeDist;

  yawnFactor -= 0.35; // remove smiling

  yawnFactor *= 2.0; // scale up a bit

  if (yawnFactor < 0.0) { yawnFactor = 0.0; }
  if (yawnFactor > 1.0) { yawnFactor = 1.0; }

  //Let the color show you how much you yawn.

  /*let color =
    (((0xff * (1.0 - yawnFactor) & 0xff) << 16)) +
    (((0xff * yawnFactor) & 0xff) << 8);  */

  console.log(yawnFactor);

  /////////////////////////////////////////////////////////////////////////////
  ///mouthOpenOccurred();

  return {
    mouth: mouthOpenOccurred,
    percentOpen: yawnFactor,
    waitingForTimeout: waitingForTimeout
  };
}

//When a mouth open occurs, set a timeout so a mouth open
// can not trigger an event for 200ms
function mouthOpenOccurred() {
  waitingForTimeout = true;

  if(timeOut > -1) { //Shouldnt ever happen
    clearTimeout(timeOut);
  }
  timeOut = setTimeout(resetTimeout, 250); //Allow max of 4 clicks a second
}

//Reset the timeout that blocks mouth opens from being detected
function resetTimeout() {
  waitingForTimeout = false;
}

module.exports = { mouthOpened };
