import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios";

export const fetchContent = createAsyncThunk(
  "content/getContent",
  async (url: string, getState) => {
    const { data } = await axios.get(url);
    return data;
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState: {
    items: [],
    numOfPages: 1,
    status: null,
  },
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchContent.pending]: (state, action) => {
      state.status = "loading";
    },
    // @ts-ignore
    [fetchContent.fulfilled]: (state, action) => {
      state.items = action.payload.results;
      state.numOfPages = action.payload.total_pages;
      state.status = "finished";
    },
    // @ts-ignore
    [fetchContent.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

// export const contentActions = contentSlice.actions;

export default contentSlice.reducer;
