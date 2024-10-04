// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfOC9vhKUPVmDTGKgz0a7KSN-F5xSHrhA",
  authDomain: "openai-3b54d.firebaseapp.com",
  projectId: "openai-3b54d",
  storageBucket: "openai-3b54d.appspot.com",
  messagingSenderId: "790119791183",
  appId: "1:790119791183:web:a40cd7734ac8c6556c083a",
  measurementId: "G-VXEDNWDKL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth,provider};