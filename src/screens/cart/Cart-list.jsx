import React from "react";
import "./Carts.css";
import useCartStore from "./useCartStore";
import { Trash2 } from "lucide-react";

export default function CartList({ item }) {
  const { removeFromCart, updateItemQuantity, updateCartItem } = useCartStore();

  const carData = {
    Toyota: [
      "Corolla",
      "Camry",
      "Rav4",
      "Sienna",
      "Avalon",
      "Prius",
      "Yaris",
      "C-HR",
      "Highlander",
      "4Runner",
      "Tacoma",
      "Tundra",
    ],
    Honda: [
      "Civic",
      "Accord",
      "CR-V",
      "Pilot",
      "HR-V",
      "Passport",
      "Prologue",
      "Ridgeline",
      "Odyssey",
    ],
    Ford: [
      "Mustang",
      "Fiesta",
      "Explorer",
      "Focus",
      "Mondeo",
      "Bronco",
      "Capri EV",
      "Edge",
      "Equator",
      "Escape",
      "Kuga",
      "Everest",
      "Expedition",
      "Puma",
    ],
    BMW: [
      "1 Series",
      "2 Series",
      "3 Series",
      "4 Series",
      "5 Series",
      "6 Series",
      "7 Series",
      "8 Series",
      "X5",
    ],
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, i) => 1990 + i
  );

  const handleCarMakeChange = (id, carMake) => {
    updateCartItem(id, { carMake, carName: "", carYear: "" }); // Reset car name and year when make changes
  };

  const handleCarNameChange = (id, carName) => {
    updateCartItem(id, { carName });
  };

  const handleCarYearChange = (id, carYear) => {
    updateCartItem(id, { carYear });
  };

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
                onChange={(e) => handleCarMakeChange(item.id, e.target.value)}
                aria-label="Select Car Make"
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
                onChange={(e) => handleCarNameChange(item.id, e.target.value)}
                disabled={!item.carMake}
                aria-label="Select Car Name"
              >
                <option value="">Select Car Name</option>
                {carData[item.carMake]?.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <select
                value={item.carYear || ""}
                onChange={(e) => handleCarYearChange(item.id, e.target.value)}
                disabled={!item.carMake}
                aria-label="Select Car Year"
              >
                <option value="">Select Car Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="remove-input">
            <button
              onClick={() => removeFromCart(item.id)}
              className="remove-button"
              aria-label="Remove Item"
            >
              <Trash2 /> Remove
            </button>
            <div className="quantity-buttons">
              <button onClick={handleDecreaseQuantity}>-</button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateItemQuantity(
                    item.id,
                    Math.max(1, parseInt(e.target.value, 10))
                  )
                }
                min="1"
                className="quantity-input"
                aria-label="Quantity"
              />
              <button onClick={handleIncreaseQuantity}>+</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
