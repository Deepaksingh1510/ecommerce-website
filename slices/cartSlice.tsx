import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

export type CartItem = {
  totalPrice: number;
  id: number;
  title: string;
  price: number;
  mainImageUrl: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = existingItem.quantity * newItem.price;
      } else {
        state.items.push(newItem);
      }
    },
    removefromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<{ itemId: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.itemId);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;
      }
    },
    decrementQuantity: (state, action: PayloadAction<{ itemId: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity;
      }
    },
    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addtoCart,
  removefromCart,
  incrementQuantity,
  decrementQuantity,
  hydrateCart,
  openCart,
  closeCart,
} = cartSlice.actions;

export const selectItems = (state: RootState) => state.cart.items;
export const selectIsCartOpen = (state: RootState) => state.cart.isOpen;
export const selectItemCount = (state: RootState) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.totalPrice, 0);

export default cartSlice.reducer;
