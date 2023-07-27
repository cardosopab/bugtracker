// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB3ADAu3PvPQ8b5kcyDL8tlJL67xqpXewI",
    authDomain: "bugtracker-cardosopab.firebaseapp.com",
    projectId: "bugtracker-cardosopab",
    storageBucket: "bugtracker-cardosopab.appspot.com",
    messagingSenderId: "735685320030",
    appId: "1:735685320030:web:b038268dc7e72ce8a7c3cf",
    measurementId: "G-B907QYRZVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getFirestore(app);

export { app, analytics, auth, database };