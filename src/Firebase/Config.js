import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCnZJYoINBtMaUmym8F-tC137wUrMzILKU",
  authDomain: "akwa-backend.firebaseapp.com",
  projectId: "akwa-backend",
  storageBucket: "akwa-backend.appspot.com",
  messagingSenderId: "224445663678",
  appId: "1:224445663678:web:200faf5c28ca49556251ef",
  measurementId: "G-TN2BP4TSVG",
};
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
const Storage = getStorage(app);
const db = getFirestore(app);
export { Auth, Storage, db };
