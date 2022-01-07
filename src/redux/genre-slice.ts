import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/axios";
import Genre from "../models/genre-model";
import { compare } from "../utils/utils";

export const fetchGenres = createAsyncThunk(
  "genres/getGenres",
  async (url: string, getState) => {
    const { data } = await axios.get(url);
    return data;
  }
);

const genresSlice = createSlice({
  name: "genres",
  initialState: {
    genres: [],
    selectedGenres: [],
    status: null,
  },
  reducers: {
    addGenre(state, action) {
      //@ts-ignore
      state.selectedGenres = [...state.selectedGenres, action.payload];
      state.genres = state.genres.filter(
        (g: Genre) => g.id !== action.payload.id
      );
    },
    removeGenre(state, action) {
      // @ts-ignore
      state.genres = [...state.genres, action.payload].sort(compare);
      state.selectedGenres = state.selectedGenres.filter(
        (g: Genre) => g.id !== action.payload.id
      );
    },
  },
  extraReducers: {
    // @ts-ignore
    [fetchGenres.pending]: (state, action) => {
      state.status = "loading";
    },
    // @ts-ignore
    [fetchGenres.fulfilled]: (state, action) => {
      state.genres = action.payload.genres;
      state.selectedGenres = [];
      state.status = "finished";
    },
    // @ts-ignore
    [fetchGenres.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const genreActions = genresSlice.actions;

export default genresSlice.reducer;
