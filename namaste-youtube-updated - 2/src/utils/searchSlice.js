import { createSlice } from "@reduxjs/toolkit";

const searchingSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    cacheResults: (state, action) => {

      // ❌ Wrong way:
      // This just rebinds the local variable `state` to a new object.
      // Immer ignores it because you didn’t actually change the draft or return it.
      // state = { ...state, ...action.payload };

      // ✅ Way 1: Mutate the draft directly (Immer tracks changes).
      // Object.assign(state, action.payload);

      // ✅ Way 2: Mutate via assignment.
      // state.someKey = action.payload.someKey;

      // ✅ Way 3: Return a new object explicitly.
      return { ...state, ...action.payload };
    },
  },
});

export const { cacheResults } = searchingSlice.actions;
export default searchingSlice.reducer;


// Rules for reducers in Redux Toolkit -

// You can change state directly

// state.key = value;
// Object.assign(state, action.payload);


// You can return a new object
// return { ...state, ...action.payload };


// You cannot reassign state
// state = { ...state, ...action.payload }; // ❌ does nothing


// Simple thumb rule - Change fields OR return a new object. Don’t reassign state.
