import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false,
}

const registerModalSlice = createSlice({
    name: 'registerModal',
    initialState,
    reducers: {
        setVisible: (state) => {
            state.isVisible = true;
        },
        setInvisible: (state) => {
            state.isVisible = false;
        }
    }
})

export const { setVisible, setInvisible } = registerModalSlice.actions;

export default registerModalSlice.reducer;