var record = require('node-record-lpcm16')
var request = require('request')
var fs = require('fs')

var training = require('./training')

const PAUSE_COMMAND_KEY = 'pause'
const RESUME_COMMAND_KEY ='resume'
const SCROLL_MODE_COMMAND_KEY = 'scroll-mode'
const MOUSE_MODE_COMMAND_KEY = 'mouse-mode'

const COMMANDS = new Map([
  [PAUSE_COMMAND_KEY, 'face shift pause'],
  [RESUME_COMMAND_KEY, 'face shift resume'],
  [SCROLL_MODE_COMMAND_KEY, 'face shift scroll mode'],
  [MOUSE_MODE_COMMAND_KEY, 'face shift mouse mode'],
])

async function start() {
  var untrained = training.indentifyUntrainedCommands(COMMANDS)
  var voiceSamples = await training.recordCommands(untrained, COMMANDS)
  voiceSamples.forEach((voiceSample, commandName) => {
    training.requestVoiceModels(commandName, COMMANDS.get(commandName), voiceSample, () => {
      console.log("Success!")
    })
  })
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