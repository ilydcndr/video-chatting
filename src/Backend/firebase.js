import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseconfig = {
  apiKey: "AIzaSyDTAkZEDHYs_hOiHbvPeup61Pd3m9mdIzs",
  databaseURL:"https://video-chat-5b118-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseconfig);

export const db = firebase;

let firepadRef = firebase.database().ref();

export const userName = prompt("What's your name?");

const urlParams = new URLSearchParams(window.location.search);

const roomId = urlParams.get("id");

if (roomId) {
  firepadRef = firepadRef.child(roomId);
} else {
  firepadRef = firepadRef.push();
  window.history.replaceState(null, "video-chat", "?id=" + firepadRef.key);
}

export default firepadRef;
