import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice.js"
import productsSlice from "../features/products/productsSlice.js";

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        products: productsSlice
    }
});