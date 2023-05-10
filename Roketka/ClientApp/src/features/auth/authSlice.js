import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const tokenExpirationTime = new Date().getTime() + 7 * 24 * 3600 * 1000;

const initialState = {
    isLoginModalVisible: false,
    isRegisterModalVisible: false,
    isFetching: false,
    isLoggedIn: false,
    error: null
}

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await axios.post('/api/Auth/Login', { email, password });
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginModalVisible: (state) => {
            state.isLoginModalVisible = true;
        },
        setLoginModalInvisible: (state) => {
            state.isLoginModalVisible = false;
        },
        setRegisterModalVisible: (state) => {
            state.isRegisterModalVisible = true;
        },
        setRegisterModalInvisible: (state) => {
            state.isRegisterModalVisible = false;
        },
        exit: (state) => {
            localStorage.removeItem('user');
            state.isLoggedIn = false;
        }
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

export const {
    setLoginModalVisible,
    setLoginModalInvisible,
    setRegisterModalVisible,
    setRegisterModalInvisible,
    exit
} = authSlice.actions;

export default authSlice.reducer;