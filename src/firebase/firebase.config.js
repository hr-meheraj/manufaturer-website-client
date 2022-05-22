import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyA1p4gfhMQYR5yZbxQeRdNgPRqtxXjG6dM",
  authDomain: "tools-manufacture.firebaseapp.com",
  projectId: "tools-manufacture",
  storageBucket: "tools-manufacture.appspot.com",
  messagingSenderId: "872175222661",
  appId: "1:872175222661:web:8af9521f6a55911f9e4eec"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth