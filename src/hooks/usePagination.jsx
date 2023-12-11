import { useDispatch, useSelector } from "react-redux";
import { agregarGames, setTotalGames } from "../store/reducers/gamesSlice";
import React, { useState } from "react";
const usePagination = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(40);
  const [pageNumberLimit, setPageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const { totalGames, gameSearch, gamesPerPage } = games;

  const genres = useSelector((state) => state.genres);
  const { useGenres } = genres;
  const totalPages = Math.ceil(totalGames / gamesPerPage);

  const getItemProps = (index) => ({
    className:
      currentPage === index
        ? "bg-white text-blue-gray-900 focus:ring-0 border-black border-2 "
        : "bg-white/75  border-2 border-black",
    onClick: () => {
      setCurrentPage(index);
      getGames(index);
    },
  });

  const next = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMinPageNumberLimit(pageNumberLimit + minPageNumberLimit);
      setMaxPageNumberLimit(pageNumberLimit + maxPageNumberLimit);
    }
    getGames(currentPage, "next");
  };

  const prev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    }
    getGames(currentPage, "before");
  };

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  async function getGames(currentPage, type) {
    const api_url = import.meta.env.VITE_API_URL;
    const api_key = import.meta.env.VITE_API_KEY;
    if (type === "next") {
      const response = await fetch(
        `${api_url}games?${api_key}&page=${
          currentPage + 1
        }&page_size=${itemsPerPage}&${
          gameSearch !== "" ? "search=" + `${gameSearch}` : ""
        }&${useGenres !== "" ? "genres=" + `${useGenres}` : ""}`
      );
      const data = await response.json();
      dispatch(setTotalGames(data.count));
      dispatch(agregarGames(data.results));
    } else if (type === "before") {
      const response = await fetch(
        `${api_url}games?${api_key}&page=${
          currentPage - 1
        }&page_size=${itemsPerPage}&${
          gameSearch !== "" ? "search=" + `${gameSearch}` : ""
        }&${useGenres !== "" ? "genres=" + `${useGenres}` : ""}`
      );
      const data = await response.json();
      dispatch(setTotalGames(data.count));
      dispatch(agregarGames(data.results));
    } else {
      const response = await fetch(
        `${api_url}games?${api_key}&page=${currentPage}&page_size=${itemsPerPage}&${
          gameSearch !== "" ? "search=" + `${gameSearch}` : ""
        }&${useGenres !== "" ? "genres=" + `${useGenres}` : ""}`
      );
      const data = await response.json();
      dispatch(setTotalGames(data.count));
      dispatch(agregarGames(data.results));
    }
  }
  let pageIncrementBtn = null;
  let pageDecrementBtn = null;
  return {
    games,
    currentPage,
    itemsPerPage,
    pageNumberLimit,
    maxPageNumberLimit,
    minPageNumberLimit,
    indexOfLastItem,
    genres,
    totalPages,
    getGames,
    getItemProps,
    next,
    prev,
    indexOfFirstItem,
    pageNumbers,
  };
};

export default usePagination;
