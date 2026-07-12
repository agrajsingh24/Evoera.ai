// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your exact Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyZqBVC-6M5iaDc7XGAvYZLHRld9zeYks",
    authDomain: "evora-102fe.firebaseapp.com",
    projectId: "evora-102fe",
    storageBucket: "evora-102fe.firebasestorage.app",
    messagingSenderId: "175874307776",
    appId: "1:175874307776:web:535c0984451df688189f25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);