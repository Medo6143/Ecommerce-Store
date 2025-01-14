import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./ProductSlice";
import cartSlice from "./Cart";
import categorySlice from "./Category";
export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice,
    category: categorySlice,
  },
});
