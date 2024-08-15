"use client";
import React, { useState } from "react";
import { db, storage } from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import MyComponent from "./MyComponent";
import { Plus, TriangleAlert } from "lucide-react";
import "./AddProduct.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Set image preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    setIsUploading(true);

    // Upload image to Firebase Storage
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Track upload progress
      },
      (error) => {
        console.error("Image upload failed:", error);
        setIsUploading(false);
        alert("Failed to upload image.");
      },
      async () => {
        // Get download URL after upload is complete
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        try {
          // Add the new product to Firestore with the image URL
          const docRef = await addDoc(collection(db, "motors"), {
            title,
            price: parseFloat(price),
            description,
            imageUrl: downloadURL, // Store image URL in Firestore
          });

          console.log("Document written with ID: ", docRef.id);

          // Reset form fields
          setTitle("");
          setPrice("");
          setDescription("");
          setImage(null);
          setImagePreview(null);

          alert("Product added successfully");
        } catch (error) {
          console.error("Error adding product: ", error);
          alert("Failed to add product.");
        } finally {
          setIsUploading(false);
        }
      }
    );
  };

  return (
    <div className="add-product">
      <div className="allform">
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
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Product Price*"
                required
              />
            </div>

            <div>
              <label>Product Description*</label>
              <MyComponent value={description} onChange={setDescription} />
            </div>
            <button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Save"}
            </button>
          </form>
        </div>
        <div className="form2">
          <form action="">
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
                watermarks. Maximum image size 2Mb.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
