import { Navigate, useRoutes } from "react-router-dom";

import { MainLayout } from "../layouts";
import { ChatAsistant } from "../pages";

export const Router = () => {
  return useRoutes([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { path: "", element: <ChatAsistant /> },
        // { path: "/process", element: <Process /> },
        // { path: "/equations", element: <Equations /> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
};
