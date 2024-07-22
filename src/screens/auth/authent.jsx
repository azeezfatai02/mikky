// lib/auth.js
// import auth from "../../app/firebase";

import { auth } from "@/app/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const signup = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const login = async (email, password) => {
  try {
    await auth.auth().signInWithEmailAndPassword(email, password);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    await auth.auth().signOut();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
