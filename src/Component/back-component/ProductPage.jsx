"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import { Search } from "lucide-react";
import EditProductModal from "./EditModal";
import "./ProductPage.css";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editProduct, setEditProduct] = useState(null); // State to handle editing

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
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
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

  const handleEditClick = (product) => {
    setEditProduct(product);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleEditSave = async () => {
    try {
      const productDoc = doc(db, "motors", editProduct.id);
      await updateDoc(productDoc, editProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editProduct.id ? editProduct : product
        )
      );
      setEditProduct(null);
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const handleCloseModal = () => {
    setEditProduct(null);
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

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="ProductPage">
      <h1>Manage Products</h1>
      <div className="sub-manage">
        <div className="manage">
          <div className="search-div">
            <input
              type="text"
              placeholder="Search product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search product name"
            />
            <Search size={20} style={{ color: "black" }} className="search" />
          </div>
          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              aria-label="Filter by category"
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
                    <td>{product.date.toLocaleDateString()}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="delete-button"
                        aria-label={`Delete ${product.title}`}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEditClick(product)}
                        className="edit-button"
                        aria-label={`Edit ${product.title}`}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Render the EditProductModal component */}
          {editProduct && (
            <EditProductModal
              product={editProduct}
              onClose={handleCloseModal}
              onSave={handleEditSave}
              onChange={handleEditChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
