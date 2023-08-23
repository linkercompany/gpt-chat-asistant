import { Navigate, useRoutes } from "react-router-dom";

import { MainLayout } from "../layouts";
import { ChatAsistant, VideoChat } from '../pages'

export const Router = () => {
  return useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        { path: '', element: <ChatAsistant /> },
        { path: '/video-chat', element: <VideoChat /> }
      ]
    },
    { path: '*', element: <Navigate to="/" replace /> }
  ])
}
