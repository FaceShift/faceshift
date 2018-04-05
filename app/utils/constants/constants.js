 const Gestures = Object.freeze({
  RIGHT_EYE_WINK: "Right Eye Wink",
  LEFT_EYE_WINK: "Left Eye Wink",
  BLINK: "Blink",
});


const Modes = Object.freeze([
  {
    label: "Mouse Mode",
    value: "mouse",
  },
  {
    label: "Scroll Mode",
    value: "scroll",
  },
  {
    label: "Drag + Hold",
    value: "drag",
  },
]);

const MouseModes = Object.freeze({
  mouse: "mouse",
  scroll: "scroll",
  drag: "drag"
});

module.exports = {Modes, Gestures, MouseModes};
