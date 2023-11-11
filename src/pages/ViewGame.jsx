import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { setViewGame } from "../store/reducers/gamesSlice";
const ViewGame = () => {
  const [read, setRead] = useState(true);
  const { gamename, gameId } = useParams();
  const dispatch = useDispatch();
  const view = useSelector((state) => state.games.gameView);
  const api_url = import.meta.env.VITE_API_URL;
  const api_key = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    const fetchData = async () => {
      if (gameId) {
        const response = await fetch(
          `http://localhost:3001/videogames/${gameId}`
        );
        const data = await response.json();
        return dispatch(setViewGame(data));
      } else {
        const response = await fetch(
          `${api_url}games/${gamename || gameId}?${api_key}`
        );
        const data = await response.json();
        dispatch(setViewGame(data));
      }
    };
    fetchData();
  }, []);
  console.log(view);
  return (
    <div className="h-screen flex items-center">
      <Card className="w-full mx-auto max-w-[45rem]  shadow-lg shadow-red-900 rounded-none border-4 border-gray-900  filter-none">
        <CardHeader
          floated={false}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url("${view.background_image}")`,
          }}
          color="blue-gray"
          className=" border-black rounded-none border-4"
        >
          <img src={`${view.background_image}`} alt="ui/ux review check" />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        </CardHeader>
        <CardBody>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h3" color="blue-gray" className="font-lg">
              {view.name}
            </Typography>
            <Typography
              color="blue-gray"
              className="flex items-center gap-1.5 font-normal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-0.5 h-5 w-5 text-yellow-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              {view.rating}
            </Typography>
          </div>
          <div className="divide-y gap-1">
            <div className="text-left">
              <p
                onClick={() => setRead(!read)}
                className={`text-sm font-body ${
                  read === true ? "line-clamp-5" : "line-clamp-none"
                } leading-relaxed`}
              >
                {view.description}
                {view.description_raw}
              </p>
            </div>
            <div className="flex flex-col justify-between mt-3 divide-y">
              <div className=" w-full flex  items-center my-auto gap-2 justify-start  flex-wrap">
                <h3 className="p-2.5">Genres </h3>
                <div className="gap-2 w-4/5 flex border-l-2">
                  {view.genres?.map((genre) => {
                    return (
                      <span className="p-2 text-sm text-red-900">
                        {genre.name}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="w-full flex items-center my-auto gap-2 justify-start  flex-wrap ">
                <h3 className="">Platforms</h3>
                <div className="gap-2 flex w-4/5 flex-wrap border-l-2">
                  {view.platforms?.map((platform) => {
                    return (
                      <span className="p-2 text-sm text-gray-800">
                        {platform?.platform?.name || platform?.name }
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter className="pt-3 flex justify-center ">
          <Link
            className=" flex bg-red-600  text-white py-3 gap-2 w-1/2 justify-center border-2 border-black hover:shadow-inner hover:shadow-[#5C0500]/90 shadow-red-900 rounded-none hover: shadow-inner"
            to={`${view.website}`}
          >
            Visit website <ArrowTopRightOnSquareIcon className="w-5" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewGame;
