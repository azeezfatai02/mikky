import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase"; // Adjust the import path as necessary

// Function to fetch a product by its ID
const getProductById = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() };
    } else {
      console.log("No such product!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export { getProductById };
