import 'animate.css'

import React, { useContext } from 'react'
import { ChatContext } from '../../contexts/ChatContext'

import { withLogger } from '../../log'

interface InComing {
  message: string
}

//animate__animated animate__fadeInLeftBig content

const InComingBubleLog: React.FC<InComing> = ({ message }) => {
  const { Theme } = useContext(ChatContext)

  return (
    <div className="flex justify-start ">
      <div className="inline-block m-4 ">
        <div className={`${Theme.buble_background}   min-h-[5vh]  rounded-2xl ${Theme.text_color} flex items-center justify-start `}>
          <p className="flex-wrap max-w-[80vw] break-words p-2 text-[3vh]">{message}</p>
        </div>
      </div>
    </div>
  )
}

export const InComingBuble: React.FC<InComing> = withLogger(InComingBubleLog, 'InComingBuble')
