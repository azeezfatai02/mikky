import React, { useState, useEffect } from "react";
import "./Carts.css";
import useCartStore from "./useCartStore";
import { Trash2 } from "lucide-react";

export default function CartList({ item, onCarMakeChange, onCarNameChange }) {
  const { removeFromCart, updateItemQuantity } = useCartStore();

  const carData = {
    Toyota: ["Corolla", "Camry", "Rav4"],
    Honda: ["Civic", "Accord", "CR-V"],
    Ford: ["Mustang", "Fiesta", "Explorer"],
    BMW: ["3 Series", "5 Series", "X5"],
  };

  const [carNames, setCarNames] = useState(carData[item.carMake] || []);

  useEffect(() => {
    setCarNames(carData[item.carMake] || []);
    onCarNameChange(item.id, ""); // Reset car name when car make changes
  }, [item.carMake]);

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
          <div className="car-selection">
            <label>
              <select
                value={item.carMake || ""}
                onChange={(e) => onCarMakeChange(item.id, e.target.value)}
              >
                <option value="">Select Car Make</option>
                {Object.keys(carData).map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <select
                value={item.carName || ""}
                onChange={(e) => onCarNameChange(item.id, e.target.value)}
                disabled={!item.carMake}
              >
                <option value="">Select Car Name</option>
                {carNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
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
