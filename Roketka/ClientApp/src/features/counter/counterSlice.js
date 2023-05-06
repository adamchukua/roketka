import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        addAmount: (state, action) => {
            state.value += action.payload
        }
    }
})

export const { increment, decrement, addAmount } = counterSlice.actions;

export default counterSlice.reducer;