import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchContent = createAsyncThunk(
    "trending/getTrending",
    async(url: string, getState) => {
        const {data} = await axios.get(url);
        return data;
    }
);

const contentSlice = createSlice({
    name: "trending",
    initialState: {
        items: [],
        numOfPages: 1
    },
    reducers: {},
    extraReducers: {
        // @ts-ignore
        [fetchContent.fulfilled]: (state, action) => {
            state.items = action.payload.results;
            state.numOfPages = action.payload.total_pages;
        }
    }
});

export const contentActions = contentSlice.actions;

export default contentSlice.reducer;