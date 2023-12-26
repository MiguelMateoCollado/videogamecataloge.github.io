import { useDispatch, useSelector } from "react-redux";
import { setGenres } from "../store/reducers/genresSlice";
import { useEffect } from "react";
import { setCurrentPage, setTotalGames, agregarGames } from "../store/reducers/gamesSlice";
import { setUseGenres } from "../store/reducers/genresSlice";
const useSelectGenres = () => {
  const api_url = import.meta.env.VITE_API_URL;
  const api_key = import.meta.env.VITE_API_KEY;
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const { useGenres } = genres;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${api_url}genres?${api_key}`);
      const data = await response.json();
      dispatch(setGenres(data.results));
    };
    fetchData();
  }, []);

  const handleSelect = (e) => {
    dispatch(setCurrentPage(1));
    dispatch(setUseGenres(e));
    fetch(`${api_url}games?genres=${e}&${api_key}&page_size=39`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(setTotalGames(json.count));
        dispatch(agregarGames(json.results));
      });
  };

  return { handleSelect, genres };
};

export default useSelectGenres;
