import { configureStore } from "@reduxjs/toolkit";
import appslice from "./applicationSlice";
import searchingSlice from "./searchSlice";

const store = configureStore({
  reducer: {
    app: appslice,
    search: searchingSlice,
  },
});

export default store;
