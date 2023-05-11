import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    comments: [],
    status: 'idle',
    error: null
}

export const fetchCommentsByProductId = createAsyncThunk(
    'comments/fetchCommentsByProductId',
    async (productId) => {
        return axios
            .get(`/api/Comments/GetCommentsByProductId/${productId}`)
            .then((response) => response.data);
    });

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        // reducers
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCommentsByProductId.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchCommentsByProductId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = action.payload;
            })
            .addCase(fetchCommentsByProductId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default commentsSlice.reducer;