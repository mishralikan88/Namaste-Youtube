
import { configureStore } from "@reduxjs/toolkit";
import appslice from "./applicationSlice";

const store = configureStore({
  reducer: {
    app: appslice,
  },
});

export default store;
