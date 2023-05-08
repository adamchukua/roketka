import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isModalVisible: false,
    isFetching: false,
    isLoggedIn: false,
    error: null
}

export const login = createAsyncThunk(
    'login/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await axios.post('/api/Auth/Login', { email, password });
            localStorage.setItem('token', response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setModalVisible: (state) => {
            state.isModalVisible = true;
        },
        setModalInvisible: (state) => {
            state.isModalVisible = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isFetching = true;
                state.isLoggedIn = false;
                state.error = null;
            })
            .addCase(login.fulfilled, (state) => {
                state.isFetching = false;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isFetching = false;
                state.isLoggedIn = false;
                state.error = action.payload;
            })
    }
});

export const { setModalVisible, setModalInvisible } = loginSlice.actions;

export default loginSlice.reducer;