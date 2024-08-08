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

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="ProductPage">
      <div className="manage-h1">
        <h1 style={{ color: "black" }}>Manage Product</h1>
      </div>
      {/* <Dropdown options={categories} onOptionSelect={setSelectedCategory} /> */}
      <div className="manage">
        {/* <hr /> */}
        <h2>{selectedCategory || "All Products"}</h2>
        <div className="search-div">
          <input
            type="text"
            placeholder="Search product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginBottom: "10px",
            }}
          ></input>
          <Search size={20} style={{ color: "black" }} className="search" />
        </div>
        <ul>
          {filteredProducts.map((product, index) => (
            <li key={index}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        color: "black",
                      }}
                    >
                      Image
                    </th>
                    <th
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        color: "black",
                      }}
                    >
                      Title
                    </th>
                    <th
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        color: "black",
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        // color: "white",
                      }}
                    >
                      Description
                    </th>
                    <th
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        // color: "white",
                      }}
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </td>
                      <td
                        style={{
                          border: "1px solid #ccc",
                          padding: "10px",
                          //   color: "white",
                        }}
                      >
                        {product.title}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                        {new Date(product.date).toLocaleDateString()}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ccc",
                          padding: "10px",
                          //   color: "white",
                        }}
                      >
                        {product.description}
                      </td>
                      <td
                        style={{
                          border: "1px solid #ccc",
                          padding: "10px",
                          //   color: "white",
                        }}
                      >
                        {product.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
          ))}
        </ul>
      </div>
      {/* <AddProduct onAddProduct={handleAddProduct} /> */}
      <button onClick={() => setSelectedCategory("")}>Show All Products</button>
    </div>
  );
}

export default ProductPage;
