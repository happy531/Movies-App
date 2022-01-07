import {configureStore} from "@reduxjs/toolkit";

import contentSlice from "./content-slice";
import genresSlice from "./genre-slice";

const store = configureStore({
    reducer: { content: contentSlice, genres: genresSlice },
});

export default store;