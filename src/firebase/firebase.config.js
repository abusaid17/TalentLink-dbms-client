// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbY9uBVrivvZJSKMk6WYUs-ip2YLeIwaU",
  authDomain: "talentlink-web.firebaseapp.com",
  projectId: "talentlink-web",
  storageBucket: "talentlink-web.firebasestorage.app",
  messagingSenderId: "562979755497",
  appId: "1:562979755497:web:7b1d9ebd694bd6660a6778"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;