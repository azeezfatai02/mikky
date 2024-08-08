import React from "react";
import "./Carts.css";
import useCartStore from "./useCartStore";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function CartList({ item }) {
  const { removeFromCart, updateItemQuantity } = useCartStore();
  const router = useRouter();
  const handleIncreaseQuantity = () => {
    updateItemQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateItemQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <li key={item.id} className="cart-item">
      <div className="cart-item-content">
        <div className="cart-item-details">
          <div className="img-title-price">
            <div className="img-title">
              <img
                src={item.images}
                alt={item.title}
                className="cart-item-image"
                onError={(e) => (e.target.src = "/path/to/placeholder.jpg")}
              />
              <h2>{item.title}</h2>
            </div>
            <p>NGN {item.price}</p>
          </div>
          <div className="remove-input">
            <button
              onClick={() => removeFromCart(item.id)}
              className="remove-button"
            >
              <Trash2 /> Remove
            </button>
            <div className="quantity-buttons">
              <button onClick={handleDecreaseQuantity}>-</button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateItemQuantity(item.id, parseInt(e.target.value, 10))
                }
                min="1"
                className="quantity-input"
              />
              <button onClick={handleIncreaseQuantity}>+</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
