 const Gestures = Object.freeze({
  RIGHT_EYE_WINK: "Right Eye Wink",
  LEFT_EYE_WINK: "Left Eye Wink",
  BLINK: "Blink",
});


const Modes = Object.freeze([
  {
    type: "MOUSE_MODE",
    value: "Mouse Mode",
  },
  {
    type: "SCROLL_MODE",
    value: "Scroll Mode",
  },
  {
    type: "DRAG_HOLD_MODE",
    value: "Drag and Hold",
  },
]);

const MouseModes = Object.freeze({
  mouse: "mouse",
  scroll: "scroll",
  drag: "drag"
});

module.exports = {Modes, Gestures, MouseModes};