// Initialize Firebase
var config = {
  apiKey: "AIzaSyDTJwtTfx8jIvNG7agggvIWIoIRhnP1flg",
  authDomain: "dirkje-88fea.firebaseapp.com",
  databaseURL: "https://dirkje-88fea.firebaseio.com",
  storageBucket: "dirkje-88fea.appspot.com",
  messagingSenderId: "948454586738"
};
firebase.initializeApp(config);

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
var storageRef = storage.ref();
var ref = storageRef.child("test.ogg");

console.log("Inside fb init");

var firebaseSave = function(file) {
  console.log("Inside fbSave saver");
  ref.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
  });
}
