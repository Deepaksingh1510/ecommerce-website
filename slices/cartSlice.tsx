import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
type CartItem = {
  totalPrice: number;
  id: number;
  title: string;
  price: number;
  mainImageUrl: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  // Other properties if you have them
};

const initialState: CartState = {
  items: [],
  // Other initial state properties if any
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = existingItem.quantity * newItem.price;
      } else {
        // If the item doesn't exist, add it to the cart
        state.items.push(newItem);
      }
    },
    removefromCart: (state, action: PayloadAction<number>) => {
      // You can implement the removal logic here
    },
    incrementQuantity: (state, action) => {
      const { itemId } = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;
      }
    },
    decrementQuantity: (state, action) => {
      const { itemId } = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity;
      }
    },
  },
});

export const {
  addtoCart,
  removefromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export const selectItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
