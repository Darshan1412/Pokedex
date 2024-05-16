import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8d989QesYsIbEmRZsykxCxmYk9vnYANE",
  authDomain: "dj-pokedex.firebaseapp.com",
  projectId: "dj-pokedex",
  storageBucket: "dj-pokedex.appspot.com",
  messagingSenderId: "488337720949",
  appId: "1:488337720949:web:648b3193d8ad4829f31a3c",
  measurementId: "G-5LDKLXF8B0"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");


