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

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userToken = user.token;

        const response = await axios.get(
            '/api/Comments/GetComments',
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );

        return response.data;
    });

export const addComment = createAsyncThunk(
    'comments/addComment',
    async ({ productId, text }, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user.id;
            const userToken = user.token;

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

export const deleteComments = createAsyncThunk(
    'comments/deleteComments',
    async (comments, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userToken = user.token;

            const response = await axios.delete(
                '/api/Comments/DeleteComments', {
                data: comments,
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    });

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async (id) => {
        const user = JSON.parse(localStorage.getItem('user'));

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        return axios
            .delete(`/api/Comments/DeleteComment/${id}`, config)
            .then((response) => response.data);
    });

export const editComment = createAsyncThunk(
    'comments/editComment',
    async ({ id, text }, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            //const userId = user.id;
            const userToken = user.token;

            const response = await axios.put(
                '/api/Comments/UpdateComment',
                { id, text },
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
            // fetchCommentsByProductId
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
            // fetchComments
            .addCase(fetchComments.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // addComment
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
            // deleteComment
            .addCase(deleteComment.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = state.comments.filter(comment => comment.id !== action.payload.id);
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // editComment
            .addCase(editComment.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(editComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const comment = state.comments.findIndex((comment => comment.id === action.payload.id));
                state.comments[comment].text = action.payload.text;
            })
            .addCase(editComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // deleteComments
            .addCase(deleteComments.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deleteComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = state.comments.filter(comment => !action.payload.includes(comment.id));
            })
            .addCase(deleteComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default commentsSlice.reducer;