"use client";
import React, { useState } from "react";
import "./AddProduct.css";

export default function AddProduct({ onAddProduct }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      title,
      description,
      price,
      //   category,npm run dev
      image,
    };
    onAddProduct(newProduct);
    // Reset form fields
    setTitle("");
    setDescription("");
    setPrice("");

    setImage("");
  };

  return (
    <div className="AddProduct">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="title">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="title">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="title">
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        {/* <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div> */}
        <div className="title">
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bntAddProduct">
          Add Product
        </button>
      </form>
    </div>
  );
}
