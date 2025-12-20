// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6ytn71v9bqexiZa3DoGuH7HSa2Bzdi8M",
    authDomain: "campushub-fb7c9.firebaseapp.com",
    projectId: "campushub-fb7c9",
    storageBucket: "campushub-fb7c9.firebasestorage.app",
    messagingSenderId: "238909296072",
    appId: "1:238909296072:web:04fcc57978a5e4b3cdc4fd",
    measurementId: "G-HX68H0H561"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
