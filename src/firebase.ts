import { initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
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
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;

// Попытка пофиксить ошибку с соединением, при отправки todo на сервер:
// @firebase/firestore: Firestore (9.14.0): Connection WebChannel transport errored
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});
// export const db = getFirestore(app);
