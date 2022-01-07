import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios";

export const fetchCast = createAsyncThunk(
  "cast/getCast",
  async (url: string, getState) => {
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
  extraReducers: {
    // @ts-ignore
    [fetchCast.pending]: (state, action) => {
      state.status = "loading";
    },
    // @ts-ignore
    [fetchCast.fulfilled]: (state, action) => {
      state.cast = action.payload.cast;
      state.status = "finished";
    },
    // @ts-ignore
    [fetchCast.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

// export const castActions = castSlice.actions;

export default castSlice.reducer;
