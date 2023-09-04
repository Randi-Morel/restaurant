// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage, ref } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB31K2e4I6cTB5LaIRBDu2YGwpe5S8Uvks",
  authDomain: "restaurant-41576.firebaseapp.com",
  projectId: "restaurant-41576",
  storageBucket: "restaurant-41576.appspot.com",
  messagingSenderId: "65957684399",
  appId: "1:65957684399:web:7eff63c23044fe0796205a",
  measurementId: "G-3FS22RV1L0",
};

firebase.initializeApp(firebaseConfig);

const { auth, firestore, storage } = firebase;

export { firebase, auth, firestore, storage };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const storage = getStorage(app);
// const storageRef = ref(storage, "images");

// export { firebase, auth, firestore, storage };
// export { db, storageRef };
