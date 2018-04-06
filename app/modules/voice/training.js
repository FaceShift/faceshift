let fs = require("fs");
let record = require("node-record-lpcm16");
let request = require("request");

const voiceModelsPath = "./voice-models/";
const recordingsPath = voiceModelsPath + "recordings/";

const timeout = 3000;
const recordingOptions = {
    thresholdStart: 0.1, // silence threshold to start recording, overrides threshold (rec only)
    thresholdEnd: 0.1, // silence threshold to end recording, overrides threshold (rec only)
    silence: "2.0"
};

let identifyUntrainedCommands = (commands) => {
    let untrainedCommands = [];
    Object.keys(commands).map(
        command => {
            let fileName = _commandNameToFileName(command);
            if (!fs.existsSync(voiceModelsPath + fileName)) {
                console.log("Voice model missing: " + command);
                untrainedCommands.push(command);
            } else {
                console.log("Voice model found: " + command);
            }
        }
    );

    return untrainedCommands;
};

let recordCommands = (commandNames, commands, messageCallback) => {
    return new Promise(async (resolve, reject) => {
        let commandVoiceSamples = {};
        for (let i = 0; i < commandNames.length; i++) {
            let commandName = commandNames[i];
            commandVoiceSamples[commandName] = await recordCommand(commandName, commands[commandName], messageCallback);
        }
        messageCallback("Voice Model Trained");
        resolve(commandVoiceSamples);
    })
};

let recordCommand = (commandName, commandPhrase, messageCallback) => {
    return new Promise(async (resolve, reject) => {
        voiceSamples = [];
        messageCallback("Say the phrase \'" + commandPhrase + "\'");
        voiceSamples.push(await _recordSample(recordingsPath + commandName + "-1.wav"));
        messageCallback("Say the phrase \'" + commandPhrase + "\' again");
        voiceSamples.push(await _recordSample(recordingsPath + commandName + "-2.wav"));
        messageCallback("Say the phrase \'" + commandPhrase + "\" one more time");
        voiceSamples.push(await _recordSample(recordingsPath + commandName + "-3.wav"));

        resolve(voiceSamples);
    })
};

let deleteVoiceModels = () => {
    fs.readdirSync(voiceModelsPath).forEach(file => {
        if (file.endsWith(".pmdl")) {
            fs.unlinkSync(voiceModelsPath + file);
        }
    });
};

let _recordSample = (filePath) => {
    return new Promise((resolve, reject) => {
        let fileWriteStream = fs.createWriteStream(filePath, {encoding: "binary"});
        let recordingStream = record.start(recordingOptions);
        recordingStream.pipe(fileWriteStream);

        fileWriteStream.on("finish", () => {
            let waveData = fs.readFileSync(filePath).toString("base64");
            resolve({
                "wave": waveData
            });
        });

        setTimeout(function () {
            record.stop()
        }, timeout)
    })
};

let _commandNameToFileName = (command) => {
    return command.trim().replace(" ", "-") + ".pmdl"
};

let requestVoiceModels = (commandName, commandPhrase, voiceSamples, successCallback) => {
    let postData = {
        "name": commandPhrase,
        "token": process.env.SNOWBOY_API,
        "voice_samples": voiceSamples,
        "microphone": "macbook microphone",
        "language": "en",
        "gender": "M",
        "age_group": "20_29"
    };

    let url = "https://snowboy.kitt.ai/api/v1/train/";
    let options = {
        method: "post",
        encoding: null,
        body: postData,
        json: true,
        url: url
    };

    // Send audio sample to snowboy for training
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 201) {
            let modelLocation = voiceModelsPath + _commandNameToFileName(commandName);
            // console.log("Model created")
            // console.log("Writing voice model to " + modelLocation);
            fs.writeFile(modelLocation, body, "latin1", function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("The voice model was saved to " + modelLocation);
                    successCallback();
                }
            });
        } else {
            console.log(response.statusCode);
            console.log(error);
            console.log(response.statusMessage);
            console.log(response);
        }
    });
};

module.exports = {
    voiceModelsPath,
    identifyUntrainedCommands,
    recordCommands,
    requestVoiceModels,
    deleteVoiceModels
};
