import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    oldProduct: null
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setOldProduct: (state, action) => {
            state.oldProduct = action.payload;
        }
    }
});

export const { setOldProduct } = adminSlice.actions;

export default adminSlice.reducer;