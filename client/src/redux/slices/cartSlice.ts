import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../../models/course";

interface Product {
course:Course
}

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const exists = state.items.find((item) => item.course.id === action.payload.course.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.course.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    loadCartFromStorage(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, loadCartFromStorage } = cartSlice.actions;
export default cartSlice.reducer;




















