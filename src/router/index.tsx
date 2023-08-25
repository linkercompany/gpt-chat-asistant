import { Navigate, useRoutes } from "react-router-dom";

import { MainLayout } from "../layouts";
import { ChatAssistant, VideoChat } from '../pages'

export const Router = () => {
  return useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        { path: '', element: <ChatAssistant /> },
        { path: '/video-chat', element: <VideoChat /> }
      ]
    },
    { path: '*', element: <Navigate to="/" replace /> }
  ])
}
