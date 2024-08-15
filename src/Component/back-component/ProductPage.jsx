"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { Search } from "lucide-react";
import "./ProductPage.css";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "motors"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date ? doc.data().date.toDate() : new Date(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "motors", id));
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="ProductPage">
      <h1>Manage Product</h1>
      <div className="sub-manage">
        <div className="manage">
          <div className="search-div">
            <input
              type="text"
              placeholder="Search product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={20} style={{ color: "black" }} className="search" />
          </div>
          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Date</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>{new Date(product.date).toLocaleDateString()}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <button onClick={() => handleDelete(product.id)}>
                        Delete
                      </button>
                      <button>Edit</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
