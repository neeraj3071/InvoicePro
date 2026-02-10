import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCv8S4fd6oB-7IwWJ9zzHcbonhWzaW71q8",
  authDomain: "vue-invoice-app-fbf5f.firebaseapp.com",
  projectId: "vue-invoice-app-fbf5f",
  storageBucket: "vue-invoice-app-fbf5f.firebasestorage.app",
  messagingSenderId: "459554758949",
  appId: "1:459554758949:web:f2adaab2441b5e3c34facc",
  measurementId: "G-MGXR26QM2G"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export default db;
