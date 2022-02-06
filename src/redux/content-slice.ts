import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios";

export const fetchContent = createAsyncThunk(
  "content/getContent",
  async (url: string) => {
    const { data } = await axios.get(url);
    return data;
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState: {
    items: [],
    numOfPages: 1,
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.items = action.payload.results;
      state.numOfPages = action.payload.total_pages;
      state.status = "finished";
    });
    builder.addCase(fetchContent.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const contentActions = contentSlice.actions;

export default contentSlice.reducer;
