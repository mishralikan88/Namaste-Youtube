import { createSlice } from "@reduxjs/toolkit";
import {LIVE_CHAT_COUNT} from "./constants"

const chatMessageSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.splice(LIVE_CHAT_COUNT,1) // remove 1 element at LIVE_CHAT_COUNTth index
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatMessageSlice.actions;
export default chatMessageSlice.reducer;
