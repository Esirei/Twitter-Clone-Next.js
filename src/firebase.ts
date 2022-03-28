// Import the functions you need from the SDKs you need
import { getFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage'
import { getApp, getApps, initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNfHcTz7FUx5C1fWuWAciI6h6vwc-T3ng",
  authDomain: "twitter-clone--nextjs.firebaseapp.com",
  projectId: "twitter-clone--nextjs",
  storageBucket: "twitter-clone--nextjs.appspot.com",
  messagingSenderId: "85680043995",
  appId: "1:85680043995:web:b18f91b0b29cca70d999fe",
  measurementId: "G-E7PMKVP3RM"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const firestore = getFirestore()
const storage = getStorage()

export default app
export { firestore, storage }
