import { Home } from "@/pages";

import { createBrowserRouter } from "react-router-dom";
import { Card } from "./components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: ":id",
        element: <Card />
      }
    ]
  },
]);
