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
        filterProductsBySubsection: (state, payload) => {
            const products = JSON.parse(localStorage.getItem('products'));
            state.products = products.filter(item => item.sectionId == payload.payload);
        },
        sortProductsByPrice: (state, payload) => {
            console.log(payload.payload);
            if (payload.payload == 'cheap-to-expensive') {
                state.products = state.products.sort((a, b) => a.price - b.price);
            } else if (payload.payload == 'expensive-to-cheap') {
                state.products = state.products.sort((a, b) => b.price - a.price);
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;

                localStorage.setItem('products', JSON.stringify(state.products));
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export const { filterProductsBySubsection, sortProductsByPrice } = productsSlice.actions;

export default productsSlice.reducer;