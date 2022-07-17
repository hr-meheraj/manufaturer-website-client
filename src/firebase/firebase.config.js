import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_APP_ID,
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