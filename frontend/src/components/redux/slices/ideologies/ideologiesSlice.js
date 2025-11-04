import { createSlice } from "@reduxjs/toolkit";

const ideologiesSlice = createSlice({
  name: "ideologies",
  initialState: [],
  reducers: {
    setDBIdeologies(state, action) {
      return action.payload;
    },
  },
});

export const { setDBIdeologies } = ideologiesSlice.actions;
export default ideologiesSlice.reducer;
