let fs = require("fs");

let training = require("./training");
let snowboy = require("./snowboy");

const FACESHIFT_COMMAND = "faceshift";
const PAUSE_COMMAND_KEY = "pause";
const RESUME_COMMAND_KEY = "resume";
const SCROLL_COMMAND_KEY = "scroll";
const MOUSE_COMMAND_KEY = "mouse";

const COMMANDS = {
  PAUSE_COMMAND_KEY: "face shift pause",
  RESUME_COMMAND_KEY: "face shift resume",
  SCROLL_COMMAND_KEY: "face shift scroll",
  MOUSE_COMMAND_KEY: "face shift mouse"
};

const start = async () => {
  console.log("Starting Voice");
  let untrained = training.indentifyUntrainedCommands(COMMANDS);
  let voiceSamples = await training.recordCommands(untrained, COMMANDS);
  let modelCount = Object.keys(COMMANDS).length - untrained.length;
  voiceSamples.forEach((voiceSample, commandName) => {
    training.requestVoiceModels(commandName, COMMANDS[commandName], voiceSample, () => {
      modelCount++
    });
  });
  let interval = setInterval(() => {
    console.log('Commands Size', Object.keys(COMMANDS).length)
    console.log('Model Count', modelCount)
    if (modelCount === Object.keys(COMMANDS).length) {
      _detection()
    }
  }, 1000);
};

const stop = () => {
  snowboy.stopDetecting();
};

let started = false;
_detection = () => {
  if (!started) {
    started = true;
    snowboy.loadModels(training.voiceModelsPath);
    snowboy.startDetecting(training.voiceModelsPath);
  }
};

module.exports = {
  start,
  stop
};
