// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDO-svQoIp2j8VT0WgnNfbYDnz3f2FgIQA",
    authDomain: "real-state-app-c1a4d.firebaseapp.com",
    projectId: "real-state-app-c1a4d",
    storageBucket: "real-state-app-c1a4d.appspot.com",
    messagingSenderId: "289223456627",
    appId: "1:289223456627:web:c8f8bd97ef6418db4bb706"
  };

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()