import { IconButton, ButtonGroup } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {} from "../store/reducers/gamesSlice";
import usePagination from "../hooks/usePagination";
export function Pagination() {
  const {
    currentPage,
    maxPageNumberLimit,
    minPageNumberLimit,
    totalPages,
    getItemProps,
    prev,
    next,
  } = usePagination();
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
