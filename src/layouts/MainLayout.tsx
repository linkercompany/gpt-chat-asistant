import { useContext } from 'react'
import { Helmet } from 'react-helmet'
import siyahKapsul from '../others/siyahKapsul.png'

import { withLogger } from '../log'

import { Outlet } from 'react-router-dom'
import { ChatContext } from '../contexts/ChatContext'

const MainLayoutLog = () => {
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

export const MainLayout = withLogger(MainLayoutLog, 'MainLayout')
