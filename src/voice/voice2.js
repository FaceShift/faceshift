var record = require('node-record-lpcm16')
var request = require('request')
var fs = require('fs')

const timeout = 3000
const recordingOptions = {
  thresholdStart: 0.1, // silence threshold to start recording, overrides threshold (rec only)
  thresholdEnd: 0.1, // silence threshold to end recording, overrides threshold (rec only)
  silence: '2.0'
}

function recordSamples(count, waveFilePaths) {
  return new Promise((resolve, reject) => {
    var filePath = 'resources/training/' + count + ".wav"
    waveFilePaths.push(filePath)
    var fileWriteStream = fs.createWriteStream(filePath, {
      encoding: 'binary'
    })
    record.start(recordingOptions).pipe(fileWriteStream)

    setTimeout(function () {
      record.stop()
    }, timeout)

    fileWriteStream.on('finish', () => {
      resolve(waveFilePaths);
    })
  })
}

function trainVoiceModel(waveFilePaths) {
  var voiceSamples = []
  waveFilePaths.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      var waveData = fs.readFileSync(filePath).toString('base64')
      voiceSamples.push({
        "wave": waveData
      })
    } else {
      console.error("File '" + filePath + "' does not exist!")
    }
  });
  // console.log(voiceSamples)
  console.log("Training model")

  var postData = {
    "name": "face shift pause",
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
    console.log("Making request");
    if (!error && response.statusCode == 201) {
      var modelLocation = "resources/voice-models/voice-model.pmdl"
      console.log("Model created")
      console.log("Writing voice model to " + modelLocation);
      fs.writeFile(modelLocation, body, 'latin1', function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log("The voice model was saved to " + modelLocation);
        }
      });
    } else {
      console.log(response.statusCode)
      console.log(error)
      console.log(response)
      console.log(body)
    }
  })
}

// Get audio samples for training model
/*
console.log("Say your keyword")
recordSamples(1, []).then(function(waveFilePaths1) {
  console.log("Say your keyword again")
  recordSamples(2, waveFilePaths1).then(function(waveFilePaths2) {
    console.log("Say your keyword again")
    recordSamples(3, waveFilePaths2).then(function(waveFilePaths3) {
      console.log("Done")
      console.log(waveFilePaths3)
      trainVoiceModel(waveFilePaths3)
    })
  })
})
//*/

function start() {
  var testPaths = [
    '/Users/mathewsj2/wentworth/software-engineering/faceshift/resources/training/1.wav',
    '/Users/mathewsj2/wentworth/software-engineering/faceshift/resources/training/2.wav',
    '/Users/mathewsj2/wentworth/software-engineering/faceshift/resources/training/3.wav'
  ]
  trainVoiceModel(testPaths)
}

start()

module.exports = {
  start
};