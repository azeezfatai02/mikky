"use client";

import React, { useState } from "react";
import { db, storage } from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import dynamic from "next/dynamic";
import { Plus, TriangleAlert } from "lucide-react";
import "./AddProduct.css";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(""); // State for error messages

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic validation for file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        setError("File size exceeds 2MB. Please choose a smaller file.");
        setImage(null);
        setImagePreview(null);
        return;
      }
      setError(""); // Clear error
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!title || !price || !image || !description) {
      setError("Please fill in all fields and upload an image.");
      return;
    }

    if (parseFloat(price) <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    setIsUploading(true);
    setError(""); // Clear previous errors

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress); // Track upload progress
      },
      (error) => {
        console.error("Image upload failed:", error);
        setIsUploading(false);
        setError("Failed to upload image.");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        try {
          await addDoc(collection(db, "motors"), {
            title,
            price: parseFloat(price),
            description,
            imageUrl: downloadURL,
          });

          setTitle("");
          setPrice("");
          setDescription("");
          setImage(null);
          setImagePreview(null);
          setUploadProgress(0);

          alert("Product added successfully");
        } catch (error) {
          console.error("Error adding product: ", error);
          setError("Failed to add product.");
        } finally {
          setIsUploading(false);
        }
      }
    );
  };

  return (
    <div className="add-product">
      <div className="allform">
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error message */}
        <div className="form1">
          <form onSubmit={handleSubmit}>
            <h2>General Information</h2>
            <div className="name-div">
              <label className="name-label">
                <p>Name*</p>
                <p className="req">Required</p>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Name*"
                required
              />
            </div>
            <div className="name-div">
              <label className="name-label">
                <p>Price*</p>
                <p className="req">Required</p>
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Product Price*"
                required
              />
            </div>

            <div>
              <label>Product Description*</label>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
              />
            </div>
            <button type="submit" disabled={isUploading}>
              {isUploading
                ? `Uploading... ${uploadProgress.toFixed(0)}%`
                : "Save"}
            </button>
          </form>
        </div>
        <div className="form2">
          <h2>Upload File</h2>
          <label className="upload">
            {!imagePreview ? (
              <>
                <Plus />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <p>Main Image</p>
              </>
            ) : (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="image-preview"
                style={{ width: "600px", height: "inherit" }}
              />
            )}
          </label>
          <div className="alert">
            <div>
              <TriangleAlert />
            </div>
            <p>
              Image needs to be between 500x500 and 2000x2000 pixels. No
              watermarks. Maximum image size 2MB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
