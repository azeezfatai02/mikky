import React from "react";

function Modal({ toogleModel, title, images, alt, price, description }) {
  console.log("title......", title);
  return (
    <div className="modal">
      <div className="modaldiv">
        <div>
          <img src={images} alt={alt} />
        </div>
        <div className="modalcont">
          <h1>{title}</h1>
          <h2>NGN {price}</h2>
          <button className="modalbutton">ADD TO CART</button>
          <h2>DECRIPTION</h2>
          <p>{description}</p>
          <div>
            <button onClick={toogleModel} className="button2">
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
