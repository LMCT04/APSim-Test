import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./slices/characters/charactersSlice";
import partysReducer from "./slices/partys/partysSlice";
import argentinaReducer from "./slices/argentina/argentinaSlice";

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    partys: partysReducer,
    argentina: argentinaReducer,
  },
});
