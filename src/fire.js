// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";



const firebaseConfig = {
  apiKey: "AIzaSyDW2jJytqBILTtiwPIby1KoGqHccZRHQMA",
  authDomain: "kawood-28c92.firebaseapp.com",
  projectId: "kawood-28c92",
  storageBucket: "kawood-28c92.appspot.com",
  messagingSenderId: "992806672475",
  appId: "1:992806672475:web:0909930945674cac3bc77e",
  measurementId: "G-4T05L8HBNR"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);

export const auth = getAuth(fire);

