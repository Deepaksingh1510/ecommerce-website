"use client";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "@/app/store";
import { hydrateCart } from "@/slices/cartSlice";
import CartDrawer from "@/components/Sidebar";

// Bumped whenever saved carts would no longer match the catalogue
// (v3: new catalogue and content-hashed image URLs).
const STORAGE_KEY = "swiftcart:cart:v3";

// Restores the cart after the first render (so server and client HTML match),
// then writes every change back to localStorage.
function CartPersistence() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) store.dispatch(hydrateCart(JSON.parse(saved)));
    } catch {
      // Storage unavailable or corrupt: start with an empty cart.
    }

    let lastItems = store.getState().cart.items;
    return store.subscribe(() => {
      const { items } = store.getState().cart;
      if (items === lastItems) return;
      lastItems = items;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {}
    });
  }, []);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartPersistence />
      {children}
      <CartDrawer />
      <Toaster position="bottom-center" theme="system" richColors={false} />
    </Provider>
  );
}
