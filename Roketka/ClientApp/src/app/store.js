import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/products/productsSlice";
import sectionsSlice from "../features/sections/sectionsSlice";
import registerSlice from "../features/register/registerSlice";
import loginSlice from "../features/login/loginSlice";

export const store = configureStore({
    reducer: {
        products: productsSlice,
        sections: sectionsSlice,
        register: registerSlice,
        login: loginSlice
    }
});