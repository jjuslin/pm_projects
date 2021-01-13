import firebase from  'firebase/app';
import 'firebase/database';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyC4NweNjt3X_LsbE0SMYdHeIHZanLXQEEE",
    authDomain: "pm-project-tracking.firebaseapp.com",
    databaseURL: "https://pm-project-tracking-default-rtdb.firebaseio.com",
    projectId: "pm-project-tracking",
    storageBucket: "pm-project-tracking.appspot.com",
    messagingSenderId: "598820886464",
    appId: "1:598820886464:web:eaef2c40ab422e55cc9a25",
    measurementId: "G-78C9V71FX2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

  export default firebase;