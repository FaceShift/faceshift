let training = require("./training");
let snowboy = require("./snowboy");

const COMMANDS = {
    switch: "face shift switch mode",
    toggle: "face shift toggle tracking"
};
const COMMAND_COUNT = Object.keys(COMMANDS).length;

const start = () => {
    trainVoiceModel();
};

const stop = () => {
    snowboy.stopDetecting();
};

const retrainVoiceModel = () => {
    stop();
    let untrained = training.identifyUntrainedCommands(COMMANDS);
    if (COMMAND_COUNT - untrained.length === COMMAND_COUNT) {
        training.deleteVoiceModels();
    }
    start();
}

const trainVoiceModel = async () => {
    let untrained = training.identifyUntrainedCommands(COMMANDS);
    let modelCount = COMMAND_COUNT - untrained.length;
    let voiceSamples = await training.recordCommands(untrained, COMMANDS);
    Object.keys(voiceSamples).map(
        voiceSample => {
            training.requestVoiceModels(voiceSample, COMMANDS[voiceSample], voiceSamples[voiceSample], () => {
                modelCount++
            });
        }
    )

    let interval = setInterval(() => {
        if (modelCount === COMMAND_COUNT) {
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
    retrainVoiceModel
};
