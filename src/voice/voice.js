const record = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');

module.exports = {
  processResults: function (results) {
    console.log('Transcription: ${result}\n');
  },
  start: function () {
    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const request = {
      config: {
        auth: process.env.VOICE_API_KEY,
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
      },
      interimResults: false, // If you want interim results, set this to true
    };

    // Creates a client
    const client = new speech.SpeechClient();

    // Create a recognize stream
    const recognizeStream = client
      .streamingRecognize(request)
      .on('error', console.error)
      .on('data', data => {
        const hasResults = data.results[0] && data.results[0].alternatives[0];
        if (hasResults) {
          const result = data.results[0].alternatives[0];
          processResults(result);
        } else {
          console.log('\nTime limit reached\n');
        }
      });

    // Start recording and send the microphone input to the Speech API
    record.start({
        sampleRateHertz: request.config.sampleRateHertz,
        threshold: 0,
        verbose: false,
        recordProgram: 'rec', // Try also "arecord" or "sox"
        silence: '10.0',
      })
      .on('error', console.error)
      .pipe(recognizeStream);

    console.log('Listening, press Ctrl+C to stop.');
  }
}