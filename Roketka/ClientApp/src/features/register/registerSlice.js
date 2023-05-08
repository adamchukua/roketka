import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalVisible: false,
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setModalVisible: (state) => {
            state.isModalVisible = true;
        },
        setModalInvisible: (state) => {
            state.isModalVisible = false;
        }
    }
})

export const { setModalVisible, setModalInvisible } = registerSlice.actions;

export default registerSlice.reducer;