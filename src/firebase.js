// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF_YtoEBujI155kQ3sMhTsoxR89uUEfa0",
  authDomain: "edushare-0205.firebaseapp.com",
  projectId: "edushare-0205",
  storageBucket: "edushare-0205.firebasestorage.app",
  messagingSenderId: "377023634383",
  appId: "1:377023634383:web:c63cbd2211529236e250ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);