// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import  {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcP9aahCb7PU9hh-wfTMwFFRmM67zPrJs",
  authDomain: "sharedthoughts-aa02a.firebaseapp.com",
  projectId: "sharedthoughts-aa02a",
  storageBucket: "sharedthoughts-aa02a.appspot.com",
  messagingSenderId: "928720547801",
  appId: "1:928720547801:web:edbbea62348afb5da933c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider= new GoogleAuthProvider()
export const database= getFirestore()
