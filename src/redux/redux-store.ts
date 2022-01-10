import { configureStore } from "@reduxjs/toolkit";

import contentSlice from "./content-slice";
import genresSlice from "./genre-slice";
import detailsSlice from "./details-slice";
import castSlice from "./cast-slice";
import searchSlice from "./search-slice";

const store = configureStore({
  reducer: {
    content: contentSlice,
    genres: genresSlice,
    details: detailsSlice,
    cast: castSlice,
    search: searchSlice,
  },
});

export default store;
