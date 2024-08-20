import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/screens/cart/useCartStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify"; // Import ToastContainer

function Modal({
  id,
  title,
  images,
  alt,
  price,
  description,
  onClose, // Add onClose prop for handling the close action
}) {
  const { addToCart } = useCartStore();
  const router = useRouter();
  const modalRef = useRef(null); // Create a ref for the modal

  const handleAddToCart = () => {
    addToCart({ id, title, images, alt, price, description, quantity: 1 });
    toast.success("Item added to cart");
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Call the onClose function when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modaldiv" ref={modalRef}>
        <div className="modal-img-div">
          <img src={images} alt={alt} className="modal-img" />
        </div>
        <div className="modalcont">
          <h1>{title}</h1>
          <h2>NGN {price}</h2>

          <h2>DESCRIPTION</h2>
          <p>{description}</p>
          <div className="gotocart">
            <button className="modalbutton" onClick={handleAddToCart}>
              ADD TO CART
            </button>
            <button
              onClick={() => router.push("/Cart")}
              className="modalbutton2"
              aria-label="Go to cart"
            >
              GO TO CART
            </button>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Include ToastContainer */}
    </div>
  );
}

export default Modal;
