import { configureStore } from "@reduxjs/toolkit";
import appslice from "./applicationSlice";
import searchingSlice from "./searchSlice";
import chatMessageSlice from "./chatSlice.js";

const store = configureStore({
  reducer: {
    app: appslice,
    search: searchingSlice,
    chat: chatMessageSlice,
  },
});

export default store;
