import { Select, Option } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGenres, setUseGenres } from "../store/reducers/genresSlice";
import {
  setCurrentPage,
  setTotalGames,
  agregarGames,
} from "../store/reducers/gamesSlice";
const SelecterGenres = () => {
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

  return (
    <div className="w-72 z-auto">
      <Select onChange={handleSelect} label="Select Version" className="">
        {genres.genres.map((genre) => {
          return (
            <Option key={genre.id} value={genre.slug}>
              {genre.name}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default SelecterGenres;
