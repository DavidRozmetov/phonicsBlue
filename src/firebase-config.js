import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDMKyJiAEepNUtj-5KdXGDtmfuyIVH5uGo",
  authDomain: "phonicsproject-9da80.firebaseapp.com",
  databaseURL: "https://phonicsproject-9da80-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "phonicsproject-9da80",
  storageBucket: "phonicsproject-9da80.appspot.com",
  messagingSenderId: "832811804014",
  appId: "1:832811804014:web:2151ecf94c92d900488d7f",
  measurementId: "G-XSP7TYMCBS"
};

const app = initializeApp (firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const database = getDatabase(app);
export const storage = getStorage(app);