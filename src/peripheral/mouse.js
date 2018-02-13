var robot = require("robotjs");

// Resolution of the 
const screenSize = robot.getScreenSize();
const maxHeight = screenSize.height;
const maxWidth = screenSize.width;
let mousePos = robot.getMousePos();

// Move in the horizontal direction
moveLeftRight = (pixels) => {
  if(mousePos.x <= maxWidth && mousePos.x >= 0){
    mousePos = robot.getMousePos();
    robot.moveMouse(mousePos.x + pixels, mousePos.y);
  }
}

// Move in the vertical direction
moveUpDown = (pixels) => {
  if(mousePos.y <= maxHeight && mousePos.y >= 0){
    mousePos = robot.getMousePos();
    robot.moveMouse(mousePos.x, mousePos.y + pixels);
  }
}

//setInterval(() => moveUpDown(-10), 1000);

module.exports = { moveUpDown, moveLeftRight };