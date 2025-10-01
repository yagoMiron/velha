import { RouteObject } from "react-router-dom";
import Game from "../page/Game";
import Home from "../page/Home";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game",
    element: <Game />,
  },
];
