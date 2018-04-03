let waitingForTimeout = false;
let timeOut = -1;
let timer = (new Date()).getTime();
let prevWasOpen = false;

const timeToClick = 1000; //hold mouth open for 1s to click

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
  mouthDist *= 10; //Mouth dist is ~1/10 eye dist. Even them out

  let openFactor = mouthDist / eyeDist;

  if (openFactor < 0.0) { openFactor = 0.0; }

  //FOR TESTING  
  /*console.log("eye: " + eyeDist + "\n" + 
              "mouth: " + mouthDist + "\n" + 
              "m/e: " + mouthDist / eyeDist + "\n" + 
              "yawn: " + openFactor);*/
  let limit = 3.5;
  //Click if mouth open for >2s
  if (openFactor > limit) {
    if (prevWasOpen) {
      if ((new Date()).getTime() - timer > timeToClick) {
        mouthOpenOccurred = true;
        handleMouthOpen();
        prevWasOpen = false;
      }
    }
    else {
      timer = (new Date()).getTime();
      prevWasOpen = true;
    }
  } 
  else {
    prevWasOpen = false;
  }           
  
  return {
    mouth: mouthOpenOccurred,
    percentOpen: openFactor,
    waitingForTimeout: waitingForTimeout
  };
}

//When a mouth open occurs, set a timeout so a mouth open
// can not trigger an event for 200ms
function handleMouthOpen() {
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
