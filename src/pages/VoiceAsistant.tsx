import siyah from '../assets/siyah.svg'
import beyaz from '../assets/beyaz.svg'
import redDot from '../assets/redDot.png'

import { ChatContext } from '../contexts/ChatContext'
import { IsWriting } from '../components/VoiceAsistant'
import { useContext, useEffect, useRef, useState } from 'react'

import { withLogger } from '../log'

const ChatAssistantLog = () => {
  const ScrollingBottom = useRef<any>(null)
  const { OutGoingMessage, SetMessage, Audio, setAudio, Room, setRoom, Theme, InComingMessage, AddOutGoing, AddInComing, MessageArray, Speech2Text } = useContext(ChatContext)

  // İlk render olduğunda mikrofonu açar
  useEffect(
    withLogger(() => {
      setTimeout(() => {
        Speech2Text.startSpeechToText()
        AddInComing("Merhaba benim adım Ema, size yardımcı olmak için buradayım. 'Hey Ema' komutu ile benimle konuşabilirsiniz.")
      }, 1000)
    }, 'ChatAssistantLog.UseEffect.2'),
    []
  )

  // Giden mesaj
  useEffect(
    withLogger(() => {
      AddOutGoing()
    }, 'ChatAssistantLog.UseEffect.2'),
    [OutGoingMessage]
  )

  // Gelen mesaj
  useEffect(
    withLogger(() => {
      AddInComing(InComingMessage)
    }, 'ChatAssistantLog.UseEffect.3'),
    [InComingMessage]
  )

  // Sürekli aşşağı kaymasını sağlar
  useEffect(
    withLogger(() => {
      ScrollingBottom.current?.scrollIntoView({ behavior: 'smooth' })
    }, 'ChatAssistantLog.UseEffect.4'),
    [InComingMessage, OutGoingMessage]
  )

  // Sesli komuttan gelen veriyi hazırlar
  useEffect(
    withLogger(() => {
      SetMessage(Speech2Text.results)
    }, 'ChatAssistantLog.UseEffect.5'),
    [Speech2Text.results]
  )

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
      <span
        style={{
          backgroundImage: `url(${Speech2Text.isRecording ? redDot : ''})`
        }}
        className={` mt-[0.5vh] ml-[0.5vh] absolute  h-[1vh] w-[1vh] box-border cursor-pointer  bg-center bg-no-repeat bg-[length:1vw_1vw] ${Theme.background}`}
      />
      {Audio ? Audio : ''}
      <div className={` flex flex-col justify-end  ${Speech2Text.isRecording ? 'h-[100vh]' : 'h-[95vh]'}	`}>
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

export const ChatAssistant = withLogger(ChatAssistantLog, 'ChatAssistant')
