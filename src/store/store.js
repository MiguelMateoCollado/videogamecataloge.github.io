// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import gamesSlice from "./reducers/gamesSlice";
import genresSlice from "./reducers/genresSlice";
const store = configureStore({
  reducer: {
    games: gamesSlice,
    genres: genresSlice,
  },
});

export default store;
