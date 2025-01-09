import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
    totalQuantity: 0,
    totalAmount: 0
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = action.payload.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

  }
});

export const { 
  setCartItems,  
} = cartSlice.actions;

export default cartSlice.reducer;

