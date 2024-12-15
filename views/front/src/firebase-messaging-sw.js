import * as firebase from "firebase-admin";

importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
firebase.initializeApp({
  apiKey: "AIzaSyD2l9kSc-JZehnoXXUP80DcBFzE_L70tLY",
  authDomain: "premier-league-grounds.firebaseapp.com",
  projectId: "premier-league-grounds",
  storageBucket: "premier-league-grounds.appspot.com",
  messagingSenderId: "33325686001",
  appId: "1:33325686001:web:5cefbf60be37c2de801d50",
  measurementId: "G-TMVQ93T8G3",
});
const messaging = firebase.messaging();
