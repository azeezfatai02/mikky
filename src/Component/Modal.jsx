import React from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/screens/cart/useCartStore";

function Modal({
  id,
  toogleModel,
  title,
  images,
  alt,
  price,
  description,
  handleCloseModal,
}) {
  const { addToCart } = useCartStore();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({ id, title, images, alt, price, description, quantity: 1 });
    alert("Item added to cart");
    toggleModal();
  };
  return (
    <div className="modal">
      <div className="modaldiv">
        <div>
          <img src={images} alt={alt} />
        </div>
        <div className="modalcont">
          <h1>{title}</h1>
          <h2>NGN {price}</h2>
          <button className="modalbutton" onClick={handleAddToCart}>
            ADD TO CART
          </button>

          <h2>DECRIPTION</h2>
          <p>{description}</p>
          <div className="gotocart">
            <button
              onClick={() => router.push("/Cart")}
              className="modalbutton2"
              aria-label="Go to cart"
            >
              GO TO CART
            </button>
            <button onClick={handleCloseModal} className="button2">
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  // Fetch product details using the id
  const product = {
    id,
    name: `Product ${id}`,
    price: `$${id * 10}`,
  };

  return { props: { product } };
}

export default Modal;
