import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FC_API_KEY,
  authDomain: "stocksim-a3007.firebaseapp.com",
  projectId: "stocksim-a3007",
  storageBucket: "stocksim-a3007.appspot.com",
  messagingSenderId: "879633762608",
  appId: "1:879633762608:web:930d6d54e40f45f1d8a0f5",
  measurementId: "G-CJ04HE3WLG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app;
