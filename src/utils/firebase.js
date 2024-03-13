// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlZbIb1l6TtD9Y_41yEDnSiXtELv3GlKU",
  authDomain: "netflixgpt-5ae93.firebaseapp.com",
  projectId: "netflixgpt-5ae93",
  storageBucket: "netflixgpt-5ae93.appspot.com",
  messagingSenderId: "952713228210",
  appId: "1:952713228210:web:1aec05c4bc1ccff3537eab",
  measurementId: "G-D20M9LP6GL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
