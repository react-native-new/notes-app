import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAyBWI0pkRb3FyJPrvPgPHq3tSzEA55AkE",
  authDomain: "rn-demo1-de417.firebaseapp.com",
  projectId: "rn-demo1-de417",
  storageBucket: "rn-demo1-de417.appspot.com",
  messagingSenderId: "776967005898",
  appId: "1:776967005898:web:809b9f51668c681c47b633"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
