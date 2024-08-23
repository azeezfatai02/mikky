// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-T82JTBMXMM", // Optional, but useful for analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const motorsColRef = collection(db, "motors");
const ordersColRef = collection(db, "orders"); // New orders collection

/**
 * Sign in with email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise} - A promise that resolves with the user credentials.
 */
const signin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Sign in with Google using a popup.
 * @returns {Promise} - A promise that resolves with user information or an error.
 */
const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return { success: true, user };
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch motors data from Firestore.
 * @returns {Promise<Array>} - A promise that resolves with an array of motors.
 */
const getMotorsData = async () => {
  try {
    const querySnapshot = await getDocs(motorsColRef);
    let motors = [];
    querySnapshot.forEach((doc) => {
      motors.push({ id: doc.id, ...doc.data() });
    });
    return motors;
  } catch (err) {
    console.error("Error getting motors documents: ", err);
    return [];
  }
};

/**
 * Fetch orders data from Firestore.
 * @returns {Promise<Array>} - A promise that resolves with an array of orders.
 */
const getOrdersData = async () => {
  try {
    const querySnapshot = await getDocs(ordersColRef);
    let orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
  } catch (err) {
    console.error("Error getting orders documents: ", err);
    return [];
  }
};

// Export the services and functions
export {
  auth,
  db,
  storage,
  signin,
  googleSignIn,
  getMotorsData,
  getOrdersData,
};
