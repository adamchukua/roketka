import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    products: [],
    status: 'idle',
    error: null
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
    return axios
        .get('/api/Products/GetProducts')
        .then((response) => response.data);
});

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (productId) => {
    return axios
        .get(`/api/Products/GetProduct/${productId}`)
        .then((response) => response.data);
    });

export const deleteProducts = createAsyncThunk(
    'products/deleteProducts',
    async (products, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userToken = user.token;

            const response = await axios.delete(
                '/api/Products/DeleteProducts', {
                data: products,
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    });

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (product, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userToken = user.token;

            const response = await axios.post(
                '/api/Products/AddProduct',
                product,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    });

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (product, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userToken = user.token;

            const response = await axios.put(
                '/api/Products/UpdateProduct',
                product,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
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
            if (payload.payload == 'cheap-to-expensive') {
                state.products = state.products.sort((a, b) => a.price - b.price);
            } else if (payload.payload == 'expensive-to-cheap') {
                state.products = state.products.sort((a, b) => b.price - a.price);
            }
        }
    },
    extraReducers(builder) {
        builder
            // fetchProducts
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
            // fetchProductById
            .addCase(fetchProductById.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.product = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // deleteProducts
            .addCase(deleteProducts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = state.products.filter(product => !action.payload.includes(product.id));
            })
            .addCase(deleteProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // addProduct
            .addCase(addProduct.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // updateProduct
            .addCase(updateProduct.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const product = state.products.findIndex((product => product.id === action.payload.id));
                state.products[product] = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { filterProductsBySubsection, sortProductsByPrice } = productsSlice.actions;

export default productsSlice.reducer;