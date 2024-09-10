"use client";
import React, { useState, useEffect } from "react";
import ProductInfo from "@/Component/ProductInfo";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { ALLPRODUCTS } from "../../Data";
// import "./Products.css"; // Ensure to add appropriate styling

export default function Products() {
  const [products, setProducts] = useState(ALLPRODUCTS);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const productsPerPage = 6; // Number of products to show per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "motors"));
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date ? doc.data().date.toDate() : new Date(),
        }));

        const uniqueProducts = fetchedProducts.filter(
          (newProduct) =>
            !products.some(
              (existingProduct) => existingProduct.id === newProduct.id
            )
        );

        setProducts((prevProducts) => [...prevProducts, ...uniqueProducts]);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setError(
          "Unable to fetch products at the moment. Please try again later."
        );
      }
    };

    fetchProducts();
  }, []);

  // Get the products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle Next page
  const handleNext = () => {
    if (currentPage * productsPerPage < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle Previous page
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="allprod">
      <h1>OUR PRODUCTS</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="prodses">
        {currentProducts.map((item, index) => (
          <ProductInfo
            id={item.id}
            images={item.image || item.imageUrl}
            title={item.title}
            price={item.price}
            description={item.description}
            key={index}
          />
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNext}
          disabled={currentPage * productsPerPage >= products.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
