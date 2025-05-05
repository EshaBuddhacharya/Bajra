import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMX_K3fMf75E6ntRCQ5QNj5GiRB7T8ntA",
  authDomain: "bajra-dcc98.firebaseapp.com",
  projectId: "bajra-dcc98",
  storageBucket: "bajra-dcc98.firebasestorage.app",
  messagingSenderId: "271873474846",
  appId: "1:271873474846:web:e50cd74c8e97d30a8a090f",
  measurementId: "G-H6WEBYW8HT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };