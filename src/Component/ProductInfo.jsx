"use client";
import React, { useState } from "react";
import Modal from "./Modal";

export default function ProductsInfo({
  id,
  images,
  alt,
  price,
  title,
  description,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          id={id}
          className="modal"
          images={images}
          alt={alt}
          price={price}
          title={title}
          description={description}
          onClose={toggleModal} // Use onClose to pass the toggleModal function
        />
      )}
      <div className="product-info">
        <div onClick={toggleModal} className="for-product-info">
          <img
            src={images}
            alt={alt}
            style={{ width: "200px", height: "inherit" }}
          />
          <h3>{title}</h3>
          <p>{price}</p>
        </div>
      </div>
    </>
  );
}
