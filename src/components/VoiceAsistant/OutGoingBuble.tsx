import React, { useContext } from 'react'
import 'animate.css'
import { ChatContext } from '../../contexts/ChatContext'

import { withLogger } from '../../log'

interface OutComing {
  message: string
}
export const OutGoingBubleLog: React.FC<OutComing> = ({ message }) => {
  const { Theme } = useContext(ChatContext)

  return (
    <div className="overflow-x-hidden">
      <div className="flex justify-end animate__animated animate__fadeInRightBig ">
        <div className="inline-block m-4 ">
          <div className={`${Theme.buble_background}   min-h-[5vh]  rounded-2xl ${Theme.text_color} flex items-center justify-start px-[1vw] `}>
            <p className="flex-wrap max-w-[80vw]  break-words p-2 pr-1 text-[3vh] ">{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const OutGoingBuble = withLogger(OutGoingBubleLog, 'OutGoingBuble')
