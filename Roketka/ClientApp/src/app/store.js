import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/products/productsSlice";
import sectionsSlice from "../features/sections/sectionsSlice";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        products: productsSlice,
        sections: sectionsSlice,
        auth: authSlice
    }
});