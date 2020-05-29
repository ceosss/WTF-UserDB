var firebase = require("firebase");
var firebaseConfig = {
  apiKey: "AIzaSyDakn0vZxbEdMhT2G6gBE3FcvbeAAb5-Gc",
  authDomain: "wtf-userdb.firebaseapp.com",
  databaseURL: "https://wtf-userdb.firebaseio.com",
  projectId: "wtf-userdb",
  storageBucket: "wtf-userdb.appspot.com",
  messagingSenderId: "125174100772",
  appId: "1:125174100772:web:bef1dcc871686ee34c39b1",
  measurementId: "G-5W9WLH1SJ8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = firebase;
