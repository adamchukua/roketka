import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    images: [],
    status: 'idle',
    error: null
}

export const fetchImagesByProductId = createAsyncThunk(
    'images/fetchImagesByProductId',
    async (productId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userToken = user.token;

        const config = {
            headers: { Authorization: `Bearer ${userToken}` }
        };

        return axios
            .get(`/api/Images/GetImagesByProductId/${productId}`, config)
            .then((response) => response.data);
    }
);

export const deleteImage = createAsyncThunk(
    'images/deleteImage',
    async (imageId, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userToken = user.token;

            const response = await axios.delete(
                `/api/Images/Delete/${imageId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    });

export const addImages = createAsyncThunk(
    'images/addImages',
    async (images, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userToken = user.token;

            const response = await axios.post(
                '/api/Images/Upload',
                images,
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

const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        setImages: (state, action) => {
            state.images = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            // addImages
            .addCase(addImages.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addImages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.images = action.payload;
            })
            .addCase(addImages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // deleteImage
            .addCase(deleteImage.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.images = state.images.filter(image => image.id !== action.payload.id);
            })
            .addCase(deleteImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // fetchImagesByProductId
            .addCase(fetchImagesByProductId.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchImagesByProductId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.images = action.payload;
            })
            .addCase(fetchImagesByProductId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { setImages } = imagesSlice.actions;

export default imagesSlice.reducer;