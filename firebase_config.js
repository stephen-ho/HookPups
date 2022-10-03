// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZMHG4hDYvad7SR8vqnbDyTUhbWTiZNgo",
  authDomain: "hookpups.firebaseapp.com",
  projectId: "hookpups",
  storageBucket: "hookpups.appspot.com",
  messagingSenderId: "962232282380",
  appId: "1:962232282380:web:0222503f86927fce72ad29",
  measurementId: "G-X0C6KGVPBE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

// const analytics = getAnalytics(app);
export const auth = getAuth(app);