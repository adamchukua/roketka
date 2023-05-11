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

export const addComment = createAsyncThunk(
    'comments/addComment',
    async ({ productId, text }, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user.id;
            const userToken = user.token;
            console.log(user);

            const response = await axios.post(
                '/api/Comments/AddComment',
                { productId, userId, text },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

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
            .addCase(addComment.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments.push(action.payload);
            })
            .addCase(addComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default commentsSlice.reducer;