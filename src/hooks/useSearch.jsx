import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTotalGames,
  agregarGames,
  setGameSearch,
  setCurrentPage,
  setSeeGamesDB,
} from "../store/reducers/gamesSlice";
import { setUseGenres } from "../store/reducers/genresSlice";
const useSearch = () => {
  //constantes
  const api_url = import.meta.env.VITE_API_URL;
  const api_key = import.meta.env.VITE_API_KEY;
  const inputRef = useRef(null);
  const games = useSelector((state) => state.games);
  const { currentPage } = games;
  const dispatch = useDispatch();
  //constantes
  const fetchData = (gameSearch, currentPage) => {
    fetch(
      `${api_url}games?${api_key}&search=${gameSearch}&page=${currentPage}&page_size=39`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch(setTotalGames(json.count));
        dispatch(agregarGames(json.results));
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = inputRef.current.value;
    dispatch(setCurrentPage(1));
    dispatch(setGameSearch(name));
    fetchData(name, currentPage);
  };

  const rollBackSearch = () => {
    dispatch(setCurrentPage(1));
    dispatch(setGameSearch(""));
    inputRef.current.value = "";
    fetch(`${api_url}games?${api_key}&page=1&page_size=39`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(setUseGenres(""));
        dispatch(setTotalGames(json.count));
        dispatch(agregarGames(json.results));
      });
  };

  const seeDBGamesOnClick = () => {
    dispatch(setSeeGamesDB(!games.seeGamesDB));
  };

  return {
    games,
    fetchData,
    seeDBGamesOnClick,
    handleSubmit,
    inputRef,
    rollBackSearch,
  };
};
export default useSearch;
