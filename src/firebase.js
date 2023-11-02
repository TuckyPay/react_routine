import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCx5WXsBjag-ya1C1RXYSS6ODEa2Dt2J0U",
  authDomain: "reactroutine-tuckypay.firebaseapp.com",
  projectId: "reactroutine-tuckypay",
  storageBucket: "reactroutine-tuckypay.appspot.com",
  messagingSenderId: "699817902644",
  databaseURL: "https://reactroutine-tuckypay-default-rtdb.asia-southeast1.firebasedatabase.app/",
  appId: "1:699817902644:web:11103f02d931f5cabec061",
  measurementId: "G-T932H46F7B"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export { auth, provider, database};