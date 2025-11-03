import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    playerParty: null,
  },
  reducers: {
    setSelectedParty(state, action) {
      state.playerParty = action.payload;
    },
  },
});

export const { setSelectedParty } = gameSlice.actions;
export default gameSlice.reducer;
