module.exports =  {
  connect: function(apiKey) {
    var request = require('request');
    var authenticationUrl = "https://speech.googleapis.com/v1/speech:recognize?key=" + apiKey
    request.post(authenticationUrl, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    });
  },

  record: function() {
    const record = require('node-record-lpcm16');

    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');
  
    // Creates a client
    const client = new speech.SpeechClient();
  
    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const encoding = 'Encoding of the audio file, e.g. LINEAR16';
    // const sampleRateHertz = 16000;
    // const languageCode = 'BCP-47 language code, e.g. en-US';
  
    const request = {
      config: {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
      },
      interimResults: false, // If you want interim results, set this to true
    };
  
    // Create a recognize stream
    const recognizeStream = client
      .streamingRecognize(request)
      .on('error', console.error)
      .on('data', data =>
        process.stdout.write(
          data.results[0] && data.results[0].alternatives[0] ?
          `Transcription: ${data.results[0].alternatives[0].transcript}\n` :
          `\n\nReached transcription time limit, press Ctrl+C\n`
        )
      );
  
    // Start recording and send the microphone input to the Speech API
    record
      .start({
        sampleRateHertz: sampleRateHertz,
        threshold: 0,
        // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
        verbose: false,
        recordProgram: 'rec', // Try also "arecord" or "sox"
        silence: '10.0',
      })
      .on('error', console.error)
      .pipe(recognizeStream);
  
    console.log('Listening, press Ctrl+C to stop.');
  }
}