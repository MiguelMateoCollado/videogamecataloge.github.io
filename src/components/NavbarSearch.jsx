import { Navbar, IconButton } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {
  PlusIcon,
  ArrowPathIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/solid";
import LogoSvg from "../assets/Logo.svg";
import {
  setTotalGames,
  agregarGames,
  setGameSearch,
  setCurrentPage,
  setSeeGamesDB,
} from "../store/reducers/gamesSlice";
import { Link } from "react-router-dom";
import SelecterGenres from "./SelecterGenres";
import { setUseGenres } from "../store/reducers/genresSlice";
export function NavbarSearch() {
  const api_url = import.meta.env.VITE_API_URL;
  const api_key = import.meta.env.VITE_API_KEY;
  const inputRef = useRef(null);
  const games = useSelector((state) => state.games);
  const { gameSearch, currentPage } = games;
  const dispatch = useDispatch();

  const seeDBGamesOnClick = () => {
    dispatch(setSeeGamesDB(!games.seeGamesDB));
  };

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

  const rollBackSearch = (e) => {
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

  return (
    <Navbar className="mx-auto z-50 relative max-w-screen-xl my-5 border-4 border-gray-900  drop-shadow-lg shadow-red-900 rounded-none bg-white/100 py-3">
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
        <img src={LogoSvg} className="min-w-[10%] max-w-[25%]" alt="" />
        <div className="ml-auto flex gap-1 md:mr-4 ">
          <IconButton variant="text" className="text-red-900">
            <ArrowPathIcon
              onClick={(e) => rollBackSearch(e)}
              className="h-7 w-7"
            />
          </IconButton>
          <IconButton variant="text" className="text-red-900">
            <FolderPlusIcon
              onClick={(e) => seeDBGamesOnClick()}
              className="h-7 w-7"
            />
          </IconButton>
          <IconButton variant="text" className="text-red-900">
            <Link to="/create">
              {" "}
              <PlusIcon className="h-7 w-7" />
            </Link>
          </IconButton>
          <SelecterGenres />
        </div>
        <div className="relative flex w-full md:w-max">
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <input
              ref={inputRef}
              id="name"
              type="search"
              className="border-4 p-2 border-red-700 focus:outline-none"
              placeholder="Search..."
            />
            <button className="border-4 px-4 p-2 border-red-700 bg-red-700 text-white hover:bg-red-800 hover:border-red-800 ease-in-out">
              Search
            </button>
          </form>
        </div>
      </div>
    </Navbar>
  );
}
