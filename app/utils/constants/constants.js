 const Gestures = Object.freeze({
  RIGHT_EYE_WINK: "Right Eye Wink",
  LEFT_EYE_WINK: "Left Eye Wink",
  MOUTH: "Mouth",
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

const InputOptions = Object.freeze({
  leftblink: "left-blink",
  rightblink: "right-blink",
  mouth: "mouth"
});

module.exports = {Modes, Gestures, MouseModes, InputOptions};
