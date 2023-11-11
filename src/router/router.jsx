import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import HomeLayout from "../layouts/HomeLayout";
import App from "../App";
import CreateGame from "../pages/CreateGame";
const LazyViewGame = React.lazy(() => import("../pages/ViewGame"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
    ],
  },
  {
    path: "/create",
    element: <CreateGame />,
  },
  {
    path: "/game/:gamename",
    element: (
      <Suspense fallback={<h1>Loading...</h1>}>
        <LazyViewGame />
      </Suspense>
    ),
  },
  {
    path: "/game/id/:gameId",
    element: (
      <Suspense fallback={<h1>Loading...</h1>}>
        <LazyViewGame />
      </Suspense>
    ),
  },
]);

export default router;
