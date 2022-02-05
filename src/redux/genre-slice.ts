import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios/axios";
import Genre from "../models/genre-model";
import { compare } from "../utils/utils";

export const fetchGenres = createAsyncThunk(
  "genres/getGenres",
  async (url: string) => {
    const { data } = await axios.get(url);
    return data;
  }
);

interface InitialStateInterface {
  genres: Array<Genre>;
  selectedGenres: Array<Genre>;
  status: string;
}

const genresSlice = createSlice({
  name: "genres",
  initialState: {
    genres: [],
    selectedGenres: [],
    status: "",
  },
  reducers: {
    addGenre(state: InitialStateInterface, action: PayloadAction<Genre>) {
      state.selectedGenres = [...state.selectedGenres, action.payload];
      state.genres = state.genres.filter(
        (g: Genre) => g.id !== action.payload.id
      );
    },
    removeGenre(state: InitialStateInterface, action: PayloadAction<Genre>) {
      state.genres = [...state.genres, action.payload].sort(compare);
      state.selectedGenres = state.selectedGenres.filter(
        (g: Genre) => g.id !== action.payload.id
      );
    },
    clearSelectedGenres(state: InitialStateInterface) {
      state.selectedGenres = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genres = action.payload.genres;
      state.selectedGenres = [];
      state.status = "finished";
    });
    builder.addCase(fetchGenres.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const genreActions = genresSlice.actions;

export default genresSlice.reducer;
