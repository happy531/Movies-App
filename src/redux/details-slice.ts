import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios";

export const fetchDetailsAndVideo = createAsyncThunk(
  "details/getDetails",
  async (urls: { detailsUrl: string; videoUrl: string }) => {
    const { data: detailsData } = await axios.get(urls.detailsUrl);
    const { data: videoData } = await axios.get(urls.videoUrl);
    return {
      detailsData,
      videoData,
    };
  }
);

// @ts-ignore
const detailsSlice = createSlice({
  name: "details",
  initialState: {
    details: {},
    genres: [],
    video: "",
    status: "",
  },
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchDetailsAndVideo.pending]: (state) => {
      state.details = [];
      state.status = "loading";
    },
    // @ts-ignore
    [fetchDetailsAndVideo.fulfilled]: (state, action) => {
      state.details = action.payload.detailsData;
      state.genres = action.payload.detailsData.genres;
      state.video = action.payload.videoData.results[0]?.key;

      state.status = "finished";
    },
    // @ts-ignore
    [fetchDetailsAndVideo.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

// export const detailsActions = detailsSlice.actions;

export default detailsSlice.reducer;
