import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    sections: [],
    status: 'idle',
    error: null
}

export const fetchSections = createAsyncThunk('sections/fetchSections', async () => {
    return axios
        .get('/api/Sections/GetSections')
        .then((response) => response.data);
});

const sectionsSlice = createSlice({
    name: 'sections',
    initialState,
    reducers: {
        // reducers
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSections.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchSections.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sections = action.payload;
            })
            .addCase(fetchSections.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default sectionsSlice.reducer;