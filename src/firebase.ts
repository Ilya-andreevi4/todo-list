import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0KqGxHxAVaSRiU9EYeMoSNqB0FABRI2g",
  authDomain: "todo-list-1202f.firebaseapp.com",
  projectId: "todo-list-1202f",
  storageBucket: "todo-list-1202f.appspot.com",
  messagingSenderId: "630246634060",
  appId: "1:630246634060:web:f5684e28e10d330ceefae9",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
