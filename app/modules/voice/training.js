var fs = require('fs')
var record = require('node-record-lpcm16')
var request = require('request')

const voiceModelsPath = './voice-models/'
const recordingsPath = voiceModelsPath + 'recordings/'

const timeout = 3000
const recordingOptions = {
    thresholdStart: 0.1, // silence threshold to start recording, overrides threshold (rec only)
    thresholdEnd: 0.1, // silence threshold to end recording, overrides threshold (rec only)
    silence: '2.0'
}

function indentifyUntrainedCommands(commands) {
    let untrainedCommands = [];
    console.log("Commands in identify", commands);
    console.log("Keys in command", Object.keys(commands));

    Object.keys(commands).map(
        command => {
            console.log("Name ", command)
            let fileName = _commandNameToFileName(command);
            if (!fs.existsSync(voiceModelsPath + fileName)) {
                console.log('Voice model missing: ' + command);
                untrainedCommands.push(command)
            } else {
                console.log('Voice model found: ' + command)
            }
        }
    );

    // Object.keys(commands).map(
    //   commandKey => function(){
    //     const commandPhrase = commands[commandKey];
    //     const commandName = commandKey;
    //
    //     console.log("Phrase", commandPhrase);
    //     console.log("Name", commandName);
    //
    //     let fileName = _commandNameToFileName(commandName);
    //     if (!fs.existsSync(voiceModelsPath + fileName)) {
    //       console.log('Voice model missing: ' + commandName);
    //       untrainedCommands.push(commandName)
    //     } else {
    //       console.log('Voice model found: ' + commandName)
    //     }
    //   }
    // );

    return untrainedCommands
}

function recordCommands(commandNames, commands) {
    return new Promise(async (resolve, reject) => {
        var commandVoiceSamples = {}
        for (var i = 0; i < commandNames.length; i++) {
            var commandName = commandNames[i]
            var voiceSamples = await recordCommand(commandName, commands[commandName])
            commandVoiceSamples[commandName] = voiceSamples
        }
        console.log("Command Voice Samples", commandVoiceSamples)
        resolve(commandVoiceSamples)
    })
}

function recordCommand(commandName, commandPhrase) {
    return new Promise(async (resolve, reject) => {
        voiceSamples = []
        console.log('Say the phrase \'' + commandPhrase + '\'')
        voiceSamples.push(await _recordSample(recordingsPath + commandName + '-1.wav'))
        console.log('Say the phrase \'' + commandPhrase + '\' again')
        voiceSamples.push(await _recordSample(recordingsPath + commandName + '-2.wav'))
        console.log('Say the phrase \'' + commandPhrase + '\' one more time')
        voiceSamples.push(await _recordSample(recordingsPath + commandName + '-3.wav'))
        console.log('Done training \'' + commandName + '\'')

        resolve(voiceSamples)
    })
}

function _recordSample(filePath) {
    return new Promise((resolve, reject) => {
        var fileWriteStream = fs.createWriteStream(filePath, {encoding: 'binary'})
        var recordingStream = record.start(recordingOptions)
        recordingStream.pipe(fileWriteStream)

        fileWriteStream.on('finish', () => {
            var waveData = fs.readFileSync(filePath).toString('base64')
            resolve({
                'wave': waveData
            });
        })

        setTimeout(function () {
            record.stop()
        }, timeout)
    })
}

function _commandNameToFileName(command) {
    return command.trim().replace(' ', '-') + '.pmdl'
}

function requestVoiceModels(commandName, commandPhrase, voiceSamples, successCallback) {
    var postData = {
        "name": commandPhrase,
        "token": process.env.SNOWBOY_API,
        "voice_samples": voiceSamples,
        "microphone": "macbook microphone",
        "language": "en",
        "gender": "M",
        "age_group": "20_29"
    }

    var url = 'https://snowboy.kitt.ai/api/v1/train/'
    var options = {
        method: 'post',
        encoding: null,
        body: postData,
        json: true,
        url: url
    }

    // Send audio sample to snowboy for training
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 201) {
            var modelLocation = voiceModelsPath + _commandNameToFileName(commandName)
            // console.log("Model created")
            // console.log("Writing voice model to " + modelLocation);
            fs.writeFile(modelLocation, body, 'latin1', function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("The voice model was saved to " + modelLocation);
                    successCallback();
                }
            });
        } else {
            console.log(response.statusCode)
            console.log(error)
            console.log(response.statusMessage)
            console.log(response)
        }
    })
}

module.exports = {
    voiceModelsPath,
    indentifyUntrainedCommands,
    recordCommands,
    requestVoiceModels
};
