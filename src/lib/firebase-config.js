import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzfRyIQ1tJut0xx54vIAQNUHKm7fe1Z0M",
  authDomain: "sqwordle.firebaseapp.com",
  projectId: "sqwordle",
  storageBucket: "sqwordle.appspot.com",
  messagingSenderId: "682944717345",
  appId: "1:682944717345:web:8fab95e2258861fa4c3960",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
