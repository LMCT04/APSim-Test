import { createSlice } from "@reduxjs/toolkit";

const charactersSlice = createSlice({
  name: "characters",
  initialState: [],
  reducers: {
    setDBCharacters(state, action) {
      return action.payload;
    },
  },
});

export const { setDBCharacters } = charactersSlice.actions;
export default charactersSlice.reducer;
