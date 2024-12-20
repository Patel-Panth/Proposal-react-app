// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from 'firebase/auth'; 
import {getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyANyTvFSGka8ayWCDGAuvENY72PoajoEM4",
    authDomain: "profile-6bb21.firebaseapp.com",
    projectId: "profile-6bb21",
    storageBucket: "profile-6bb21.firebasestorage.app",
    messagingSenderId: "329281031517",
    appId: "1:329281031517:web:f321e632053a9392dbacb4",
    measurementId: "G-K3HJRZ84CS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Initialize Auth and export it
export const database = getFirestore(app);
export const googleProvider = new GoogleAuthProvider(); // Export Google Auth Provider
