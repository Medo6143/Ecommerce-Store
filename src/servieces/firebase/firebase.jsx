import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCDfgYadLtirtyeCPVy9qJQRmD-lnWeB6I",
  authDomain: "store-27ae4.firebaseapp.com",
  projectId: "store-27ae4",
  storageBucket: "store-27ae4.firebasestorage.app",
  messagingSenderId: "4006544672",
  appId: "1:4006544672:web:60860f55e34313fbd0c345",
  measurementId: "G-68TKKV7PYP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export default app;