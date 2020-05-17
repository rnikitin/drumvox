import { initializeApp } from "firebase/app"
import "firebase/analytics"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyCBkrRh_OabSeLb-kyhpNytTbwIRP6hxkA",
    authDomain: "drumvox-prod.firebaseapp.com",
    databaseURL: "https://drumvox-prod.firebaseio.com",
    projectId: "drumvox-prod",
    storageBucket: "drumvox-prod.appspot.com",
    messagingSenderId: "380858414699",
    appId: "1:380858414699:web:3baaa9ca96d0889836e32e",
    measurementId: "G-ZTPC62FZVV"
  }

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig)