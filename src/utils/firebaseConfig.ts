import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKGv92-AHA0CcUPhXhJcXcq2YpEG4l4AI",
  authDomain: "pokedex-dj.firebaseapp.com",
  projectId: "pokedex-dj",
  storageBucket: "pokedex-dj.appspot.com",
  messagingSenderId: "187193344175",
  appId: "1:187193344175:web:a5204cd7499584e7bad45a",
  measurementId: "G-QSV1KH9Z4Z"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");


