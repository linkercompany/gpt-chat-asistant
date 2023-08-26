import { Button } from 'antd'
import siyah from '../assets/siyah.svg'
import beyaz from '../assets/beyaz.svg'
import { ChatContext } from '../contexts/ChatContext'
import { IsWriting } from '../components/VoiceAsistant'
import { useContext, useEffect, useRef, useState } from 'react'

export const ChatAssistant = () => {
  const { OutGoingMessage, SetMessage, Room, setRoom, Theme, InComingMessage, AddOutGoing, AddInComing, MessageArray, Speech2Text } = useContext(ChatContext)

  const ScrollingBottom = useRef<any>(null)

  // İlk render olduğunda mikrofonu açar
  useEffect(() => {
    setTimeout(() => {
      Speech2Text.startSpeechToText()
    }, 1000)
  }, [])

  // Giden mesaj
  useEffect(() => {
    AddOutGoing()
  }, [OutGoingMessage])

  // Gelen mesaj
  useEffect(() => {
    AddInComing()
  }, [InComingMessage])

  // Sürekli aşşağı kaymasını sağlar
  useEffect(() => {
    ScrollingBottom.current?.scrollIntoView({ behavior: 'smooth' })
  }, [InComingMessage, OutGoingMessage])

  // Sesli komuttan gelen veriyi hazırlar
  useEffect(() => {
    SetMessage(Speech2Text.results)
  }, [Speech2Text.results])

  // Speech to text error trigger
  if (Speech2Text.error) {
    console.log('Speech recognition error:', Speech2Text.error)
    return <p>{Speech2Text.error}</p>
  }
  return (
    <div
      className={`m-w-[100vw] m-h-[100vh] box-border cursor-pointer  bg-center bg-no-repeat bg-[length:70vw_70vh] relative ${Theme.text_color}`}
      style={{
        backgroundImage: `url(${Theme.svg_image === 'light' ? siyah : beyaz})`
      }}
    >
      <button className="absolute text-red-700 text-2xl" onClick={Speech2Text.isRecording ? Speech2Text.stopSpeechToText : Speech2Text.startSpeechToText}>
        {Speech2Text.isRecording ? ' *' : ''}
      </button>
      <div className={` flex flex-col justify-end  ${Speech2Text.isRecording ? 'h-[98vh]' : 'h-[93vh]'}	`}>
        <div className="overflow-auto scroll-smooth  ">
          {MessageArray.map((message: any) => {
            return message
          })}
          <div ref={ScrollingBottom}></div>
        </div>
      </div>
      {Speech2Text.isRecording ? '' : <IsWriting />}
    </div>
  )
}
{
  /* <Button
        onClick={() => {
          ReadOut('merhaba benim adım Ema nasıl yardımcı olabilirim')
        }}
      >
        Konuş
      </Button> */
}
