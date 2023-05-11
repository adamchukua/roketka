import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isLoginModalVisible: false,
    isRegisterModalVisible: false,
    isFetching: false,
    isLoggedIn: false,
    user: null,
    error: null
}

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await axios.post('/api/Auth/Login', { email, password });
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getUser = createAsyncThunk(
    'auth/getUser',
    async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            return user;
        } catch (error) {
            return null;
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
            state.user = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isFetching = true;
                state.isLoggedIn = false;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isFetching = false;
                state.isLoggedIn = true;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isFetching = false;
                state.isLoggedIn = false;
                state.error = action.payload;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
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