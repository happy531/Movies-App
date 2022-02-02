import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios";

export const fetchCast = createAsyncThunk(
  "cast/getCast",
  async (url: string) => {
    const { data } = await axios.get(url);
    return data;
  }
);

const castSlice = createSlice({
  name: "cast",
  initialState: {
    cast: [],
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCast.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCast.fulfilled, (state, action) => {
      state.cast = action.payload.cast;
      state.status = "finished";
    });
    builder.addCase(fetchCast.rejected, (state) => {
      state.status = "failed";
    });
  },
});

// export const castActions = castSlice.actions;

export default castSlice.reducer;
