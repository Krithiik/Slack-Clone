import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
//firebase config

const firebaseConfig = {
  apiKey: "AIzaSyCd9gQvfILJuzrevzAO-VVYEwT4v01KK3Q",
  authDomain: "slack-clone-ced3f.firebaseapp.com",
  projectId: "slack-clone-ced3f",
  storageBucket: "slack-clone-ced3f.appspot.com",
  messagingSenderId: "683881985815",
  appId: "1:683881985815:web:7b2437047e68ddbd3f6952",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const roomsCollectionRef = collection(db, "rooms");
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider, roomsCollectionRef, firebaseApp };
