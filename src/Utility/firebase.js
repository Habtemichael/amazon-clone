
import firebase from "firebase/compat/app";

// auth
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyC6BqQIdCQ4788GiAlLlYjAHFaKS6CAbzw",
authDomain: "clone-7c63d.firebaseapp.com",
projectId: "clone-7c63d",
storageBucket: "clone-7c63d.appspot.com",
messagingSenderId: "311064951429",
appId: "1:311064951429:web:190cf2b6df98ab0f9707ec"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()
