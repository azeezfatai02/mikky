"use client";
import useCartStore from "./useCartStore";
import { useRouter } from "next/navigation";
import CartList from "./Cart-list";
import { useState } from "react";
import "./Carts.css";
import Link from "next/link";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    addOrder,
    updateCartItem,
  } = useCartStore();
  const router = useRouter();

  const handleCarMakeChange = (itemId, newCarMake) => {
    updateCartItem(itemId, { carMake: newCarMake, carName: "" });
  };

  const handleCarNameChange = (itemId, newCarName) => {
    updateCartItem(itemId, { carName: newCarName });
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout");
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    const newOrder = {
      cart,
      orderDate: new Date().toLocaleString(),
    };

    addOrder(newOrder);
    clearCart();
    alert("Order placed successfully");
    router.push("/back-end/orders"); // Navigate to orders page
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  if (cart.length === 0) {
    return (
      <p>
        Your cart is empty. <Link href="/product">Start shopping</Link>
      </p>
    );
  }

  return (
    <div className="cart-page">
      <div className="for-cart">
        <h1>Cart ({totalQuantity})</h1>
        <ul>
          {cart.map((item, i) => (
            <CartList
              item={item}
              key={i}
              onCarMakeChange={handleCarMakeChange}
              onCarNameChange={handleCarNameChange}
            />
          ))}
        </ul>
      </div>
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <div className="cart-summary-p">
          <p>Item total ({totalQuantity}):</p>
          <p> NGN {totalPrice.toFixed(2)} </p>
        </div>
        <div className="cart-summary-p">
          <p>Subtotal:</p>
          <p> NGN {totalPrice.toFixed(2)}</p>
        </div>
        <div className="cart-summary-button">
          <button className="checkout" onClick={handleCheckout}>
            Checkout
          </button>
          <button className="checkout" onClick={clearCart}>
            clear cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
