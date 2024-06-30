import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBH3frGR8E5uxPwtFj43-w1A498lOYi-FE",
  authDomain: "recipefinder-9a969.firebaseapp.com",
  projectId: "recipefinder-9a969",
  storageBucket: "recipefinder-9a969.appspot.com",
  messagingSenderId: "385201793627",
  appId: "1:385201793627:web:bcf5499a39276679c16d7e",
  measurementId: "G-J6NML1N225"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
