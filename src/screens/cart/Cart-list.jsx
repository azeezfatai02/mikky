// import React from "react";
// import "./Carts.css";
// import useCartStore from "./useCartStore";
// import { useRouter } from "next/navigation";

// export default function CartList({ item }) {
//   const { cart, removeFromCart, updateItemQuantity, clearCart } =
//     useCartStore();
//   const router = useRouter();
//   console.log(item);
//   return (
//     <li key={item.id}>
//       <div>
//         <img src={item.images} alt={item.id} />
//         <h2>{item.title}</h2>
//         <p>NGN {item.price}</p>
//         <input
//           type="number"
//           // value={item.quantity}

//           onChange={(e) =>
//             updateItemQuantity(item.id, parseInt(e.target.value, 10))
//           }
//           min="1"
//         />
//         <button onClick={() => removeFromCart(item.id)}>Remove</button>
//       </div>
//     </li>
//   );
// }

import React from "react";
import "./Carts.css";
import useCartStore from "./useCartStore";
import { useRouter } from "next/navigation";

export default function CartList({ item }) {
  const { removeFromCart, updateItemQuantity } = useCartStore();
  const router = useRouter();

  return (
    <li key={item.id} className="cart-item">
      <div className="cart-item-content">
        <img src={item.images} alt={item.title} className="cart-item-image" />
        <div className="cart-item-details">
          <h2>{item.title}</h2>
          <p>NGN {item.price}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateItemQuantity(item.id, parseInt(e.target.value, 10))
            }
            min="1"
            className="quantity-input"
          />
          <button
            onClick={() => removeFromCart(item.id)}
            className="remove-button"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
