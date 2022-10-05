// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const config = require('./config.js');
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.APIKEY,
  authDomain: config.AUTHDOMAIN,
  projectId: config.PROJECTID,
  storageBucket: config.STORAGEBUCKET,
  messagingSenderId: config.MESSAGINGSENDERID,
  appId: config.APPID,
  measurementId: config.MEASUREMENTID
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