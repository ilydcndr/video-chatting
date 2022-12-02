import firebase from "firebase/app";
import database from "firebase/database";

const firebaseconfig = {
  apiKey: "AIzaSyDTAkZEDHYs_hOiHbvPeup61Pd3m9mdIzs",
  databaseRef:"https://video-chat-5b118-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseconfig);

let dbRef = firebase.database().ref();

const urlParams = new URLSearchParams(window.location.search);

const roomId = urlParams.get("id");

if (roomId) {
  dbRef = dbRef.child(roomId);
} else {
  dbRef = dbRef.push();
  window.history.replaceState(null, "video-chat", "?id=" + dbRef.key);
}

export default dbRef;