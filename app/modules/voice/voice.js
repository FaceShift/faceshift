let training = require("./training");
let snowboy = require("./snowboy");

const FACESHIFT_COMMAND = "faceshift";
const PAUSE_COMMAND_KEY = "pause";
const RESUME_COMMAND_KEY = "resume";
const SCROLL_COMMAND_KEY = "scroll";
const MOUSE_COMMAND_KEY = "mouse";

const COMMANDS = {
    pause: "face shift pause",
    resume: "face shift resume",
    scroll: "face shift scroll",
    mouse: "face shift mouse"
};

const start = () => {
    console.log("Starting Voice");
};

const stop = () => {
    snowboy.stopDetecting();
};

const trainVoiceModel = async () => {
    let untrained = training.indentifyUntrainedCommands(COMMANDS);
    let voiceSamples = await training.recordCommands(untrained, COMMANDS);
    let modelCount = Object.keys(COMMANDS).length - untrained.length;
    console.log('Initial Model Count', modelCount);
    console.table(voiceSamples);
    Object.keys(voiceSamples).map(
        voiceSample => {
            training.requestVoiceModels(voiceSample, COMMANDS[voiceSample], voiceSamples[voiceSample], () => {
                modelCount++
            });
        }
    )

    let interval = setInterval(() => {
        console.log('Commands Size', Object.keys(COMMANDS).length)
        console.log('Model Count', modelCount)
        if (modelCount === Object.keys(COMMANDS).length) {
            _detection();
            clearInterval(interval)
        }
    }, 1000);
}

let _detection = () => {
    snowboy.loadModels(training.voiceModelsPath);
    snowboy.startDetecting(training.voiceModelsPath);
};

module.exports = {
    start,
    stop,
    trainVoiceModel
};
