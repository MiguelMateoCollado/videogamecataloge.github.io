// src/features/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  games: [],
  dbGames: [],
  totalGames: 0,
  gamesPerPage: 39,
  seeGamesDB: false,
  gameSearch: "",
  gameView: {},
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    agregarGames: (state, action) => {
      return {
        ...state,
        games: action.payload,
      };
    },
    previousPage: (state) => {
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    },
    nextPage: (state) => {
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    },
    setCurrentPage: (state, action) => {
      return {
        ...state,
        currentPage: action.payload,
      };
    },
    setTotalGames: (state, action) => {
      return {
        ...state,
        totalGames: action.payload,
      };
    },
    setGameSearch: (state, action) => {
      return {
        ...state,
        gameSearch: action.payload,
      };
    },
    setViewGame: (state, action) => {
      return {
        ...state,
        gameView: action.payload,
      };
    },
    setDBGames: (state, action) => {
      return {
        ...state,
        dbGames: action.payload,
      };
    },
    setSeeGamesDB: (state, action) => {
      return {
        ...state,
        seeGamesDB: action.payload,
      };
    },
  },
});
export const {
  agregarGames,
  nextPage,
  previousPage,
  setCurrentPage,
  setTotalGames,
  setGameSearch,
  setViewGame,
  setDBGames,
  setSeeGamesDB,
} = gamesSlice.actions;
export default gamesSlice.reducer;
