import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import {
  agregarGames,
  setDBGames,
  setTotalGames,
} from "./store/reducers/gamesSlice";
import { Spinner } from "@material-tailwind/react";
import { useEffect } from "react";
import CardGame from "./components/CardGame";
import { Pagination } from "./components/Pagination";
function App() {
  const games = useSelector((state) => state.games);
  console.log(games)
  const dispatch = useDispatch();
  const api_url = import.meta.env.VITE_API_URL;
  const api_key = import.meta.env.VITE_API_KEY;

  const getGames = () =>
    fetch(`${api_url}games?${api_key}&page=1&page_size=40`).then((response) =>
      response.json()
    );

  const getDBgames = () =>
    fetch(`http://localhost:3001/videogames`).then((response) =>
      response.json()
    );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGames();
      const dataDB = await getDBgames();
      dispatch(setDBGames(dataDB));
      dispatch(setTotalGames(data.count));
      dispatch(agregarGames(data.results));
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center z-0 min-h-screen gap-8 ">
        {games.seeGamesDB === false && games.games.length === 0 ? (
          <Spinner className="h-12 w-12" />
        ) : games.seeGamesDB === true ? (
          games.dbGames?.map((dbGame) => {
            return (
              <React.Fragment>
                <CardGame
                  genres={dbGame.genres}
                  img={dbGame.background_image}
                  name={dbGame.name}
                  slug={dbGame.slug}
                  seeDB={dbGame.id}
                  description={dbGame.description}
                />
              </React.Fragment>
            );
          })
        ) : (
          games.games?.map((game) => {
            return (
              <React.Fragment>
                <CardGame
                  genres={game.genres}
                  img={game.background_image}
                  name={game.name}
                  slug={game.slug}
                  key={game.id}
                  description={game.description}
                />
              </React.Fragment>
            );
          })
        )}
      </div>
      {games.seeGamesDB === false && <Pagination />}
    </div>
  );
}

export default App;
