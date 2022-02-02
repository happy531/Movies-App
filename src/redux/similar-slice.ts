import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios";

export const fetchSimilar = createAsyncThunk(
  "similar/getSimilar",
  async (url: string) => {
    const { data } = await axios.get(url);
    return data.results;
  }
);

const similarSlice = createSlice({
  name: "similar",
  initialState: {
    similar: [],
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSimilar.pending, (state) => {
      state.similar = [];
      state.status = "loading";
    });
    builder.addCase(fetchSimilar.fulfilled, (state, action) => {
      state.similar = action.payload;
      state.status = "finished";
    });
    builder.addCase(fetchSimilar.rejected, (state) => {
      state.status = "failed";
    });
  },
});

// export const detailsActions = detailsSlice.actions;

export default similarSlice.reducer;
