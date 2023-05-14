import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/products/productsSlice";
import sectionsSlice from "../features/sections/sectionsSlice";
import authSlice from "../features/auth/authSlice";
import commentsSlice from "../features/comments/commentsSlice";
import adminSlice from "../features/admin/adminSlice";

export const store = configureStore({
    reducer: {
        products: productsSlice,
        comments: commentsSlice,
        sections: sectionsSlice,
        auth: authSlice,
        admin: adminSlice
    }
});