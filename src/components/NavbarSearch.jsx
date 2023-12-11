import { Navbar, IconButton } from "@material-tailwind/react";
import {
  PlusIcon,
  ArrowPathIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/solid";
import LogoSvg from "../assets/Logo.svg";
import useSearch from "../hooks/useSearch";
import { Link } from "react-router-dom";
import SelecterGenres from "./SelecterGenres";

export function NavbarSearch() {
  const { rollBackSearch, seeDBGamesOnClick, handleSubmit, inputRef } =  useSearch();

  return (
    <Navbar className="mx-auto z-50 relative   max-w-screen-xl  my-5 border-4 border-gray-900  drop-shadow-lg shadow-red-900 rounded-none bg-white/100 py-3">
      <div className="flex flex-wrap gap-2 items-center justify-start md:flex-nowrap  text-blue-gray-900">
        <img src={LogoSvg} className="w-full md:w-1/4" alt="" />
        <div className="flex md:w-2/4 w-full md:flex-nowrap gap-1 flex-wrap  justify-center">
          <div className="flex w-1/2 justify-center">
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
          </div>
          <SelecterGenres />
        </div>
        <div className="flex w-full md:w-1/4">
          <form action="" className="w-full" onSubmit={(e) => handleSubmit(e)}>
            <input
              ref={inputRef}
              id="name"
              type="search"
              className="border-4 w-2/4  p-2 border-red-700 focus:outline-none"
              placeholder="Search..."
            />
            <button className="border-4 w-2/4 px-1 p-2 border-red-700 bg-red-700 text-white hover:bg-red-800 hover:border-red-800 ease-in-out">
              Search
            </button>
          </form>
        </div>
      </div>
    </Navbar>
  );
}
