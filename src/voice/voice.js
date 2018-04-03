var fs = require('fs')

var training = require('./training')
var snowboy = require('./snowboy')

const PAUSE_COMMAND_KEY = 'pause'
const RESUME_COMMAND_KEY ='resume'
const SCROLL_COMMAND_KEY = 'scroll'
const MOUSE_COMMAND_KEY = 'mouse'

const COMMANDS = new Map([
  [PAUSE_COMMAND_KEY, 'face shift pause'],
  [RESUME_COMMAND_KEY, 'face shift resume'],
  [SCROLL_COMMAND_KEY, 'face shift scroll'],
  [MOUSE_COMMAND_KEY, 'face shift mouse'],
])

async function start() {
  var untrained = training.indentifyUntrainedCommands(COMMANDS)
  var voiceSamples = await training.recordCommands(untrained, COMMANDS)
  var modelCount = COMMANDS.size - untrained.length
  voiceSamples.forEach((voiceSample, commandName) => {
    training.requestVoiceModels(commandName, COMMANDS.get(commandName), voiceSample, () => {
      modelCount++;
    })
  })
  var interval = setInterval(() => {
    if (modelCount == COMMANDS.size) {
      _detection()
      clearInterval(interval)
    }
  }, 1000)
}

function _detection() {
  snowboy.loadModels(training.voiceModelsPath)
  snowboy.startDetecting(training.voiceModelsPath)
}

function trainVoiceModelFromFiles(commandName, commandPhrase, waveFilePaths) {
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

  training.requestVoiceModels(commandName, commandPhrase, voiceSamples, () => {
    console.log("Success!")
  })
}

function test() {
  var testPaths = [
    '/Users/mathewsj2/wentworth/software-engineering/faceshift/resources/training/1.wav',
    '/Users/mathewsj2/wentworth/software-engineering/faceshift/resources/training/2.wav',
    '/Users/mathewsj2/wentworth/software-engineering/faceshift/resources/training/3.wav'
  ]
  trainVoiceModelFromFiles("pause", "face shift pause", testPaths)
}

start()

module.exports = {
  test,
  start
};