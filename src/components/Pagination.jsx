import React, { useState } from "react";
import { IconButton, ButtonGroup, Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {} from "../store/reducers/gamesSlice";
import { agregarGames, setTotalGames } from "../store/reducers/gamesSlice";
export function Pagination() {
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
  const pageNumbers = [];
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

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
  let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <IconButton
        className="bg-white shadow-lg text-lg border-black border-2"
        onClick={next}
      >
        {" "}
        &hellip;
      </IconButton>
    );
  }
  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <IconButton
        className="bg-white shadow-lg text-lg border-black border-2"
        onClick={prev}
      >
        &hellip;
      </IconButton>
    );
  }
  return (
    <ButtonGroup
      variant="outlined"
      color="blue-gray"
      className="flex justify-center p-8 "
    >
      <IconButton
        onClick={prev}
        className="bg-white shadow-lg border-black border-2"
        disabled={currentPage === pageNumbers[0] ? true : false}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 bg-white" />
      </IconButton>
      {pageDecrementBtn}
      {pageNumbers.map((page) => {
        if (page < maxPageNumberLimit + 1 && page >= minPageNumberLimit) {
          return (
            <IconButton
              key={page}
              className="border-black border-2 shadow-lg"
              {...getItemProps(page)}
            >
              {page}
            </IconButton>
          );
        }
        return null;
      })}
      {pageIncrementBtn}
      <IconButton
        className="bg-white shadow-lg border-black border-2"
        disabled={
          currentPage === pageNumbers[pageNumbers.length - 1] ? true : false
        }
        onClick={next}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4 bg-white" />
      </IconButton>
    </ButtonGroup>
  );
}
