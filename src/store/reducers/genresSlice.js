import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  genres: [],
  useGenres: "",
};
export const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    setGenres: (state, action) => {
      return {
        ...state,
        genres: action.payload,
      };
    },
    setUseGenres: (state, action) => {
      return {
        ...state,
        useGenres: action.payload,
      };
    },
  },
});
export const { setGenres, setUseGenres } = genresSlice.actions;
export default genresSlice.reducer;
