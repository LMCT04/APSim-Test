import { createSlice } from "@reduxjs/toolkit";

const partysSlice = createSlice({
  name: "partys",
  initialState: [],
  reducers: {
    setDBPartys(state, action) {
      return action.payload;
    },
  },
});

export const { setDBPartys } = partysSlice.actions;
export default partysSlice.reducer;
