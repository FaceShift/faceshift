var fs = require('fs')

var training = require('./training')
var snowboy = require('./snowboy')

const FACESHIFT_COMMAND = 'faceshift'
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
  console.log('Starting Voice')
  var untrained = training.indentifyUntrainedCommands(COMMANDS)
  var voiceSamples = await training.recordCommands(untrained, COMMANDS)
  var modelCount = COMMANDS.size - untrained.length
  voiceSamples.forEach((voiceSample, commandName) => {
    training.requestVoiceModels(commandName, COMMANDS.get(commandName), voiceSample, () => {
      modelCount++
    })
  })
  var interval = setInterval(() => {
    if (modelCount == COMMANDS.size) {
      _detection()
    }
  }, 1000)
}

var started = false
function _detection() {
  if (!started) {
    started = true
    snowboy.loadModels(training.voiceModelsPath)
    snowboy.startDetecting(training.voiceModelsPath)
  }
}

start()

module.exports = {
  start
};