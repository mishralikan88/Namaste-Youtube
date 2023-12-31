import { createSlice } from "@reduxjs/toolkit";

const searchingSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    cacheResults: (state, action) => {
      // understand logic below
      state = Object.assign(state, action.payload);
    },
  },
});

export const { cacheResults } = searchingSlice.actions;
export default searchingSlice.reducer;
