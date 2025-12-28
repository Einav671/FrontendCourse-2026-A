// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnugLEmjWl8_Gx2s-u3ewKMrTAt_TcXf8",
  authDomain: "candidate-website-81f63.firebaseapp.com",
  projectId: "candidate-website-81f63",
  storageBucket: "candidate-website-81f63.firebasestorage.app",
  messagingSenderId: "663188767986",
  appId: "1:663188767986:web:05143ec41a8889a0de3c6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseApp = getFirestore(app);