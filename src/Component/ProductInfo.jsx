"use client";
import React from "react";
import { useState } from "react";
import Modal from "./Modal";
export default function ProductsInfo({
  images,
  alt,
  price,
  title,
  description,
}) {
  const [openModal, setOpenModal] = useState(false);
  // const openModalHandler = () => {
  //   setOpenModal(true);
  //   console.log("openmodal", openModal);
  // };
  // const closeModalHandler = () => {
  //   const inverseModelState = !openModal;
  //   setOpenModal(inverseModelState);
  //   console.log("closemdal", openModal);
  // };

  const toogleModel = () => {
    setOpenModal((prev) => !prev);
    console.log("toogle", openModal);
  };
  console.log("openmodal state", openModal);
  return (
    <>
      {openModal && (
        <Modal
          className="modal"
          images={images}
          alt={alt}
          price={price}
          title={title}
          description={description}
          toogleModel={toogleModel}
        />
      )}
      <div className="product-info">
        <div onClick={toogleModel}>
          <img src={images} alt={alt} />
          <h3>{title}</h3>
          <p>{price}</p>
        </div>
      </div>
    </>
  );
}
