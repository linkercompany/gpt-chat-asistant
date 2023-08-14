import React from 'react'
import 'animate.css'

interface OutComing {
  message: string
}
export const OutGoingBuble: React.FC<OutComing> = ({ message }) => {
  // console.log('OutGoingBuble', message)
  return (
    <div className="flex justify-end animate__animated animate__fadeInRightBig">
      <div className="inline-block m-4 ">
        <div className="bg-white   min-h-[5vh]  rounded-2xl text-black flex items-center justify-start ">
          <p className="flex-wrap max-w-[80vw] break-words p-2 text-[2vh]">{message}</p>
        </div>
      </div>
    </div>
  )
}
