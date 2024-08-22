"use client";
import React, { useState, useEffect } from "react";
import ProductInfo from "@/Component/ProductInfo";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { ALLPRODUCTS } from "../../Data";
// import "./Products.css"; /// Ensure to add appropriate styling

export default function Products() {
  const [products, setProducts] = useState(ALLPRODUCTS);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "motors"));
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date ? doc.data().date.toDate() : new Date(),
        }));
        // Combine fetched products with ALLPRODUCTS
        setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="allprod">
      <h1>OUR PRODUCTS</h1>
      <div className="prodses">
        {products.map((item, index) => (
          <ProductInfo
            id={item.id}
            images={item.image || item.imageUrl} // Handle different image property names
            title={item.title}
            price={item.price}
            description={item.description}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
