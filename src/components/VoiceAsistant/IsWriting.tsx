import 'animate.css'
import { EllipsisOutlined } from '@ant-design/icons'
import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { ChatContext } from '../../contexts/ChatContext'

export const IsWriting = () => {
  const { Theme } = useContext(ChatContext)

  return (
    <div className={`flex justify-start animate__delay-1s animate__animated animate__fadeInLeftBig `}>
      <div className="inline-block m-4 ">
        <div className={`${Theme.buble_background} min-h-[5vh] rounded-2xl ${Theme.text_color} flex items-center justify-start px-[1vw] `}>
          <p className="flex-wrap max-w-[80vw] break-words p-2 pr-1 text-[3vh]">Yazıyor...</p>
          {/* <p className="flex-wrap max-w-[80vw] break-words text-[5vh] p-0 pr-1 ">.</p>
          <p className="flex-wrap max-w-[80vw] break-words pr-1 text-[2vh] ">.</p>
          <p className="flex-wrap max-w-[80vw] break-words pr-1 text-[2vh] ">.</p> */}
          {/* <FontAwesomeIcon icon={faCircle} style={{ fontSize: '2vh', color: 'black' }} className="px-2 animate__animated animate__infinite animate__heartBeat" />
          <FontAwesomeIcon icon={faCircle} style={{ fontSize: '2vh', color: 'black' }} />
          <FontAwesomeIcon icon={faCircle} style={{ fontSize: '2vh', color: 'black' }} /> */}
          {/* <EllipsisOutlined className="text-[2vh]" /> */}
        </div>
      </div>
    </div>
  )
}
// animate__animated animate__wobble animate__delay-5s animate__infinite
