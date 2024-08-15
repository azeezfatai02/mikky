import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Function to add or create a document in Firestore
const addDocument = async (collectionName, documentId, data) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await setDoc(docRef, data);
    console.log("Document written with ID: ", documentId);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Function to read a document from Firestore
const getDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error reading document: ", error);
  }
};

// Function to update a document in Firestore
const updateDocument = async (collectionName, documentId, data) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, data);
    console.log("Document updated with ID: ", documentId);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// Function to delete a document from Firestore
const deleteDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", documentId);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export { addDocument, getDocument, updateDocument, deleteDocument };
