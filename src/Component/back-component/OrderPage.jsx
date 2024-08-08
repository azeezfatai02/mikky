"use client";
import React, { useState, useEffect } from "react";
import useCartStore from "@/screens/cart/useCartStore";
import { useRouter } from "next/navigation";
import CartList from "@/screens/cart/Cart-list";
import "./OrderPage.css";
import { ArrowDown, Search } from "lucide-react";

const OrderPage = () => {
  const { orders, clearCart } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const handleCancelOrder = (index) => {
    const updatedOrders = orders.filter(
      (_, orderIndex) => orderIndex !== index
    );
    useCartStore.setState({ orders: updatedOrders });
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order.cart.some((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="order-page">
      <h1 className="order-page-h1">Order</h1>
      <div style={{ backgroundColor: "#F7F6F6", height: "100%" }}>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search by product name"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <Search
          style={{
            color: "#3FC79A",
            position: "absolute",
            top: "119px",
            left: "650px",
          }}
        />
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>
                    Order date <ArrowDown />
                  </th>
                  <th> Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="4">No orders found.</td>
                  </tr>
                )}
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>
                      <ol>
                        {order.cart.map((item, cartIndex) => (
                          <li key={cartIndex}>
                            <p>Title: {item.title}</p>
                          </li>
                        ))}
                      </ol>
                    </td>
                    <td>{order.orderDate}</td>
                    <td>
                      {order.cart.reduce(
                        (total, item) => total + item.price,
                        0
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleCancelOrder(index)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
