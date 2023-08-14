import { message } from 'antd'
import 'animate.css'

import React from 'react'

interface InComing {
  message: string
}

export const InComingBuble: React.FC<InComing> = ({ message }) => {
  return (
    <div className="flex justify-start ">
      <div className="inline-block m-4 ">
        <div className="bg-white   min-h-[5vh]  rounded-2xl text-black flex items-center justify-start ">
          <p className="flex-wrap max-w-[80vw] break-words p-2 text-[2vh]">{message}</p>
        </div>
      </div>
    </div>
  )
}
//animate__animated animate__fadeInLeftBig content
