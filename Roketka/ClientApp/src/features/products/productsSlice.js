import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    products: [],
    status: 'idle',
    error: null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    return axios
        .get('/api/Products/GetProducts')
        .then((response) => response.data);
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // reducers
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

// export const { } = productsSlice.actions;

export default productsSlice.reducer;