"use client";
import useCartStore from "./useCartStore";
import { useRouter } from "next/navigation";
import CartList from "./Cart-list";

const CartPage = () => {
  const { cart, removeFromCart, updateItemQuantity, clearCart } =
    useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    // Handle checkout logic here
    alert("Proceeding to checkout");
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <p>
        Your cart is empty. <a href="/product">Start shopping</a>
      </p>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item, i) => (
          <CartList item={item} key={i} />
        ))}
      </ul>
      <button className="checkout" onClick={handleCheckout}>
        Checkout
      </button>
      <button className="checkout" onClick={clearCart}>
        clear cart
      </button>
    </div>
  );
};

export default CartPage;
