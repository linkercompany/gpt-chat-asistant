import { useContext } from 'react'
import { Helmet } from 'react-helmet'

import { Outlet } from 'react-router-dom'
import { ChatContext } from '../contexts/ChatContext'

export const MainLayout = () => {
  const { Theme } = useContext(ChatContext)
  return (
    <>
      <Helmet>
        <html className="m-0 p-0" />
        <body className={`m-0 min-h-full ${Theme.background} p-0`} />
      </Helmet>
      <Outlet />
    </>
  )
}
