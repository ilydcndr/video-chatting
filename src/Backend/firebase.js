import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseconfig = {
  apiKey: "AIzaSyDTAkZEDHYs_hOiHbvPeup61Pd3m9mdIzs",
  databaseURL:"https://video-chat-5b118-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseconfig);

export let connectedInfo = firebase.database().ref(".info/connected");

let databaseRef = firebase.database().ref();

const urlParams = new URLSearchParams(window.location.search);

const roomId = urlParams.get("id");

if (roomId) {
  databaseRef = databaseRef.child(roomId);
} else {
  databaseRef = databaseRef.push();
  window.history.replaceState(null, "video-chat", "?id=" + databaseRef.key);
}

export default databaseRef;