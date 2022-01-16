import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./home-slice";
import contentSlice from "./content-slice";
import genresSlice from "./genre-slice";
import detailsSlice from "./details-slice";
import castSlice from "./cast-slice";
import searchSlice from "./search-slice";
import similarSlice from "./similar-slice";

const store = configureStore({
  reducer: {
    home: homeSlice,
    content: contentSlice,
    genres: genresSlice,
    details: detailsSlice,
    cast: castSlice,
    search: searchSlice,
    similar: similarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
