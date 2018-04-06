const record = require('node-record-lpcm16');
const fs = require('fs')
const Detector = require('snowboy').Detector;
const Models = require('snowboy').Models;

const models = new Models();

function loadModels(voiceModelsDirectory) {
    console.log('Loading voice models')
    fs.readdirSync(voiceModelsDirectory).forEach(fileName => {
        if (fileName.endsWith('.pmdl')) {
            models.add({
                file: voiceModelsDirectory + fileName,
                sensitivity: '0.5',
                hotwords: fileName.replace('.pmdl', '')
            });
        }
    })
}


function startDetecting(voiceModelsDirectory) {
    console.log('Listening!')
    const detector = new Detector({
        resource: 'voice-models/common.res',
        models: models,
        audioGain: 2.0
    });

    detector.on('silence', function () {

    });

    detector.on('sound', function (buffer) {

    });

    detector.on('error', function () {
        console.log('error');
    });

    detector.on('hotword', function (index, hotword, buffer) {
        console.log('hotword', hotword);
    });

    const mic = record.start({
        threshold: 0,
        verbose: false
    })

    mic.pipe(detector);
}

let stopDetecting = () => {
    record.stop();
    console.log("Stopped listening")
}

module.exports = {
    loadModels,
    startDetecting,
    stopDetecting
}