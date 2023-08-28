import { Navigate, useRoutes } from 'react-router-dom'

import { MainLayout } from '../layouts'
import { ChatAssistant, VideoChat } from '../pages'

import { withLogger } from '../log'

const RouterLog = () => {
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

export const Router = withLogger(RouterLog, 'Router')
