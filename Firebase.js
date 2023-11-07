import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

  apiKey: "AIzaSyD_9ZU7ryEiY8d2bLLIPSzkw7Ij3O4s9uk",
  authDomain: "petpals-mobile-29a39.firebaseapp.com",
  projectId: "petpals-mobile-29a39",
  storageBucket: "petpals-mobile-29a39.appspot.com",
  messagingSenderId: "52222974480",
  appId: "1:52222974480:web:ba0d240535055457664895",
  measurementId: "G-763FBQHW88"

};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
