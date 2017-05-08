var reaction = function(blob) {
  var audio = document.querySelector('.audio');
  var audioURL = window.URL.createObjectURL(blob);
  audio.src = audioURL;

  console.log(blob.size, blob.type);
  firebaseSave(blob);
}

var api = recorder(reaction)
  .then(function(api) {
    var record = document.querySelector('.record');
    var stop = document.querySelector('.stop');
    var soundClip = document.querySelector('.sound-clip');

    record.onclick = function() {
      api.startRecording();
      record.style.background = "red";
      record.style.color = "black";
    };
    stop.onclick = function() {
      api.stopRecording();
      record.style.background = "";
      record.style.color = "";
    };

    return api;
  })
  .catch(function(err) {
    console.log("GOT AN ERROR", err);
  });
