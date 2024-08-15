import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  orders: [],
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  updateItemQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  
}));

export default useCartStore;
