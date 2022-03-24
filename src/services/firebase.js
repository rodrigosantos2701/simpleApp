import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC6BYl2Ib5y0Y4PJUI0XGHqjrU2hy4mm7E",
  authDomain: "myhelpdeskproject-476b6.firebaseapp.com",
  projectId: "myhelpdeskproject-476b6",
  storageBucket: "myhelpdeskproject-476b6.appspot.com",
  messagingSenderId: "929520758046",
  appId: "1:929520758046:web:2b428990d44a90d0b9ad0f",
  measurementId: "G-B4TSRTXLYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app)


// import * as firebase from 'firebase/app';
// import 'firebase/storage';
// import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyC6BYl2Ib5y0Y4PJUI0XGHqjrU2hy4mm7E",
//   authDomain: "myhelpdeskproject-476b6.firebaseapp.com",
//   projectId: "myhelpdeskproject-476b6",
//   storageBucket: "myhelpdeskproject-476b6.appspot.com",
//   messagingSenderId: "929520758046",
//   appId: "1:929520758046:web:2b428990d44a90d0b9ad0f",
//   measurementId: "G-B4TSRTXLYG"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const projectStorage = firebase.storage();
// const projectFirestore = firebase.firestore();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// export { projectStorage, projectFirestore, timestamp };
