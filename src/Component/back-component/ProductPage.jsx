"use client";
import React, { useState, useEffect } from "react";
// import Dropdown from "./Dropdown";
import { ALLPRODUCTS } from "@/app/Data";
import "./ProductPage.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { Search } from "lucide-react";
// import AddProduct from "./AddProduct";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
      }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const categories = [
    ...new Set(ALLPRODUCTS.map((product) => product.category)),
  ];

  const filteredProducts = ALLPRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // const handleAddProduct = (newProduct) => {
  //   setProducts([...products, newProduct]);
  // };

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
            ></input>
            <Search size={20} style={{ color: "black" }} className="search" />
          </div>

          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Date</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{new Date(product.date).toLocaleDateString()}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
