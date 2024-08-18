"use client";
import React, { useState } from "react";
import useCartStore from "@/screens/cart/useCartStore";
import { useRouter } from "next/navigation";
import { ArrowDown, Search } from "lucide-react";
import "./OrderPage.css";

const OrderPage = () => {
  const { orders, clearCart } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const handleCancelOrder = (index) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (confirmCancel) {
      const updatedOrders = orders.filter(
        (_, orderIndex) => orderIndex !== index
      );
      useCartStore.setState({ orders: updatedOrders });
    }
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
            className="search-input"
          />
          <Search className="search-icon" />
        </div>
        <div>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>
                  Order Date <ArrowDown />
                </th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="4">No orders found.</td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => (
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
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(
                        order.cart.reduce(
                          (total, item) => total + item.price,
                          0
                        )
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleCancelOrder(index)}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
