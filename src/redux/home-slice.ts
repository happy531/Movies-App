import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios";

export const fetchHomeContent = createAsyncThunk(
  "home/getTrendingMovies",
  async () => {
    const { data: trendingMoviesData } = await axios.get(
      `/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const { data: trendingTvData } = await axios.get(
      `/trending/tv/week?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const { data: topRatedMoviesData } = await axios.get(
      `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const { data: topRatedTvData } = await axios.get(
      `/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}`
    );
    return {
      trendingMoviesData,
      trendingTvData,
      topRatedMoviesData,
      topRatedTvData,
    };
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    trendingMovies: [],
    trendingTv: [],
    topRatedMovies: [],
    topRatedTv: [],
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHomeContent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchHomeContent.fulfilled, (state, action) => {
      state.trendingMovies = action.payload.trendingMoviesData.results;
      state.trendingTv = action.payload.trendingTvData.results;
      state.topRatedMovies = action.payload.topRatedMoviesData.results;
      state.topRatedTv = action.payload.topRatedTvData.results;
      state.status = "finished";
    });
    builder.addCase(fetchHomeContent.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default homeSlice.reducer;
