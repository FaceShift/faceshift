let training = require("./training");
let snowboy = require("./snowboy");

const COMMANDS = {
    switch: "face shift switch mode",
    toggle: "face shift toggle tracking"
};
const COMMAND_COUNT = Object.keys(COMMANDS).length;

let lastMessage = "Voice Model Is Untrained";

let messageCallback = (message) => {
    console.log(message);
};

let start = () => {
    if (isVoiceModelTrained()) {
        _startDetecting();
        let availableCommands = "";
        Object.keys(COMMANDS).map(
            command => {
                availableCommands += COMMANDS[command] + " | ";
            }
        );
        sendMessageToMessageCallback("Voice Model Trained. " +
            "Listening for commands now. " +
            "Available commands are | " +
            availableCommands);
    }
};

let stop = () => {
    snowboy.stopDetecting();
    sendMessageToMessageCallback("Not listening for commands")
};

let retrainVoiceModel = () => {
    stop();
    if (isVoiceModelTrained()) {
        training.deleteVoiceModels();
    }
    trainVoiceModel();
}

let isVoiceModelTrained = () => {
    let untrained = training.identifyUntrainedCommands(COMMANDS);
    return COMMAND_COUNT - untrained.length === COMMAND_COUNT;
}

let trainVoiceModel = async () => {
    let untrained = training.identifyUntrainedCommands(COMMANDS);
    let modelCount = COMMAND_COUNT - untrained.length;
    let voiceSamples = await training.recordCommands(untrained, COMMANDS, sendMessageToMessageCallback);
    Object.keys(voiceSamples).map(
        voiceSample => {
            training.requestVoiceModels(voiceSample, COMMANDS[voiceSample], voiceSamples[voiceSample], () => {
                modelCount++
            });
        }
    )

    let interval = setInterval(() => {
        if (modelCount === COMMAND_COUNT) {
            _startDetecting();
            clearInterval(interval)
        }
    }, 1000);
}

let setMessageCallback = (newMessageCallback) => {
    messageCallback = newMessageCallback;
}

let sendMessageToMessageCallback = (message) => {
    lastMessage = message;
    messageCallback(lastMessage);
}

let getLastMessage = () => {
    return lastMessage;
}

let _startDetecting = () => {
    snowboy.loadModels(training.voiceModelsPath);
    snowboy.startDetecting(training.voiceModelsPath);
};

module.exports = {
    start,
    stop,
    retrainVoiceModel,
    setMessageCallback,
    getLastMessage
};
