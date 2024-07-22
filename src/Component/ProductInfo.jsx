"use client";
import React from "react";
import { useState } from "react";
import Modal from "./Modal";

export default function ProductsInfo({
  id,
  images,
  alt,
  price,
  title,
  description,
}) {
  const [openModal, setOpenModal] = useState(false);

  const toogleModel = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {openModal && (
        <Modal
          id={id}
          className="modal"
          images={images}
          alt={alt}
          price={price}
          title={title}
          description={description}
          toogleModel={toogleModel}
          handleCloseModal={handleCloseModal}
        />
      )}
      <div className="product-info">
        <div onClick={toogleModel} className="for-product-info">
          <img src={images} alt={alt} />
          <h3>{title}</h3>
          <p>{price}</p>
        </div>
      </div>
    </>
  );
}
