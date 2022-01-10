import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    currentValue: "movies",
    status: null,
  },
  reducers: {
    setCurrentValue(state, action) {
      state.currentValue = action.payload;
    },
  },
  extraReducers: {},
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
