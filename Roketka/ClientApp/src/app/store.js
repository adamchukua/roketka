import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice.js"
import productsSlice from "../features/products/productsSlice.js";
import sectionsSlice from "../features/sections/sectionsSlice.js";

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        products: productsSlice,
        sections: sectionsSlice
    }
});