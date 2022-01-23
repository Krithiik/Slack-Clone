import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
//firebase config

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const roomsCollectionRef = collection(db, "rooms");
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { db, auth, provider, roomsCollectionRef };
