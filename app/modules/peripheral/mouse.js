const robot = require("robotjs");

// Resolution of the
const screenSize = robot.getScreenSize();
const maxHeight = screenSize.height;
const maxWidth = screenSize.width;
let mousePos = robot.getMousePos();
let mouseBtnState = 0; //0==up, 1==down

// Move in the horizontal direction
moveLeftRight = (pixels) => {
  if(mousePos.x + pixels <= maxWidth && mousePos.x + pixels >= 0){
    mousePos = robot.getMousePos();
    robot.moveMouse(mousePos.x + pixels, mousePos.y);
  }
};

// Move in the vertical direction
moveUpDown = (pixels) => {
  if(mousePos.y + pixels <= maxHeight && mousePos.y + pixels >= 0){
    mousePos = robot.getMousePos();
    robot.moveMouse(mousePos.x, mousePos.y + pixels);
  }
};

// Move in the horizontal direction
dragLeftRight = (pixels) => {
  if(mousePos.x + pixels <= maxWidth && mousePos.x + pixels >= 0){
    mousePos = robot.getMousePos();
    robot.dragMouse(mousePos.x + pixels, mousePos.y);
  }
};

// Move in the vertical direction
dragUpDown = (pixels) => {
  if(mousePos.y + pixels <= maxHeight && mousePos.y + pixels >= 0){
    mousePos = robot.getMousePos();
    robot.dragMouse(mousePos.x, mousePos.y + pixels);
  }
};

//State can be either string "up" or "down"
toggleBtnUpDwn = (state=null) => {
  if (state==null) {
    mouseBtnState ^= 1; //Toggle between down/up
    robot.mouseToggle(mouseBtnState==1 ? "down" : "up");
  }
  else {
    mouseBtnState = state=="up" ? 0 : 1; //Set to whatever state mouse is now in
    robot.mouseToggle(state);
  }
}

scrollUpDown = (pixels) => {
  robot.scrollMouse(0,pixels);
}

mouseLeftClick = () => {
  robot.mouseClick("left");
};

mouseRightClick = () => {
  robot.mouseClick("right");
};

module.exports = { moveUpDown, moveLeftRight,
                    dragUpDown, dragLeftRight, toggleBtnUpDwn,
                    scrollUpDown,
                    mouseLeftClick, mouseRightClick };
