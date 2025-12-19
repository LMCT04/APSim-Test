import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./slices/characters/charactersSlice";
import partysReducer from "./slices/partys/partysSlice";
import argentinaReducer from "./slices/argentina/argentinaSlice";
import gameReducer from "./slices/game/gameSlice";
import ideologiesReducer from "./slices/ideologies/ideologiesSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    characters: charactersReducer,
    partys: partysReducer,
    argentina: argentinaReducer,
    ideologies: ideologiesReducer,
  },
});
