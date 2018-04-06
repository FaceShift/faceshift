const robot = require("robotjs");
const contr_prefs = require("../controller/controller_pref");

// Resolution of the
const screenSize = robot.getScreenSize();
const maxHeight = screenSize.height;
const maxWidth = screenSize.width;
let mousePos = robot.getMousePos();
let mouseBtnState = 0; //0==up, 1==down

// Move in the horizontal direction
const moveLeftRight = (pixels) => {
    if (mouseBtnState == 1)
        mouseToggle("up");
    if (mousePos.x + pixels <= maxWidth && mousePos.x + pixels >= 0) {
        mousePos = robot.getMousePos();
        robot.moveMouse(mousePos.x + pixels, mousePos.y);
    }
};

// Move in the vertical direction
const moveUpDown = (pixels) => {
    if (mouseBtnState == 1)
        mouseToggle("up");
    if (mousePos.y + pixels <= maxHeight && mousePos.y + pixels >= 0) {
        mousePos = robot.getMousePos();
        robot.moveMouse(mousePos.x, mousePos.y + pixels);
    }
};

// Move in the horizontal direction
const dragLeftRight = (pixels) => {
    if (mousePos.x + pixels <= maxWidth && mousePos.x + pixels >= 0) {
        mousePos = robot.getMousePos();
        robot.dragMouse(mousePos.x + pixels, mousePos.y);
    }
};

// Move in the vertical direction
const dragUpDown = (pixels) => {
    if (mousePos.y + pixels <= maxHeight && mousePos.y + pixels >= 0) {
        mousePos = robot.getMousePos();
        robot.dragMouse(mousePos.x, mousePos.y + pixels);
    }
};

//State can be either string "up" or "down"
const toggleBtnUpDwn = (state = null) => {
    if (state == null) {
        mouseBtnState ^= 1; //Toggle between down/up
        robot.mouseToggle(mouseBtnState == 1 ? "down" : "up");
    }
    else {
        mouseBtnState = state == "up" ? 0 : 1; //Set to whatever state mouse is now in
        robot.mouseToggle(state);
    }
}

const scrollUpDown = (pixels) => {
    if (mouseBtnState == 1)
        mouseToggle("up");
    robot.scrollMouse(x = 0, y = pixels);
    //robot.scrollMouse(pixels, (pixels > 0 ? "up" : "down"))
};

const mouseLeftClick = () => {
    robot.mouseClick("left");
};

const mouseRightClick = () => {
    robot.mouseClick("right");
};

module.exports = {
    moveUpDown, moveLeftRight,
    dragUpDown, dragLeftRight, toggleBtnUpDwn,
    scrollUpDown,
    mouseLeftClick, mouseRightClick
};
