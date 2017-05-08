var recorder = function(cb) {
  window.navigator.getUserMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

   //main block for doing the audio recording
   if (window.navigator.getUserMedia && MediaRecorder) {
     console.log('getUserMedia supported.');
     var chunks = [];

     // returns a promise
     return navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        var mediaRecorder = new MediaRecorder(stream);
        var api = {};

        api.startRecording = function() {
          mediaRecorder.start();
          console.log(mediaRecorder.state);
          console.log("recorder started");
        }

        api.stopRecording = function() {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
          console.log("recorder stopped");
        }

        mediaRecorder.onstop = function(e) {
          console.log("data available after MediaRecorder.stop() called.");

          api.blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
          // use this to enable a preview
          // var blobUrl = window.URL.createObjectURL(blob);
          cb(api.blob);
          chunks = [];
          console.log("recorder stopped");
        };

        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        }

        return api;
      });
   } else {
      console.log('getUserMedia not supported on your browser!');
      return Promise.reject('getUserMedia not supported on your browser!');
   }
  };

//export default Recorder;
