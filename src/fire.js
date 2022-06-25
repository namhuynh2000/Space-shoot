// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(fire);
export default fire;