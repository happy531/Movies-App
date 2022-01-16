import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios";

export const fetchSimilar = createAsyncThunk(
  "similar/getSimilar",
  async (url: string) => {
    const { data } = await axios.get(url);
    return data.results;
  }
);

// @ts-ignore
const similarSlice = createSlice({
  name: "similar",
  initialState: {
    similar: [],
    status: null,
  },
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchSimilar.pending]: (state) => {
      state.similar = [];
      state.status = "loading";
    },
    // @ts-ignore
    [fetchSimilar.fulfilled]: (state, action) => {
      state.similar = action.payload;

      state.status = "finished";
    },
    // @ts-ignore
    [fetchSimilar.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

// export const detailsActions = detailsSlice.actions;

export default similarSlice.reducer;
