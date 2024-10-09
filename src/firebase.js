
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAF_nDWEKR7858yCzAStqc9An4-1jcCP2k",
//   authDomain: "employeereg-bab7e.firebaseapp.com",
//   projectId: "employeereg-bab7e",
//   storageBucket: "employeereg-bab7e.appspot.com",
//   messagingSenderId: "446982454957",
//   appId: "1:446982454957:web:b044b1a42f91b4462b1024",
//   measurementId: "G-QE9Q5W5277"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCD5ln0kXYBQ2DTXb8lXIV2HY_MyvdN1cE",
  authDomain: "employeeregistration-2e7ae.firebaseapp.com",
  projectId: "employeeregistration-2e7ae",
  storageBucket: "employeeregistration-2e7ae.appspot.com",
  messagingSenderId: "462175693124",
  appId: "1:462175693124:web:5b15982d0e6016ff54cf11",
  measurementId: "G-REN7MTEGXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);